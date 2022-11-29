import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  MdDashboardCustomize,
  MdOutlineQuiz,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoIosPeople, IoIosGitNetwork } from "react-icons/io";
import { GiSkills } from "react-icons/gi";
import { TbWallpaper } from "react-icons/tb";
import { IoGitNetworkOutline } from "react-icons/io";
import Studyhox from "../Assets/Studyhox.png";

const Sidebar = ({ hamb, setHamb }) => {
  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3" />,
      link: "/dashboard",
      name: "Dashboard",
    },
    // {
    //   icon: <GiSkills className="text-xl mr-3" />,
    //   link: "/skills",
    //   name: " Skills",
    // },
    // {
    //   icon: <IoIosGitNetwork className="text-xl mr-3" />,
    //   link: "/resumes",
    //   name: " Resumes",
    // },
    {
      icon: <FaUserFriends className="text-xl mr-3" />,
      link: "/students",
      name: " Students",
    },
    {
      icon: <IoIosPeople className="text-xl mr-3" />,
      link: "/parents",
      name: " Parents",
    },
    {
      icon: <TbWallpaper className="text-xl mr-3" />,
      link: "/exams",
      name: " Exams",
    },
    {
      icon: <MdOutlineQuiz className="text-xl mr-3" />,
      link: "/allquiz",
      name: " Quize",
    },
    {
      icon: <MdOutlineQuiz className="text-xl mr-3" />,
      link: "/courses",
      name: "Courses",
    },
    {
      icon: <MdOutlineQuiz className="text-xl mr-3" />,
      link: "/notifications",
      name: "Notifications",
    },
    {
      icon: <MdOutlineQuiz className="text-xl mr-3" />,
      link: "/semesters",
      name: "Semesters",
    },
    {
      icon: <MdOutlineQuiz className="text-xl mr-3" />,
      link: "/premium",
      name: "Premium",
    },
    // {
    //   icon: <MdOutlineQuiz className="text-xl mr-3" />,
    //   link: "/subjects",
    //   name: "Subjects",
    // },
  ];
  return (
    <>
      <aside className="p-4">
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-white cursor-pointer"
          />
        </div>
        {/* Logo */}
        <figure className="flex  flex-col items-center">
          <img src={Studyhox} alt="Logo" className="w-36" />
        </figure>
        {/* Nav-menu */}
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link to={nav.link} key={nav.name} className="">
                <span className="flex my-3 items-center hover:shadow-xl cursor-pointer text-gray-100 hover:bg-gray-100 hover:text-gray-800 tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
