import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILink, IlinkWithOutShortUrl } from "../../types";
import axios from "axios";
import axiosApi from "../../axiosApi";
import { setNewLink } from "./linksSlice";

export const submitLink = createAsyncThunk<void, IlinkWithOutShortUrl>(
    'link/submitThunk',
    async(item, thunkAPI)=>{
        const {data} = await axiosApi.post<ILink | null>('/links', item);
        if(data){
            const newItem ={
                shortUrl:data.shortUrl,
                originalUrl:data.originalUrl
            }
            thunkAPI.dispatch(setNewLink(newItem))
        }
    }
);

export const redirect = createAsyncThunk<void, ILink>(
    'link/redirect',
    async(item)=>{
        await axiosApi.get(`/links/${item.shortUrl}`)
    }
)
