import React, {useCallback, useEffect} from 'react';
import {TitleContainerStyled, TitleStyled, TodoListStyled} from './TodoListStyled';
import {AddItem} from '../../../components/common/AddItem/AddItem';
import {EditableSpan} from '../../../components/common/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {Button, IconButton} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, DispatchType} from '../../../app/store';
import {addTaskTC, fetchTasksTC} from './Task/tasksReducer';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todoListsAPI';
import {FilterValuesType} from './todoListsReducer';

type TodolistPropsType = {
    id: string,
    title: string,
    changeFilter: (todoListId: string, value: FilterValuesType) => void,
    filter: FilterValuesType,
    removeTodoList: (todoListId: string) => void,
    changeTodoListTitle: (todoListId: string, newTitle: string) => void,
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);
    const dispatch: DispatchType = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [dispatch]);

    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')

    const removeTodoHandler = useCallback(() => {
        props.removeTodoList(props.id)
    }, [props.removeTodoList, props.id, dispatch]);

    const addItem = useCallback((title: string) => {
        dispatch(addTaskTC(props.id, title))
    }, [dispatch, props.id]);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id]);

    let tasksForTodo: Array<TaskType> = tasks;

    if (props.filter === 'active') {
        tasksForTodo = tasks.filter(f => f.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodo = tasks.filter(f => f.status === TaskStatuses.Completed)
    }

    return (
        <TodoListStyled>
            <TitleContainerStyled>
                <TitleStyled><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/></TitleStyled>
                <IconButton aria-label='delete' onClick={removeTodoHandler}>
                    <Delete/>
                </IconButton>
            </TitleContainerStyled>
            <AddItem addItem={addItem} />
            <ul>
                {tasksForTodo.map(task => <Task key={task.id} task={task} />)}
            </ul>
            <div>
                <Button color={'secondary'} variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={'error'} variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </TodoListStyled>
    );
});