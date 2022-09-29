import {todoListsAPI, TodoListType} from '../../../api/todoListsAPI';
import {AppThunkType} from '../../../app/store';
import {AppStatusesType, setAppStatusAC, SetStatusActionType} from '../../../app/appReducer';
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils.";

const initialState: Array<TodoListDomainType> = [];

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: TodoListsActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.payload.todoLists.map(tl => {return {...tl, filter: 'all', entityStatus: 'idle'}})
        case 'ADD-TODOLIST':
            return [{...action.payload.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'DELETE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.payload.id ? {...tl, entityStatus: action.payload.status} : tl)
        default:
            return state;
    }
};

// todoLists action creators
export const setTodoListsAC = (todoLists: Array<TodoListType>) =>
    ({type: 'SET-TODOLISTS', payload: {todoLists}} as const);
export const addTodoListAC = (todoList: TodoListType) =>
    ({type: 'ADD-TODOLIST', payload: {todoList}} as const);
export const deleteTodoListAC = (todoListId: string) =>
    ({type: 'DELETE-TODOLIST', payload: {id: todoListId,}} as const);
export const changeTodoListTitleAC = (id: string, newTodoListTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', payload: {id: id, title: newTodoListTitle}} as const);
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const);
export const changeTodoListEntityStatusAC = (id: string, status: AppStatusesType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload: {id, status}} as const);

// todoLists thunk creators
export let fetchTodoListsTC = (): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todoListsAPI.getTodoLists()
        dispatch(setTodoListsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export let addTodoListTC = (title: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todoListsAPI.addTodoLists(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodoListAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export let deleteTodoListsTC = (todoListId: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
    try {
        await todoListsAPI.deleteTodoLists(todoListId)
        dispatch(deleteTodoListAC(todoListId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export let changeTodoListTitleTC = (id: string, title: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todoListsAPI.updateTodoLists(id, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTodoListTitleAC(id, title))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}

// types
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: AppStatusesType,
};
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type DeleteTodoListActionType = ReturnType<typeof deleteTodoListAC>
export type TodoListsActionsType =
    | SetTodoListsActionType
    | DeleteTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetStatusActionType
    | ReturnType<typeof changeTodoListEntityStatusAC>
