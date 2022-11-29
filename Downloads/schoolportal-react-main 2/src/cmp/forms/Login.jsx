import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { HiOutlineMail } from "react-icons/hi";
import { BiLogInCircle } from "react-icons/bi";
import Baseurl from "../../Baseurl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Studyhox from "../Assets/Studyhox.png";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

const Login = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //   Log in Admin
  const auth = {
    headers: { "Access-Control-Allow-Origin": "*" },
  };
  const login = (data) => {
    setLoading(true);

    let URL = `${Baseurl()}admin/adminlogin`;
    axios
      .post(URL, data, auth)
      .then((res) => {
        console.log(res);
        localStorage.setItem("studyhox", res.data.data.accessToken);
        localStorage.setItem("adminEmail", res.data.data.email);
        const func = () => {
          setLoading(false);
          navigate("/dashboard");
          toast("Log-In", {
            position: "bottom-left",
            autoClose: 2000,
          });
        };
        res.data.message === "You have successfully Logged in"
          ? func()
          : toast(res.data.message, {
              position: "bottom-left",
              autoClose: 2000,
            });
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-900">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values, { resetForm }) => {
            login(values);
            resetForm();
          }}
        >
          <Form className="shadow-xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-slate-800 p-5 md:py-10 rounded-md">
            <img src={Studyhox} alt="studyhox" className="sm:w-40 w-36" />
            {/* <h3 className="text-white tracking-wider  text-2xl md:text-3xl">
              Welcome Admin
            </h3> */}
            <section className="py-7 space-y-6">
              {/* Email */}
              <div className="shadow-2xl sm:w-96 space-x-4 flex items-center w-64 bg-slate-900 p-2 rounded-md">
                <Field
                  type="email"
                  placeholder="username@gmail.com"
                  name="email"
                  required
                  className="outline-none px-0.5 text-slate-200 bg-transparent tracking-wider w-full"
                />
                <HiOutlineMail className="text-xl text-slate-200" />
              </div>
              {/* Password */}
              <div className="shadow-2xl sm:w-96 space-x-4 flex items-center w-64 bg-slate-900 p-2 rounded-md">
                <Field
                  type={inputpass ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  required
                  className="outline-none px-0.5 text-slate-200 bg-transparent tracking-wider w-full"
                />

                <span
                  onClick={() => {
                    setPass(!pass);
                    setInputpass(!inputpass);
                  }}
                  className="text-xl cursor-pointer hover:scale-90 text-slate-200"
                >
                  {pass ? <VscEyeClosed /> : <VscEye />}
                </span>
              </div>
              {/* Submit */}
              <button
                type="submit"
                className="py-2 cursor-pointer tracking-wider flex justify-center items-center w-full rounded-md font-medium bg-slate-900 text-white  "
              >
                {loading ? <Oval height={"40px"} color="white" /> : "Log In"}
              </button>
            </section>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
