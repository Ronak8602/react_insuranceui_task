import axios from "axios";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Baseurl from "../../../Baseurl";
const AddForm = (props) => {
  const [show, setshow] = useState(true);
  const [start, setstart] = useState();
  const [end, setend] = useState();
  const [Amout, setAmount] = useState();
  const [payment, setpayment] = useState();
  const [plan, setplan] = useState();
  const [purchase, setpurhase] = useState();
  const token = localStorage.getItem("studyhox");
  const AddPremium = async (e) => {
    const auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    e.preventDefault();
    const url = Baseurl() + "subscription/addsubscriptionbyadmin";

    const data = {
      plan_start_date: start,
      plan_end_date: end,
      payment_id: payment,
      plan_type: plan,
      purchase_date: purchase,
      total_cost: Amout,
      parentId: props.Id,
    };

    axios
      .post(url, data, auth)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    props.show(false);
  };
  return (
    <section
      style={{ background: "rgba(0,0,0,0.4)", marginTop: "4rem" }}
      className={
        show
          ? "fixed top-0 left-0 wcomp transition-all duration-150 w-full flex justify-center items-center h-screen "
          : "hidden"
      }
    >
      <div
        style={{ maxHeight: "90vh", marginTop: "15 rem" }}
        className="bg-white p-3 px-5 lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg"
      >
        <div className="flex justify-between">
          <span className=" font-semibold text-indigo-500 ">Add Premium</span>
          <div className="text-indigo-600 py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
            <IoMdClose
              onClick={() => {
                props.show(false);
                // setCourseName("");
              }}
            />{" "}
          </div>
        </div>
        {/* form */}

        <form
          className="grid  grid-cols-1 gap-x-7 gap-y-4 py-4"
          onSubmit={(e) => {
            AddPremium(e);
          }}
        >
          <div className="inline-flex  w-full flex-col">
            <label
              htmlFor="name"
              className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
            >
              Amount Paid
            </label>
            <input
              id="name"
              required
              onChange={(e) => setAmount(e.target.value)}
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
              Start Date
            </label>
            <input
              id="name"
              required
              onChange={(e) => setstart(e.target.value)}
              type="date"
              placeholder=""
              className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
            />
          </div>
          <div className="inline-flex  w-full flex-col">
            <label
              htmlFor="name"
              className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
            >
              End Date
            </label>
            <input
              id="name"
              required
              onChange={(e) => setend(e.target.value)}
              type="date"
              placeholder=""
              className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
            />
          </div>
          <div className="inline-flex  w-full flex-col">
            <label
              htmlFor="name"
              className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
            >
              Purchase Date
            </label>
            <input
              id="name"
              required
              onChange={(e) => setpurhase(e.target.value)}
              type="date"
              placeholder=""
              className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
            />
          </div>
          <div className="inline-flex  w-full flex-col">
            <label
              htmlFor="name"
              className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
            >
              Payment Type
            </label>
            <input
              id="name"
              required
              type="text"
              onChange={(e) => {
                setpayment(e.target.value);
              }}
              placeholder=""
              className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
            />
          </div>
          <div className="inline-flex  w-full flex-col">
            <label
              htmlFor="name"
              className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
            >
              Plan Type
            </label>
            <input
              id="name"
              required
              type="text"
              placeholder=""
              onChange={(e) => {
                setplan(e.target.value);
              }}
              className="bg-gray-100 text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-indigo-400"
            />
            <br />
            <button
              type="submit"
              className="bg-indigo-500 cursor-pointer w-40 hover:bg-indigo-600 py-1 rounded-full"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddForm;
