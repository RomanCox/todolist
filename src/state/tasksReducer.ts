import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType;

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: { todoListId: string, taskId: string, },
};

type AddTaskActionType = {
    type: 'ADD-TASK',
    payload: { todoListId: string, newTaskTitle: string, },
};

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    payload: { todoListId: string, taskId: string, newTaskTitle: string, },
};

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    payload: { todoListId: string, taskId: string, isDone: boolean, },
};

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newTasks = state[action.payload.todoListId];
            state[action.payload.todoListId] = newTasks.filter(f => f.id !== action.payload.taskId);
            return {...state};
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.newTaskTitle, isDone: false};
            let newTasks = state[action.payload.todoListId];
            state[action.payload.todoListId] = [newTask, ...newTasks];
            return {...state};
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = {...state};
            let task = stateCopy[action.payload.todoListId].find(f => f.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.newTaskTitle;
            }
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = {...state};
            let task = stateCopy[action.payload.todoListId].find(f => f.id === action.payload.taskId);
            if (task) {
                task.isDone = action.payload.isDone;
            }
            return stateCopy;
        }
        default:
            throw new Error("I don`t understand this action type");
    }
};

export const RemoveTask = (todoListId: string, taskId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', payload: { todoListId, taskId, } };
};

export const AddTask = (todoListId: string, newTaskTitle: string): AddTaskActionType => {
    return { type: 'ADD-TASK', payload: { todoListId, newTaskTitle, } };
};

export const ChangeTaskTitle = (todoListId: string, taskId: string, newTaskTitle: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', payload: { todoListId, taskId, newTaskTitle, } };
};

export const ChangeTaskStatus = (todoListId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', payload: { todoListId, taskId, isDone, } };
};