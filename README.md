# Event-Driven Architecture Example: Online Shop Microservices
A simple event-driven architecture (EDA) example: online shop microservices in Node.js, Express.js, and TypeScript.  
Demonstrates asynchronous event-based communication between loosely coupled services.

## Features
- **Event-driven** - communication between microservices
- Written in **TypeScript**
- Powered by **Express.js**
- Independent services communicate via an in-memory event bus
- Easy to understand and extend - ideal for learning and demos

## Project Structure
```
root/
├── src/
│   ├── core/
│   │   ├── event-bus/
│   │   │   └── index.ts
│   │   ├── helper/
│   │   │   └── index.ts
│   │   └── logger/
│   │       └── index.ts
│   ├── models/
│   │   ├── index.ts
│   │   └── order.model.ts
│   ├── routes/
│   │   ├── index.ts
│   │   └── order.route.ts
│   ├── services/
│   │   ├── index.ts
│   │   ├── inventory.service.ts
│   │   ├── notification.service.ts
│   │   ├── order.service.ts
│   │   └── payment.service.ts
│   └── index.ts
└── package.json

```

## How It Works
This repository demonstrates a basic e-commerce workflow using event-driven architecture:

1. **OrderRouter** - Handles API requests to create new orders and emits the `OrderPlaced` event.
2. **InventoryService** - Listens for the `OrderPlaced` event, checks the product stock:
    - If all products are available, reserves them and emits `StockReserved`.
    - If any product is out of stock, emits `StockFailed`.
3. **PaymentService** - Listens for the `StockReserved` event, simulates payment processing, and emits `PaymentProcessed` upon success.
4. **NotificationService** - Listens for the `StockFailed` event and notifies the user that products are out of stock.
5. **OrderStatusService** - Listens for the `PaymentProcessed` event, updates the order status to "Paid", and emits `OrderStatusUpdated`.

All communication between services is **asynchronous** and based on events.

## Getting Started

### Prerequisites
- Node.js 22+

### Install Dependencies
```bash
  npm install
```

### Run the Application
```bash
  npm start
```
Application will be available at [http://localhost:3000](http://localhost:3000).

### Place an Order
```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{"items": [{ "name": "apple", "quantity": 1 }]'
```

You will see logs from each service as the event is processed and handled.
## Available Scripts
- `npm start` – run the app
- `npm run watch` – run in watch mode (auto-restart)
- `npm run lint` – lint with ESLint
- `npm run prettier` – format code with Prettier

## Technologies Used
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## License
MIT

---

Author: [Karol Dydo](https://github.com/karoldydo)
> This repository is intended for learning, demonstration, and inspiration.
