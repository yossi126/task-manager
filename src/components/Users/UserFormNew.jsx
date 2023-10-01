import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

const UserFormNew = () => {
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
        <TextField label="Name" variant="outlined" />
        <TextField label="Email" variant="outlined" />
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button variant="outlined" color="warning" sx={{ mr: "16px" }}>
            Cancel
          </Button>
          <Button variant="contained" color="success">
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserFormNew;
