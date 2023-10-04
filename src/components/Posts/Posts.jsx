import React from "react";
import PostItem from "./PostItem";
import { Typography } from "@mui/material";

const Posts = ({ userId, posts }) => {
  const filteredPosts = posts.filter((post) => post.userId === userId);

  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", textAlign: "center", mt: 2 }}
      >
        Posts - User {userId}
      </Typography>
      {filteredPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};

export default Posts;
