import {TaskPriorities, TaskStatuses, TaskType} from '../../../../api/todoListsAPI.types';

export type TaskPropsType = {
    task: TaskType,
};

export type UpdateDomainTaskModelType = {
    description?: string,
    title?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
};

export type TasksStateType = {
    [key: string]: Array<TaskType>
};