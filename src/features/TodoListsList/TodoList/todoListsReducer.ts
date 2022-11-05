import {todoListsAPI} from '../../../api/todoListsAPI';
import {TodoListType} from '../../../api/todoListsAPI.types';
import {AppStatusesType} from '../../Application';
import {appActions} from '../../Common/Actions/AppActions';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from '../../../utils/errorUtils';
import {ThunkErrorType} from '../../../utils/reduxUtils.types';
import {FilterValuesType, TodoListDomainType} from './Todolist.types';

const {setAppStatus} = appActions;

const fetchTodoLists = createAsyncThunk<{ todoLists: TodoListType[] }, undefined, ThunkErrorType>('todoLists/fetchTodoLists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await todoListsAPI.getTodoLists();
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        return {todoLists: res.data};
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI);
    }
});
const addTodoList = createAsyncThunk<{ todoList: TodoListType }, string, ThunkErrorType>
    ('todoLists/addTodoList', async (title, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await todoListsAPI.addTodoLists(title);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return {todoList: res.data.data.item};
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI, false);
    }
});
const deleteTodoList = createAsyncThunk<{todoListId: string}, string, ThunkErrorType>('todoLists/deleteTodoList', async (todoListId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    thunkAPI.dispatch(changeTodoListEntityStatus({id: todoListId, status: 'loading'}));
    try {
        await todoListsAPI.deleteTodoLists(todoListId);
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        return {todoListId};
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI);
    }
});
const changeTodoListTitle = createAsyncThunk<{ id: string, title: string }, { id: string, title: string }, ThunkErrorType>('todoLists/changeTodoListTitle', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const res = await todoListsAPI.updateTodoLists(param.id, param.title);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return {id: param.id, title: param.title};
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (err) {
        return handleAsyncServerNetworkError(err, thunkAPI, false);
    }
});

export const todoListsAsyncActions = {
    fetchTodoLists,
    addTodoList,
    deleteTodoList,
    changeTodoListTitle,
}

export const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        changeTodoListFilter(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatus(state, action: PayloadAction<{ id: string, status: AppStatusesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                return action.payload.todoLists.map((tl: TodoListType) => ({...tl, filter: 'all', entityStatus: 'idle'}));
            })
            .addCase(addTodoList.fulfilled, (state, action) => {
                state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'});
            })
            .addCase(deleteTodoList.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoListId);
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(changeTodoListTitle.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id);
                state[index].title = action.payload.title;
            });
    }
});

export const {changeTodoListFilter, changeTodoListEntityStatus} = slice.actions;