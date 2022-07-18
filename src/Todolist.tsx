import React from "react";
import styled from "styled-components";
import {FilterValuesType} from "./App";

const TodoListStyled = styled.div`
  margin-right: 30px;
`
const TitleStyled = styled.h3``
const TodolistContentStyled = styled.h3``

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
}

export const Todolist = (props: TodolistType) => {
    return (
        <TodoListStyled>
            <TitleStyled>{props.title}</TitleStyled>
            <TodolistContentStyled>
                <input/>
                <button>+</button>
            </TodolistContentStyled>
            <ul>
                {props.tasks.map(task => <li><input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={ () => props.deleteTask(task.id) }>x</button>
                </li>)}
            </ul>
            <div>
                <button onClick={ () => props.setFilter('all') }>All</button>
                <button onClick={ () => props.setFilter('active') }>Active</button>
                <button onClick={ () => props.setFilter('completed') }>Competed</button>
            </div>
        </TodoListStyled>
    );
};