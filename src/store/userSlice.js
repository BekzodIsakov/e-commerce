import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userData: {}, error: null },
  reducers: {
    addUser: function (state, action) {
      state.userData = action.payload;
    },
    setUserError: function (state, action) {
      state.error = action.payload;
    },
  },
});

export const { addUser, setUserError } = userSlice.actions;
export default userSlice.reducer;
