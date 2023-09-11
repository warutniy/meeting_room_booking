import React from 'react';
import styles from './popupButton.module.css';

const PopupButton = (props) => {

    const { onShowPopup } = props;

    return (
        <div className={styles.center}>
            <button id="show-popup" onClick={onShowPopup}>Booking Now</button>
        </div>
    );
};

export default PopupButton;