import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = 'https://api.elchocrud.pro/api/v1/826635190e02da217538b69666aa2c15/data';

const initialState = {
  data: [],
  isLoading: false,
  error: "",
};

export const postReq = createAsyncThunk("post/API", async (newProduct) => {
     try {
    const response = await axios.post(API, newProduct);
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const deleteReq = createAsyncThunk("delete/API", async (_id) => {
    try {
    const response = await axios.delete(`${API}/${_id}`);
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const getReq = createAsyncThunk("get/API", async () => {
    try {
    const response = await axios(API);
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

export const editReq = createAsyncThunk("edit/API", async (updatedProduct) => {
    try {
    const response = await axios.put(`${API}/${updatedProduct._id}`, updatedProduct);
    return response.data;
    } catch (error) {
    throw Error(error.message);
  }
});

const TodoSlices = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(postReq.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.isLoading = false;
      })
        .addCase(postReq.pending, (state) => {
        state.isLoading = true;
      })

          .addCase(postReq.rejected, (state, action) => {
        state.error = action.error.message || "Error";
        state.isLoading = false;
      })

       .addCase(getReq.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })

           .addCase(getReq.pending, (state) => {
        state.isLoading = true;
      })

        .addCase(getReq.rejected, (state, action) => {
        state.error = action.error.message || "Error";
        state.isLoading = false;
      })

         .addCase(deleteReq.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item._id !== action.meta.arg);
        state.isLoading = false;
      })

      .addCase(deleteReq.pending, (state) => {
        state.isLoading = true;
      })

        .addCase(deleteReq.rejected, (state, action) => {
        state.error = action.error.message || "Error";
        state.isLoading = false;
      })

      // EDIT

        .addCase(editReq.fulfilled, (state, action) => {
        const index = state.data.findIndex(item => item._id === action.payload._id);
             if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.isLoading = false;
      })

        .addCase(editReq.pending, (state) => {
        state.isLoading = true;
      })
      
        .addCase(editReq.rejected, (state, action) => {
        state.error = action.error.message || "Error";
        state.isLoading = false;
      });
  },
});

export default TodoSlices.reducer;
