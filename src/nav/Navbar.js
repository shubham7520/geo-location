import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Image from "../assets/logo1.png";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
    console.log("logout");
  }
  return (
    <div className="navContainer">
      <div className="app-title">
        <img src={Image} alt="logo" className="gkv-logo" />
      </div>
      <div className="nav-footer">
        <Link to="/" className="nav-home ">
          Home
        </Link>
        <Link to="/course" className="nav-course  ">
          Course
        </Link>
        <Link to="/class" className="nav-data  ">
          Class Data
        </Link>
        <Link to="/attendance" className="nav-download  ">
          Download Attendance
        </Link>
        <Link to="/create-course" className="nav-create  ">
          Create Course
        </Link>
      </div>
      <div className="user-name">
        <Box
          sx={{
            bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
            pb: open ? 2 : 0,
          }}
        >
          <ListItemButton
            alignItems="flex-start"
            onClick={() => setOpen(!open)}
            sx={{
              px: 3,
              pt: 1,
              pb: open ? 0 : 1,
              '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
            }}
          >
            <ListItemText
              primary={`Hi ${localStorage.getItem("name")}`}
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: 600,
                lineHeight: '10px',
                mb: '0px',
              }}
            />
            <KeyboardArrowDown
              sx={{
                mr: -2,
                opacity: 1,
                transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                transition: '0.2s',
              }}
            />
          </ListItemButton>
          {open &&
            <ListItemButton
              sx={{ py: 0, minHeight: 3, color: 'black', bgcolor: 'white', ":hover": { bgcolor: "#6D67E4", color: "white" } }}
            >
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                onClick={logOut}
              />
            </ListItemButton>
          }
        </Box>

      </div>
    </div>
  );
};

export default Navbar;
