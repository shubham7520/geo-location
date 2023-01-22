import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Box,
  Collapse,
  IconButton,
  TableRow,
} from "@mui/material";
import "./Allclasses.css";
import axios from "../api/axios";
import { useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { display } from "@mui/system";

function Row({ items, id }) {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState(null);

  const apiCall = async () => {
    await axios({
      url: "/getClassById",
      params: { classId: `${id}` },
    })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteClass = (id) => {
    axios.delete(`/deleteClassbyId?classId=${id}`)
      .then((res) => {
        console.log(res.data)
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {new Date(items.createdDate).toLocaleDateString("es-CL")}
        </TableCell>
        <TableCell>
          {new Date(items.createdDate).toLocaleTimeString("en-GB")}
        </TableCell>
        <TableCell>
          <MdDelete size="1.6rem" color="#CD0404" style={{ cursor: "pointer", marginLeft: "1rem" }} onClick={() => { if (window.confirm(`Are You Sure Delete Class?`)) { deleteClass(id) }; }} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ color: "red", fontWeight: "bold" }}>
                    <TableCell>S.N.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Registration Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!list
                    ? null
                    : list.data.students.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="center">
                            {item.registrationNo}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Allclasses() {
  const location = useLocation();
  const [apiData, setApiData] = useState(null);

  const call = async () => {
    await axios({
      url: "/getClassesByCourseId",
      params: { courseId: `${location.state.id}` },
    })
      .then((res) => {
        setApiData(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    call();
  }, []);

  return (
    <div className="upper-container">
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow className="table-title">
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Delete Class</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!apiData
              ? null
              : apiData.data.map((items) => {
                return <Row key={items._id} items={items} id={items._id} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
