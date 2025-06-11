import joblib
import pandas as pd
import sys
import json

def load_models():
    """Load the preprocessor and model"""
    try:
        preprocessor = joblib.load("model/preprocessor.pkl")
        xgb_model = joblib.load("model/xgb_historic_model.pkl")
        return preprocessor, xgb_model
    except Exception as e:
        print(f"Error loading models: {e}", file=sys.stderr)
        return None, None

def calculate_discount(predicted_customers):
    """Calculate discount based on predicted customers"""
    if predicted_customers < 20:
        return 30
    elif predicted_customers < 40:
        return 20
    elif predicted_customers < 60:
        return 10
    else:
        return 0

def predict_discount(input_data):
    """Main prediction function"""
    try:
        # Load models
        preprocessor, xgb_model = load_models()
        
        if preprocessor is None or xgb_model is None:
            raise Exception("Failed to load models")
        
        # Create DataFrame from input
        test_input = pd.DataFrame([input_data])
        
        # Transform the input
        X_test_input = preprocessor.transform(test_input)
        
        # Make prediction
        predicted_customers = round(xgb_model.predict(X_test_input)[0])
        
        # Calculate discount
        discount = calculate_discount(predicted_customers)
        
        return {
            "predictedCustomers": int(predicted_customers),
            "discount": f"{discount}%"
        }
        
    except Exception as e:
        print(f"Prediction error: {e}", file=sys.stderr)
        # Return fallback values
        return {
            "predictedCustomers": 25,
            "discount": "20%"
        }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python predict_discount.py '<json_input>'", file=sys.stderr)
        sys.exit(1)
    
    try:
        # Parse input JSON
        input_json = sys.argv[1]
        input_data = json.loads(input_json)
        
        # Make prediction
        result = predict_discount(input_data)
        
        # Output result as JSON
        print(json.dumps(result))
        
    except Exception as e:
        print(f"Script error: {e}", file=sys.stderr)
        # Output fallback result
        fallback = {
            "predictedCustomers": 25,
            "discount": "20%"
        }
        print(json.dumps(fallback))