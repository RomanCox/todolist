import {applyMiddleware, CombinedState, combineReducers, createStore} from 'redux';
import {TodoListDomainType, TodoListsActionsType, todoListsReducer} from '../features/TodoListsList/TodoList/todoListsReducer';
import {TasksActionsType, tasksReducer, TasksStateType} from '../features/TodoListsList/TodoList/Task/tasksReducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppActionsType, appReducer, InitialStateType} from './appReducer';

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AllAppActionsType = TodoListsActionsType | TasksActionsType | AppActionsType

export type AppThunkType<ReturnType = Promise<void>> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>
export type DispatchType = ThunkDispatch<CombinedState<{todoLists: TodoListDomainType[], tasks: TasksStateType, app: InitialStateType}>, unknown, AllAppActionsType>

// @ts-ignore
window.store = store;