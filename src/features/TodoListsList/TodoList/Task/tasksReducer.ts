import {addTodoListTC, deleteTodoListTC, fetchTodoListsTC} from '../todoListsReducer';
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType} from '../../../../api/todoListsAPI';
import {AppRootStateType} from '../../../../app/store';
import {setAppStatusAC} from '../../../../app/appReducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/errorUtils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    const res = await todoListsAPI.getTasks(todoListId);
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}));
        return {tasks: res.data.items, todoListId};
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todoListId: string, title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    const res = await todoListsAPI.addTask(param.todoListId, param.title);
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return res.data.data.item;
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});

export const deleteTaskTC = createAsyncThunk('tasks/deleteTask', async (param: { todoListId: string, taskId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    await todoListsAPI.deleteTask(param.todoListId, param.taskId);
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}));
        return param;
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, {
    dispatch,
    getState,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    const state = getState() as AppRootStateType;
    const task = state.tasks[param.todoListId].find(t => t.id === param.taskId);
    if (!task) {
        //throw new Error('task not found in the state');
        return rejectWithValue('task not found in the state');
    }
    const apiModel: UpdateTaskModelType = {
        description: task.description,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...param.domainModel
    };
    const res = await todoListsAPI.updateTask(param.todoListId, param.taskId, apiModel);
    try {
        if (res.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return param;
        } else {
            handleServerAppError(res, dispatch);
            dispatch(setAppStatusAC({status: 'failed'}));
            return rejectWithValue(null);
        }
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            action.payload.todoLists.forEach(tl => {
                state[tl.id] = [];
            });
        });
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = [];
        });
        builder.addCase(deleteTodoListTC.fulfilled, (state, action) => {
            delete state[action.payload.todoListId];
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListId] = action.payload.tasks;
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload);
        });
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1);
            };
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel};
            };
        });
    }
});

export const tasksReducer = slice.reducer;

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
