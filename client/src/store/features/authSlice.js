import {createSlice} from '@reduxjs/toolkit';

const sliceName = 'auth';

const initialState = {
    isLoggedIn: false,
    authenticating: false,
    user: null
};

const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {}
});

export default authSlice.reducer;