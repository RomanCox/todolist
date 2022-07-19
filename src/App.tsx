import React, {useState} from 'react';
import {AppContainer} from './AppStyled';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';


export const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS&HTML', isDone: true,},
        {id: v1(), title: 'JS', isDone: true,},
        {id: v1(), title: 'REACT', isDone: false,},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasksForTodoList = [newTask, ...tasks];
        setTasks(newTasksForTodoList);
    }

    let tasksForTodo = tasks;

    if (filter === 'active') {
        tasksForTodo = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasksForTodo = tasks.filter(task => task.isDone)
    }

    const onChangeTaskStatus = (taskID: string, isDone: boolean) => {
        let task = tasks.find(task => task.id === taskID);
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <AppContainer>
            <Todolist
                title='What to Learn'
                tasks={tasksForTodo}
                deleteTask={deleteTask}
                setFilter={setFilter}
                addTask={addTask}
                onChangeTaskStatus={onChangeTaskStatus}
                filter={filter}
            />
        </AppContainer>
    );
};
