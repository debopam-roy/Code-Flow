import { configureStore } from "@reduxjs/toolkit";
import roomCredentialSlice from "../features/Credentials/RoomCredentialSlice";

const store = configureStore({
  reducer: {
    roomCredentials: roomCredentialSlice,
  },
});

export default store;
