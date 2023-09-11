const express = require('express');
const ServiceController = require('../controller/service-controller');

const router = express.Router();

router.get('/:selectedDate', ServiceController.getReservation);
router.post('/booking', ServiceController.booking);
router.patch('/:selectedDate' , ServiceController.updateBooking);

module.exports = router;