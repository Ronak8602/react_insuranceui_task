import React, { Component } from "react";
import { ArrowRight16Regular } from "@fluentui/react-icons";
import { Slider } from "@fluentui/react-components";

class ClaimCard extends React.Component {
  render() {
    return (
      <div className="claimCard">
        <div className="claimHeader">
          <p className="claimHeading">Health Insurance Claim</p>
          <ArrowRight16Regular className="arrow" />
        </div>
        <p className="claimAccount">43782674567</p>
        <p className="claimMoney">$ 2347.08</p>
        {/* <Slider defaultValue={40} size="medium" className="claimProgress" /> */}
        <div className="progress-track">
          <ul id="progressbar">
            <li className="step0 active " id="step1">
              Initiated
            </li>
            <li className="step0 active text-center" id="step2">
              Verified
            </li>
            <li className="step0 active text-right" id="step3">
              <span id="three">Processing</span>
            </li>
            <li className="step0 text-right" id="step4">
              Settled
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ClaimCard;
