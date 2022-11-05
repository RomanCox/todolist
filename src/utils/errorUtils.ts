import {ResponseType} from '../api/todoListsAPI.types';
import {AxiosError} from 'axios';
import {ThunkAPIType} from './errorUtils.types';
import {appActions} from '../features/Common/Actions/AppActions';

const {setAppError, setAppStatus} = appActions;

export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error occ'}));
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}));

    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors});
}

export const handleAsyncServerNetworkError = (err: any, thunkAPI: ThunkAPIType, showError = true) => {
    const error = err as AxiosError;
    if (showError) {
        thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}));
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}));

    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined});
};