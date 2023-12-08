import { createSlice } from "@reduxjs/toolkit";

const intialValue = {
    messages: ''
}

const MessageSlice = createSlice({
    name: 'messages',
    initialState: intialValue,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        updateMessages: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },
        clerarMessage: (state) => {
            state.messages = ""
        }
    }

})

export const { setMessages, updateMessages, clerarMessage } = MessageSlice.actions

export default MessageSlice.reducer