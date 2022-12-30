// api types
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    description: string,
    title: string,
    completed?: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}
export type UpdateTaskModelType = {
    description: string,
    title: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
}
export type ReOrderTaskType = {
    putAfterItemId: string
}
export type GetTaskRequestType = {
    error: string,
    totalCount: number,
    items: Array<TaskType>,
}
export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}
export type FieldErrorType = { field: string, error: string };
export type ResponseType<D = {}> = {
    resultCode: number,
    fieldsErrors?: Array<FieldErrorType>,
    messages: Array<string>,
    data: D,
}
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
}