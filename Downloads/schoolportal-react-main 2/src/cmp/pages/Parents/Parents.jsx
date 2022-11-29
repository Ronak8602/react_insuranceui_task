import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Baseurl from "../../../Baseurl";
import { CgProfile } from "react-icons/cg";
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
import { Oval } from "react-loader-spinner";
import { IoMdClose } from "react-icons/io";
import AddForm from "../Premium/AddForm";

const Parents = () => {
  const [parents, setParents] = useState([]);
  const token = localStorage.getItem("studyhox");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [parentId, setParentId] = useState();
  const [popup, setPopup] = useState(false);
  const [inputText, setInputText] = useState("");
  const [visible, setvisible] = useState(false);
  const [userid, setuserid] = useState();
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // Get Parents
  useEffect(() => {
    let URL = `${Baseurl()}parent/getallparents`;
    axios
      .get(URL, auth)
      .then((res) => {
        setParents(res.data.date);
      })
      .then(setLoading(false))

      .catch((error) => console.log(error));
  }, []);

  const filteredData = parents.filter((item) => {
    if (inputText === "") {
      return item;
    } else {
      return item?.parentothernames.toLowerCase().includes(inputText);
    }
  });

  const handleClick = (data) => {
    setParentId(data._id);
  };

  const sendNotification = async (e) => {
    e.preventDefault();
    const url = Baseurl() + "parentnotification/sendnotification ";

    const data = {
      parentId: parentId,
      message: message,
      title: title,
    };

    try {
      const res = await axios.post(url, data, auth);

      alert("Sent Successfully");
    } catch (err) {
      console.log("err", err);
      alert("Please try again");
    }
  };
  return (
    <>
      {visible && <AddForm show={setvisible} Id={userid} />}
      <div className="pb-4 sticky w-full  top-0 bg-slate-900 flex items-center justify-between">
        <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
          All Parents{" "}
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
      {/* Parents Data */}

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
                Cloudinary Id
              </th>{" "}
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Roll No.
              </th>
              <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                Phone
              </th>
              <th className="px-8 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Oval color="white" />
            ) : (
              filteredData.map((data) => {
                return (
                  <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                    <td className="px-2 py-3 w-24 md:w-32">
                      <img
                        src={
                          data.parentpicture
                            ? data.parentpicture
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCyOhbogPKefkCLuaejt8IPmVxdzpd7ToK-g&usqp=CAU"
                        }
                        alt=""
                        className="w-10 md:w-14 h-10 md:h-14 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {data.parentothernames} {data.parentsurname}
                    </td>
                    <td className="px-4 py-3">{data.cloudinary_id}</td>
                    <td className="px-4 py-3">{data.studentrollnumber}</td>
                    <td className="px-4 py-3">{data.mobilenumber}</td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      {" "}
                      <button
                        className="w-full bg-blue-700  py-1 rounded-md text-white "
                        onClick={() => {
                          setPopup(!popup);
                          handleClick(data);
                        }}
                      >
                        Send
                      </button>
                      <button
                        className="w-full bg-blue-700  py-1 rounded-md text-white "
                        onClick={() => {
                          setuserid(data._id);
                          setvisible(true);
                        }}
                        style={{ fontSize: "15px" }}
                      >
                        Add Premium
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
          parents.map((parent) => {
            return (
              <div className="bg-white shadow-2xl m-2 rounded-2xl p-2">
                <div className="flex items-center space-x-3">
                  <img
                    className="w-20 rounded-full h-15"
                    src={parent?.parentpicture}
                    alt=""
                  />
                  <div className="">
                    <div className="flex items-center space-x-1">
                      <h2 className="font-semibold text-black">
                        {parent.parentothernames} {parent.parentsurname}
                      </h2>
                      <MdCheckCircle className="text-blue-700" />
                    </div>
                    <div className="flex text-gray-500 items-center space-x-2">
                      {parent.mobilenumber}
                    </div>
                  </div>
                </div>
                <hr className="mt-2 border border-[#0000000e]" />
                <div className="space-y-3 mt-5">
                  <div className="flex text-sm bg-gray-100 p-1 rounded-md items-center space-x-3 text-black">
                    {parent.cloudinary_id}
                  </div>

                  <div className="flex  justify-center text-sm  p-1 rounded-md items-center space-x-3">
                    <button
                      className="w-full bg-blue-700  py-1 rounded-md text-white "
                      onClick={() => {
                        setPopup(!popup);
                        handleClick(parent);
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

export default HOC(Parents);
