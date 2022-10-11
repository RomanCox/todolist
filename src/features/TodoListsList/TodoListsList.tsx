import React, {useCallback, useEffect} from 'react';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {useSelector} from 'react-redux';
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    fetchTodoListsTC,
    FilterValuesType,
    TodoListDomainType
} from './TodoList/todoListsReducer';
import {Grid, Paper} from '@mui/material';
import {AddItem} from '../../components/common/AddItem/AddItem';
import {Todolist} from './TodoList/Todolist';
import {Navigate} from 'react-router-dom';

type TodoListsListPropsType = {
    demo?: boolean,
}

export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo= false}) => {
    const dispatch = useAppDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodoListsTC())
    }, [dispatch, demo, isLoggedIn]);

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(deleteTodoListTC(todoListId));
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title));
    }, [dispatch]);
    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleTC({id: todoListId, title: newTitle}));
    }, [dispatch]);
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC({id: todoListId, filter: value}));
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItem addItem={addTodoList} placeHolder={'TodoList Name'}/>
        </Grid>
        <Grid container spacing={3}>
            {todoLists.map(tl => {
                return <Grid key={tl.id} item>
                    <Paper style={{padding: '10px'}}>
                        <Todolist
                            todoList={tl}
                            changeFilter={changeFilter}
                            removeTodoList={removeTodoList}
                            changeTodoListTitle={changeTodoListTitle}
                            demo={demo}
                        />
                    </Paper>
                </Grid>
            })}
        </Grid>
    </>
};