import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showIntroVideo: false,
  path: "iPhone_15_Pro",
  // path: "MacBook_Air",
};

const introVideoSlice = createSlice({
  name: "introVideo",
  initialState,
  reducers: {
    toggleIntroVideo(state, action) {
      state.showIntroVideo = action.payload ? true : false;
      state.path = action.payload || "";
    },
  },
});

export const { toggleIntroVideo } = introVideoSlice.actions;
export default introVideoSlice.reducer;
