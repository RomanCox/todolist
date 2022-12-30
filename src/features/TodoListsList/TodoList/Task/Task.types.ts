import {TaskPriorities, TaskStatuses, TaskType} from '../../../../api/todoListsAPI.types';
import React from "react";

export type TaskPropsType = {
    task: TaskType,
    // onDragStart: (e: React.DragEvent<HTMLElement>, task: TaskType) => void,
    // onDragLeave: (e: React.DragEvent<HTMLElement>) => void,
    // onDragEnd: (e: React.DragEvent<HTMLElement>) => void,
    // onDragOver: (e: React.DragEvent<HTMLElement>) => void,
    // onDrop: (e: React.DragEvent<HTMLElement>, task: TaskType) => void,
    tasks: TaskType[],
};

export type UpdateDomainTaskModelType = {
    description?: string,
    title?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
};

export type ReOrderTaskModelType = {
    putAfterItemId: string,
};

export type TasksStateType = {
    [key: string]: Array<TaskType>
};