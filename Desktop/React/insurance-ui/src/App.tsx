import React from "react";
import Header from "./components/Header";
import LeftSideBar from "./components/LeftSideBar";
import "./App.scss";
import RightSideBar from "./components/RightSideBar";
import Content from "./components/Content";

function App() {
  return (
    <div>
      <Header />
      <div className="box">
        <LeftSideBar />
        <Content />
        <RightSideBar />
      </div>
    </div>
  );
}

export default App;
