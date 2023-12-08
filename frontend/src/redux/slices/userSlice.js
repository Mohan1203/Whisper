import { createSlice } from "@reduxjs/toolkit";

const intialValue = {
    userName: "",
    profilepic: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState: intialValue,
    reducers: {
        setUser: (state, action) => {
            state.userName = action.payload.userName;
            state.profilepic = action.payload.profilepic;
        },
        clearUser: (state) => {
            state.userName = '',
                state.profilepic = ''
        }

    }
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;