import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoListsReducer";

export type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType |
    AddTodoListActionType |
    RemoveTodoListActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newTasks = state[action.payload.todoListId];
            state[action.payload.todoListId] = newTasks.filter(f => f.id !== action.payload.taskId);
            return {...state};
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
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
            const stateCopy = {...state};
            let task = stateCopy[action.payload.todoListId].find(f => f.id === action.payload.taskId);
            if (task) {
                task.isDone = action.payload.isDone;
            }
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
            throw new Error("I don`t understand this action type");
    }
};

export type RemoveTaskActionType = ReturnType<typeof removeTask>;
export const removeTask = (todoListId: string, taskId: string) => {
    return { type: 'REMOVE-TASK', payload: { todoListId, taskId, } } as const;
};

export type AddTaskActionType = ReturnType<typeof addTask>;
export const addTask = (todoListId: string, title: string) => {
    return { type: 'ADD-TASK', payload: { todoListId, title, } } as const;
};

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>;
export const changeTaskTitle = (todoListId: string, taskId: string, newTaskTitle: string) => {
    return { type: 'CHANGE-TASK-TITLE', payload: { todoListId, taskId, newTaskTitle, } } as const;
};

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>;
export const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
    return { type: 'CHANGE-TASK-STATUS', payload: { todoListId, taskId, isDone, } } as const;
};