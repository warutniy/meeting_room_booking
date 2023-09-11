import React, { useState, useEffect } from "react";
import '../../App.css';
import DateSelect from "./dateSelect/DateSelect";
import TimeSlot from "./timeSlot/TimeSlot";
import { getReservation, booking, updateBooking } from "../../api/booking";

function removeTime(date = new Date()) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
};

const dateNow = removeTime(new Date());

const PopupForm = (props) => {
    const { onClosePopup } = props;

    const [timeSlots, setTimeSlots] = useState([]);
    const [checkTime, setCheckTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dateNow);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const getReservations = async () => {
            const dateToNum = Date.parse(selectedDate);
            const response = await getReservation(dateToNum);
            if (response.data.reservations) {
                setCheckTime(response.data.reservations.bookingDateID);
                setSelectedTimeSlots(response.data.reservations.reservation);
            } else {
                setCheckTime(null);
                setSelectedTimeSlots([]);
            };
        };

        getReservations();
    }, [selectedDate, load]);

    useEffect(() => {
        const newTimeSlots = timeSlotsCheck(selectedTimeSlots);
        setTimeSlots(newTimeSlots);
    }, [selectedTimeSlots]);

    const timeSlotsCheck = (items) => {
        const schedule = [
            { id: 1, period: "09:00 - 10:00", available: true },
            { id: 2, period: "10:00 - 11:00", available: true },
            { id: 3, period: "11:00 - 12:00", available: true },
            { id: 4, period: "12:00 - 13:00", available: true },
            { id: 5, period: "13:00 - 14:00", available: true },
            { id: 6, period: "14:00 - 15:00", available: true },
            { id: 7, period: "15:00 - 16:00", available: true },
            { id: 8, period: "16:00 - 17:00", available: true },
            { id: 9, period: "17:00 - 18:00", available: true }
        ];
        for (let i = 0; i < schedule.length; i++) {
            for (let j = 0; j < items.length; j++) {
                if (schedule[i].id === items[j].id) {
                    schedule[i].available = false;
                };
            };
        };
        return schedule;
    };

    const handleChangeDate = (value) => {
        setSelectedDate(value);
    };

    const addSelectedTimeSlot = (id, period) => {
        setSelectedTimeSlots((prev) => {
            return [
                ...prev,
                {
                    id,
                    period,
                    available: false
                }
                
            ];
        });
    };

    const handleChangeLoad = () => {
        setLoad(!load);
    };

    const onSubmitTimeSlot = async () => {

        try {
            if (!checkTime) {
                const selectedTime = {
                    bookingDateID: Date.parse(selectedDate),
                    bookingDate: selectedDate.toDateString(),
                    reservation: selectedTimeSlots
                };
                await booking(selectedTime);
            } else {
                const dateToNum = Date.parse(selectedDate);
                const updatedTime = {
                    reservation: selectedTimeSlots
                };
                await updateBooking(dateToNum, updatedTime);
            };
            
        } catch (error) {
            console.log(error);
        };
    };

    const handleShowConfirm = () => {
    document.querySelector(".confirm").classList.add("active");
    };

    const handleCloseConfirm = () => {
    document.querySelector(".confirm").classList.remove("active");
    };

    return (
        <div className="popup">
            <header>
                <h2>Room Schedule</h2>
                <div className="close-btn" onClick={onClosePopup}>&times;</div>
            </header>
            <main className="form">
                <DateSelect selectedDate={selectedDate} onChangeDate={handleChangeDate} />
                <div>
                    <h3>Choose Time</h3>
                    <ul className="timeSlots">
                        {timeSlots.map((timeSlot) => (
                            <TimeSlot 
                                key={timeSlot.id} 
                                timeSlot={timeSlot} 
                                onShowConfirm={handleShowConfirm} 
                                onCloseConfirm={handleCloseConfirm} 
                                addSelectedTimeSlot={addSelectedTimeSlot}
                                onChangeLoad={handleChangeLoad}
                                onSubmitTimeSlot={onSubmitTimeSlot}
                            />
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default PopupForm;