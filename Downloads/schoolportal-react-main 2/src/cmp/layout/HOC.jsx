import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const HOC = (Wcomponenet) => {
  return function Component() {
    const [hamb, setHamb] = useState(false);
    console.log(hamb);
    return (
      <>
        <section className="flex overflow-x-hidden">
          {/* Sidebar */}
          <div
            className={
              hamb
                ? " absolute top-0 z-30 md:w-auto shadow-md bg-slate-800  w-60 transition-all md:-left-full left duration-150  h-screen  left-0 "
                : " md:w-72 z-30 bg-slate-800  shadow-md  md:static absolute top-0 -left-full  h-screen transition-all duration-150 overflow-y-auto "
            }
          >
            <Sidebar hamb={hamb} setHamb={setHamb} />
          </div>
          {/* Components & Navbar */}
          <div
            className={
              hamb
                ? " transition-all px-4 py-2  bg-slate-900 duration-150 w-full h-screen"
                : " w-full h-screen  px-4 py-2  bg-slate-900 z-50 transition-all duration-150 "
            }
          >
            <Navbar hamb={hamb} setHamb={setHamb} />
            <div className="my-6 text-white  wcomp overflow-y-auto h-[590px]">
              <Wcomponenet />
            </div>
          </div>
        </section>
      </>
    );
  };
};

export default HOC;
