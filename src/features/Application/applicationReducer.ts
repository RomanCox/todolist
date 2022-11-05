import {authAPI} from '../../api/todoListsAPI';
import {handleAsyncServerNetworkError} from '../../utils/errorUtils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {InitialStateType} from '../../app/App.types';
import {setIsLoggedIn} from '../Auth/authReducer';
import {ThunkErrorType} from '../../utils/reduxUtils.types';
import {appActions} from '../Common/Actions/AppActions';

const {setAppStatus, setAppError} = appActions;

export const initializeApp = createAsyncThunk<void, void, ThunkErrorType>('application/initializeApp', async (param, thunkAPI) => {
    const res = await authAPI.me();
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedIn({value: true}));
        }
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI);
    }
});

export const asyncActions = {
    initializeApp
}

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false,
    } as InitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true;
            })
            .addCase(setAppStatus, (state, action) => {
                state.status = action.payload.status;
            })
            .addCase(setAppError, (state, action) => {
                state.error = action.payload.error;
            })
    }
});