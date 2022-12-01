import React, { Component } from "react";
import "./css/Content.scss";
import banner from "../assets/banner.png";
import labs from "../assets/labs.png";
import doctors from "../assets/doctors.png";
import therapy from "../assets/therapy.png";
import "./css/Content.scss";
import { Divider } from "@fluentui/react-components";
import Heading from "./Heading";
import BookingCard from "./BookingCard";
import ClaimCard from "./ClaimCard";

class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <img src={banner} alt="banner" className="banner" />
        <Divider />
        <div className="contentBottom">
          <div className="left">
            <div>
              <div className="top">
                <Heading heading="Current Claims"></Heading>
                <p className="subHeading">Track your claim status</p>
                <div className="claimCards">
                  <ClaimCard></ClaimCard>
                  <ClaimCard></ClaimCard>
                </div>
                <Divider className="bottomDivider"></Divider>
              </div>

              <div className="bottom">
                <Heading heading="Consultations"></Heading>
                <p className="subHeading">
                  Connect with the best for your health guidance
                </p>
                <div className="consultationCategories">
                  <img src={labs} alt="labs" className="categoryImage"/>
                  <img src={doctors} alt="doctors" className="categoryImage"/>
                  <img src={therapy} alt="therapy" className="categoryImage"/>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Divider vertical></Divider>
            <div className="bookingCards">
              <Heading heading="Activity Feed"></Heading>
              <BookingCard></BookingCard>
              <BookingCard></BookingCard>
              <BookingCard></BookingCard>
              <BookingCard></BookingCard>
              <BookingCard></BookingCard>
              <BookingCard></BookingCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
