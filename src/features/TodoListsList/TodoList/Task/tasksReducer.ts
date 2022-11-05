import {todoListsAPI} from '../../../../api/todoListsAPI';
import {
    TaskType, TodoListType,
    UpdateTaskModelType
} from '../../../../api/todoListsAPI.types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {todoListsAsyncActions as todoListsActions} from '../todoListsReducer';
import {appActions} from '../../../Common/Actions/AppActions';
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from '../../../../utils/errorUtils';
import {AppRootStateType, ThunkErrorType} from '../../../../utils/reduxUtils.types';
import {TasksStateType, UpdateDomainTaskModelType} from './Task.types';

const {setAppStatus} = appActions;

const fetchTasks = createAsyncThunk<{tasks: TaskType[], todoListId: string}, string, ThunkErrorType>('tasks/fetchTasks', async (todoListId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await todoListsAPI.getTasks(todoListId);
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        return {tasks: res.data.items, todoListId};
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI);
    }
});
const addTask = createAsyncThunk<TaskType, { todoListId: string, title: string }, ThunkErrorType>
    ('tasks/addTask', async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await todoListsAPI.addTask(param.todoListId, param.title);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.data.item;
        } else {
            handleAsyncServerAppError(res.data, thunkAPI ,false);
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
        }
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI, false);
    }
});
const deleteTask = createAsyncThunk<{ todoListId: string, taskId: string }, { todoListId: string, taskId: string }, ThunkErrorType>('tasks/deleteTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        await todoListsAPI.deleteTask(param.todoListId, param.taskId);
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        return param;
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI);
    }
});
const updateTask = createAsyncThunk<{ todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, { todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, ThunkErrorType>('tasks/updateTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    const state = thunkAPI.getState() as AppRootStateType;
    const task = state.tasks[param.todoListId].find(t => t.id === param.taskId);
    if (!task) {
        return thunkAPI.rejectWithValue({errors: ['task not found in the state']});
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
    try {
        const res = await todoListsAPI.updateTask(param.todoListId, param.taskId, apiModel);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return param;
        } else {
            thunkAPI.dispatch(setAppStatus({status: 'failed'}));
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI);
    }
});

export const tasksAsyncActions = {
    fetchTasks,
    addTask,
    deleteTask,
    updateTask
}

export const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(todoListsActions.fetchTodoLists.fulfilled, (state, action) => {
            action.payload.todoLists.forEach((tl: TodoListType) => {
                state[tl.id] = [];
            });
        });
        builder
            .addCase(todoListsActions.addTodoList.fulfilled, (state, action) => {
                state[action.payload.todoList.id] = [];
            })
            .addCase(todoListsActions.deleteTodoList.fulfilled, (state, action) => {
                delete state[action.payload.todoListId];
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) {
                    tasks.splice(index, 1);
                }
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoListId];
                const index = tasks.findIndex((t: TaskType) => t.id === action.payload.taskId);
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel};
                }
            });
    }
});
