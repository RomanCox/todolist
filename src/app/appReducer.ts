import {authAPI} from '../api/todoListsAPI';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {setIsLoggedInAC} from '../features/Login/authReducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';



export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch, rejectWithValue}) => {
    const res = await authAPI.me();
    try {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'loading',
        error: null,
        isInitialized: false,
    } as InitialStateType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: AppStatusesType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: null | string}>) {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true;
        })
    }
});

export const appReducer = slice.reducer;

export const {setAppErrorAC, setAppStatusAC} = slice.actions;

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;

export type AppStatusesType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
    status: AppStatusesType,
    error: string | null,
    isInitialized: boolean,
};