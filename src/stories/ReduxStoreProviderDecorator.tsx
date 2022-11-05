import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType, RootReducerType} from '../utils/reduxUtils.types';
import {combineReducers} from 'redux';
import {tasksReducer} from '../features/TodoListsList';
import {todoListsReducer} from '../features/TodoListsList';
import { v1 } from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todoListsAPI.types';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from '../features/Application';
import {authReducer} from '../features/Auth';
import {configureStore} from '@reduxjs/toolkit';
import {HashRouter} from 'react-router-dom';

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
});

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: 'todoList1', title: 'What to learn', entityStatus: 'idle', filter: 'all', order: 0, addedDate: ''},
        {id: 'todoList2', title: 'What to buy', entityStatus: 'loading', filter: 'all', order: 0, addedDate: ''}
    ],
    tasks: {
        ['todoList1']: [
            {id: v1(), title: 'CSS&HTML', status: TaskStatuses.Completed, completed: true, todoListId: 'todoListId1', priority: TaskPriorities.Low, description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
            {id: v1(), title: 'JS', status: TaskStatuses.New, completed: false, todoListId: 'todoListId1', priority: TaskPriorities.Low, description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
        ],
        ['todoList2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, completed: true, todoListId: 'todoList2', priority: TaskPriorities.Low, description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
            {id: v1(), title: 'Bread', status: TaskStatuses.New, completed: false, todoListId: 'todoList2', priority: TaskPriorities.Low, description: '', startDate: '', deadline: '', order: 0, addedDate: ''}
        ],
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false,
    },
    auth: {
        isLoggedIn: false,
    },
};

export const StoryBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (<Provider store={StoryBookStore}>{storyFn()}</Provider>)}

export const HashRouterDecorator = (storyFn: any) => {
    return (<HashRouter>{storyFn()}</HashRouter>)}