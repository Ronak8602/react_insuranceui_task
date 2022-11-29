import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { Oval } from "react-loader-spinner";

import Baseurl from "../../../Baseurl";
import { FaTrash, FaRegEye } from "react-icons/fa";
import SingleQuiz from "./SingleQuiz";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Quiz = () => {
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

  const { quizId } = useParams();

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // Get Quiz
  const getQuiz = () => {
    const url = Baseurl() + `question/getquestionsbyquizid/${quizId}`;
    axios
      .get(url, auth)
      .then((res) => {
        setQuiz(res.data.singlequestionbyid);
        console.log("quizWise Data", res.data);
      })
      .then(setLoading(false))
      .catch((error) => console.log("error ", error));
  };
  useEffect(() => {
    getQuiz();
  }, []);
  // Delete Quiz
  const deleteQuiz = (id) => {
    let URL = `${Baseurl()}question/deletequestion/${id}`;
    axios
      .delete(URL, auth)
      .then((res) => {
        console.log(res);
        getQuiz();
      })
      .catch((error) => console.log(error));
  };

  // Post Quiz
  const addQuiz = (data) => {
    let URL = `${Baseurl()}question/addQuestions`;
    const payload = {
      question: data.question,
      correctanswer: data.correctanswer,
      quizId: quizId,
      quizanswers: [
        {
          answerone: data.answerone,
          answertwo: data.answertwo,
          answerthree: data.answerthree,
          answerfour: data.answerfour,
        },
      ],
    };
    axios
      .post(URL, payload, auth)
      .then((res) => {
        toast("Question added sucessfully");
        setPopup(!popup);
      })
      .catch((error) => console.log(error));
  };

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

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <>
      <div className="pb-4 sticky w-full flex justify-between items-center  top-0 bg-slate-900">
        <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
          All Quiz
        </span>
        <button
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-blue-400 text-white tracking-wider"
          onClick={() => setPopup(!popup)}
        >
          Add Questions
        </button>
      </div>
      {/* Add Quiz Question  Form*/}
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
            <span className=" font-semibold text-indigo-500 ">Add Quiz</span>
            <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose onClick={() => setPopup(false)} />{" "}
            </div>
          </div>
          {/* form */}
          <Formik
            initialValues={{
              question: "",
              correctanswer: "",
              answerone: "",
              answertwo: "",
              answerthree: "",
              answerfour: "",
            }}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              addQuiz(values);
              resetForm();
            }}
          >
            <Form className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4">
              {/* Question */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Que*
                </label>
                <Field
                  id="name"
                  required
                  type="text"
                  name="question"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
              </div>

              {/* options */}
              <div className="inline-flex space-y-2  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Options*
                </label>
                <span className="text-gray-800 text-sm">1.</span>
                <Field
                  required
                  type="text"
                  name="answerone"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
                <span className="text-gray-800 text-sm">2.</span>
                <Field
                  required
                  type="text"
                  name="answertwo"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
                <span className="text-gray-800 text-sm">3.</span>
                <Field
                  required
                  type="text"
                  name="answerthree"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
                <span className="text-gray-800 text-sm">4.</span>
                <Field
                  required
                  type="text"
                  name="answerfour"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
              </div>

              {/* Corect Answer */}
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Ans*
                </label>
                <Field
                  required
                  type="text"
                  name="correctanswer"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
              </div>

              <Field
                type="submit"
                value="Add"
                className="bg-indigo-500 cursor-pointer w-40 hover:bg-indigo-600 py-1 rounded-full"
              />
            </Form>
          </Formik>
        </div>
      </section>
      {/* Create Quiz */}
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
            <span className=" font-semibold text-indigo-500 ">Add Quiz</span>
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
        </div>
      </section>
      {/* Quiz Data */}

      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
              <th className="px-4 py-3  tracking-widest font-medium md:text-base text-sm rounded-tl-lg ">
                Question
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Options
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Correct Answer
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
                      {data.question}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {data.quizanswers.map((e) => {
                        return (
                          <div>
                            <div className="tracking-wider">
                              a) {e.answerone}
                            </div>
                            <div className="tracking-wider">
                              b) {e.answertwo}
                            </div>
                            <div className="tracking-wider">
                              c) {e.answerthree}
                            </div>
                            <div className="tracking-wider">
                              d) {e.answerfour}
                            </div>
                          </div>
                        );
                      })}
                    </td>
                    <td className="px-4 py-3 md:text-base text-sm">
                      {data.correctanswer}
                    </td>
                    <td className="px-4 py-3 flex space-x-2">
                      <FaRegEye
                        onClick={() => {
                          setQui(!qui);
                          setSingle(data);
                        }}
                        className="text-green-500 sm:text-lg md:text-xl cursor-pointer"
                      />
                      <FaTrash
                        onClick={() => deleteQuiz(data._id)}
                        className="text-red-600 text-lg md:text-xl cursor-pointer"
                      />
                    </td>
                    {/* <button onClick={() => setPopup(!popup)}>
                      Add Questions
                    </button> */}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <SingleQuiz qui={qui} setQui={setQui} data={single} />
    </>
  );
};

export default HOC(Quiz);
