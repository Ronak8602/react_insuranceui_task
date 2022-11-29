import axios from "axios";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import auth from "../../../Auth";
import Baseurl from "../../../Baseurl";
const Trending = () => {
  const [loading, setLoading] = useState(false);
  const filteredData = [{}];
  const [trending, settrending] = useState([]);
  const deleteTrending = (id) => {
    let URL = `${Baseurl()}trending/deletetrending/${id}`;
    axios
      .delete(URL, auth)
      .then((res) => {
        toast("Trend Delete SucessFully");
      })
      .catch((error) => toast("Some Error Occurred"));
  };
  const getTrending = () => {
    const url = Baseurl() + "trending/Gettrending";

    axios
      .get(url, auth)
      .then((res) => {
        console.log("res", res.data.data);
        settrending(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        // toast.error(err.response.data.message || "Some Error Occured");
        setLoading(false);
      });
  };
  useEffect(() => {
    getTrending();
  }, []);

  return (
    <>
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-blue-400 border-b border-gray-700 shadow-xl text-white">
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                #
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Image
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Link
              </th>{" "}
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Message
              </th>
              <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                CreatedAt
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
              trending.map((item, index) => {
                return (
                  <tr
                    className="tracking-wider bg-[rgb(30,39,66)] "
                    key={index}
                  >
                    <td className="px-2 py-3 w-24 md:w-32">{index + 1}</td>
                    <td className="px-2 py-3 w-24 md:w-32">
                      <img
                        src={item.trendingimage}
                        alt=""
                        className="w-14 md:w-14 h-14 md:h-14 object-cover "
                      />
                    </td>
                    <td className="px-4 py-3">{item.title}</td>
                    <td className="px-4 py-3"> {item.message}</td>
                    <td className="px-4 py-3">
                      {item.createdAt.substr(0, 10)}
                    </td>

                    <td className="px-5 py-5 flex items-center justify-center gap-2">
                      {" "}
                      <button
                        className="w-full bg-blue-700  py-1 rounded-md text-white "
                        onClick={() => {
                          deleteTrending(item._id);
                        }}
                      >
                        Delete
                      </button>
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

export default Trending;
