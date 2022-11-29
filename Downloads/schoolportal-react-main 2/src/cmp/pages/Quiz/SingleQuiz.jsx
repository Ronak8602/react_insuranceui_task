import React from "react";
import { CgCloseO } from "react-icons/cg";
const SingleQuiz = ({ qui, setQui, data }) => {
  return (
    <>
      <section
        className={
          qui
            ? "bg-[rgb(0,0,0,0.6)] h-screen w-full flex justify-center items-center absolute top-0 left-0"
            : "hidden"
        }
      >
        <div className="bg-slate-800 p-3 rounded-xl w-5/6 flex flex-col  relative sm:w-3/5 md:w-5/12">
          <CgCloseO
            onClick={() => setQui(!qui)}
            className="text-2xl absolute top-0 right-0"
          />
          <img src="quiz.png" alt="" className="w-20 mx-auto" />

          {/* Question */}
          <div className="tracking-widest  text-gray-300">
            Que. {data.question} ?
          </div>
          <div className="text-sm py-2 tracking-wider">
            {data.quizanswers?.map((e, i) => {
              return (
                <div key={i}>
                  <li className="tracking-wider"> {e.answerone}</li>
                  <li className="tracking-wider"> {e.answertwo}</li>
                  <li className="tracking-wider"> {e.answerthree}</li>
                  <li className="tracking-wider"> {e.answerfour}</li>
                </div>
              );
            })}
          </div>
          <span className=" text-blue-400 tracking-widest">
            Ans. {data.correctanswer}
          </span>
        </div>
      </section>
    </>
  );
};

export default SingleQuiz;
