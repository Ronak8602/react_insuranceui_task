import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { useParams } from "react-router-dom";

import Baseurl from "../../../Baseurl";
import auth from "../../../Auth";
import { FaTrash } from "react-icons/fa";

const SingleSubject = () => {
  const [subject, setSubject] = useState([]);
  const [popup, setPopup] = useState(false);
  const { id } = useParams();

  const getSubject = async () => {
    const url = Baseurl() + `subject/getsubjectbysemester/${id}`;
    try {
      const res = await axios.get(url, auth);
      console.log("res", res.data.data);
      setSubject(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const deleteHandler = async (id) => {
    const url = Baseurl() + `subject/deleteSubject/${id}`;
    try {
      const res = await axios.delete(url, auth);
      console.log("res", res.data.data);
      getSubject();
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getSubject();
  }, []);

  return (
    <>
      <div className="pb-4 sticky w-full flex justify-between items-center  top-0 bg-slate-900"></div>

      {/* SingleSubject Data */}
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
              <th className="px-4 py-3  tracking-widest font-medium md:text-base text-sm rounded-tl-lg ">
                Subject Name
              </th>
              <th className="px-4 py-3  tracking-widest font-medium md:text-base text-sm rounded-tl-lg ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subject.map((data) => {
              return (
                <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                  <td className="px-2 py-3 md:text-base text-sm ">
                    {data.subjectname}
                  </td>
                  <td className="px-2 py-3 md:text-base text-sm ">
                  <FaTrash
                  onClick={()=>deleteHandler(data._id)}
                    className="text-red-600 text-lg md:text-xl cursor-pointer"
                  />
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

export default HOC(SingleSubject);
