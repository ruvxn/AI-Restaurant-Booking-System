import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Unique, accurate images per menu item for each restaurant!
const restaurantMenus = {
  1: {
    name: "Sunset Grill Set",
    menu: [
      {
        name: "Steak Set",
        price: 21.00,
        originalPrice: 35.00,
        discount: 40,
        time: "4pm - 6pm",
        img: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Seafood Set",
        price: 20.80,
        originalPrice: 32.00,
        discount: 35,
        time: "6pm - 8pm",
        img: "https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Chicken Set",
        price: 21.00,
        originalPrice: 28.00,
        discount: 25,
        time: "2pm - 5pm",
        img: "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
    ]
  },
  2: {
    name: "Pasta Place",
    menu: [
      {
        name: "Family Pasta Set",
        price: 17.5,
        originalPrice: 25,
        discount: 30,
        time: "5pm - 7pm",
        img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Couple Set",
        price: 14.4,
        originalPrice: 18,
        discount: 20,
        time: "12pm - 3pm",
        img: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Lunch Special",
        price: 11.9,
        originalPrice: 14,
        discount: 15,
        time: "11am - 2pm",
        img: "https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Spaghetti Carbonara",
        price: 13,
        img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Lasagna",
        price: 15,
        img: "https://images.pexels.com/photos/5864352/pexels-photo-5864352.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Penne Arrabiata",
        price: 11,
        img: "https://images.pexels.com/photos/32360961/pexels-photo-32360961.jpeg?auto=compress&w=400&h=200&fit=crop"
      }
    ]
  },
  3: {
    name: "Sushi House",
    menu: [
      {
        name: "Teriyaki Don Set",
        price: 20,
        originalPrice: 25,
        discount: 20,
        time: "2pm - 5pm",
        img: "https://images.pexels.com/photos/30507472/pexels-photo-30507472.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Salmon Nigiri",
        price: 13,
        img: "https://images.pexels.com/photos/1683545/pexels-photo-1683545.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Sushi Set Deluxe",
        price: 22.1,
        originalPrice: 34,
        discount: 35,
        time: "12pm - 2pm",
        img: "https://images.pexels.com/photos/7245464/pexels-photo-7245464.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Tuna Roll",
        price: 15,
        img: "https://images.pexels.com/photos/3763637/pexels-photo-3763637.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Miso Soup",
        price: 7,
        img: "https://images.pexels.com/photos/30682816/pexels-photo-30682816.jpeg?auto=compress&w=400&h=200&fit=crop"
      },
      {
        name: "Tamago Sushi",
        price: 8,
        img: "https://images.pexels.com/photos/10138040/pexels-photo-10138040.jpeg?auto=compress&w=400&h=200&fit=crop"
      }
    ]
  }
};

function Menu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = restaurantMenus[id];

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
  };

  if (!data) return <div style={{ padding: "2rem" }}>Restaurant not found.</div>;

  return (
    <div className="user-content">
      <button onClick={() => navigate(-1)} style={{
        marginBottom: "1.2rem",
        background: "#ff512f",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        fontSize: "1.12rem"
      }}>← Back</button>
      <h2 style={{
        fontWeight: 700,
        fontSize: "2.5rem",
        color: "#181818",
        marginBottom: "2rem"
      }}>{data.name} Menu</h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem"
      }}>
        {data.menu.map((item, idx) => (
          <div key={idx} style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 2px 10px rgba(221, 36, 118, 0.09)",
            padding: "1.2rem 1.4rem",
            minWidth: "240px",
            maxWidth: "260px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <img
              src={item.img}
              alt={item.name}
              onError={handleImageError}
              style={{
                width: "100%",
                height: "110px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "1rem"
              }}
            />
            <div style={{ width: "100%" }}>
              <div style={{
                fontWeight: 700,
                fontSize: "1.15rem",
                color: "#5d005d"
              }}>{item.name}</div>
              <div style={{
                margin: "0.3rem 0",
                color: "#181818",
                fontSize: "1rem"
              }}>
                {item.discount
                  ? <>
                      <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>
                        AUD {item.originalPrice}
                      </span>
                      <span style={{ fontWeight: 700 }}>
                        AUD {item.price}
                      </span>
                    </>
                  : <>AUD {item.price}</>
                }
              </div>
              {item.discount &&
                <div style={{
                  color: "#dd2476",
                  fontWeight: 500,
                  fontSize: "0.98rem",
                  marginBottom: "0.2rem"
                }}>
                  {item.discount}% OFF
                  <span style={{
                    fontWeight: 400,
                    color: "#8a8a8a",
                    marginLeft: "0.6rem",
                    fontSize: "0.93rem"
                  }}>
                    ({item.time})
                  </span>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;