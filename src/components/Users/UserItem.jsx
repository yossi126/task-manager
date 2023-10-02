import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { updateUser } from "../../Api/utils";
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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function UserItem({
  user,
  onShowTodosAndPosts,
  isSelected,
  onDeleteUser,
  onUpdateUser,
}) {
  const [nameInput, setNameInput] = useState(user.name);
  const [emailInput, setEmailInput] = useState(user.email);
  const [showOtherData, setShowOtherData] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // new state variable

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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: nameInput,
      email: emailInput,
    };
    try {
      const response = await updateUser(user.id, updatedUser);
      //console.log(response.data);
      // TODO: Handle successful update
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false); // set showAlert to false after 5 seconds
      }, 3000);
      onUpdateUser(response.data);
    } catch (error) {
      console.log(error);
      // TODO: Handle error
    }
  };

  const handleDelete = () => {
    setShowConfirmDialog(true); // show the confirmation dialog
  };

  const handleConfirmDelete = () => {
    setShowConfirmDialog(false); // hide the confirmation dialog
    onDeleteUser(user.id); // call the onDeleteUser function with the user id
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false); // hide the confirmation dialog
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
          {showAlert && ( // display the alert if showAlert is true
            <Alert severity="success" sx={{ marginTop: "10px" }}>
              User has been updated
            </Alert>
          )}
        </Box>

        <form onSubmit={handleUpdateSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="name"
                variant="outlined"
                fullWidth
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                variant="outlined"
                fullWidth
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
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
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </form>
        <Dialog open={showConfirmDialog} onClose={handleCancelDelete}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this user and all his data?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button onClick={handleConfirmDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
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
