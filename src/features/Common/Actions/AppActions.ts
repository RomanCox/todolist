import {createAction} from '@reduxjs/toolkit';
import {AppStatusesType} from '../../Application';

const setAppStatus = createAction<{ status: AppStatusesType }>('common/setAppStatus');
const setAppError = createAction<{ error: string | null }>('common/setAppError');

export const appActions = {setAppStatus, setAppError};