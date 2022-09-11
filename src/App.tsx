import React, {useCallback} from 'react';
import {AppContainer} from './AppStyled';
import {TaskType, Todolist} from './Components/TodoList/Todolist';
import {AddItem} from './common/AddItem/AddItem';
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from './state/todoListsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
};
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId));
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title));
    }, [dispatch]);
    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle));
    }, [dispatch]);
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListId, value));
    }, [dispatch]);

    return (
        <AppContainer>
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
            </Container>
        </AppContainer>
    );
};
