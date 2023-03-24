import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await axios.post("/api/v1/user/login", {
        email: email,
        password: password,
      });
      console.log(data);

      if (data) {
        alert("User Login successfully");
        // navigate("/login");
      }
      if (data.success === false) {
        alert("User is already registered Please Login to continue");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Typography variant="h2" sx={{ mb: 4 }}>
          Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          label="Password"
          name="password"
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default Register;
