import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null); // New state to store the selected file
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a FormData object to send the data as a multipart/form-data request
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("file", file); // Append the selected file to the form data

      let data = await axios.post("/api/v1/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data for file upload
        },
      });

      console.log(data);

      if (data.data.success) {
        alert("User registered successfully");
        navigate("/profile");
      } else {
        alert(data.data.message);
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
          Register
        </Typography>
        <TextField
          label="Name"
          name="name"
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
        {/* Add input for file upload */}
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
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
