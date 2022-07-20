import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {
    ButtonStyled, DeleteButtonStyled,
    ErrorMessageStyled,
    InputStyled,
    TaskStyled,
    TitleContainerStyled,
    TitleStyled,
    TodolistContentStyled,
    TodoListStyled
} from './TodoListStyled';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodolistType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    deleteTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    onChangeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void,
    filter: FilterValuesType,
    removeTodoList: (todoListId: string) => void,
}

export const Todolist = (props: TodolistType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

    let border = 'black 1px solid';
    if (error) {
        border = 'red 2px solid'
    }

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

    const addTaskHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            setNewTaskTitle('')
            return
        }
        props.addTask(newTaskTitle.trim(), props.id);
        setNewTaskTitle('');
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('');
        }
    }

    const removeTodoHandler = () => {
        props.removeTodoList(props.id)
    }

    return (
        <TodoListStyled>
            <TitleContainerStyled>
                <TitleStyled>{props.title}</TitleStyled>
                <DeleteButtonStyled onClick={removeTodoHandler}>x</DeleteButtonStyled>
            </TitleContainerStyled>
            <TodolistContentStyled>
                <InputStyled
                    value={newTaskTitle}
                    onChange={onNewTaskTitleHandler}
                    onKeyDown={onKeyPressHandler}
                    border={border}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}
            </TodolistContentStyled>
            <ul>
                {props.tasks.map(m => {
                    const onClickHandler = () => props.deleteTask(m.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.onChangeTaskStatus(m.id, e.currentTarget.checked, props.id)
                    }
                    let opacity = '1';
                    if (m.isDone) {
                        opacity = '0.5'
                    }

                    return <TaskStyled key={m.id} opacity={opacity}>
                        <input
                            type='checkbox'
                            checked={m.isDone}
                            onChange={onChangeHandler}
                        />
                        <span>{m.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </TaskStyled>

                })}
            </ul>
            <div>
                <ButtonStyled onClick={onAllClickHandler} bgColor={bgColor.all}>All</ButtonStyled>
                <ButtonStyled onClick={onActiveClickHandler} bgColor={bgColor.active}>Active</ButtonStyled>
                <ButtonStyled onClick={onCompletedClickHandler} bgColor={bgColor.completed}>Completed</ButtonStyled>
            </div>
        </TodoListStyled>
    );
};