import React, { useRef } from "react";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import "./Home.css";


const SingleClass = ({ subject }) => {
  const [classStarted, setclassStarted] = useState(subject.activeClass);
  const radiusRef = useRef(null);


  const getLocation = async (item) => {

    navigator.geolocation.getCurrentPosition((location) => {
      // console.log(location);
      axios.post(`/startClass`, {
        courseId: item._id,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        radius: !radiusRef.current.value ? item.radius : radiusRef.current.value,
      })
        .then(function (res) {
          setclassStarted(true);
        })
        .catch(function (error) {
          console.log(error);

        });
    });

  };

  const endClassHandler = async (item) => {
    await axios.post('/dismissClass', { courseId: item })
      .then(function (res) {
        // console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setclassStarted(false);
  };

  return (
    <div key={subject._id} className="single-class">
      <div className="subjectname-home">{subject.courseName}</div>
      <div className="inputradius-home">
        <input
          type="number"
          placeholder={`radius ${subject.radius}m`}
          className="input-radius"
          ref={radiusRef}
        />
      </div>
      <div className="btn-home">
        {classStarted ?
          <button className="end-btn" onClick={() => endClassHandler(subject._id)}>End</button>
          : <button className="start-btn" onClick={() => getLocation(subject)}>Start</button>}

      </div>
    </div>
  )
}


const Home = () => {
  const [apiData, setApiData] = useState(null);

  const call = async () => {
    await axios({
      url: "/getCourses",
    }).then((res) => {
      // console.log(res.data);
      setApiData(res.data);
    });
  };
  useEffect(() => {
    call();
  }, []);

  return (
    <div className="home-container">
      <div className="title-home">
        <p>Subject Name</p>
        <p>Radius</p>
        <p>Class Start/Stop</p>
      </div>
      <div className="over">
        <div className="all-coursses-home">
          {!apiData
            ? null
            : apiData.data.map((subject) => {
              return (
                <SingleClass key={subject._id} subject={subject} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
