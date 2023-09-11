import axios from "axios";

const SERVER = import.meta.env.VITE_BACKEND_URL;

export const getReservation = async (selectedDate) => await axios.get(`${SERVER}/service/${selectedDate}`);
export const booking = async (body) => await axios.post(`${SERVER}/service/booking`, body);
export const updateBooking = async (selectedDate, body) => await axios.patch(`${SERVER}/service/${selectedDate}`, body);