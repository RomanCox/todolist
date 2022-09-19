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

export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
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

type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D,
}

export const todoListsAPI = {
    getTodoLists() {
        return instance.get< Array<TodoListType> >('todo-lists');
    },
    createTodoLists(title: string) {
        return instance.post< ResponseType<{item: TodoListType}> >('todo-lists', { title });
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
    createTask(todoListId: string, title: string) {
        return instance.post< ResponseType<{item: TaskType}> >(`todo-lists/${todoListId}/tasks/`, { title });
    },
    changeTaskTitle(todoListId: string, taskId: string, title: string) {
        return instance.put< ResponseType<{item: TaskType}> >(`todo-lists/${todoListId}/tasks/${taskId}`, { title });
    },
}