import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Baseurl from "../../../Baseurl";
import { CgProfile } from "react-icons/cg";
import { FaRegEye, FaTrash, FaEdit } from "react-icons/fa";
import View from "./View";

const Resumes = () => {
  const [Jobs, setJobs] = useState([]);
  const [view, setView] = useState(false);
  const [viewData, setViewdata] = useState("");
  const token = localStorage.getItem("studyhox");
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(Jobs);
  // Get Jobs
  const getResumes = () => {
    let URL = `${Baseurl()}resume/getallskills`;
    axios
      .get(URL, auth)
      .then((res) => setJobs(res.data.allresumes))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getResumes();
  }, []);

  // Delete Resume
  const deleteResume = (id) => {
    let URL = `${Baseurl()}resume/deleteresume/${id}`;
    axios
      .delete(URL, auth)
      .then((res) => {
        console.log(res);
        getResumes();
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="pb-4 sticky w-full  top-0 bg-slate-900">
        <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
          All Resumes
        </span>
      </div>
      {/* Jobs Data */}
      {Jobs.length === 0 ? (
        <div
          style={{ background: "rgb(30,39,66)" }}
          className="rounded-b-lg py-2 text-center  tracking-wider overflow-y-auto"
        >
          There are no
          <span className="text-blue-400 uppercase tracking-wider font-semibold">
            {" "}
            Resumes
          </span>
        </div>
      ) : (
        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
                <th className="px-4 py-3  tracking-widest font-medium text-2xl rounded-tl-lg ">
                  <CgProfile />
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Name
                </th>

                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Email
                </th>

                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Phone
                </th>

                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Qualificaton
                </th>

                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Role
                </th>

                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Jobs?.map((data) => {
                return (
                  <tr className="tracking-wider h-full bg-[rgb(30,39,66)] ">
                    <td className="px-2 py-3 w-24 md:w-32">
                      <img
                        // src={
                        //   data.studentid.studentpicture
                        //     ? data.studentid.studentpicture
                        //     : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCyOhbogPKefkCLuaejt8IPmVxdzpd7ToK-g&usqp=CAU"
                        // }
                        alt=""
                        className="w-10 md:w-14 h-10 md:h-14 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {data.name} {data.Jobsurname}
                    </td>
                    <td className="px-4 py-3">{data.email}</td>
                    <td className="px-4 py-3">{data.phonenumber}</td>
                    <td className="px-4 py-3">{data.graduate}</td>
                    <td className="px-4 py-3">{data.about}</td>
                    <td className="px-4 py-3 flex items-center justify-center h-full space-x-3 md:space-x-5">
                      <FaRegEye
                        onClick={() => {
                          setView(true);
                          setViewdata(data);
                        }}
                        className="text-yellow-500 text-lg md:text-xl cursor-pointer"
                      />
                      <FaTrash
                        onClick={() => {
                          deleteResume(data._id);
                        }}
                        className="text-red-600 text-lg md:text-xl cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <View view={view} setView={setView} viewData={viewData} />
    </>
  );
};

export default HOC(Resumes);
