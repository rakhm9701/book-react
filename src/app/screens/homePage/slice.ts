import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";


const initialState: HomePageState = {
  bestSellers: [],
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setBestSellers: (state, action) => {
      state.bestSellers = action.payload;
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setBestSellers, setNewDishes, setTopUsers } =
  homePageSlice.actions;

  const HomePageReducer = homePageSlice.reducer;
  export default HomePageReducer