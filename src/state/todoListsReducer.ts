import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type ActionsType =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType;

const initialState: Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD-TODOLIST': {
            return [{id: action.payload.todoListId, title: action.payload.title, filter: 'all'}, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const stateCopy = [...state];
            let todoList = stateCopy.find(f => f.id === action.payload.id);
            if (todoList) {
                todoList.title = action.payload.title;
            }
            return stateCopy;
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl);
        }
        default:
            return state;
    }
};

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>;
export const removeTodoListAC = (todoListId: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id: todoListId,}} as const;
};

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>;
export const addTodoListAC = (title: string) => {
    return {type: 'ADD-TODOLIST', payload: {title, todoListId: v1(),}} as const;
};

export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>;
export const changeTodoListTitleAC = (id: string, newTodoListTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id: id, title: newTodoListTitle}} as const;
};

export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>;
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const;
};