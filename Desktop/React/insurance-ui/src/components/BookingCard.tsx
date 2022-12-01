import React, { Component } from "react";
import { ArrowRotateClockwise20Filled } from "@fluentui/react-icons";

class BookingCard extends React.Component {
  render() {
    return (
      <div className="bookingCard">
        <div className="bookingCardLogo">
          <ArrowRotateClockwise20Filled />
        </div>
        <div className="bookingCardDetail">
            <p className="bookingCardDetailHeading">Booked Doctor Consultation</p>
            <p className="bookingCardDetailSubHeading">3rd August 2022</p>
        </div>
      </div>
    );
  }
}

export default BookingCard;
