import { createSlice } from "@reduxjs/toolkit";

const intialValue = {
    selectedChat: ""
}

const selectedChatSlice = createSlice({
    name: "selectedUser",
    initialState: intialValue,
    reducers: {
        setChat: (state, action) => {
            state.selectedChat = action.payload
        },
        clearChat: (state) => {
            state.selectedChat = ''
        }
    }
})

export const { setChat, clearChat } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;