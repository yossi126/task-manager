import React from "react";
import UserItem from "./UserItem";
import { users } from "../../dummy-data";

const Users = ({ searchQuery }) => {
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
      user.email.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
  );

  return (
    <>
      {filteredUsers.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </>
  );
};

export default Users;
