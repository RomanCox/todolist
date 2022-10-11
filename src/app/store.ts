import {combineReducers} from 'redux';
import {todoListsReducer} from '../features/TodoListsList/TodoList/todoListsReducer';
import {tasksReducer} from '../features/TodoListsList/TodoList/Task/tasksReducer';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './appReducer';
import {authReducer} from '../features/Login/authReducer';
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

export type RootReducerType = typeof rootReducer;

export type AppRootStateType = ReturnType<RootReducerType>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppDispatchType = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatchType = useDispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

// @ts-ignore
window.store = store;