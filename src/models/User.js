const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s]+@[^\s]+\.[^\s]+$/, "Email must be a valid email address"]
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (phone) {
        return /^(\+\d{1,3}\s?)?\d{8,15}$/.test(phone);
      },
    }
  }, 
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  image: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("User", userSchema);

// one-to-one relationship between User and Passport