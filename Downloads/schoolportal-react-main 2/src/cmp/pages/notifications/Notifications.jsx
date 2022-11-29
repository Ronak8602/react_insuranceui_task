import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Baseurl from "../../../Baseurl";
import { CgProfile } from "react-icons/cg";
import auth from "../../../Auth";
import { IoMdClose } from "react-icons/io";
import { GrNotification } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaRegEye } from "react-icons/fa";
import { Oval } from "react-loader-spinner";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [popup, setPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getNotifications = async () => {
    const url = Baseurl() + "groupnotification/getallnotification";
    try {
      const res = await axios.get(url, auth);
      console.log("res", res.data.data);

      setNotifications(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  const deleteNotifications = async (id) => {
    const url = Baseurl() + `groupnotification/deletenotification/${id}`;
    try {
      const res = await axios.delete(url, auth);
      console.log("res", res);
      alert("Deleted Successfully");
      getNotifications();
    } catch (err) {
      console.log("err", err);
      alert("Please try again");
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      <div className="pb-4 sticky w-full  top-0 bg-slate-900">
        <div className="flex justify-between items-center">
          <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
            All Notifications
          </span>
          {/* <button
            onClick={() => setPopup(!popup)}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-blue-400 text-white tracking-wider"
          >
            Add Notification
          </button> */}
        </div>
        <section
          style={{ background: "rgba(0,0,0,0.4)" }}
          className={
            popup
              ? "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen "
              : "hidden"
          }
        >
          <div
            style={{ maxHeight: "90vh" }}
            className="bg-white p-3 px-5 lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg"
          >
            <div className="flex justify-between">
              <span className=" font-semibold text-indigo-500 ">
                Send Notification
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
              // onSubmit={sendNotification}
            >
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Title
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

              <button
                type="submit"
                className="bg-indigo-500 cursor-pointer w-40 hover:bg-indigo-600 py-1 rounded-full"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      </div>
      {/* Notifications Data */}
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Title
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Message
              </th>{" "}
              <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Oval color="white" />
            ) : (
              notifications?.map((data) => {
                return (
                  <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                    <td className="px-4 py-3">
                      {data.title.substring(0, 10)}...
                    </td>
                    <td className="px-4 py-3">
                      {data.message.substring(0, 15)}...
                    </td>

                    <td className="px-4 py-3 flex items-center space-x-3 md:space-x-5">
                      <FaRegEye
                        onClick={() => {
                          navigate(`/single/${data._id}`);
                        }}
                        className="text-green-500 sm:text-lg md:text-xl cursor-pointer"
                      />
                      <FaTrash
                        onClick={() => deleteNotifications(data._id)}
                        className="text-red-600 text-lg md:text-xl cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HOC(Notifications);
