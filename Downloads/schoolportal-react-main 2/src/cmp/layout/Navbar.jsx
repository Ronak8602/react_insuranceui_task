import { RiMenu4Line } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("adminEmail");
  const func = () => {
    localStorage.removeItem("studyhox");
    localStorage.removeItem("adminEmail");
    navigate("/");
    toast("Log-Out ", {
      position: "bottom-left",
      autoClose: 2000,
    });
  };
  return (
    <>
      <div
        className={
          hamb
            ? "flex  w-full justify-between  my-1 rounded-sm  p-4 py-3 shadow-xl items-center  bg-slate-800 space-x-4"
            : "flex  w-full justify-between my-1 rounded-sm  p-4 py-3 shadow-xl items-center  bg-slate-800 space-x-4"
        }
      >
        <RiMenu4Line
          onClick={() => setHamb(!hamb)}
          className="text-2xl font-bold text-white hover:scale-90 cursor-pointer"
        />

        {/* Profile */}
        <section className="flex sm:ml-auto justify-end sm:w-full items-center space-x-2  pr-2">
          <figure className=" w-9 shadow-xl   h-9 md:w-10 md:h-10 flex justify-center items-center rounded-full ">
            {/* <img
              src="https://pps.whatsapp.net/v/t61.24694-24/145814502_772302363768767_2407042937780151947_n.jpg?ccb=11-4&oh=e5398b16075c0065356add94b2f0ec4c&oe=62AD8AA1"
              alt="Admin"
              className="rounded-full  w-full h-full object-cover"
            /> */}
          </figure>
          <figcaption className="tracking-wider pl-1 font-semibold">
            <div className="lg:text-base text-sm text-gray-300  uppercase">
              Welcome, <strong> {adminEmail} </strong>
            </div>
            {/* <p className="lg:text-sm text-xs leading-3 text-gray-500">
              Stark Industries
            </p> */}
          </figcaption>
        </section>

        {/* Logout Btn */}
        <BiLogOutCircle
          onClick={() => func()}
          className="text-2xl sm:text-3xl font-bold text-blue-400 cursor-pointer"
        />
      </div>
    </>
  );
};

export default Navbar;
