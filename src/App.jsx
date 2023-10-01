import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Users from "./components/Users/Users";
import Todos from "./components/Todos/Todos";
import Posts from "./components/Posts/Posts";
import PostFormNew from "./components/Posts/PostFormNew";
import TodoFormNew from "./components/Todos/TodoFormNew";
import UserFormNew from "./components/Users/UserFormNew";
//mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTodosAndPostsForUser, setShowTodosAndPostsForUser] = useState({
    isShow: false,
    userId: null,
  });
  const [switchPostForm, setSwitchPostForm] = useState(false);
  const [switchTodoForm, setSwitchTodoForm] = useState(false);
  const [notShowAddUserForm, setNotShowAddUserForm] = useState(true);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handelShowTodosAndPosts = (userId) => {
    // if the todos and posts are not shown at the first time
    if (showTodosAndPostsForUser.isShow === false) {
      const obj = { isShow: true, userId: userId };
      setShowTodosAndPostsForUser(obj);
      setNotShowAddUserForm(true);
      // if the todos and posts are shown and another user id was clicked, show another user data
    } else if (showTodosAndPostsForUser.userId !== userId) {
      const obj = { isShow: true, userId: userId };
      setShowTodosAndPostsForUser(obj);
      setNotShowAddUserForm(true);
    }
  };

  const switchToUserForm = () => {
    setNotShowAddUserForm(!notShowAddUserForm);
    setShowTodosAndPostsForUser({
      isShow: false,
      userId: null,
    });
  };

  return (
    <>
      <Navbar onSearch={handleSearch} onChangeUserForm={switchToUserForm} />
      <Box sx={{ flexGrow: 1, marginTop: 4 }}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography variant="h4">Users List</Typography>
            <Users
              searchQuery={searchQuery}
              onShowTodosPosts={handelShowTodosAndPosts}
              selectedUser={showTodosAndPostsForUser.userId}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {showTodosAndPostsForUser.isShow && (
              <Box>
                <Button
                  onClick={() =>
                    setShowTodosAndPostsForUser({
                      isShow: false,
                      userId: null,
                    })
                  }
                >
                  Close Section
                </Button>
                <h3>{`Todo's & Posts of ${showTodosAndPostsForUser.userId}`}</h3>
                <Box>
                  <Button onClick={() => setSwitchTodoForm(!switchTodoForm)}>
                    {switchTodoForm ? `Show all todos` : "Add todo"}
                  </Button>
                  {switchTodoForm ? (
                    <TodoFormNew />
                  ) : (
                    <Todos userId={showTodosAndPostsForUser.userId} />
                  )}
                </Box>
                <Box>
                  <Button onClick={() => setSwitchPostForm(!switchPostForm)}>
                    {switchPostForm ? `Show all posts` : "Add Post"}
                  </Button>
                  {switchPostForm ? (
                    <PostFormNew />
                  ) : (
                    <Posts userId={showTodosAndPostsForUser.userId} />
                  )}
                </Box>
              </Box>
            )}

            {notShowAddUserForm ? null : (
              <>
                <Button onClick={() => switchToUserForm()}>Close</Button>
                <UserFormNew />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
