import {AppRootStateType} from '../../utils/reduxUtils.types';

export const selectorIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;