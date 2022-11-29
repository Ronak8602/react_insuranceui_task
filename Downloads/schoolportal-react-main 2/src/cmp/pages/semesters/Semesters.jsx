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

const Semesters = () => {
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentCourse, setStudentCourse] = useState();
  const [Allsemester, setAllsemester] = useState();

  const semesterDelete = async (id) =>{
    const url = Baseurl() + `semester/deletesemester/${id}`;
    try {
      const res = await axios.delete(url, auth);
      getSemesters();
      // setSemesters(res.data.data);
      console.log("get sem by id data ", res.data);
    } catch (err) {
      console.log("err", err);
    }
  }
  const fetchCourses = async () => {
    const url = Baseurl() + "course/getallcourses";
    try {
      const res = await axios.get(url, auth);
      setCourses(res.data.allcourses);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleCourseDropdownChange = (e) => {
    getSemestersbyId(e.target.value);
  };

  const getSemestersbyId = async (id) => {
    const url = Baseurl() + `semester/getsemesterbycourseid/${id}`;
    try {
      const res = await axios.get(url, auth);

      setSemesters(res.data.data);
      console.log("get sem by id data", res.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const getSemesters = async () => {
    const url = Baseurl() + "semester/getallsemester";
    try {
      axios
        .get(url, auth)
        .then((res) => {
          setSemesters(res.data.allSemester);

          setLoading(false);
        })
        .catch((res) => {
          setLoading(false);
        });
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getSemesters();
    fetchCourses();

    // filteData();
  }, []);

  return (
    <>
      <div className="pb-4 sticky w-full  top-0 bg-slate-900">
        <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
          Semesters
        </span>
        <select
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm  text-black tracking-wider mt-1 "
          style={{ marginLeft: "1rem", outline: "none" }}
          value={studentCourse}
          onChange={handleCourseDropdownChange}
        >
          <option>--Select--</option>
          {courses.map((course) => {
            return <option value={course._id}>{course.coursename}</option>;
          })}
        </select>
      </div>
      {/* Semesters Data */}
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Semester Name
              </th>

              <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                Actions
              </th>
              <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Oval color="white" />
            ) : (
              semesters?.map((data) => {
                return (
                  <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                    <td className="px-4 py-3">{data.semestername}</td>

                    <td className="px-4 py-3 flex items-center space-x-3 md:space-x-5">
                      <FaRegEye
                        onClick={() => {
                          navigate(`/singleSemester/${data._id}`);
                        }}
                        className="text-green-500 sm:text-lg md:text-xl cursor-pointer"
                      />
                      <button
                        className="text-green-500 sm:text-lg md:text-xl cursor-pointer"
                        onClick={() => {
                          navigate(`/singleSubject/${data._id}`);
                        }}
                      >
                        View Subjects
                      </button>
                    </td>
                    <td>
                      <FaTrash onClick={() => semesterDelete(data._id)} className="text-red-600 text-lg md:text-xl cursor-pointer"/>
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

export default HOC(Semesters);
