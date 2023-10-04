import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { dummyUser } from "../../dummy-data";

const UserFormNew = ({ onAddUser, onGoBack, currentLength }) => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [nameError, setInputNameError] = useState(false);
  const [emailError, setInputEmailError] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handelSubmit = () => {
    if (nameInput === "") {
      setInputNameError(true);
    } else if (!emailRegex.test(emailInput)) {
      setInputEmailError(true);
    } else {
      setInputNameError(false);
      setInputEmailError(false);
      let user = {
        ...dummyUser,
        id: currentLength + 1,
        name: nameInput,
        email: emailInput,
      };
      onAddUser(user);
      onGoBack();
    }
  };

  const handleInputNameChange = (e) => {
    setNameInput(e.target.value);
    if (e.target.value !== "") {
      setInputNameError(false);
    }
  };

  const handleInputEmailChange = (e) => {
    setEmailInput(e.target.value);
    if (e.target.value !== "") {
      setInputEmailError(false);
    }
  };

  const handleCancel = () => {
    onGoBack();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          width: "100%",
          height: "100%",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h6">Add New User</Typography>
        <TextField
          variant="outlined"
          value={nameInput}
          onChange={handleInputNameChange}
          error={nameError}
          label={nameError ? "Error" : "Name"}
          helperText={nameError ? "Please provide user name." : ""}
        />
        <TextField
          variant="outlined"
          value={emailInput}
          onChange={handleInputEmailChange}
          error={emailError}
          label={emailError ? "Error" : "Email"}
          helperText={emailError ? "Please provide valid email." : ""}
        />
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button variant="outlined" sx={{ mr: "16px" }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            type="button"
            onClick={handelSubmit}
          >
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserFormNew;
