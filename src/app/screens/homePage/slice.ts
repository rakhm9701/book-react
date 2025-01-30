import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  bestSellers: [],
  kidsBooks: [],
  newBooks: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setBestSellers: (state, action) => {
      state.bestSellers = action.payload;
    },
    setKidsBooks: (state, action) => {
      state.kidsBooks = action.payload;
    },
    setNewBooks: (state, action) => {
      state.newBooks = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setBestSellers, setKidsBooks, setNewBooks, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
