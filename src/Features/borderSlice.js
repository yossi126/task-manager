import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, completed: false },
  { id: 2, completed: false },
  { id: 3, completed: false },
  { id: 4, completed: false },
  { id: 5, completed: false },
  { id: 6, completed: false },
  { id: 7, completed: false },
  { id: 8, completed: false },
  { id: 9, completed: false },
  { id: 10, completed: false },
];

const borderSlice = createSlice({
  name: "border",
  initialState,
  reducers: {
    addUserBorder: (state, action) => {
      const newTodo = {
        id: state.length + 1,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleBorder: (state, action) => {
      // console.log(action.payload);
      const userBorder = state.find((obj) => obj.id === action.payload);

      // if (userBorder) {
      //   userBorder.completed = !userBorder.completed;
      // }
    },
  },
});

export const { addUserBorder, toggleBorder } = borderSlice.actions;
export default borderSlice.reducer;
