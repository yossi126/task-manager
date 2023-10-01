import React from "react";
import { Box, Typography, Button } from "@mui/material";

const TodosItem = ({ todo }) => {
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
      <Button variant="contained" sx={{ ml: "auto" }}>
        Mark Completed
      </Button>
    </Box>
  );
};

export default TodosItem;
