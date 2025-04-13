import { createSlice } from "@reduxjs/toolkit";
import { ILink } from "../../types";

interface LinkSlice{
    oneLink: ILink | null,
    fetchLoading:boolean
}

const initialState:LinkSlice={
    oneLink:null,
    fetchLoading:false
}

const linkSlice = createSlice({
    name:'link',
    initialState,
    reducers:{
        setNewLink:(state, {payload})=>{
            state.oneLink = payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase
           
    },
    selectors:{
        selectOneLink:(state => state.oneLink)
    }
});

export const linkReducer = linkSlice.reducer;
export const {setNewLink} = linkSlice.actions
export const {selectOneLink}= linkSlice.selectors