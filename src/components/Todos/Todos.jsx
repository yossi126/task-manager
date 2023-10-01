import React, { useState } from "react";
import TodosItem from "./TodosItem";
import TodoFormNew from "./TodoFormNew";
import { todos } from "../../dummy-data";
//mui
import { Button, Box, Typography } from "@mui/material";

const Todos = ({ userId }) => {
  const [displayForm, setDisplayForm] = useState(false);
  const filteredTodos = todos.filter((todo) => todo.userId === userId);

  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Todos
      </Typography>
      {filteredTodos.map((todo) => (
        <TodosItem key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default Todos;
