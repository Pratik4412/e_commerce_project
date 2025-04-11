import { createSlice } from "@reduxjs/toolkit";
const iitialValue = {
  allCategory: [],
  subCategory: [],
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: iitialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
  },
});

export const { setAllCategory } = productSlice.actions;

export default productSlice.reducer;
