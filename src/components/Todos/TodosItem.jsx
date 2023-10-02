import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { markTodoAsCompleted } from "../../Api/utils";

const TodosItem = ({ todo, onCompleted }) => {
  const handelCompleted = async () => {
    onCompleted(todo.id);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "10px",
        margin: "10px 0",
      }}
    >
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {todo.title}
        </Typography>
        <Typography
          variant="body2"
          sx={todo.completed ? { color: "green" } : { color: "red" }}
        >
          {todo.completed ? "Completed" : "Not Completed"}
        </Typography>
      </Box>
      {todo.completed ? (
        <CheckIcon color="success" />
      ) : (
        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={handelCompleted}
        >
          Mark Completed
        </Button>
      )}
    </Box>
  );
};

export default TodosItem;
