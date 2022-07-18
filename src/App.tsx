import React, {useState} from 'react';
import styled from 'styled-components';
import {TaskType, Todolist} from './Todolist';
import { v4 as uuid } from 'uuid';

const AppStyled = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 30px;
`
export type FilterValuesType = 'all' | 'completed' | 'active';


export const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: uuid(), title: 'CSS&HTML', isDone: true,},
        {id: uuid(), title: 'JS', isDone: true,},
        {id: uuid(), title: 'REACT', isDone: false,},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    let tasksForToDo = tasks;

    if (filter === 'active') {
        tasksForToDo = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasksForToDo = tasks.filter(task => task.isDone)
    }

    return (
        <AppStyled>
            <Todolist
                title='What to Learn'
                tasks={tasksForToDo}
                deleteTask={deleteTask}
                setFilter={setFilter}
            />
        </AppStyled>
    );
};
