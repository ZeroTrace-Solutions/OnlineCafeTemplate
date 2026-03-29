import iceCoffee from '../assets/images/Ice Coffee.png';
import porio from '../assets/images/Porio.png';
import coffeeImg from '../assets/images/coffee.png';
import donut from '../assets/images/donnut.png';
import strawberryCake from '../assets/images/strawberry cake.png';
import tea from '../assets/images/tea.png';
import whiteCake from '../assets/images/white cake.png';

export default {
  "categories": [
    { "id": "c1", "name": "coffee", "icon": "Coffee" },
    { "id": "c2", "name": "cold_drinks", "icon": "GlassWater" },
    { "id": "c3", "name": "desserts", "icon": "Cookie" },
    { "id": "c4", "name": "special", "icon": "Star" }
  ],
  "products": [
    {
      "id": "p1",
      "name": "cappuccino_name",
      "description": "cappuccino_desc",
      "categoryId": "c1",
      "basePrice": 45.0,
      "image": coffeeImg,
      "customizations": {
        "size": [{ "name": "small", "extra": 0 }, { "name": "medium", "extra": 10.0 }, { "name": "large", "extra": 20.0 }],
        "sugar": ["none", "light", "medium", "extra"],
        "milk": ["whole", "skimmed", "oat"]
      }
    },
    {
      "id": "p2",
      "name": "iced_caramel_name",
      "description": "iced_caramel_desc",
      "categoryId": "c2",
      "basePrice": 65.0,
      "image": iceCoffee,
      "customizations": {
        "size": [{ "name": "medium", "extra": 0 }, { "name": "large", "extra": 15.0 }],
        "toppings": ["none", "whipped_cream", "extra_sauce"]
      }
    },
    {
      "id": "p3",
      "name": "borio_shake_name",
      "description": "borio_shake_desc",
      "categoryId": "c2",
      "basePrice": 75.0,
      "image": porio,
      "customizations": {
        "size": [{ "name": "medium", "extra": 0 }, { "name": "large", "extra": 20.0 }],
        "extras": ["borio_chunks", "melted_choc"]
      }
    },
    {
      "id": "p4",
      "name": "nutella_donut_name",
      "description": "nutella_donut_desc",
      "categoryId": "c3",
      "basePrice": 40.0,
      "image": donut,
      "customizations": {
        "flavor": ["nutella", "lotus", "sugar_cinnamon"]
      }
    },
    {
      "id": "p5",
      "name": "strawberry_cake_name",
      "description": "strawberry_cake_desc",
      "categoryId": "c3",
      "basePrice": 85.0,
      "image": strawberryCake,
      "customizations": {
        "serving": ["slice", "box"]
      }
    },
    {
      "id": "p6",
      "name": "moroccan_tea_name",
      "description": "moroccan_tea_desc",
      "categoryId": "c1",
      "basePrice": 35.0,
      "image": tea,
      "customizations": {
        "sugar": ["light", "medium", "extra"]
      }
    },
    {
      "id": "p7",
      "name": "vanilla_cheesecake_name",
      "description": "vanilla_cheesecake_desc",
      "categoryId": "c3",
      "basePrice": 90.0,
      "image": whiteCake,
      "customizations": {
        "sauce": ["berry", "caramel", "white_choc"]
      }
    }
  ],
  "orders": [
    {
        "id": "ORD-1024",
        "date": "29 Mar, 2026",
        "total": 110.0,
        "type": "delivery",
        "status": "delivered",
        "customer": { "name": "Ahmed Mohamed", "phone": "+201234567890" },
        "items": [
            { "name": "cappuccino_name", "price": 45.0, "qty": 1 },
            { "name": "iced_caramel_name", "price": 65.0, "qty": 1 }
        ]
    },
    {
        "id": "ORD-2051",
        "date": "29 Mar, 2026",
        "total": 115.0,
        "type": "takeaway",
        "status": "preparing",
        "customer": { "name": "Sara Ali", "phone": "+201098765432" },
        "items": [
            { "name": "borio_shake_name", "price": 75.0, "qty": 1 },
            { "name": "nutella_donut_name", "price": 40.0, "qty": 1 }
        ]
    },
    {
        "id": "ORD-3092",
        "date": "28 Mar, 2026",
        "total": 45.0,
        "type": "delivery",
        "status": "rejected",
        "customer": { "name": "Guest_4829", "phone": "+201555666777" },
        "items": [
            { "name": "cappuccino_name", "price": 45.0, "qty": 1 }
        ]
    }
  ],
  "users": [
    { "id": "u1", "name": "Ahmed Mohamed", "email": "ahmed@example.com", "phone": "+201234567890", "type": "account", "status": "active", "joined": "2026-03-01" },
    { "id": "u2", "name": "Sara Ali", "email": "sara@example.com", "phone": "+201098765432", "type": "account", "status": "active", "joined": "2026-03-10" },
    { "id": "g1", "name": "Guest_4829", "phone": "+201555666777", "type": "guest", "joined": "2026-03-29" },
    { "id": "u3", "name": "Hassan Fawzy", "email": "hassan@example.com", "phone": "+201222333444", "type": "account", "status": "disabled", "joined": "2026-02-15" }
  ],
  "stats": {
    "monthly_active_users": 1540,
    "revenue": 145800.0,
    "rejected_orders": 12,
    "canceled_orders": 8,
    "growth_rate": 15.4,
    "login_stats": [
        { "day": "01 Mar", "count": 120 },
        { "day": "05 Mar", "count": 145 },
        { "day": "10 Mar", "count": 160 },
        { "day": "15 Mar", "count": 190 },
        { "day": "20 Mar", "count": 175 },
        { "day": "25 Mar", "count": 210 },
        { "day": "29 Mar", "count": 230 }
    ]
  },
  "specialPackages": [],
  "promocodes": [{ "code": "COFFEE10", "discount": 0.1 }],
  "guests": {}
}