import { createSlice } from "@reduxjs/toolkit";
const iitialValue = {
  allCategory: [],
  loadingCategory: false,
  allsubCategory: [],
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: iitialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
    setLoadingCategory: (state, action) => {
      state.loadingCategory = action.payload;
    },
    setAllSubCategory: (state, action) => {
      state.allsubCategory = [...action.payload];
    },
  },
});

export const { setAllCategory, setAllSubCategory, setLoadingCategory } =
  productSlice.actions;

export default productSlice.reducer;
