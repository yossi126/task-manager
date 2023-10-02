import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { dummyUser } from "../../dummy-data";

const UserFormNew = ({ onAddUser, onGoBack }) => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handelSubmit = () => {
    let user = {
      ...dummyUser,
      id: Math.floor(Math.random() * 89) + 11,
      name: nameInput,
      email: emailInput,
    };
    onAddUser(user);
    onGoBack();
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
          label="Name"
          variant="outlined"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            variant="outlined"
            color="warning"
            sx={{ mr: "16px" }}
            onClick={handleCancel}
          >
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
