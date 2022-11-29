import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./cmp/forms/Login";
import Dashboard from "./cmp/pages/Dashboard";
import Users from "./cmp/pages/Students/Students";
// import Courses from "./cmp/pages/Parents/Parents";
import Skills from "./cmp/pages/Skills/Skills";
import Students from "./cmp/pages/Students/Students";
import Parents from "./cmp/pages/Parents/Parents";
import Resumes from "./cmp/pages/Jobs/Resumes";
import Quiz from "./cmp/pages/Quiz/Quiz";
import Exams from "./cmp/pages/Exams/Exams";
import Courses from "./cmp/pages/courses/Courses";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleCourse from "./cmp/pages/courses/SingleCourse";
import Notifications from "./cmp/pages/notifications/Notifications";
import Single from "./cmp/pages/notifications/Single";
import Semesters from "./cmp/pages/semesters/Semesters";
import SingleSem from "./cmp/pages/semesters/SingleSem";
import SingleSubject from "./cmp/pages/semesters/SingleSubject";
import Subjects from "./cmp/pages/subjects/Subjects";
import ViewExamsByCourse from "./cmp/pages/courses/ViewExamsByCourse";
import Premium from "./cmp/pages/Premium/Premium";
import AllQuiz from "./cmp/pages/Quiz/AllQuiz";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/students" element={<Students />} />
        <Route path="/parents" element={<Parents />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/allquiz" element={<AllQuiz />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/courses" element={<Courses />} />

        <Route path="/premium" element={<Premium />} />
        <Route path="/singleCourse/:id" element={<SingleCourse />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/single/:id" element={<Single />} />
        <Route path="/semesters" element={<Semesters />} />
        <Route path="/singleSemester/:id" element={<SingleSem />} />
        <Route path="/singleSubject/:id" element={<SingleSubject />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/viewSubjectByCourse/:id" element={<Subjects />} />
        <Route path="/viewExamByCourse/:id" element={<ViewExamsByCourse />} />
      </Routes>
    </>
  );
}

export default App;
