import React, { useState, useEffect } from "react";
import "./Course.css";
import axios from "../api/axios";
import { TiLockOpen, TiLockClosed } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

const SingleCoure = ({ Subject }) => {
  const [lock, setLock] = useState(Subject.isActive);
  const hiddenFileInput = React.useRef(null);
  const [isError, setIsError] = React.useState(false);
  const [courseId, setCourseId] = useState();

  const CourseLock = async (toggle) => {
    await axios.post(`/toggleCourseEnrollment`, {
      courseId: Subject._id,
      toggle: toggle
    })
      .then(function (res) {
        setLock(!lock);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const CourseDelete = async (item) => {

    await axios.delete(`/deleteCourseById?courseId=${item}`)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((error) => {
        console.log(error);
      })
    console.log("delete");
  }

  const fileChangeHandler = async (event) => {
    const fileUploaded = event.target.files[0];
    const fileExt = fileUploaded.name.split(".").pop();
    // console.log(fileExt, courseId);
    if (fileExt !== "csv" && fileExt !== "xlsx") {
      setIsError(true);
      return;
    }
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("emails", fileUploaded);
    await axios({
      method: "post",
      url: "/inviteStudentsToEnrollCourse",
      data: formData,
    })
      .then((res) => {
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  return (
    <div key={Subject._id} className="single-course">
      <div className="subjectname-course">{Subject.courseName}</div>
      <div className="course-code">
        <div className="subjectcode-course">
          {Subject.courseCode}
        </div>
      </div>
      <div className="add">
        <button onClick={() => {
          hiddenFileInput.current.click();
          setCourseId(Subject._id);
        }}>Invite
          <input ref={hiddenFileInput}
            onChange={fileChangeHandler}
            type="file"
            accept={[".xls", ".xlsx", ".csv"]}
            style={{ display: "none" }} />
        </button></div>
      <div className="course-lock">
        {lock ?
          <TiLockOpen size="1.6rem" color="green" onClick={() => CourseLock(!lock)} style={{ cursor: "pointer" }} />
          : <TiLockClosed size="1.6rem" color="#CD0404" onClick={() => CourseLock(!lock)} style={{ cursor: "pointer" }} />
        }
        <MdDelete size="1.5rem" color="#CD0404" onClick={() => { if (window.confirm(`Are You Sure Delete ${Subject.courseName} Course?`)) { CourseDelete(Subject._id) }; }} style={{ cursor: "pointer" }} />
      </div>
    </div>
  )
}


const Course = () => {
  const [apiData, setApiData] = useState(null);

  const call = async () => {
    await axios({
      url: "/getCourses",
    })
      .then((res) => {
        setApiData(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    call();
  }, []);

  return (
    <div className="class-Container">
      <div className="title-course">
        <p>Subject Name</p>
        <p>Subject Code</p>
        <p>Add Student</p>
        <p>Course Lock/Delete</p>
      </div>
      <div className="over">
        <div className="all-coursses">
          {!apiData
            ? null
            : apiData?.map((Subject) => {
              return (
                <SingleCoure key={Subject._id} Subject={Subject} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Course;
