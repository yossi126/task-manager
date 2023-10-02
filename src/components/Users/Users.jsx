import React, { useState, useEffect } from "react";
import UserItem from "./UserItem";
import { Alert } from "@mui/material";

const Users = ({
  onShowTodosPosts,
  selectedUser,
  filteredUsers,
  onUpdateUser,
  onDeleteUser,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handelShowTodosAndPosts = (userId) => {
    onShowTodosPosts(userId);
  };

  const handleDeleteUser = async (id) => {
    onDeleteUser(id);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false); // set showAlert to false after 5 seconds
    }, 3000);
  };

  const handelUpdateUser = async (userObj) => {
    onUpdateUser(userObj);
  };

  return (
    <>
      {showAlert && ( // display the alert if showAlert is true
        <Alert severity="info">User has been deleted</Alert>
      )}
      {filteredUsers.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onShowTodosAndPosts={handelShowTodosAndPosts}
          isSelected={user.id === selectedUser}
          onDeleteUser={handleDeleteUser}
          onUpdateUser={handelUpdateUser}
        />
      ))}
    </>
  );
};

export default Users;
