import * as appSelectors from './selectors';
import {asyncActions, slice} from './applicationReducer';
import {AppStatusesType as Type1} from '../../app/App.types';

const appReducer = slice.reducer;
const appAsyncActions = {
    ...asyncActions
}

export type AppStatusesType = Type1;

export {
    appSelectors,
    appReducer,
    appAsyncActions
};