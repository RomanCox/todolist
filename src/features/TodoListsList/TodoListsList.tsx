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

type TodoListsListPropsType = {
    demo?: boolean,
}

export const TodoListsList: React.FC<TodoListsListPropsType> = ({demo= false}) => {
    const dispatch: DispatchType = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);

    useEffect(() => {
        if (demo) {
            return
        }
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