import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import API_ROUTES from '../../constants/apiRoutes';
import Status from '../../constants/status';

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
            const response = await axios.post(`${API_ROUTES.auth}/register`, payload);
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
            })
    }
});

export default authSlice.reducer;
export const { clearStatus } = authSlice.actions
