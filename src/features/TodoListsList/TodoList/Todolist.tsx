import React, {useCallback, useEffect} from 'react';
import {TitleContainerStyled, TitleStyled, TodoListStyled} from './TodoListStyled';
import {AddItem} from '../../../components/common/AddItem/AddItem';
import {EditableSpan} from '../../../components/common/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {Button, IconButton} from '@mui/material';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../../app/store';
import {addTaskTC, fetchTasksTC} from './Task/tasksReducer';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todoListsAPI';
import {FilterValuesType, TodoListDomainType} from './todoListsReducer';

type TodoListPropsType = {
    todoList: TodoListDomainType
    changeFilter: (todoListId: string, value: FilterValuesType) => void,
    removeTodoList: (todoListId: string) => void,
    changeTodoListTitle: (todoListId: string, newTitle: string) => void,
    demo?: boolean,
}

export const Todolist = React.memo(({demo = false, ...props}: TodoListPropsType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoList.id]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTasksTC(props.todoList.id))
    }, [dispatch, demo, props.todoList.id]);

    const onAllClickHandler = () => props.changeFilter(props.todoList.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.todoList.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.todoList.id, 'completed')

    const removeTodoHandler = useCallback(() => {
        props.removeTodoList(props.todoList.id)
    }, [props.removeTodoList, props.todoList.id]);

    const addItem = useCallback((title: string) => {
        dispatch(addTaskTC({todoListId: props.todoList.id, title}))
    }, [dispatch, props.todoList.id]);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoList.id, newTitle)
    }, [props.todoList.id]);

    let tasksForTodo: Array<TaskType> = tasks;

    if (props.todoList.filter === 'active') {
        tasksForTodo = tasks.filter(f => f.status === TaskStatuses.New)
    }
    if (props.todoList.filter === 'completed') {
        tasksForTodo = tasks.filter(f => f.status === TaskStatuses.Completed)
    }

    return (
        <TodoListStyled>
            <TitleContainerStyled>
                <TitleStyled><EditableSpan title={props.todoList.title} changeTitle={changeTodoListTitle}/></TitleStyled>
                <IconButton aria-label='delete' onClick={removeTodoHandler} disabled={props.todoList.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </TitleContainerStyled>
            <AddItem addItem={addItem} disabled={props.todoList.entityStatus === 'loading'} placeHolder={'Task Name'}/>
            <ul>
                {tasksForTodo.map(task => <Task key={task.id} task={task} />)}
            </ul>
            <div>
                <Button color={'secondary'} variant={props.todoList.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={'primary'} variant={props.todoList.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={'error'} variant={props.todoList.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </TodoListStyled>
    );
});