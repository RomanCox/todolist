import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type ActionsType =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType;


export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case 'ADD-TODOLIST': {
            return [{id: action.payload.todoListId, title: action.payload.title, filter: 'all' }, ...state];
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

export type RemoveTodoListActionType = ReturnType<typeof removeTodoList>;
export const removeTodoList = (todoListId: string) => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todoListId, } } as const;
};

export type AddTodoListActionType = ReturnType<typeof addTodoList>;
export const addTodoList = (title: string) => {
    return { type: 'ADD-TODOLIST', payload: { title, todoListId: v1(), } } as const;
};

export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitle>;
export const changeTodoListTitle = (id: string, newTodoListTitle: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id: id, title: newTodoListTitle } } as const;
};

export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilter>;
export const changeTodoListFilter = (id: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const;
};