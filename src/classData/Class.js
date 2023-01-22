import React from "react";
import "./Class.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useEffect, useState } from "react";

const Total = ({ id }) => {
  const [apiData, setApiData] = useState(null);
  const call = async () => {
    await axios({
      url: "/getClassesByCourseId",
      params: { courseId: `${id}` },
    })
      .then((res) => {
        setApiData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    call();
  }, []);

  return <div>{!apiData ? null : apiData.data.length}</div>;
};

const Class = () => {

  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handle = (id) => {
    navigate("/all-classes", {
      state: {
        baba: `${id}`,
      },
    });
  };
  const apiCall = async () => {
    await axios({
      url: "/getCourses",
    }).then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className="class-container">
      <div className="title-class">
        <p>Subject Name</p>
        <p>Total class</p>
      </div>
      <div className="over">
        <div className="all-classes">
          {!data
            ? null
            : data.data.map((subject) => {
              return (
                <Link
                  kay={subject._id}
                  to="/all-classes"
                  state={{ id: `${subject._id}` }}
                  className="single-subject"

                  onClick={() => handle(subject._id)}
                >
                  <p>{subject.courseName}</p>
                  <Total id={subject._id} />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Class;
