import { createSlice } from "@reduxjs/toolkit";

const intialValue = {
    chats: ""
}

const chatsSlice = createSlice({
    name: "chats",
    initialState: intialValue,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        updateChats: (state, action) => {
            state.chats = [...state.chats, action.payload]
        },
        clearChats: (state) => {
            state.chats = ''
        }
    }
})

export const { setChats, updateChats, clearChats } = chatsSlice.actions;

export default chatsSlice.reducer;