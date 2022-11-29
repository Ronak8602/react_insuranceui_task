import React, { useState } from "react";
import HOC from "../layout/HOC";
import { MdDashboardCustomize, MdOutlineLibraryBooks } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Trending from "./Trending/Trending";
import { AiFillFileAdd } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Baseurl from "../../Baseurl";
import axios from "axios";
import { toast } from "react-toastify";
const Dashboard = () => {
  const [popup, setPopup] = useState(false);
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const [Icon, setIcon] = useState();
  const token = localStorage.getItem("studyhox");
  const AddTrending = (e) => {
    const auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    e.preventDefault();
    const url = Baseurl() + "trending/addtrending";

    const fd = new FormData();
    fd.append("title", title);
    fd.append("trendingimage", Icon);
    fd.append("message", message);

    axios
      .post(url, fd, auth)
      .then((res) => {
        console.log(res);
        toast("Trending Added Sucessfully");
      })
      .catch((err) => {
        console.log(err);
        // toast("Some Error Occured");
      });
  };
  const card = [
    {
      progress: "bg-blue-400",
      title: "All Users",
      number: "10",
      icon: <FaUserFriends className="text-2xl text-white" />,
    },
    {
      progress: "bg-green-400",
      title: "All Courses",
      number: "100",
      icon: <MdOutlineLibraryBooks className="text-2xl text-white" />,
    },
    {
      progress: "bg-green-400",
      title: "All Trending",
      number: "100",
      icon: (
        <AiFillFileAdd
          className="text-2xl text-white"
          onClick={() => {
            setPopup(true);
          }}
        />
      ),
    },
    // {
    //   progress: "bg-yellow-400",
    //   title: "Steve Rojers",
    //   number: "150",
    //   icon: <MdDashboardCustomize className="text-2xl text-white" />,
    // },
  ];
  return (
    <>
      <section
        style={{ background: "rgba(0,0,0,0.4)" }}
        className={
          popup
            ? "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen "
            : "hidden"
        }
      >
        <div
          style={{ maxHeight: "100vh", zIndex: "1000" }}
          className="bg-white p-3 px-5 lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg"
        >
          <div className="flex justify-between">
            <span className=" font-semibold text-indigo-500 ">
              Add Trending
            </span>
            <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose
                onClick={() => {
                  setPopup(false);
                  // setCourseName("");
                }}
              />{" "}
            </div>
          </div>
          {/* form */}

          <form
            className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4"
            onSubmit={(e) => {
              AddTrending(e);
            }}
          >
            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                URL
              </label>
              <input
                id="name"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              />
            </div>
            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                Message
              </label>
              <textarea
                id="name"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              ></textarea>
            </div>
            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                Icon
              </label>
              <input
                id="name"
                onChange={(e) => setIcon(e.target.files[0])}
                required
                type="file"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 cursor-pointer w-40 hover:bg-indigo-600 py-1 rounded-full"
            >
              Add
            </button>
          </form>
        </div>
      </section>
      <section className="grid md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-4">
        {/* Card */}
        {card.map((card) => {
          return (
            <div className="px-5 py-8 bg-[rgb(30,41,59)] space-y-2 shadow-xl flex flex-col  rounded-md">
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span className="tracking-widest text-gray-200">
                    {card.title}
                  </span>
                  <span className="tracking-wider text-gray-400 text-xl md:text-2xl font-semibold">
                    {card.number}
                  </span>
                </div>
                {/* Icons */}
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 justify-center items-center">
                  {card.icon}
                </div>
              </div>
              {/* <div className="bg-gray-700 relative rounded-full">
                <div className="bg-blue-600 py-[3px] w-2/5 rounded-full"></div>
              </div> */}
            </div>
          );
        })}
      </section>
      <br></br>
      <section>
        <Trending />
      </section>
    </>
  );
};

export default HOC(Dashboard);
