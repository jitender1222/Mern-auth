import React from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import "../App.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Box bgcolor={"blue"} color="white" sx={{ fontWeight: "bold" }}>
        <Toolbar sx={{ justifyContent: "space-between", cursor: "pointer" }}>
          <Typography variant="h4">Mern</Typography>
          <ul className="inner-ul">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </Toolbar>
      </Box>
    </>
  );
};

export default Header;
