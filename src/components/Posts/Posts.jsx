import React from "react";
import PostItem from "./PostItem";
import { Box, Typography, Button } from "@mui/material";

const Posts = ({ userId, posts }) => {
  const filteredPosts = posts.filter((post) => post.userId === userId);

  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Posts
      </Typography>
      {filteredPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};

export default Posts;
