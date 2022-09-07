import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type ActionsType =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType;

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    payload: { id: string, },
};

type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    payload: { title: string, },
};

type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id: string,
        title: string,
    },
};

type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id: string,
        filter: FilterValuesType,
    }
};

export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.payload.title, filter: 'all' }];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let stateCopy = [...state];
            let todoList = stateCopy.find(f => f.id === action.payload.id);
            if (todoList) {
                todoList.title = action.payload.title;
            }
            return stateCopy;
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let stateCopy = [...state];
            let todoList = stateCopy.find(f => f.id === action.payload.id);
            if (todoList) {
                todoList.filter = action.payload.filter;
            }
            return stateCopy;
        }
        default:
            throw new Error("I don`t understand this action type");
    }
};

export const RemoveTodoList = (todoListId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todoListId, } };
};

export const AddTodoList = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', payload: { title, } };
};

export const ChangeTodoListTitle = (id: string, newTodoListTitle: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id: id, title: newTodoListTitle } };
};

export const ChangeTodoListFilter = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } };
};