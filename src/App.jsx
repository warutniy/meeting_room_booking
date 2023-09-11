import React from "react";
import "./App.css";
import PopupForm from "./components/popupForm/PopupForm";
import MeetingRoom from "./components/meetingRoom/MeetingRoom";
import PopupButton from "./components/popupButton/PopupButton";

function App() {

  const handleShowPopup = () => {
    document.querySelector(".popup").classList.add("active");
  };

  const handleClosePopup = () => {
    document.querySelector(".popup").classList.remove("active");
  };
  
  return (
    <>
      <MeetingRoom />
      <PopupButton onShowPopup={handleShowPopup} />
      <PopupForm onClosePopup={handleClosePopup} />
    </>
  );
}

export default App;