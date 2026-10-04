// models/RevokedToken.js
const mongoose = require('mongoose');

const revokedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

// TTL index: MongoDB will auto-delete documents when expiresAt is reached
revokedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('RevokedToken', revokedTokenSchema);