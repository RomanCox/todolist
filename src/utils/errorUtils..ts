import {setAppErrorAC, setAppStatusAC, SetErrorActionType, SetStatusActionType} from '../app/appReducer';
import {ResponseType} from '../api/todoListsAPI';
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occ'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}