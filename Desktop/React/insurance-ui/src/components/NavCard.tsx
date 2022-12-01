import React, { Component } from "react";
import "./css/LeftSideBar.scss";
import { Glance20Filled } from "@fluentui/react-icons";

class NavCard extends React.Component<
  { icon: React.ReactNode; title: string },
  any
> {
  render() {
    return (
      <div className="navCard">
        {this.props.icon}
        <p className="navCardTitle">{this.props.title}</p>
      </div>
    );
  }
}

export default NavCard;
