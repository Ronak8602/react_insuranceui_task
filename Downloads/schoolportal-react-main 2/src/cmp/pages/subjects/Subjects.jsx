import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Baseurl from "../../../Baseurl";
import { CgProfile } from "react-icons/cg";
import auth from "../../../Auth";
import { IoMdClose } from "react-icons/io";
import { GrNotification } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash, FaRegEye } from "react-icons/fa";
import { Oval } from "react-loader-spinner";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const {id} = useParams();
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getSubjects = async () => {
    const url = Baseurl() + "subject/getsubjectbycourseid/"+id;
    try {
      const res = await axios.get(url, auth);
      console.log("res", res.data);

      setSubjects(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <>
      <div className="pb-4 sticky w-full  top-0 bg-slate-900">
        <span className="tracking-widest text-blue-400 font-semibold uppercase text-lg">
          All Subjects
        </span>
      </div>
      {/* Subjects Data */}
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Subject Name
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Oval color="white" />
            ) : (
              subjects?.map((data) => {
                return (
                  <tr className="tracking-wider bg-[rgb(30,39,66)] ">
                    <td className="px-4 py-3">{data.subjectname}</td>
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

export default HOC(Subjects);
