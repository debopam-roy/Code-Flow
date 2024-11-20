import { createSlice } from "@reduxjs/toolkit";

const roomInitialValue = {
  username: "",
  roomId: "",
  password: "",
};

export const roomCredentialSlice = createSlice({
  name: "roomCredentials",
  initialState: roomInitialValue,
  reducers: {
    addCredentials: (state, action) => {
      state.username = action.payload.username;
      state.roomId = action.payload.roomId;
      state.password = action.payload.password;

      localStorage.setItem(
        "roomCredentials",
        JSON.stringify({
          username: action.payload.username,
          roomId: action.payload.roomId,
          password: action.payload.password,
        })
      );
    },
    removeCredentials: (state) => {
      state.username = "";
      state.roomId = "";
      state.password = "";

      localStorage.removeItem("roomCredentials");
    },
  },
});

export const { addCredentials, removeCredentials } =
  roomCredentialSlice.actions;
export default roomCredentialSlice.reducer;
