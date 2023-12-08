import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slices/userSlice";
import selectedChatReducer from "@/redux/slices/selectedchat";
import MessageReducer from "@/redux/slices/messagesSlice"
import chatsSlice from "@/redux/slices/chatSlice"
const store = configureStore({
    reducer: {
        user: userReducer,
        selectedChat: selectedChatReducer,
        messages: MessageReducer,
        chats: chatsSlice
    },

})

export default store;