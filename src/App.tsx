import React from 'react';
import './App.css';
import styled from "styled-components";
import {TaskType, Todolist} from "./Todolist";
import { v4 as uuid } from "uuid";

const AppStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 30px;
`

const Tasks1: Array<TaskType> = [
    {id: uuid(), title: 'CSS&HTML', isDone: true,},
    {id: uuid(), title: 'JS', isDone: true,},
    {id: uuid(), title: 'REACT', isDone: false,},
];

const Tasks2: Array<TaskType> = [
    {id: uuid(), title: 'Fight Club', isDone: true,},
    {id: uuid(), title: 'Beautiful Life', isDone: true,},
    {id: uuid(), title: 'Snatch', isDone: true,},
]



export const App = () => {
    return (
        <AppStyled>
            <Todolist title='What to Learn' tasks={Tasks1}/>
            <Todolist title='Movies' tasks={Tasks2}/>
        </AppStyled>
    );
};
