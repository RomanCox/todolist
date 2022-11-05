import * as authSelectors from './selectors';
import {Login} from './Login';
import {asyncAuthActions, slice} from './authReducer';

const authActions = {
    ...asyncAuthActions,
    ...slice.actions
}

const authReducer = slice.reducer;

export {
    authSelectors,
    Login,
    authActions,
    authReducer
};