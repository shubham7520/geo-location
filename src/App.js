import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Navbar from "./nav/Navbar";
import Home from "./home/Home";
import Course from "./courses/Course";
import Class from "./classData/Class";
import Attendance from "./downloadAtt/Attendance";
import Createcourse from "./createCourse/Createcourse";
import Allclasses from "./classData/Allclasses";
import { useState, useEffect } from "react";

const App = () => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(token === null ? false : true);

  // console.log(window.location.pathname);

  return (
    <main className="App">
      <Router>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/"
            exact
            element={isLoggedIn ? <Home /> : <Auth isLog={setIsLoggedIn} />}
          />
          <Route
            path="/class"
            element={isLoggedIn ? <Class /> : <Auth isLog={setIsLoggedIn} />}
          />
          <Route
            path="/course"
            element={isLoggedIn ? <Course /> : <Auth isLog={setIsLoggedIn} />}
          />
          <Route
            path="/all-classes"
            element={
              isLoggedIn ? <Allclasses /> : <Auth isLog={setIsLoggedIn} />
            }
          />
          <Route
            path="/attendance"
            element={
              isLoggedIn ? <Attendance /> : <Auth isLog={setIsLoggedIn} />
            }
          />
          <Route
            path="/create-course"
            element={
              isLoggedIn ? <Createcourse /> : <Auth isLog={setIsLoggedIn} />
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
