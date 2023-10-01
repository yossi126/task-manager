import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";

function UserItem({ user, onShowTodosAndPosts, isSelected }) {
  const [showOtherData, setShowOtherData] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // check if the users todos are completed
  const checkIsCompleted = async (id) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/?userId=${id}`
    );
    for (const element of response.data) {
      if (element.completed === false) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const fetchIsCompleted = async () => {
      const completed = await checkIsCompleted(user.id);
      setIsCompleted(completed);
    };
    fetchIsCompleted();
  }, [user.id]);

  const showTodosAndPosts = (userId) => {
    onShowTodosAndPosts(userId);
  };

  const handleNameChange = (event) => {};

  const handleEmailChange = (event) => {};

  const handleUpdate = () => {
    // TODO: Implement update logic
  };

  const handleDelete = () => {
    // TODO: Implement delete logic
  };

  return (
    <Card
      sx={{
        border: `2px solid ${isCompleted ? "green" : "red"}`,
        marginBottom: "20px",
        maxWidth: "600px",
        backgroundColor: isSelected ? "#ffd699" : null,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            component="button"
            variant="body1"
            onClick={() => {
              showTodosAndPosts(user.id);
            }}
          >
            {user.id}
          </Link>
        </Box>
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="name"
                variant="outlined"
                fullWidth
                value={user.name}
                // onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                variant="outlined"
                fullWidth
                value={user.email}
                // onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                onMouseOver={() => setShowOtherData(!showOtherData)}
                onMouseLeave={() => setShowOtherData(!showOtherData)}
              >
                Other Data
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      {showOtherData && (
        <CardContent>
          <List>
            <ListItem>
              <ListItemText
                primary={"Street"}
                secondary={user.address.street}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={"City"} secondary={user.address.city} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Zip code"}
                secondary={user.address.zipcode}
              />
            </ListItem>
          </List>
        </CardContent>
      )}
    </Card>
  );
}

export default UserItem;
