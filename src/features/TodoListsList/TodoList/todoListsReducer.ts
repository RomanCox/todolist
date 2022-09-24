import {todoListsAPI, TodoListType} from '../../../api/todoListsAPI';
import {AppThunkType} from '../../../app/store';

const initialState: Array<TodoListDomainType> = [];

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: TodoListsActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.payload.todoLists.map(tl => {return {...tl, filter: 'all'}})
        case 'ADD-TODOLIST':
            return [{...action.payload.todoList, filter: 'all'}, ...state]
        case 'DELETE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
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

// todoLists thunk creators
export let fetchTodoListsTC = (): AppThunkType => async dispatch => {
    try {
        const res = await todoListsAPI.getTodoLists()
        dispatch(setTodoListsAC(res.data))
    } catch (e: any) {
        throw new Error(e)
    }
}
export let deleteTodoListsTC = (todoListId: string): AppThunkType => async dispatch => {
    try {
        await todoListsAPI.deleteTodoLists(todoListId)
        dispatch(deleteTodoListAC(todoListId))
    } catch (e: any) {
        throw new Error(e)
    }
}
export let addTodoListTC = (title: string): AppThunkType => async dispatch => {
    try {
        const res = await todoListsAPI.addTodoLists(title)
        dispatch(addTodoListAC(res.data.data.item))
    } catch (e: any) {
        throw new Error(e)
    }
}
export let changeTodoListTitleTC = (id: string, title: string): AppThunkType => async dispatch => {
    try {
        await todoListsAPI.updateTodoLists(id, title)
        dispatch(changeTodoListTitleAC(id, title))
    } catch (e: any) {
        throw new Error(e)
    }
}

// types
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
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
