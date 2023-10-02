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
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import {
  addUser,
  getAllUsers,
  deleteUser,
  getAllToDos,
  getAllPosts,
  deleteUserTodos,
  deleteUserPosts,
} from "./Api/utils";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [switchPostForm, setSwitchPostForm] = useState(false);
  const [switchTodoForm, setSwitchTodoForm] = useState(false);
  const [notShowAddUserForm, setNotShowAddUserForm] = useState(true);
  const [showTodosAndPostsForUser, setShowTodosAndPostsForUser] = useState({
    isShow: false,
    userId: null,
  });

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers();
        const todos = await getAllToDos();
        const posts = await getAllPosts();
        setAllUsers(response.data);
        setAllTodos(todos.data);
        setAllPosts(posts.data);
      } catch (error) {
        console.log(error);
        // TODO: Handle error
      }
    };

    fetchAllUsers();
  }, []);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
      user.email.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
  );

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

  const handelUpdateUser = (updatedUser) => {
    console.log(
      `Updated user: name - ${JSON.stringify(
        updatedUser.name
      )}, email - ${JSON.stringify(updatedUser.email)}`
    );
    setAllUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === updatedUser.id) {
          return { ...user, ...updatedUser };
        } else {
          return user;
        }
      })
    );
  };

  const handleDeleteUser = async (id) => {
    //filter all the todos and posts realted to the user and update the state
    const filteredTodos = allTodos.filter((todo) => todo.userId !== id);
    const filteredPosts = allPosts.filter((post) => post.userId !== id);
    try {
      const user = await deleteUser(id);
      // remove the deleted user from the list
      setAllUsers(allUsers.filter((user) => user.id !== id));
      setAllTodos(filteredTodos);
      setAllPosts(filteredPosts);
      // remove the right side in the ui with all the users related data
      setShowTodosAndPostsForUser({
        isShow: false,
        userId: null,
      });
      console.log(`Deleted user id: ${id}`);
    } catch (error) {
      console.log(error);
      // TODO: Handle error
    }
  };

  const handelAddUser = async (user) => {
    console.log(user);
    const result = await addUser(user);
    console.log("Result from json place holder: ", result.data);
    setAllUsers([...allUsers, user]);
  };

  const handelCompletedTodo = (todoId) => {
    const updatedTodos = allTodos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: true,
        };
      } else {
        return todo;
      }
    });
    setAllTodos(updatedTodos);
  };

  const handelAddTodo = (todoTitle) => {
    const randomNumber = Math.floor(Math.random() * 100) + 300;
    let newTodo = {
      userId: showTodosAndPostsForUser.userId,
      id: randomNumber,
      title: todoTitle,
      completed: false,
    };
    setAllTodos([...allTodos, newTodo]);
  };

  const handelAddForm = (title, body) => {
    const randomNumber = Math.floor(Math.random() * 100) + 300;
    let newPost = {
      userId: showTodosAndPostsForUser.userId,
      id: randomNumber,
      title: title,
      body: body,
    };
    setAllPosts([...allPosts, newPost]);
  };
  //console.log(allPosts);
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
              onShowTodosPosts={handelShowTodosAndPosts}
              selectedUser={showTodosAndPostsForUser.userId}
              filteredUsers={filteredUsers}
              onUpdateUser={handelUpdateUser}
              onDeleteUser={handleDeleteUser}
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
                    <TodoFormNew
                      onAddTodo={handelAddTodo}
                      onGoBack={() => setSwitchTodoForm(!switchTodoForm)}
                    />
                  ) : (
                    <Todos
                      todos={allTodos}
                      userId={showTodosAndPostsForUser.userId}
                      onCompletedTodo={handelCompletedTodo}
                    />
                  )}
                </Box>
                <Box>
                  <Button onClick={() => setSwitchPostForm(!switchPostForm)}>
                    {switchPostForm ? `Show all posts` : "Add Post"}
                  </Button>
                  {switchPostForm ? (
                    <PostFormNew
                      onAddForm={handelAddForm}
                      onGoBack={() => setSwitchPostForm(!switchPostForm)}
                    />
                  ) : (
                    <Posts
                      posts={allPosts}
                      userId={showTodosAndPostsForUser.userId}
                    />
                  )}
                </Box>
              </Box>
            )}

            {notShowAddUserForm ? null : (
              <>
                <Button onClick={() => switchToUserForm()}>Close</Button>
                <UserFormNew
                  onAddUser={handelAddUser}
                  onGoBack={() => switchToUserForm()}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
