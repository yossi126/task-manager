import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Users from "./components/Users/Users";
import Todos from "./components/Todos/Todos";

//mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log(searchQuery);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
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
            <Users searchQuery={searchQuery} />
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
            <Todos />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
