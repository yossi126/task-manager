import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

const PostFormNew = ({ onAddForm, onGoBack }) => {
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [input1Error, setInput1Error] = useState(false);
  const [input2Error, setInput2Error] = useState(false);

  const handelAddPost = () => {
    if (formTitle === "") {
      setInput1Error(true);
    } else if (formBody === "") {
      setInput2Error(true);
    } else {
      setInput1Error(false);
      setInput2Error(false);
      onAddForm(formTitle, formBody);
      onGoBack();
    }
  };

  const handleInputTitleChange = (e) => {
    setFormTitle(e.target.value);
    if (e.target.value !== "") {
      setInput1Error(false);
    }
  };

  const handleInputBodyChange = (e) => {
    setFormBody(e.target.value);
    if (e.target.value !== "") {
      setInput2Error(false);
    }
  };

  const handleCancel = () => {
    onGoBack();
  };

  return (
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
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Typography variant="h6">Add new post</Typography>
      <TextField
        variant="outlined"
        onChange={handleInputTitleChange}
        error={input1Error}
        label={input1Error ? "Error" : "Title"}
        helperText={input1Error ? "Incorrect entry." : ""}
      />
      <TextField
        variant="outlined"
        onChange={handleInputBodyChange}
        error={input2Error}
        label={input2Error ? "Error" : "Body"}
        helperText={input2Error ? "Incorrect entry." : ""}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button variant="outlined" sx={{ mr: "16px" }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handelAddPost}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default PostFormNew;
