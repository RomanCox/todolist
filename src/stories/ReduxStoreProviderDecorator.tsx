import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../app/store';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../features/TodoListsList/TodoList/Task/tasksReducer';
import {todoListsReducer} from '../features/TodoListsList/TodoList/todoListsReducer';
import { v1 } from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todoListsAPI';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
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
        error: null
    }
};

export const StoryBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (<Provider store={StoryBookStore}>{storyFn()}</Provider>)}