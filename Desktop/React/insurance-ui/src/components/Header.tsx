import React, { Component } from "react";
import { Alert20Filled, Settings20Filled } from "@fluentui/react-icons";
import { Divider } from "@fluentui/react-components";
import Profile from "./Profile";
import "../App.scss";
import logo from "../assets/logo.png";

class Header extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="row-space-between">
          <div className="row">
            <img src={logo} alt="" className="logo" />
            <p className="heading">TITLE</p>
          </div>
          <div className="row">
            <Alert20Filled className="setIconColor"></Alert20Filled>
            <Settings20Filled className="setIconColor"></Settings20Filled>
            <Profile></Profile>
          </div>
        </div>
        <Divider></Divider>
      </div>
    );
  }
}

export default Header;
