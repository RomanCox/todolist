import {todoListsAPI, TodoListType} from '../../../api/todoListsAPI';
import {AppStatusesType, setAppStatusAC} from '../../../app/appReducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/errorUtils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatchType} from '../../../app/store';
import {AxiosError} from 'axios';

export const fetchTodoListsTC = createAsyncThunk('todoLists/fetchTodoLists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    const res = await todoListsAPI.getTodoLists();
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}));
        return {todoLists: res.data};
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});

export const addTodoListTC = createAsyncThunk('todoLists/addTodoList', async (title: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    const res = await todoListsAPI.addTodoLists(title);
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return {todoList: res.data.data.item};
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

export const deleteTodoListTC = createAsyncThunk('todoLists/deleteTodoList', async (todoListId: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeTodoListEntityStatusAC({id: todoListId, status: 'loading'}));
    await todoListsAPI.deleteTodoLists(todoListId);
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}));
        return {todoListId: todoListId};
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});

export const changeTodoListTitleTC = createAsyncThunk('todoLists/changeTodoListTitle', async (param: {id: string, title: string}, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    const res = await todoListsAPI.updateTodoLists(param.id, param.title);
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return {id: param.id, title: param.title};
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

const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        changeTodoListFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{ id: string, status: AppStatusesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        });
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'});
        });
        builder.addCase(deleteTodoListTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId);
            if (index > -1) {
                state.splice(index, 1)
            };
        });
        builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title;
        });
    }
});

export const todoListsReducer = slice.reducer;
export const {changeTodoListFilterAC, changeTodoListEntityStatusAC} = slice.actions;

// types
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: AppStatusesType,
};