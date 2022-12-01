import React, { Component } from "react";
import "../App.scss";

class Heading extends React.Component<{ heading: string }, any> {
  render() {
    return <p className="headingCard">{this.props.heading}</p>;
  }
}

export default Heading;
