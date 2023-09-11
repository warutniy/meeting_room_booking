import React from 'react';
import styles from './timeSlot.module.css';

const TimeSlot = (props) => {

    const { timeSlot, onShowConfirm, onCloseConfirm, addSelectedTimeSlot, onChangeLoad, onSubmitTimeSlot } = props;

    const handleSelectedTimeSlot = () => {
      addSelectedTimeSlot(timeSlot.id, timeSlot.period);
      onShowConfirm();
    };

    const handleSubmitTimeSlot = () => {
      onSubmitTimeSlot();
      onCloseConfirm();
    };

    const handleResetTimeSlot = () => {
      onChangeLoad();
      onCloseConfirm();
    };

    return (
      <>
        <li className={styles.timeSlot}>
          <span className={styles.text}>{timeSlot.period}</span>
          { timeSlot.available === true ? <button className="booking-button" onClick={handleSelectedTimeSlot} >Booking</button> : <span>Reservation</span>}
        </li>
        <div className="confirm">
          <header>
            <h2>Confirmation!</h2>
            <h5>Are you sure you want to confirm this reservation?</h5>
            <div>
              <button className='confirm_Y' onClick={handleSubmitTimeSlot}>Yes</button>
              <button className='confirm_N' onClick={handleResetTimeSlot}>No</button>
            </div>
          </header>
        </div>
      </>
    );
};

export default TimeSlot;