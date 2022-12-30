import axios, {AxiosResponse} from 'axios';
import {
    GetTaskRequestType,
    LoginParamsType,
    ResponseType,
    TaskType,
    TodoListType,
    UpdateTaskModelType,
    ReOrderTaskType,
} from './todoListsAPI.types';

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
    addTask(todoListId: string, title: string) {
        return instance.post< ResponseType<{ item: TaskType }> >(`todo-lists/${todoListId}/tasks/`, { title });
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`);
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put< UpdateTaskModelType, AxiosResponse< ResponseType< { item: TaskType } > > >(`todo-lists/${todoListId}/tasks/${taskId}`, model);
    },
    reOrderTask(todoListId: string, taskId: string, model: ReOrderTaskType) {
        return instance.put< UpdateTaskModelType, AxiosResponse< ResponseType< { item: TaskType } > > >(`todo-lists/${todoListId}/tasks/${taskId}`, model);
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