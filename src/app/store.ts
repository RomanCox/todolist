import {applyMiddleware, CombinedState, combineReducers, createStore} from 'redux';
import {TodoListDomainType, TodoListsActionsType, todoListsReducer} from '../features/TodoListsList/TodoList/todoListsReducer';
import {TasksActionsType, tasksReducer, TasksStateType} from '../features/TodoListsList/TodoList/Task/tasksReducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppActionsType = TodoListsActionsType | TasksActionsType

export type AppThunkType<ReturnType = Promise<void>> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type DispatchType = ThunkDispatch<CombinedState<{todoLists: TodoListDomainType[], tasks: TasksStateType}>, unknown, AppActionsType>

// @ts-ignore
window.store = store;