import React from "react";
import UserItem from "./UserItem";
import { users } from "../../dummy-data";

const Users = ({ searchQuery, onShowTodosPosts, selectedUser }) => {
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
      user.email.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
  );

  const handelShowTodosAndPosts = (userId) => {
    onShowTodosPosts(userId);
  };

  return (
    <>
      {filteredUsers.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onShowTodosAndPosts={handelShowTodosAndPosts}
          isSelected={user.id === selectedUser}
        />
      ))}
    </>
  );
};

export default Users;
