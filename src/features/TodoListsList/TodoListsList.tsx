import React, {useCallback, useEffect} from 'react';
import {AppRootStateType} from '../../utils/reduxUtils.types';
import {useAppDispatch} from '../../utils/reduxUtils';
import {useSelector} from 'react-redux';
import {TodoListDomainType} from './TodoList/Todolist.types';
import {Grid} from '@mui/material';
import {AddItem} from '../../components/common/AddItem/AddItem';
import {AddItemFormSubmitHelperType} from '../../components/common/AddItem/AddItem.types';
import {Todolist} from './TodoList/Todolist';
import {authSelectors} from '../Auth';
import {todoListsActions} from './index';
import { TodoListContainerStyled } from './TodoListsListStyled';
import {useActions} from '../../utils/reduxUtils';
import {AppPropsType} from '../../app/App.types';
import {Navigate} from 'react-router-dom';

export const TodoListsList: React.FC<AppPropsType> = ({demo= false}) => {
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists);
    const isLoggedIn = useSelector(authSelectors.selectorIsLoggedIn);
    const dispatch = useAppDispatch();
    const { fetchTodoLists, changeTodoListTitle } = useActions(todoListsActions);

    const addTodoListHandler = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = todoListsActions.addTodoList(title);
        const resultAction = await dispatch(thunk);

        if (todoListsActions.addTodoList.rejected.match(resultAction)) {
            helper.setError(resultAction.payload?.errors?.length ? resultAction.payload.errors[0] : 'Some error occurred')
        } else {
            helper.setTitle('')
        }

    }, [todoListsActions.addTodoList]);

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        if (!todoLists.length) {
            fetchTodoLists();
        }
    }, [demo, isLoggedIn, fetchTodoLists, todoLists]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItem addItem={addTodoListHandler} placeHolder={'TodoList Name'}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
            {todoLists.map(tl => {
                return <Grid key={tl.id} item>
                    <TodoListContainerStyled>
                        <Todolist
                            todoList={tl}
                            changeTodoListTitle={changeTodoListTitle}
                            demo={demo}
                        />
                    </TodoListContainerStyled>
                </Grid>
            })}
        </Grid>
    </>
};