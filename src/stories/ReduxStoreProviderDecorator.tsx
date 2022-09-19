import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../state/tasksReducer';
import {todoListsReducer} from '../state/todoListsReducer';
import { v1 } from 'uuid';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
});

const initialGlobalState = {
    todoLists: [
        {id: 'todoList1', title: 'What to learn', filter: 'all'},
        {id: 'todoList2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todoList1']: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false}
        ],
        ['todoList2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false}
        ],
    }
};

export const StoryBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (<Provider store={StoryBookStore}>{storyFn()}</Provider>)}