import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { useParams } from "react-router-dom";

import Baseurl from "../../../Baseurl";
import auth from "../../../Auth";

const SingleSem = () => {
  const [sem, setSem] = useState([]);
  const [popup, setPopup] = useState(false);
  const { id } = useParams();

  const getSemester = async () => {
    const url = Baseurl() + `semester/getsemesterbycourseid/${id}`;
    try {
      const res = await axios.get(url, auth);
      console.log("res", res.data.data);
      setSem(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getSemester();
  }, []);

  return (
    <>
      <div className="pb-4 sticky w-full flex justify-between items-center  top-0 bg-slate-900"></div>

      {/* SingleSem Data */}
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
              <th className="px-4 py-3  tracking-widest font-medium md:text-base text-sm rounded-tl-lg ">
                Semester Name
              </th>
            </tr>
          </thead>
          <tbody>
            {sem.map((data) => {
              return (
                <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                  <td className="px-2 py-3 md:text-base text-sm ">
                    {data.semestername}
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

export default HOC(SingleSem);
