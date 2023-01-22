import React from "react";
import "./Attendance.css";
import axios from "../api/axios";
import { useState, useEffect } from "react";

const sendMail = async (id) => {
  await axios({
    url: "/sendAttendanceViaMail",
    params: { courseId: `${id}` },
  });
};

const Attendance = () => {
  const [data, setData] = useState(null);



  const call = async () => {
    await axios({
      url: "/getCourses",
    })
      .then((res) => {
        setData(res.data);
      })
      .then((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    call();
  }, []);

  return (
    <div className="attendance-container">
      <div className="title-attendance">
        <p>Subject Name</p>
        <p>Download Attendance</p>
      </div>
      <div className="over">
        <div className="all-attendance">
          {!data
            ? null
            : data.data.map((subject) => {
              return (
                <div className="single-attendance" key={subject._id}>
                  <p>{subject.courseName}</p>
                  <button
                    className="dwn-btn"
                    onClick={() => sendMail(subject._id)}
                  >
                    Download
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
