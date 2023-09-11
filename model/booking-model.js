const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookingDateID: {
        type: Number,
        required: true,
        unique: true
    },
    bookingDate: {
        type: String,
        required: true,
        unique: true
    },
    reservation: {
        type: Array,
        required: true,
    }
});

// Crate Model
const BookingModel = mongoose.model("Booking", BookingSchema);

// Export Model for another file use
module.exports = BookingModel;