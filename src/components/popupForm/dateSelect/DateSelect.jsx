import React, { startTransition, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './dateSelect.module.css';

const DateSelect = (props) => {

    const { selectedDate, onChangeDate } = props;

    return (
        <div>
            <h3>Choose Date</h3>
            <DatePicker
                selected={selectedDate}
                onChange={onChangeDate}
                dateFormat='dd-MM-yyyy'
            />
        </div>
    );
};

export default DateSelect;