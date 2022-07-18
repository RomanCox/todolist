import React from "react";
import styled from "styled-components";

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
                <li><input type="checkbox" checked={props.tasks[0].isDone}/>
                    <span>{props.tasks[0].title}</span>
                </li>
                <li><input type="checkbox" checked={props.tasks[1 ].isDone}/>
                    <span>{props.tasks[1].title}</span>
                </li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/>
                    <span>{props.tasks[2].title}</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Competed</button>
            </div>
        </TodoListStyled>
    );
};