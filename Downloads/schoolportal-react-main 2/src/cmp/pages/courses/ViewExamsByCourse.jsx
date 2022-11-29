import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { useParams } from "react-router-dom";

import Baseurl from "../../../Baseurl";
import auth from "../../../Auth";
import { Oval } from "react-loader-spinner";

const ViewExamsByCourse = () => {
  const [exams, setExams] = useState([]);
  const [popup, setPopup] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const getExams = async () => {
    const url = Baseurl() + `exam/getexambycourse/${id}`;
    try {
      const res = await axios.get(url, auth);
      setExams(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    <>
      <div className="pb-4 sticky w-full flex justify-between items-center  top-0 bg-slate-900"></div>
      {/* Add ViewExamsByCourse Form*/}
      <section
        style={{ background: "rgba(0,0,0,0.4)" }}
        className={
          popup
            ? "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen "
            : "hidden"
        }
      ></section>
      {/* ViewExamsByCourse Data */}
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
        <thead>
              <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Course Name
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Subject Code
                </th>
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Subject Name
                </th>{" "}
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Date
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Time
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Status
                </th>
              </tr>
            </thead>
          <tbody>
            {loading ? (
              <Oval color="white" />
            ) : (
              exams?.map((exam) => {
                return (
                  <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                    <td className="px-4 py-3">
                      {exam.studentclass.coursename}
                    </td>
                    <td className="px-4 py-3">{exam.subjectcode}</td>
                    <td className="px-4 py-3">
                      {" "}
                      {exam.subjectname.subjectname}
                    </td>
                    <td className="px-4 py-3"> {exam.date}</td>
                    <td className="px-4 py-3"> {exam.time}</td>
                    <td className="px-4 py-3"> {exam.status}</td>
                    {/* <td className="px-4 py-3 flex items-center justify-center gap-2">
                      {" "}
                      <button
                        className="w-full bg-blue-700  py-1 rounded-md text-white "
                        onClick={() => {
                          setPopTwo(!popTwo);
                          handleStatusClick(exam);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full bg-blue-700  py-1 rounded-md text-white "
                        onClick={() => {
                          deleteExam(exam._id);
                        }}
                      >
                        Delete
                      </button>
                    </td> */}
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

export default HOC(ViewExamsByCourse);
