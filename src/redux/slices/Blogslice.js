import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogsList: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get("http://localhost:3000/blogs");
  return response.data;
});

export const postBlogs = createAsyncThunk("blogs/postBlogs", async (data) => {
    const response = await axios.post("http://localhost:3000/blogs",data);
    return response.data;
  });

  export const deleteBlogs = createAsyncThunk("blogs/deleteBlogs", async (id) => {
    const response = await axios.delete(`http://localhost:3000/blogs/${id}`);
    console.log(id)
    return response.data;
  });

  export const updateBlogs = createAsyncThunk("blogs/updateBlogs", async (id) => {
    const response = await axios.patch(`http://localhost:3000/blogs/${id}/`);
    return response.data;
  });



const BlogSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogsList = action.payload;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    builder.addCase(postBlogs.pending, (state) => {
      state.isLoading = true;
    }); 

    builder.addCase(postBlogs.fulfilled, (state) => {
      state.isLoading = false;
      
    });
    builder.addCase(postBlogs.rejected, (state, action) => {
      state.isLoading = false; 
      state.isError = true;
      state.errorMessage = action.error.message;
  });
    builder.addCase(deleteBlogs.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteBlogs.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(deleteBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    }); 
    builder.addCase(updateBlogs.pending, (state,) => {
      state.isLoading = true;
    });

    builder.addCase(updateBlogs.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(updateBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

       
  },
});

export default BlogSlice.reducer;
