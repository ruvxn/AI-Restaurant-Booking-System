from pathlib import Path
from typing import List, Dict
import json
import os

import joblib
import pandas as pd
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ----- Paths / model -----
APP_DIR = Path(__file__).parent
MODEL_PATH = APP_DIR / "customer_demand_pipeline.pkl"
pipeline = joblib.load(MODEL_PATH)

# File to persist "accepted" discount schedules per restaurant
DATA_FILE = APP_DIR / "accepted_discounts.json"

# ----- FastAPI app + CORS -----
app = FastAPI(title="Discount Engine API", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # tighten in prod
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# ----- Helpers / types -----
WEEKDAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

class Slot(BaseModel):
    time: str        # "08:00"
    discount: int    # e.g., 50

def compute_discount(predicted_customers: float, total_seats: int) -> int:
    occ = (predicted_customers / total_seats) if total_seats else 0
    return 50 if occ < 0.3 else (10 if occ < 0.6 else 0)

def build_day_rows(
    weekday: str,
    total_seats: int,
    offpeak_res: int,
    lunch_res: int,
    dinner_res: int,
) -> list[dict]:
    base = {
        "closing_time": 22,
        "google_rating": 4.5,
        "review_sentiment_score": 0.72,
        "temperature": 18,
        "average_bill_price": 25,
        "total_seats": total_seats,
        "distance_to_cbd_km": 1.5,
        "weekday_index": WEEKDAYS.index(weekday),
        "is_weekend": 1 if weekday in ["Saturday","Sunday"] else 0,
        "day_of_week": weekday,
        "weather": "Clear",
        "categories": "",
        "local_events": "None",
        "holiday": False,
    }
    rows = []
    for hour in range(8, 23):  # 08:00..22:00 inclusive
        is_lunch  = 1 if 11 <= hour <= 14 else 0
        is_dinner = 1 if 18 <= hour <= 21 else 0
        reservations = lunch_res if is_lunch else (dinner_res if is_dinner else offpeak_res)
        rows.append({
            **base,
            "hour": hour,
            "is_lunch": is_lunch,
            "is_dinner": is_dinner,
            "reservations": reservations,
        })
    return rows

def load_all() -> Dict[str, List[Dict]]:
    if not DATA_FILE.exists():
        return {}
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_all(d: Dict[str, List[Dict]]) -> None:
    with open(DATA_FILE, "w") as f:
        json.dump(d, f)

# ----- Existing: dynamic, model-driven schedule (no persistence) -----
@app.get("/api/discounts")
def get_discounts(
    weekday: str = Query(..., pattern="^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$"),
    total_seats: int = 80,
    offpeak_res: int = 5,
    lunch_res: int = 25,
    dinner_res: int = 40,
):
    rows = build_day_rows(weekday, total_seats, offpeak_res, lunch_res, dinner_res)
    X = pd.DataFrame(rows)
    preds = pipeline.predict(X)
    schedule = [
        {"time": f"{r['hour']:02d}:00", "discount": compute_discount(float(p), r["total_seats"])}
        for r, p in zip(rows, preds)
    ]
    return schedule

# ----- New: persisted "accepted" schedules per restaurant -----
@app.get("/api/restaurants/{restaurant_id}/discounts")
def get_restaurant_discounts(restaurant_id: int):
    data = load_all()
    sched = data.get(str(restaurant_id), [])
    return {
        "restaurantId": restaurant_id,
        # You can swap this to a real name lookup later
        "restaurantName": "Sunset Grill" if restaurant_id == 1 else "Restaurant",
        "discounts": sched,
    }

@app.post("/api/restaurants/{restaurant_id}/discounts")
def set_restaurant_discounts(restaurant_id: int, slots: List[Slot]):
    """
    Owner dashboard should POST the accepted schedule as:
    [
      {"time":"08:00","discount":50},
      {"time":"09:00","discount":10},
      ...
    ]
    """
    data = load_all()
    data[str(restaurant_id)] = [s.dict() for s in slots]
    save_all(data)
    return {"ok": True}
