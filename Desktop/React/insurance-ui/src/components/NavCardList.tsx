import React, { Component } from "react";
import NavCard from "./NavCard";
import {
  Board20Filled,
  Money20Filled,
  Payment20Filled,
  MoneyHand20Filled,
  Handshake20Filled,
  Phone20Filled,
} from "@fluentui/react-icons";

class NavCardList extends React.Component {
  render() {
    return (
      <>
        <NavCard
          icon={<Board20Filled className="setNavBarIconColor" />}
          title={"Dashboard"}
        />
        <NavCard
          icon={<Money20Filled className="setNavBarIconColor" />}
          title={"Payments"}
        />
        <NavCard
          icon={<Phone20Filled className="setNavBarIconColor" />}
          title={"My policy"}
        />
        <NavCard
          icon={<MoneyHand20Filled className="setNavBarIconColor" />}
          title={"My claim"}
        />
        <NavCard
          icon={<Payment20Filled className="setNavBarIconColor" />}
          title={"Manage cards"}
        />
        <NavCard
          icon={<Handshake20Filled className="setNavBarIconColor" />}
          title={"Settings"}
        />
        <NavCard
          icon={<Handshake20Filled className="setNavBarIconColor" />}
          title={"Support"}
        />
      </>
    );
  }
}

export default NavCardList;
