import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import API_ROUTES from '../../constants/apiRoutes';
import Status from '../../constants/status';
import axiosInstance from '../../helpers/api';

const sliceName = 'auth';

const initialState = {
    isLoggedIn: false,
    status: Status.IDLE,
    user: null,
    error: null
};

export const registerAction = createAsyncThunk(
    `${sliceName}/registerAction`,
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`${API_ROUTES.auth}/register`, payload);
            return response.data;
        } catch (error) {
            console.log(error.response)
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const loginAction = createAsyncThunk(
    `${sliceName}/loginAction`,
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`${API_ROUTES.auth}/login`, payload);
            const userRes = await axiosInstance.get(`${API_ROUTES.user}/${response.data.user_id}`);
            return {...response.data, user: userRes.data};
        } catch (error) {
            console.log(error.response)
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const getUserInfo = createAsyncThunk(
    `${sliceName}/getUserInfo`,
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`${API_ROUTES.user}/${payload}`);
            return response.data;
        } catch (error) {
            console.log(error.response)
            if(!error.response){
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        clearStatus: (state, action) => {
            state.status = Status.IDLE
        },
        logOut: (state, action) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(registerAction.rejected, (state, action)=>{
                state.status = Status.ERROR;
                state.error = action.payload;
            })
            .addCase(registerAction.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.error = null;
            });
        builder
            .addCase(loginAction.pending, (state) => {
                state.status = Status.PENDING;
            })
            .addCase(loginAction.rejected, (state, action)=>{
                state.status = Status.ERROR;
                state.error = action.payload;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.error = null;
                state.user = action.payload.user;
                state.isLoggedIn = true;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user_id', action.payload.user_id);
            })
        builder.addCase(getUserInfo.fulfilled, (state, action)=> {
            state.user = action.payload;
            state.isLoggedIn = true;
        })
    }
});

export default authSlice.reducer;
export const { clearStatus, logOut } = authSlice.actions
