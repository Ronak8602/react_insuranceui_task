import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";

import { Oval } from "react-loader-spinner";

import Baseurl from "../../../Baseurl";
import { FaTrash, FaRegEye } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const AllQuiz = () => {
  const [Quiz, setQuiz] = useState([]);
  const [popup, setPopup] = useState(false);
  const token = localStorage.getItem("studyhox");
  const [qui, setQui] = useState(false);
  const [loading, setLoading] = useState(true);
  const [single, setSingle] = useState("");
  const [popTwo, setPopTwo] = useState(false);
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState();
  const [mark, setMark] = useState();
  const [courseId, setCourseId] = useState();
  const [icon, setIcon] = useState();
  const [total, setTotal] = useState();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const createQuiz = async (e) => {
    e.preventDefault();
    const url = Baseurl() + "quiz/addquiz";
    const fd = new FormData();
    fd.append("quizminutessubject", subject);
    fd.append("quiuztime", time);
    fd.append("quiztotal", total);
    fd.append("studentclass", courseId);
    fd.append("quizicon", icon);
    fd.append("quizmark", mark);
    try {
      const res = await axios.post(url, fd, auth);
      console.log("res", res);
      alert("Created Successfully");
    } catch (err) {
      console.log("err", err);
      alert("Please try again");
    }
  };
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  };
  // Get Quiz
  const getQuiz = () => {
    let URL = `${Baseurl()}quiz/getallquiz`;
    axios
      .get(URL, auth)
      .then((res) => {
        setQuiz(res.data.data);
        console.log("quiz Data", res.data.data);
      })
      .then(setLoading(false))
      .catch((error) => console.log(error));
  };
  const getCourses = async () => {
    const url = Baseurl() + "course/getallcourses";
    try {
      const res = await axios.get(url, auth);
      console.log("Courses", res);
      setCourses(res.data.allcourses);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };
  //////Delte quiz Function //////
  const deleteQuiz = (id) => {
    let URL = `${Baseurl()}quiz/deletequiz/${id}`;
    axios
      .delete(URL, auth)
      .then((res) => {
        toast("Quiz Delted Sucessfully ");
      })
      .catch((error) => toast("Try Again Some Error Occured"));
  };
  ///////////////////////////////////////
  useEffect(() => {
    getQuiz();
    getCourses();
  }, []);
  return (
    <>
      <section
        className={
          popTwo
            ? "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen "
            : "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen  scale-0"
        }
      >
        <div
          style={{ maxHeight: "90vh", marginTop: "12rem", zIndex: "1000" }}
          className="bg-white p-3 px-5 lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg"
        >
          <div className="flex justify-between">
            <span className=" font-semibold text-indigo-500 ">Add Exam</span>
            <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose onClick={() => setPopTwo(false)} />{" "}
            </div>
          </div>
          {/* form */}
          <form
            className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4"
            onSubmit={createQuiz}
          >
            {/* Question */}

            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                Icon
              </label>
              <input
                id="name"
                onChange={(e) => setIcon(e.target.files[0])}
                required
                type="file"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              />
            </div>
            <div className="inline-flex  w-full flex-col">
              <label
                htmlFor="name"
                className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
              >
                Subject
              </label>
              <input
                id="name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
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
                Total Questions
              </label>
              <input
                id="name"
                onChange={(e) => setTotal(e.target.value)}
                required
                type="text"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              />
            </div>
            {/* options */}
            <div className="inline-flex space-y-2  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Time
              </label>

              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                type="number"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              />
            </div>

            {/* Corect Answer */}
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Marks
              </label>
              <input
                value={mark}
                onChange={(e) => setMark(e.target.value)}
                required
                type="text"
                name="correctanswer"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              />
            </div>
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Course
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
                type="text"
                name="correctanswer"
                placeholder=""
                className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
              >
                <option>--Select--</option>
                {courses.map((item) => {
                  return <option value={item._id}>{item.coursename}</option>;
                })}
              </select>
            </div>

            <input
              type="submit"
              value="Add"
              className="bg-indigo-500 cursor-pointer w-40 hover:bg-indigo-600 py-1 rounded-full"
            />
          </form>
          ;{/* subjecticon */}
        </div>
      </section>
      <div className="pb-4 sticky w-full flex justify-between items-center  top-0 bg-slate-900">
        <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
          All Quiz
        </span>
        <button
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-blue-400 text-white tracking-wider"
          onClick={() => {
            setPopTwo(!popTwo);
          }}
        >
          Create Quiz
        </button>
      </div>
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
              <th className="px-4 py-3  tracking-widest font-medium md:text-base text-sm rounded-tl-lg ">
                Icon
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Subject
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Time
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Total Marks
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Total Question
              </th>
              <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Oval />
            ) : (
              Quiz?.map((data) => {
                return (
                  <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                    <td className="px-2 py-3 md:text-base text-sm ">
                      <img
                        src={data.quizicon}
                        style={{ width: "50px", height: "50px" }}
                      ></img>
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {data.quizminutessubject}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {data.quiuztime + " minutes"}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {data.quizmark}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {data.quiztotal}
                    </td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2  ">
                      {/* <FaRegEye style={{ margin: "10px" }} /> */}

                      <button
                        onClick={() => {
                          navigate(`/quiz/${data._id}`);
                        }}
                        className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-blue-400 text-white tracking-wider"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          deleteQuiz(data._id);
                        }}
                        className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-red-400 text-white tracking-wider"
                      >
                        Delete
                      </button>
                    </td>
                    <button onClick={() => setPopup(!popup)}></button>
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

export default HOC(AllQuiz);
