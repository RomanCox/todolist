import {todoListsAPI, TodoListType} from '../../../api/todoListsAPI';
import {AppStatusesType, setAppStatusAC} from '../../../app/appReducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/errorUtils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../../app/store';

const initialState: Array<TodoListDomainType> = [];

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        setTodoListsAC (state, action: PayloadAction<{todoLists: Array<TodoListType>}>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        },
        addTodoListAC (state, action: PayloadAction<{todoList: TodoListType}>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'});
        },
        deleteTodoListAC (state, action: PayloadAction<{todoListId: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId);
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        changeTodoListTitleAC (state, action: PayloadAction<{id: string, newTodoListTitle: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.newTodoListTitle
        },
        changeTodoListFilterAC (state, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatusAC (state, action: PayloadAction<{id: string, status: AppStatusesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status
        },
    }
});

export const todoListsReducer = slice.reducer;
export const {setTodoListsAC, addTodoListAC, deleteTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC, changeTodoListEntityStatusAC} = slice.actions;

// todoLists thunk creators
export let fetchTodoListsTC = () => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todoListsAPI.getTodoLists()
        dispatch(setTodoListsAC({todoLists: res.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export let addTodoListTC = (title: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    // try {
    //     const res = await todoListsAPI.addTodoLists(title)
    //     if (res.data.resultCode === 0) {
    //         dispatch(addTodoListAC(res.data.data.item))
    //         dispatch(setAppStatusAC('succeeded'))
    //     } else {
    //         handleServerAppError(res.data, dispatch)
    //     }
    // } catch (error: any) {
    //     handleServerNetworkError(error, dispatch)
    // }
    const res = await todoListsAPI.addTodoLists(title)
    if (res.data.resultCode === 0) {
        dispatch(addTodoListAC({todoList: res.data.data.item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
        handleServerAppError(res.data, dispatch)
    }
}
export let deleteTodoListsTC = (todoListId: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodoListEntityStatusAC({id: todoListId, status: 'loading'}))
    try {
        await todoListsAPI.deleteTodoLists(todoListId)
        dispatch(deleteTodoListAC({todoListId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}
export let changeTodoListTitleTC = (id: string, title: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todoListsAPI.updateTodoLists(id, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTodoListTitleAC({id, newTodoListTitle: title}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}

// types
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: AppStatusesType,
};
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>