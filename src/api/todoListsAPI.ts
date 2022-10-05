import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '62c23175-4b05-4973-9d27-1a54a1230535'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings,
})

// api
export const todoListsAPI = {
    getTodoLists() {
        return instance.get< Array<TodoListType> >('todo-lists');
    },
    addTodoLists(title: string) {
        return instance.post< ResponseType<{ item: TodoListType }> >('todo-lists', { title });
    },
    deleteTodoLists(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`);
    },
    updateTodoLists(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, { title });
    },
    getTasks(todoListId: string) {
        return instance.get<GetTaskRequestType>(`todo-lists/${todoListId}/tasks`);
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`);
    },
    addTask(todoListId: string, title: string) {
        return instance.post< ResponseType<{ item: TaskType }> >(`todo-lists/${todoListId}/tasks/`, { title });
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, ResponseType<{ item: TaskType }> >(`todo-lists/${todoListId}/tasks/${taskId}`, model);
    },
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType<{ userId?: number }>>('auth/login');
    },
    me() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me');
    }
}

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
type GetTaskRequestType = {
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
export type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D,
}
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
}