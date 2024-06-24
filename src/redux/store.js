import { configureStore } from "@reduxjs/toolkit";
import Blogslice from "./slices/Blogslice";

const store = configureStore({
    reducer:{
        blog:Blogslice
    }
    ,devTools:true
})

export default store