import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: {
    currentPage: 0,
    totalPages: 1,
    products: []
  },
}

export const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
        state.products = action.payload;
    },
    nextPage: (state) => {
        console.log(state.products.currentPage);
        if(state.products.currentPage < state.products.totalPages - 1)
            state.products.currentPage += 1;
    },
    prevPage: (state) => {
        if(state.products.currentPage > 0)
            state.products.currentPage -= 1;
    },
    setCurrenPage: (state, action) => {
        state.products.currentPage = action.payload;
    },
    lastPage: (state) => {
        state.products.currentPage = state.products.totalPages - 1;
    },
    firstPage: (state) => {
        state.products.currentPage = 0;
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setProducts, nextPage, prevPage, setCurrenPage, lastPage, firstPage } = productReducer.actions;

export default productReducer.reducer;