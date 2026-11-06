require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require("mongoose");
const userRoutes = require('./routes/user.routes');
const tableRoutes = require('./routes/table.routes');
const reservationRoutes = require('./routes/reservation.routes'); 
const app = express();
const cors = require("cors");

// Enable CORS for all origins
app.use(cors());
// Parse JSON before handling API routes.
app.use(express.json({ limit: "5mb" }));

app.use('/api/users', userRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reservations', reservationRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/restaurantDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(3000, ()=> console.log('Server is running on port http://localhost:3000'));
