import {combineReducers} from 'redux';
import {tasksReducer, todoListsReducer} from '../features/TodoListsList';
import {appReducer} from '../features/Application';
import {authReducer} from '../features/Auth';

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});