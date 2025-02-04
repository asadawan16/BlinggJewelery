import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    setUser(state, action) {
      state.users = action.payload;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
