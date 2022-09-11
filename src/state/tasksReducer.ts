import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from './todoListsReducer';

export type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType |
    AddTodoListActionType |
    RemoveTodoListActionType;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state};
            let newTasks = stateCopy[action.payload.todoListId];
            stateCopy[action.payload.todoListId] = newTasks.filter(f => f.id !== action.payload.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            let stateCopy = {...state};
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            let newTasks = stateCopy[action.payload.todoListId];
            stateCopy[action.payload.todoListId] = [newTask, ...newTasks];
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = {...state};
            let tasks = stateCopy[action.payload.todoListId];
            stateCopy[action.payload.todoListId] = tasks.map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTaskTitle} : t);
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            let tasks = stateCopy[action.payload.todoListId];
            stateCopy[action.payload.todoListId] = tasks.map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t);
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.payload.todoListId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy;
        }
        default:
            return state;
    }
};

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todoListId, taskId,}} as const;
};

export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (todoListId: string, title: string) => {
    return {type: 'ADD-TASK', payload: {todoListId, title,}} as const;
};

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTaskTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todoListId, taskId, newTaskTitle,}} as const;
};

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todoListId, taskId, isDone,}} as const;
};