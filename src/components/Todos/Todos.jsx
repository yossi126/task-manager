import React from "react";
import TodosItem from "./TodosItem";
//mui
import { Typography } from "@mui/material";

const Todos = ({ userId, todos, onCompletedTodo, allCompleted }) => {
  const filteredTodos = todos.filter((todo) => todo.userId === userId);

  const handelCompleted = (todoId) => {
    onCompletedTodo(todoId);
  };

  const isCompleted = () => {
    for (const element of filteredTodos) {
      if (element.completed === false) {
        return false;
      }
    }
    return true;
  };

  if (isCompleted()) {
    console.log(`all todos for user ${userId} are completed `);
    allCompleted(userId);
  }

  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", textAlign: "center", mt: 2 }}
      >
        Todos - User {userId}
      </Typography>
      {filteredTodos.map((todo) => (
        <TodosItem key={todo.id} todo={todo} onCompleted={handelCompleted} />
      ))}
    </>
  );
};

export default Todos;
