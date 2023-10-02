import React, { useState } from "react";
import TodosItem from "./TodosItem";
//mui
import { Button, Box, Typography } from "@mui/material";

const Todos = ({ userId, todos, onCompletedTodo }) => {
  const filteredTodos = todos.filter((todo) => todo.userId === userId);

  const handelCompleted = (todoId) => {
    onCompletedTodo(todoId);
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Todos
      </Typography>
      {filteredTodos.map((todo) => (
        <TodosItem key={todo.id} todo={todo} onCompleted={handelCompleted} />
      ))}
    </>
  );
};

export default Todos;
