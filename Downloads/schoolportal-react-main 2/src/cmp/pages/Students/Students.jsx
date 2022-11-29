import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Baseurl from "../../../Baseurl";
import { CgProfile } from "react-icons/cg";
import auth from "../../../Auth";
import { IoMdClose } from "react-icons/io";
import { GrNotification } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { FaTrash, FaRegEye, FaEdit } from "react-icons/fa";

import {
  MdAddCircle,
  MdEdit,
  MdSearch,
  MdOutlineBloodtype,
  MdDelete,
  MdOutlineLocalPhone,
  MdCheckCircle,
  MdOutlineMarkEmailUnread,
} from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popTwo, setPopTwo] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [studentId, setStudentId] = useState();
  const [loading, setLoading] = useState(true);
  const [subjectId, setSubjectId] = useState();
  const [semId, setSemId] = useState();
  const [marks, setMarks] = useState();
  const [courseId, setCourseId] = useState();
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [semLoading, setSemLoading] = useState(true);
  const [inputText, setInputText] = useState("");

  const navigate = useNavigate();

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const getStudents = async () => {
    const url = Baseurl() + "student/getallstudents";

    axios
      .get(url, auth)
      .then((res) => {
        console.log("res", res.data.date);

        setStudents(res.data.date);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Some Error Occured");
        setLoading(false);
      });
  };

  const filteredData = students.filter((item) => {
    if (inputText === "") {
      return item;
    } else {
      return (
        item?.othernames.toLowerCase().includes(inputText) ||
        item?.studentclass.coursename.toLowerCase().includes(inputText)
      );
    }
  });

  const handleClick = (data) => {
    setStudentId(data._id);
  };

  const getSemByCourse = async (id) => {
    const url = Baseurl() + `semester/getsemesterbycourseid/${id}`;
    try {
      setSemLoading(false);
      const res = await axios.get(url, auth);
      setSemesters(res.data.data);
      console.log(res);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleSemesterChange = (e) => {
    setSemId(e.target.value);
    console.log("semId", e.target.value);
    getSubjectBySemester(e.target.value);
  };

  const getSubjectBySemester = async (semesterId) => {
    const url = Baseurl() + `subject/getsubjectbysemester/${semesterId}`;
    try {
      const res = await axios.get(url, auth);
      setSubjects(res.data.data);
      console.log(res);
    } catch (err) {
      console.log("err", err);
    }
  };

  const sendNotification = async (e) => {
    e.preventDefault();
    const url = Baseurl() + "notification/sendnotification";

    const data = {
      studentId: studentId,
      message: message,
      title: title,
    };

    try {
      const res = await axios.post(url, data, auth);
      console.log("res", res);
      toast.success("Sent Successfully");
      setPopup(false);
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    }
  };

  const addMarks = async (e) => {
    e.preventDefault();
    const url = Baseurl() + "studentscore/addmark";
    const data = {
      subject: subjectId,
      mark: marks,
      studentID: studentId,
      semester: semId,
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

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <div className="pb-4 sticky w-full  top-0 bg-slate-900 flex items-center justify-between">
        <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
          All Students
        </span>
        <span className="tracking-widest text-black font-semibold uppercase text-lg">
          <input
            type="search"
            onChange={inputHandler}
            className="px-2 py-2"
            placeholder="Search..."
          />
        </span>
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
            onSubmit={sendNotification}
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
      {/* Add Marks Form */}
      <section
        style={{ background: "rgba(0,0,0,0.4)" }}
        className={
          popTwo
            ? "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen "
            : "hidden"
        }
      >
        <div
          style={{ maxHeight: "90vh" }}
          className="bg-white p-3 px-5 lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg"
        >
          <div className="flex justify-between">
            <span className=" font-semibold text-indigo-500 ">Add Marks</span>
            <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose
                onClick={() => {
                  setPopTwo(false);
                  // setCourseName("");
                }}
              />{" "}
            </div>
          </div>
          {/* form */}

          <form
            className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4"
            onSubmit={addMarks}
          >
            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                Semesters
              </label>
              <select
                required
                value={semId}
                onChange={handleSemesterChange}
                type="text"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              >
                <option>--Select--</option>
                {semLoading ? (
                  <option>Loading...</option>
                ) : (
                  semesters.map((item) => {
                    return (
                      <option value={item._id}>{item.semestername}</option>
                    );
                  })
                )}
                {}
              </select>
            </div>
            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                Subjects
              </label>
              <select
                required
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                type="text"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              >
                <option>--Select--</option>
                {subjects.map((sub) => {
                  return <option value={sub._id}> {sub.subjectname}</option>;
                })}
              </select>
            </div>
            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                Marks
              </label>
              <input
                required
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                type="text"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              />
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
      {/* Students Data */}
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
                Course
              </th>{" "}
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Roll No.
              </th>
              <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                Phone
              </th>
              <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Oval color="white" />
            ) : (
              filteredData.map((student) => {
                return (
                  <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                    <td className="px-2 py-3 w-24 md:w-32">
                      <img
                        src={
                          student?.studentpicture
                            ? student?.studentpicture
                            : "https://cdn.vox-cdn.com/thumbor/SbX1VbxJhxijxD1tzRTJ8uq38P4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19101461/spider_man_far_from_home_peter_parker_1562394390.jpg"
                        }
                        alt=""
                        className="w-10 md:w-14 h-10 md:h-14 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {student?.othernames + " " + student?.surname}
                    </td>
                    <td className="px-4 py-3">
                      {" "}
                      {student?.studentclass.coursename}
                    </td>
                    <td className="px-4 py-3"> {student.rollnumber}</td>
                    <td className="px-4 py-3"> {student.mobilenumber}</td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      {" "}
                      <button
                        className="w-full bg-blue-700  py-1 rounded-md text-white "
                        onClick={() => {
                          setPopup(!popup);
                          handleClick(student);
                        }}
                      >
                        Send
                      </button>
                      <button
                        className="w-full bg-blue-700  py-1 rounded-md text-white "
                        onClick={() => {
                          setPopTwo(!popTwo);
                          // handleAddMarksClick(student);
                          getSemByCourse(student.studentclass._id);
                          setStudentId(student._id);
                        }}
                      >
                        Add Marks
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* <div className="grid sm:grid-cols-1 md:grid-cols-4  ">
        {loading ? (
          <Oval color="white" />
        ) : (
          students.map((student) => {
            return (
              <div className="bg-white shadow-2xl m-2 rounded-2xl p-2">
                <div className="flex items-center space-x-3">
                  <img
                    className="w-20 rounded-full h-15"
                    src={student?.studentpicture}
                    alt=""
                  />
                  <div className="">
                    <div className="flex items-center space-x-1">
                      <h2 className="font-semibold text-black">
                        {student?.othernames + " " + student?.surname}
                      </h2>
                      <MdCheckCircle className="text-blue-700" />
                    </div>
                    <div className="flex text-gray-500 items-center space-x-2">
                      {student?.studentclass.coursename}
                    </div>
                  </div>
                </div>
                <hr className="mt-2 border border-[#0000000e]" />
                <div className="space-y-3 mt-5">
                  <div className="flex text-sm bg-gray-100 p-1 rounded-md items-center space-x-3 text-black">
                    {student.rollnumber}
                  </div>
                  <div className="flex text-sm bg-gray-100 p-1 rounded-md items-center space-x-3 text-black">
                    {student.mobilenumber}
                  </div>

                  <div className="flex  justify-center text-sm  p-1 rounded-md items-center space-x-3">
                    <button
                      className="w-full bg-blue-700  py-1 rounded-md text-white "
                      onClick={() => {
                        setPopup(!popup);
                        handleClick(student);
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div> */}
    </>
  );
};

export default HOC(Students);
