import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
const PostItem = ({ post }) => {
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
        <Typography
          variant="button"
          display="block"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Title: {post.title}
        </Typography>
        <Divider />
        <Typography variant="body2">Body: {post.body}</Typography>
      </Box>
    </Box>
  );
};

export default PostItem;
