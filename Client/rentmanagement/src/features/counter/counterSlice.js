import { createSlice  } from "@reduxjs/toolkit";

export const counterSlice =create({
    name:'counter',
    initialState:{
        value:0,
    },
    reducers:{
        increment:(state) =>{
            state.value+=1
        }
    }
})