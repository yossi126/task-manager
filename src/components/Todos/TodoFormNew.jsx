import React, { useState } from "react";
import { Box, Typography, Button, TextField, CssBaseline } from "@mui/material";

const TodoFormNew = ({ onAddTodo, onGoBack }) => {
  const [todoInput, setTodoInput] = useState("");
  const [inputError, setInputError] = useState(false);

  const handelAddTodo = () => {
    if (todoInput === "") {
      setInputError(true);
    } else {
      setInputError(false);
      onAddTodo(todoInput);
      onGoBack();
    }
  };

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
    if (e.target.value !== "") {
      setInputError(false);
    }
  };

  const handleCancel = () => {
    onGoBack();
  };

  return (
    <Box
      sx={{
        mt: "16px",
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
      <Typography variant="h6">Add new todo</Typography>
      <TextField
        variant="outlined"
        onChange={handleInputChange}
        error={inputError}
        label={inputError ? "Error" : "Title"}
        helperText={inputError ? "Incorrect entry." : ""}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button variant="outlined" sx={{ mr: "16px" }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handelAddTodo}>
          Add
        </Button>
      </Box>
      <CssBaseline />
    </Box>
  );
};
export default TodoFormNew;
