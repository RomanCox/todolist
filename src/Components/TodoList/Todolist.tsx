import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import {
    ButtonStyled, DeleteButtonStyled,
    TaskStyled,
    TitleContainerStyled,
    TitleStyled,
    TodoListStyled
} from './TodoListStyled';
import { AddItem } from '../../common/AddItem/AddItem';
import { EditableSpan } from '../../common/EditableSpan/EditableSpan';
import { Delete } from '@mui/icons-material';
import { IconButton, Button, Checkbox  } from '@mui/material';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodolistPropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    deleteTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeTaskStatus: (todoListId: string, taskID: string, isDone: boolean) => void,
    filter: FilterValuesType,
    removeTodoList: (todoListId: string) => void,
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void,
    changeTodoListTitle: (todoListId: string, newTitle: string) => void,
}

export const Todolist = (props: TodolistPropsType) => {
    let bgColor = {
        all: 'default',
        active: 'default',
        completed: 'default',
    };
    if (props.filter === 'all') {
        bgColor.all = 'aquamarine'
    } else if (props.filter === 'active') {
        bgColor.active = 'aquamarine'
    } else if (props.filter === 'completed') {
        bgColor.completed = 'aquamarine'
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const removeTodoHandler = () => {
        props.removeTodoList(props.id)
    }

    const addItem = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return (
        <TodoListStyled>
            <TitleContainerStyled>
                <TitleStyled><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/></TitleStyled>
                <IconButton aria-label="delete" onClick={removeTodoHandler}>
                    <Delete />
                </IconButton>
            </TitleContainerStyled>
            <AddItem addItem={addItem} />
            <ul>
                {props.tasks.map(m => {
                    const onClickHandler = () => props.deleteTask(m.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, m.id, e.currentTarget.checked)
                    }
                    let opacity = '1';
                    if (m.isDone) {
                        opacity = '0.5'
                    }

                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.id, m.id, newTitle)
                    }

                    return <TaskStyled key={m.id} opacity={opacity}>
                        <Checkbox
                            checked={m.isDone}
                            onChange={onChangeHandler}
                            color={'secondary'}
                        />
                        <EditableSpan title={m.title} changeTitle={changeTaskTitle} />
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </TaskStyled>

                })}
            </ul>
            <div>
                <Button color={'secondary'} variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}>All</Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}>Active</Button>
                <Button color={'error'} variant={props.filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </TodoListStyled>
    );
};