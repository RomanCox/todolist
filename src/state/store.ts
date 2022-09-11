import {combineReducers, createStore} from 'redux';
import {todoListsReducer} from './todoListsReducer';
import {tasksReducer} from './tasksReducer';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, );


// @ts-ignore
window.store = store;