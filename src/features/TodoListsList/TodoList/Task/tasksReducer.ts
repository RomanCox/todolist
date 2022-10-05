import {addTodoListAC, deleteTodoListAC, setTodoListsAC} from '../todoListsReducer';
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from '../../../../api/todoListsAPI';
import {AppDispatch, AppRootStateType} from '../../../../app/store';
import {setAppStatusAC} from '../../../../app/appReducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/errorUtils';
import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTasksAC (state, action: PayloadAction<{todoListId: string, tasks: Array<TaskType>}>) {
            state[action.payload.todoListId] = action.payload.tasks;
        },
        addTaskAC (state, action: PayloadAction<{task: TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        deleteTaskAC (state, action: PayloadAction<{todoListId: string, taskId: string}>) {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        },
        updateTaskAC (state, action: PayloadAction<{todoListId: string, taskId: string, model: UpdateDomainTaskModelType}>) {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todoLists.forEach(tl => {state[tl.id] = []});
        });
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = [];
        });
        builder.addCase(deleteTodoListAC, (state, action) => {
                delete state[action.payload.todoListId];
        });
    }
});

export const tasksReducer = slice.reducer;
export const {setTasksAC, addTaskAC, deleteTaskAC, updateTaskAC} = slice.actions;

//tasks thunk creators
export const fetchTasksTC = (todoListId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todoListsAPI.getTasks(todoListId)
        dispatch(setTasksAC({todoListId, tasks: res.data.items}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const addTaskTC = (todoListId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todoListsAPI.addTask(todoListId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC({task: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }
    catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const deleteTaskTC = (todoListId: string, taskId: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        await todoListsAPI.deleteTask(todoListId, taskId)
        dispatch(deleteTaskAC({todoListId, taskId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC({status: 'loading'}))
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
                dispatch(updateTaskAC({todoListId, taskId, model: domainModel}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res, dispatch)
            }
            dispatch(setAppStatusAC({status: 'succeeded'}))
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
