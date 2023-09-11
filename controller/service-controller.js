const BookingModel = require('../model/booking-model');

class ServiceController {

    getReservation = async (req, res) => {

        try {
            const { selectedDate } = req.params;
            // console.log(selectedDate);

            const reservations = await BookingModel.findOne({ bookingDateID: selectedDate });

            return res.status(200).json({ reservations: reservations });

        } catch (error) {
            console.log(error);
            return res.status(400).send('internal error');
        };
    };

    booking = async (req, res) => {

        try {
            const {
                bookingDateID,
                bookingDate,
                reservation
            } = req.body;
            
            const newBooking = new BookingModel({
                bookingDateID,
                bookingDate,
                reservation
              });
            await newBooking.save();

            res.status(200).json({
                bookingId: newBooking._id,
                booking: newBooking,
                message: 'Booking Success!',
                error: false
            });

        } catch (error) {
            console.log(error);
            return res.status(400).send('internal error');
        };
    };

    updateBooking = async (req, res) => {
        try {
            const { selectedDate } = req.params;
            console.log(selectedDate);

            const { reservation } = req.body;

            const updatedBooking = await BookingModel.findOneAndUpdate(
                { bookingDateID: selectedDate },
                { reservation },
                { new: true }
            );
            console.log(updatedBooking);

            res.status(200).json({
                bookingId: updatedBooking._id,
                booking: updatedBooking,
                message: 'Update Booking Success!',
                error: false
            });

        } catch (error) {
            console.log(error);
            return res.status(400).send('internal error');
        };
    };

};

module.exports = new ServiceController();