import React from "react";
import { GrFormClose } from "react-icons/gr";

const View = ({ view, viewData, setView }) => {
  const data = viewData;
  return (
    <>
      <section
        className={
          view
            ? "absolute top-0 left-0 right-0 bg-[rgb(0,0,0,0.5)] overflow-y-auto h-screen w-full flex justify-center items-center"
            : "hidden"
        }
      >
        <div className="bg-slate-800 w-full sm:mx-0 sm:w-3/4 md:w-3/5 mx-5 p-4  relative rounded-md">
          {/* Close Btn */}
          <span
            className="tracking-wider p-1 absolute -top-3 left-[48%] hover:scale-90  inline-flex  justify-center items-center rounded-full hover:bg-blue-600 cursor-pointer bg-blue-500"
            onClick={() => setView(false)}
          >
            <GrFormClose className="cursor-pointer text-2xl" />
          </span>
          <img
            src={data?.studentid?.studentpicture}
            alt={data?.name}
            className="w-40 my-4"
          />
          <section className="tracking-wider">
            <span className="sm:text-base text-sm">Hello</span>
            <div className="tracking-widest sm:text-lg  ">
              I'm{" "}
              <span className="font-medium capitalize text-blue-400">
                {data?.name} &nbsp;
                {data?.studentid?.othernames}
              </span>
            </div>
            <p className="sm:text-sm text-xs text-gray-200 tracking-widest">
              {data?.about}
            </p>
          </section>
        </div>
      </section>
    </>
  );
};

export default View;
