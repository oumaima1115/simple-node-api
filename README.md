# Restaurant Reservation API

A RESTful API for managing restaurant table reservations. Users can create reservations for tables, add guests to reservations, and create one invoice for each reservation.

## Features

- User and admin roles
- Table management
- Restaurant reservation management
- Guest management for each reservation
- One invoice per reservation
- Reservation status management: pending, confirmed, cancelled
- MongoDB database integration using Mongoose

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Nodemon

## Database Relationships

```text
User (1) ─────────── (M) Reservation
Table (1) ────────── (M) Reservation
User (M) ─────────── (M) Table through Reservation

Reservation (1) ──── (M) Guest
Reservation (1) ──── (1) Invoice
```

### Relationship explanation

- One user can create many reservations.
- One table can appear in many reservations on different dates.
- A user and a table have a many-to-many relationship through `Reservation`.
- One reservation can have many guests.
- One reservation has only one invoice.
- The `Invoice.reservation` field is unique to enforce the one-to-one relationship.

## Project Structure

```text
restaurant-reservation-api/
│
├── controllers/
│   └── reservationController.js
│
├── models/
│   ├── User.js
│   ├── Table.js
│   ├── Reservation.js
│   ├── Guest.js
│   └── Invoice.js
│
├── routes/
│   └── reservationRoutes.js
│
├── config/
│   └── db.js
│
├── .env
├── .gitignore
├── server.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
```

2. Open the project folder:

```bash
cd restaurant-reservation-api
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/restaurant_reservation
```

5. Start the server:

```bash
npm run dev
```

Or start it normally:

```bash
npm start
```

The server runs at:

```text
http://localhost:5000
```

## Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## Models

### User

```text
user_id
name
email
password
role: USER or ADMIN
```

### Table

```text
table_id
tableNumber
capacity
location
```

### Reservation

```text
reservation_id
user
table
reservationDate
status: pending, confirmed, cancelled
```

### Guest

```text
guest_id
name
reservation
```

### Invoice

```text
invoice_id
reservation
amount
status: unpaid, paid
createdAt
```

## API Endpoints

### Reservations

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reservations` | Create a reservation |
| GET | `/api/reservations` | Get all reservations |
| GET | `/api/reservations/:id` | Get one reservation |
| PUT | `/api/reservations/:id` | Update a reservation |
| DELETE | `/api/reservations/:id` | Delete a reservation |

### Guests

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reservations/:reservationId/guests` | Add a guest to a reservation |
| GET | `/api/reservations/:reservationId/guests` | Get all guests for one reservation |
| GET | `/api/reservations/:reservationId/guests/:guestId` | Get one guest |
| PUT | `/api/reservations/:reservationId/guests/:guestId` | Update one guest |
| DELETE | `/api/reservations/:reservationId/guests/:guestId` | Delete one guest |

### Invoice

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reservations/:reservationId/invoice` | Create an invoice for a reservation |
| GET | `/api/reservations/:reservationId/invoice` | Get the invoice for a reservation |
| PUT | `/api/reservations/:reservationId/invoice` | Update the invoice |
| DELETE | `/api/reservations/:reservationId/invoice` | Delete the invoice |

## Request Examples

### Create a reservation

**POST** `/api/reservations`

```json
{
  "user": "USER_ID",
  "table": "TABLE_ID",
  "reservationDate": "2026-10-10T19:00:00.000Z",
  "status": "pending"
}
```

### Add a guest

**POST** `/api/reservations/RESERVATION_ID/guests`

```json
{
  "name": "Oumaima Ayachi"
}
```

### Create an invoice

**POST** `/api/reservations/RESERVATION_ID/invoice`

```json
{
  "amount": 120,
  "status": "unpaid"
}
```

## Status Codes

| Status code | Meaning |
|---|---|
| `200` | Request completed successfully |
| `201` | Resource created successfully |
| `400` | Invalid request data |
| `404` | Resource not found |
| `500` | Internal server error |

## Future Improvements

- Add JWT authentication and authorization
- Restrict table and invoice management to admins
- Check table availability before creating a reservation
- Prevent duplicate reservations for the same table, date, and time
- Add validation for dates and guest capacity
- Add online payment support
- Add Swagger or Postman API documentation
- Add automated tests

## Author

Oumaima Ayachi
