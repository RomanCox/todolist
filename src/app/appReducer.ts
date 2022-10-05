import {authAPI} from '../api/todoListsAPI';
import {handleServerAppError} from '../utils/errorUtils';
import {setIsLoggedInAC} from '../features/Login/authReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from './store';

export type InitialStateType = {
    status: AppStatusesType,
    error: string | null,
    isInitialized: boolean,
}

const initialState: InitialStateType = {
    status: 'loading',
    error: null,
    isInitialized: false,
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: AppStatusesType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: null | string}>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
});

export const appReducer = slice.reducer;

export const {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions;

export const initializeAppTC = () => async (dispatch: AppDispatch) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}));

    } else {
        handleServerAppError(res.data, dispatch)
    }
    dispatch(setAppInitializedAC({isInitialized: true}));
}

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>

export type AppStatusesType = 'idle' | 'loading' | 'succeeded' | 'failed';