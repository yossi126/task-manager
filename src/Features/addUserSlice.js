import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
};

const addUserSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { addUser } = addUserSlice.actions;
export default addUserSlice.reducer;
