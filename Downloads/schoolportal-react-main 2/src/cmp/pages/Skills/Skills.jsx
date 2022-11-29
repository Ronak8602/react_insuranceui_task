import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Baseurl from "../../../Baseurl";
import { CgProfile } from "react-icons/cg";
import { FaRegEye, FaTrash, FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Skills = () => {
  const [popup, setPopup] = useState(false);
  const [Skills, setSkills] = useState([]);
  const [editdata, setEditdata] = useState("");
  console.log(editdata, "jkjdk");

  // FOr Update data
  const token = localStorage.getItem("studyhox");
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // Get Skills
  const getSkill = () => {
    let URL = `${Baseurl()}skills/getallskills`;
    axios
      .get(URL, auth)
      .then((res) => setSkills(res.data.allskills))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getSkill();
  }, []);

  // Add Skills
  const addSkill = (data) => {
    let URL = `${Baseurl()}skills/addskill`;
    axios
      .post(URL, data, auth)
      .then((res) => {
        console.log(res);
        getSkill();
      })
      .catch((error) => console.log(error));
  };
  // Edit Skills
  const editSkill = (data) => {
    setEditdata(data);
    let URL = `${Baseurl()}skills/updateskill/${data._id}`;
    axios
      .put(URL, data, auth)
      .then((res) => {
        console.log(res);
        getSkill();
      })
      .catch((error) => console.log(error));
  };
  // Delete Skills
  const deleteSkill = (id) => {
    let URL = `${Baseurl()}skills/delete/${id}`;
    axios
      .delete(URL, auth)
      .then((res) => {
        console.log(res);
        getSkill();
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="pb-4 sticky w-full flex justify-between items-center  top-0 bg-slate-900">
        <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
          All Skills
        </span>
        <button
          onClick={() => {
            setPopup(!popup);
            setEditdata("");
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-blue-400 text-white tracking-wider"
        >
          Add Skill
        </button>
      </div>
      {/* Add & Edit Skill Form*/}
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
              {" "}
              {editdata ? "Update Skill" : "Add Skill"}{" "}
            </span>
            <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose onClick={() => setPopup(false)} />{" "}
            </div>
          </div>
          {/* form */}
          <Formik
            initialValues={{
              skillname: editdata.skillname,
            }}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              resetForm();

              {
                editdata ? editSkill(values) : addSkill(values);
              }
              // setPopup(!popup);
            }}
          >
            <Form className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4">
              {/* skillname */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Skill Name*
                </label>
                <Field
                  id="name"
                  required
                  type="text"
                  name="skillname"
                  placeholder=""
                  className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
                />
              </div>

              <Field
                type="submit"
                value={editdata ? "Update " : "Add "}
                className="bg-indigo-500 cursor-pointer w-40 hover:bg-indigo-600 py-1 rounded-full"
              />
            </Form>
          </Formik>
        </div>
      </section>
      {/* Skills Data */}
      {Skills.length === 0 ? (
        <div
          style={{ background: "rgb(30,39,66)" }}
          className="rounded-b-lg py-2 text-center  tracking-wider overflow-y-auto"
        >
          There are no
          <span className="text-blue-400 uppercase tracking-wider font-semibold">
            {" "}
            Skills
          </span>
        </div>
      ) : (
        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
                <th className="px-4 py-3  tracking-widest font-medium md:text-base text-sm  rounded-tl-lg ">
                  {/* <CgProfile /> */}Skill Name
                </th>
                {/* <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Name
                </th> */}
                {/* <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Cloudinary Id
                </th>{" "}
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Roll No.
                </th> */}
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Skills.map((data) => {
                return (
                  <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                    {/* <td className="px-2 py-3 w-24 md:w-32">
                      <img
                        src={
                          data.parentpicture
                            ? data.parentpicture
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCyOhbogPKefkCLuaejt8IPmVxdzpd7ToK-g&usqp=CAU"
                        }
                        alt=""
                        className="w-10 md:w-14 h-10 md:h-14 object-cover rounded-full"
                      />
                    </td> */}
                    <td className="px-4 py-3">{data.skillname}</td>
                    {/* <td className="px-4 py-3">{data.cloudinary_id}</td>
                    <td className="px-4 py-3">{data.studentrollnumber}</td> */}
                    <td className="px-4 py-3 flex items-center space-x-3 md:space-x-5">
                      {/* <FaRegEye className="text-yellow-500 text-lg md:text-xl cursor-pointer" /> */}
                      <FaTrash
                        onClick={() => deleteSkill(data._id)}
                        className="text-red-600 text-lg md:text-xl cursor-pointer"
                      />
                      <FaEdit
                        onClick={() => {
                          setEditdata(data);
                          setPopup(!popup);
                        }}
                        className="text-green-600 text-lg md:text-xl cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default HOC(Skills);
