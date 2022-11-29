import React, { useEffect, useState } from "react";
import { input, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";

import HOC from "../../layout/HOC";
import axios from "axios";
import Baseurl from "../../../Baseurl";
import { toast } from "react-toastify";

const Exams = () => {
  const [popup, setPopup] = useState(false);
  const [courses, setCourses] = useState([]);
  const [allSubject, setAllSubject] = useState([]);
  const [subjectIcon, setSubjectIcon] = useState();
  const [subjectName, setSubjectName] = useState();
  const [subjectCode, setSubjectCode] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [status, setStatus] = useState();
  const [courseId, setCourseId] = useState();
  const [studentCourse, setStudentCourse] = useState();
  const [exams, setExams] = useState([]);
  const [popTwo, setPopTwo] = useState(false);
  const [examId, setExamId] = useState();

  let token = localStorage.getItem("studyhox");
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchCourses = async () => {
    const url = Baseurl() + "course/getallcourses";
    try {
      const res = await axios.get(url, auth);
      setCourses(res.data.allcourses);
      console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleClick = (e) => {
    setStudentCourse(e.target.value);
    fetchSubjectByCourseId(e.target.value);
    console.log(studentCourse);
  };

  const fetchSubjectByCourseId = async (id) => {
    const url = Baseurl() + `subject/getsubjectbycourseid/${id}`;
    try {
      const res = await axios.get(url, auth);
      setAllSubject(res.data.data);
      console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleCourseDropdownChange = (e) => {
    fetchExamsByCourseId(e.target.value);
  };

  const fetchExamsByCourseId = async (id) => {
    const url = Baseurl() + `exam/getexambycourse/${id}`;
    try {
      const res = await axios.get(url, auth);
      setExams(res.data.data);
      // console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };

  console.log("exams", exams);

  const handleStatusClick = (data) => {
    setExamId(data._id);
  };

  const changeExamStatus = async (e) => {
    e.preventDefault();
    const url = Baseurl() + `exam/changestatus/${examId}`;
    const data = {
      status: status,
    };
    try {
      const res = await axios.put(url, data, auth);
      console.log("res", res);
      alert("Successful");
    } catch (err) {
      console.log("err", err);
      alert("Please try again");
    }
  };

  const deleteExam = async (id) => {
    const url = Baseurl() + `exam/deleteExam/${id}`;

    axios
      .delete(url, auth)
      .then((res) => {
        toast.success("Deleted Successfully");
      })
      .catch((error) => {
        toast.error("Some Error Occured Try Again");
      });
  };

  const addExam = async (e) => {
    e.preventDefault();
    const url = Baseurl() + "exam/addexam";
    const fd = new FormData();
    fd.append("subjecticon", subjectIcon);
    fd.append("subjectname", subjectCode);
    fd.append("subjectcode", subjectName);
    fd.append("time", time);
    fd.append("date", date);
    fd.append("status", status);
    fd.append("studentclass", studentCourse);

    await axios
      .post(url, fd, auth)
      .then((res) => {
        toast("Exam Created Sucessfully");
        setPopup(false);
      })
      .catch((err) => {
        toast("Some Error Occured Try Again");
      });
  };
  return (
    <>
      <section>
        <div className="pb-4 sticky w-full flex gap-16 items-center  top-0 bg-slate-900">
          <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
            All Exams
          </span>
          <select
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm  text-black tracking-wider mt-1"
            value={studentCourse}
            onChange={handleCourseDropdownChange}
          >
            <option>--Select--</option>
            {courses.map((course) => {
              return <option value={course._id}>{course.coursename}</option>;
            })}
          </select>
          <button
            onClick={() => setPopup(!popup)}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-blue-400 text-white tracking-wider"
          >
            Add Exam
          </button>
        </div>
        {/* Form */}
        <section
          className={
            popup
              ? "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen "
              : "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen  scale-0"
          }
        >
          <div
            style={{ maxHeight: "90vh" }}
            className="bg-white p-3 px-5 lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg"
          >
            <div className="flex justify-between">
              <span className=" font-semibold text-indigo-500 ">Add Exam</span>
              <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
                <IoMdClose onClick={() => setPopup(false)} />{" "}
              </div>
            </div>
            {/* form */}

            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4"
              onSubmit={addExam}
            >
              {/* subjecticon */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="subjecticon"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Question Sheet*
                </label>
                <input
                  onChange={(e) => setSubjectIcon(e.target.files[0])}
                  id="subjecticon"
                  required
                  type="file"
                  name="subjecticon"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
              </div>
              {/* Subject Name */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="subjectname"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Subject Code
                </label>
                <input
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  id="subjectname"
                  required
                  type="text"
                  name="subjectname"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
              </div>
              {/* subjectcode */}

              {/* studentclass */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="studentclass"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Course
                </label>
                <select
                  value={studentCourse}
                  onChange={handleClick}
                  as="select"
                  id="studentclass"
                  required
                  type="text"
                  name="studentclass"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                >
                  <option>--Select--</option>
                  {courses.map((course) => {
                    return (
                      <option value={course._id}>{course.coursename}</option>
                    );
                  })}
                </select>
                <div className="inline-flex  w-full flex-col">
                  <label
                    htmlFor="subjectcode"
                    className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                  >
                    Subject Name
                  </label>
                  <select
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    id="subjectcode"
                    required
                    type="text"
                    name="subjectcode"
                    placeholder=""
                    className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                  >
                    {" "}
                    <option>--Select--</option>
                    {allSubject.length === 0 ? (
                      <option>No Subject in this course</option>
                    ) : (
                      allSubject.map((sub) => {
                        return (
                          <option value={sub._id}>{sub.subjectname}</option>
                        );
                      })
                    )}
                  </select>
                </div>
              </div>
              {/* Date */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="date"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Date*
                </label>
                <input
                  id="date"
                  required
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder=""
                  className="bg-gray-100 w-full text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
              </div>
              {/* time */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="time"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Time*
                </label>
                <input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  id="time"
                  required
                  type="time"
                  name="time"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 w-full tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
              </div>

              {/* status */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="status"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Status*
                </label>
                <select
                  as="select"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  type="text"
                  name="status"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                >
                  <option>--Select--</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Past">Past</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              <input
                type="submit"
                value="Add"
                className="bg-indigo-500 cursor-pointer w-40 hover:bg-indigo-600 py-1 rounded-full"
              />
            </form>
          </div>
        </section>
        {/* Change Status */}
        <section
          className={
            popTwo
              ? "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen "
              : "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen  scale-0"
          }
        >
          <div
            style={{ maxHeight: "90vh" }}
            className="bg-white p-3 px-5 lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg"
          >
            <div className="flex justify-between">
              <span className=" font-semibold text-indigo-500 ">
                Change Status
              </span>
              <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
                <IoMdClose onClick={() => setPopTwo(false)} />{" "}
              </div>
            </div>

            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4"
              onSubmit={changeExamStatus}
            >
              {/* status */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="status"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Status*
                </label>
                <select
                  as="select"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  type="text"
                  name="status"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                >
                  <option>--Select--</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Past">Past</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              <input
                type="submit"
                value="Add"
                className="bg-indigo-500 cursor-pointer w-40 hover:bg-indigo-600 py-1 rounded-full"
              />
            </form>
          </div>
        </section>
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
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => {
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
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default HOC(Exams);
