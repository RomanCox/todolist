import {authAPI} from '../../api/todoListsAPI';
import {LoginParamsType} from '../../api/todoListsAPI.types';
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from '../../utils/errorUtils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThunkErrorType} from '../../utils/reduxUtils.types';
import {appActions} from '../Common/Actions/AppActions';

const {setAppStatus} = appActions;

export const login = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, ThunkErrorType>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));

    try {
        const res = await authAPI.login(param);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return {isLoggedIn: true};
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI, false);
    }
});

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    const res = await authAPI.logout();
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return {isLoggedIn: false};
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    }
    catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI);
    }
});

export const asyncAuthActions = {
    login,
    logout
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
            })
    }
})

export const {setIsLoggedIn} = slice.actions;