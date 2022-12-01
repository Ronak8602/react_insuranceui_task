import React, { Component } from "react";
import { Divider } from "@fluentui/react-components";
import "./css/RightSideBar.scss";
import Heading from "./Heading";
import car from "../assets/car.png";
import health1 from "../assets/health1.png";
import health2 from "../assets/health2.png";
import { PrimaryButton } from "@fluentui/react";

class RightSideBar extends React.Component {
  render() {
    return (
      <div className="rightSideBar">
        <Divider vertical></Divider>
        <div className="rightBars">
          <Heading heading="Your Cards"></Heading>
          <p className="subHeading">Add and manage cards here</p>
          <img src={car} alt="" className="insuranceCards" />
          <img src={health1} alt="" className="insuranceCards" />
          <img src={health2} alt="" className="insuranceCards" />
          <PrimaryButton className="addCardButton">Add Card +</PrimaryButton>
          <a href="" className="knowMore">
            Know More
          </a>
        </div>
      </div>
    );
  }
}

export default RightSideBar;
