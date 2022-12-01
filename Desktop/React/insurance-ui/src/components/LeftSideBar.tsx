import React, { Component } from "react";
import { Divider } from "@fluentui/react-components";
import "./css/LeftSideBar.scss";
import NavCardList from "./NavCardList";
import Heading from "./Heading";
import menu from "../assets/menu.png";
import { PrimaryButton } from "@fluentui/react";

class LeftSideBar extends React.Component {
  render() {
    return (
      <div className="leftSideBar">
        <div className="leftBars">
          <div>
            <NavCardList></NavCardList>
          </div>

          <div>
            <Heading heading="Top Up"></Heading>
            <p className="subHeading">Add money to your wallet</p>

            <div className="topUpCard">
              <img src={menu} alt="menu" className="menu" />
              <div>
                <p className="currentBalance">Current Balance</p>
                <p className="balance">$ 1098.78</p>
                <PrimaryButton className="addMoneyButton">
                  Add Money +
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
        <Divider vertical></Divider>
      </div>
    );
  }
}

export default LeftSideBar;
