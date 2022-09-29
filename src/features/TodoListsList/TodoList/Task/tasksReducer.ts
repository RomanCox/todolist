import {AddTodoListActionType, DeleteTodoListActionType, SetTodoListsActionType} from '../todoListsReducer';
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from '../../../../api/todoListsAPI';
import {AppRootStateType, AppThunkType} from '../../../../app/store';
import {setAppStatusAC, SetErrorActionType, SetStatusActionType} from '../../../../app/appReducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/errorUtils';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {...state, [action.payload.todoListId]: action.payload.tasks}
        case 'ADD-TASK':
            return {...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]}
        case 'REMOVE-TASK':
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(f => f.id !== action.payload.taskId)}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.taskId? {...t, ...action.payload.model} : t)
            }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.payload.todoLists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todoList.id]: []};
        case 'DELETE-TODOLIST':
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy;
        default:
            return state;
    }
};

// tasks action creators
export const setTasksAC = (todoListId: string, tasks: Array<TaskType>) =>
    ({
    type: 'SET-TASKS',
    payload: {todoListId, tasks}
} as const);
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', payload: {task}} as const);
export const removeTaskAC = (todoListId: string, taskId: string) =>
    ({
    type: 'REMOVE-TASK',
    payload: {todoListId, taskId,}
} as const);
export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({
    type: 'UPDATE-TASK',
    payload: {todoListId, taskId, model,}
} as const);

//tasks thunk creators
export const fetchTasksTC = (todoListId: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todoListsAPI.getTasks(todoListId)
        dispatch(setTasksAC(todoListId, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const addTaskTC = (todoListId: string, title: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todoListsAPI.addTask(todoListId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
    catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const deleteTaskTC = (todoListId: string, taskId: string): AppThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await todoListsAPI.deleteTask(todoListId, taskId)
        dispatch(removeTaskAC(todoListId, taskId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunkType =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error('task not found in the state');
            console.warn('task not found in the state');
            return
        }
        const apiModel: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        try {
            const res = await todoListsAPI.updateTask(todoListId, taskId, apiModel)
            if (res.resultCode === 0) {
                dispatch(updateTaskAC(todoListId, taskId, domainModel))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
            dispatch(setAppStatusAC('succeeded'))
        }
        catch (error: any) {
            handleServerNetworkError(error, dispatch)
        }
}

// types
export type UpdateDomainTaskModelType = {
    description?: string,
    title?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TasksActionsType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | SetTodoListsActionType
    | DeleteTodoListActionType
    | AddTodoListActionType
    | SetErrorActionType
    | SetStatusActionType
