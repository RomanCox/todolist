import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {
    ButtonStyled,
    ErrorMessageStyled,
    InputStyled,
    TaskStyled,
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
    title: string,
    tasks: Array<TaskType>,
    deleteTask: (id: string) => void,
    setFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
    onChangeTaskStatus: (taskID: string, isDone: boolean) => void,
    filter: FilterValuesType
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

    const onAllFilterHandler = () => props.setFilter('all')
    const onActiveFilterHandler = () => props.setFilter('active')
    const onCompletedFilterHandler = () => props.setFilter('completed')

    const addTaskHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        props.addTask(newTaskTitle.trim());
        setNewTaskTitle('');
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    return (
        <TodoListStyled>
            <TitleStyled>{props.title}</TitleStyled>
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
                {props.tasks.map(task => {
                    const onClickHandler = () => props.deleteTask(task.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.onChangeTaskStatus(task.id, e.currentTarget.checked)
                    }
                    let opacity = '1';
                    if (task.isDone) {
                        opacity = '0.5'
                    }

                    return <li key={task.id}>
                        <TaskStyled opacity={opacity}>
                            <input
                                type='checkbox'
                                checked={task.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </TaskStyled>
                    </li>

                })}
            </ul>
            <div>
                <ButtonStyled onClick={onAllFilterHandler} bgColor={bgColor.all}>All</ButtonStyled>
                <ButtonStyled onClick={onActiveFilterHandler} bgColor={bgColor.active}>Active</ButtonStyled>
                <ButtonStyled onClick={onCompletedFilterHandler} bgColor={bgColor.completed}>Completed</ButtonStyled>
            </div>
        </TodoListStyled>
    );
};