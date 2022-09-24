import React, {useCallback, useEffect} from 'react';
import {AppRootStateType, DispatchType} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    deleteTodoListsTC,
    fetchTodoListsTC,
    FilterValuesType,
    TodoListDomainType
} from './TodoList/todoListsReducer';
import {Grid, Paper} from '@mui/material';
import {AddItem} from '../../components/common/AddItem/AddItem';
import {Todolist} from './TodoList/Todolist';

export const TodoListsList: React.FC = () => {
    const dispatch: DispatchType = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch]);

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(deleteTodoListsTC(todoListId));
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title));
    }, [dispatch]);
    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleTC(todoListId, newTitle));
    }, [dispatch]);
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListId, value));
    }, [dispatch]);

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItem addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todoLists.map(m => {
                return <Grid key={m.id} item>
                    <Paper style={{padding: '10px'}}>
                        <Todolist
                            id={m.id}
                            title={m.title}
                            changeFilter={changeFilter}
                            filter={m.filter}
                            removeTodoList={removeTodoList}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            })}
        </Grid>
    </>
};