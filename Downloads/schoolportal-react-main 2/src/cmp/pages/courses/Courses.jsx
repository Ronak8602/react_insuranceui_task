import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import Baseurl from "../../../Baseurl";
import { FaTrash, FaRegEye, FaEdit } from "react-icons/fa";
import auth from "../../../Auth";
import { Navigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState();
  const [edit, setEdit] = useState(false);
  const [addSem, setAddSem] = useState(false);
  const [semName, setSemName] = useState("");
  const [semId, setSemId] = useState();
  const [addSub, setAddSub] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [subName, setSubName] = useState();
  const [groupNote, setGroupNote] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [courseId, setCourseId] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getCourses = async () => {
    const url = Baseurl() + "course/getallcourses";
    try {
      const res = await axios.get(url, auth);
      console.log("res", res);
      setCourses(res.data.allcourses);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  const sendGroupNotifications = async (e) => {
    e.preventDefault();
    const url = Baseurl() + "groupnotification/sendnotification";
    const data = {
      studentclass: courseId,
      message: message,
      title: title,
    };
    try {
      const res = await axios.post(url, data, auth);
      console.log("res", res);
      alert("Sent Successfully");
    } catch (err) {
      console.log("err", err);
      alert("Please try again");
    }
  };

  const getSemesters = async (Coursid) => {
    const url = Baseurl() + `semester/getsemesterbycourseid/${Coursid}`;
    try {
      const res = await axios.get(url, auth);
      console.log("semesters", res);

      setSemesters(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const addCourse = async (e) => {
    e.preventDefault();
    const url = Baseurl() + "course/addcourse";

    const data = {
      coursename: courseName,
    };

    try {
      const res = await axios.post(url, data, auth);
      console.log("res", res);
      alert("Added Successfully");
      getCourses();
    } catch (err) {
      console.log("err", err);
      alert("Please try again");
    }
  };

  const addSemester = async (e) => {
    e.preventDefault();
    const url = Baseurl() + "semester/addsemester";

    const data = {
      semestername: semName,
      courseId: id,
    };

    try {
      const res = await axios.post(url, data, auth);
      console.log("res", res);
      alert("Added Successfully");
    } catch (err) {
      console.log("err", err);
      alert("Please try again");
    }
  };

  const addSubject = async (e) => {
    e.preventDefault();
    const url = Baseurl() + "subject/addsubject";

    const data = {
      subjectname: subName,
      courseId: id,
      semesterId: semId,
    };

    try {
      const res = await axios.post(url, data, auth);
      console.log("res", res);
      alert("Added Successfully");
    } catch (err) {
      console.log("err", err);
      alert("Please try again");
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure")) {
      return;
    }
    const url = Baseurl() + `course/deletecourse/${id}`;
    try {
      const res = await axios.delete(url, auth);
      console.log("res", res);
      alert("Deleted Successfully");
      getCourses();
    } catch (err) {
      console.log("err", err);
      alert("Please try again");
    }
  };

  const handleClick = (data) => {
    setCourseName(data?.coursename);
    setId(data?._id);
  };

  const editCourse = async (e) => {
    e.preventDefault();
    const url = Baseurl() + `course/updatecourse/${id}`;

    const data = {
      coursename: courseName,
    };

    try {
      const res = await axios.put(url, data, auth);
      console.log("res", res);
      alert("Successful");
      getCourses();
    } catch (err) {
      console.log("err", err);
      alert("Please try again");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <div className="pb-4 sticky w-full flex justify-between items-center  top-0 bg-slate-900">
        <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
          All Courses
        </span>
        <button
          onClick={() => {
            setPopup(!popup);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-blue-400 text-white tracking-wider"
        >
          Add Course
        </button>
      </div>
      {/* Send Group Notifications*/}
      <section
        style={{ background: "rgba(0,0,0,0.4)" }}
        className={
          groupNote
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
                  setGroupNote(!groupNote);
                  // setCourseName("");
                }}
              />{" "}
            </div>
          </div>
          {/* form */}

          <form
            className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4"
            onSubmit={sendGroupNotifications}
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
      {/* Add Courses Form*/}
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
              {id ? "Edit Course" : "Add Course"}
            </span>
            <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose
                onClick={() => {
                  setPopup(false);
                  setCourseName("");
                }}
              />{" "}
            </div>
          </div>
          {/* form */}

          <form
            className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4"
            onSubmit={id ? editCourse : addCourse}
          >
            {/* Question */}
            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                Course Name
              </label>
              <input
                id="name"
                required
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                type="text"
                name="coursename"
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
      {/* Add Semester Form */}
      <section
        style={{ background: "rgba(0,0,0,0.4)" }}
        className={
          addSem
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
              Add Semester
            </span>
            <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose
                onClick={() => {
                  setAddSem(false);
                }}
              />{" "}
            </div>
          </div>
          {/* form */}

          <form
            className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4"
            onSubmit={addSemester}
          >
            {/* Question */}
            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                Semester
              </label>
              <input
                id="name"
                required
                value={semName}
                onChange={(e) => setSemName(e.target.value)}
                type="text"
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
      {/* Add Subject */}
      <section
        style={{ background: "rgba(0,0,0,0.4)" }}
        className={
          addSub
            ? "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen "
            : "hidden"
        }
      >
        <div
          style={{ maxHeight: "90vh" }}
          className="bg-white p-3 px-5 lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg"
        >
          <div className="flex justify-between">
            <span className=" font-semibold text-indigo-500 ">Add Subject</span>
            <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose
                onClick={() => {
                  setAddSub(false);
                }}
              />{" "}
            </div>
          </div>
          {/* form */}

          <form
            className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4"
            onSubmit={addSubject}
          >
            {/* Question */}
            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                Subject name
              </label>
              <input
                id="name"
                required
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
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
                Semester
              </label>
              <select
                id="name"
                required
                value={semId}
                onChange={(e) => setSemId(e.target.value)}
                type="text"
                name="coursename"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              >
                <option>--Select Semester</option>
                {semesters.map((item) => {
                  return (
                    <>
                      <option value={item._id}>{item.semestername}</option>
                    </>
                  );
                })}
              </select>
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
      {/* Courses Data */}
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
              <th className="px-4 py-3  tracking-widest font-medium md:text-base text-sm rounded-tl-lg ">
                Course Name
              </th>
              <th
                colSpan={8}
                className="px-4 py-3  tracking-widest font-medium md:text-base text-sm rounded-tl-lg "
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Oval color="white" />
            ) : (
              courses &&
              courses?.map((data) => {
                return (
                  <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                    <td className="px-2 py-3 md:text-base text-sm ">
                      {data.coursename}
                    </td>

                    <td
                      colSpan={8}
                      className="px-4 py-3 flex flex-row justify-between space-x-2"
                    >
                      <button
                        className="text-green-600 text-lg md:text-xl cursor-pointer border px-2 border-black rounded shadow-sm"
                        onClick={() => {
                          setAddSem(!addSem);
                          setId(data._id);
                        }}
                      >
                        Add Sem
                      </button>
                      <button
                        className="text-green-600 text-lg md:text-xl cursor-pointer border px-2 border-black rounded shadow-sm"
                        onClick={() => {
                          setAddSub(!addSub);
                          setId(data._id);
                          getSemesters(data._id);
                        }}
                      >
                        Add Subject
                      </button>
                      <button
                        className="text-green-600 text-lg md:text-xl cursor-pointer border px-2 border-black rounded shadow-sm"
                        onClick={() => {
                          setGroupNote(!groupNote);
                          setCourseId(data._id);
                        }}
                      >
                        Send
                      </button>
                      <button
                        className="text-green-600 text-lg md:text-xl cursor-pointer border px-2 border-black rounded shadow-sm"
                        onClick={() => {
                          navigate(`/viewSubjectByCourse/${data._id}`);
                        }}
                      >
                        View Subjects
                      </button>
                      <button
                        className="text-green-600 text-lg md:text-xl cursor-pointer border px-2 border-black rounded shadow-sm"
                        onClick={() => {
                          navigate(`/viewExamByCourse/${data._id}`);
                        }}
                      >
                        View Exams
                      </button>
                      <FaRegEye
                        onClick={() => {
                          navigate(`/singleCourse/${data._id}`);
                        }}
                        className="text-green-500 sm:text-lg md:text-xl cursor-pointer"
                      />
                      <FaEdit
                        onClick={() => {
                          setPopup(!popup);
                          handleClick(data);
                        }}
                        className="text-red-600 text-lg md:text-xl cursor-pointer"
                      />
                      <FaTrash
                        onClick={() => deleteCourse(data._id)}
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

export default HOC(Courses);
