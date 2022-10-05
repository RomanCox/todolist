import {setAppStatusAC} from '../../app/appReducer';
import {authAPI, LoginParamsType} from '../../api/todoListsAPI';
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dispatch} from 'redux';

const initialState = {
    isLoggedIn: false,
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    },
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;

//tasks thunk creators
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
    catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
    catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
