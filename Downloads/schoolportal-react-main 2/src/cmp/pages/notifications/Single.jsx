import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { useParams } from "react-router-dom";

import Baseurl from "../../../Baseurl";
import auth from "../../../Auth";

const Single = () => {
  const [notification, setNotification] = useState([]);
  const [popup, setPopup] = useState(false);
  const { id } = useParams();

  const getNotification = async () => {
    const url = Baseurl() + `groupnotification/getsinglenotification/${id}`;
    try {
      const res = await axios.get(url, auth);
      console.log("res", res);
      setNotification([res.data.data]);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <>
      <div className="pb-4 sticky w-full flex justify-between items-center  top-0 bg-slate-900"></div>
      {/* Add Single Form*/}
      <section
        style={{ background: "rgba(0,0,0,0.4)" }}
        className={
          popup
            ? "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen "
            : "hidden"
        }
      ></section>
      {/* Single Data */}
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
              <th className="px-4 py-3  tracking-widest font-medium md:text-base text-sm rounded-tl-lg ">
                Title
              </th>
              <th className="px-4 py-3  tracking-widest font-medium md:text-base text-sm rounded-tl-lg ">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {notification.map((data) => {
              return (
                <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                  <td className="px-2 py-3 md:text-base text-sm ">
                    {data.title.substring(0, 15)}
                  </td>
                  <td className="px-2 py-3 md:text-base text-sm ">
                    {data.message}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HOC(Single);
