import {slice as tasksSlice, tasksAsyncActions} from './TodoList/Task/tasksReducer';
import {slice as todoListsSlice, todoListsAsyncActions} from './TodoList/todoListsReducer';
import {TodoListsList} from './TodoListsList';

const todoListsActions = {
    ...todoListsAsyncActions,
    ...todoListsSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

const todoListsReducer = todoListsSlice.reducer;
const tasksReducer = tasksSlice.reducer;

export {
    tasksActions,
    todoListsActions,
    TodoListsList,
    todoListsReducer,
    tasksReducer
};