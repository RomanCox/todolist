import {InitialStateType} from '../../app/App.types';
import {appReducer, appAsyncActions} from './';
import {appActions} from '../Common/Actions/AppActions';

const {setAppError, setAppStatus} = appActions;

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false,
    }
});

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppError({error: 'some error'}));

    expect(endState.error).toBe('some error');
});

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}));

    expect(endState.status).toBe('loading');
});

test('correct isInitialized should be set', () => {
    const endState = appReducer(startState, appAsyncActions.initializeApp.fulfilled(undefined,'requestId'));

    expect(endState.isInitialized).toBeTruthy();
});