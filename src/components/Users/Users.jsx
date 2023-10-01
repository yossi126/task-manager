import React, { useState, useEffect } from "react";
import UserItem from "./UserItem";
import {
  getAllUsers,
  deleteUser,
  deleteUserTodos,
  deleteUserPosts,
} from "../../Api/utils";
import { Alert } from "@mui/material";

const Users = ({ searchQuery, onShowTodosPosts, selectedUser }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await getAllUsers();
      setAllUsers(response.data);
    };
    fetchAllUsers();
  }, []);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
      user.email.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
  );

  const handelShowTodosAndPosts = (userId) => {
    onShowTodosPosts(userId);
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      // remove the deleted user from the list
      setAllUsers(allUsers.filter((user) => user.id !== id));
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); // set showAlert to false after 5 seconds
      }, 3000);
    } catch (error) {
      console.log(error);
      // TODO: Handle error
    }
  };

  const handelUpdateUser = async (userObj) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userObj.id) {
          return { ...user, ...userObj };
        } else {
          return user;
        }
      })
    );
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
