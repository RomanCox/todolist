import React, {useState} from 'react';
import {AppContainer} from './AppStyled';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
};

export const App = () => {

    const todoList1 = v1();
    const todoList2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoList1, title: 'What to Learn', filter: 'all'},
        {id: todoList2, title: 'What to Buy', filter: 'active'}
    ])

    const [tasks, setTasks] = useState({
        [todoList1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true,},
            {id: v1(), title: 'JS', isDone: true,},
            {id: v1(), title: 'REACT.JS', isDone: false,},
            {id: v1(), title: 'REST API', isDone: false,},
            {id: v1(), title: 'GraphQL', isDone: false,},
        ],
        [todoList2]: [
            {id: v1(), title: 'MIlK', isDone: true,},
            {id: v1(), title: 'BOOK', isDone: true,},
            {id: v1(), title: 'BEER', isDone: false,},
        ]
    });

    const deleteTask = (id: string, todoListId: string) => {
        let newTasks = tasks[todoListId];
        tasks[todoListId] = newTasks.filter(f => f.id !== id);
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = tasks[todoListId];
        tasks[todoListId] = [newTask, ...newTasks];
        setTasks({...tasks});
    }
    const onChangeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        let task = tasks[todoListId].find(f => f.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find(f => f.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (todoListId: string) => {
        let filteredTodoLists = todoLists.filter(f => f.id !== todoListId);
        setTodoLists(filteredTodoLists);
        delete tasks[todoListId];
    }

    return (
        <AppContainer>
            {todoLists.map(m => {
                let tasksForTodo:Array<TaskType> = tasks[m.id];
                if (m.filter === 'active') {
                    tasksForTodo = tasks[m.id].filter(f => !f.isDone)
                }
                if (m.filter === 'completed') {
                    tasksForTodo = tasks[m.id].filter(f => f.isDone)
                }

                return <Todolist
                    key={m.id}
                    id={m.id}
                    title={m.title}
                    tasks={tasksForTodo}
                    deleteTask={deleteTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    onChangeTaskStatus={onChangeTaskStatus}
                    filter={m.filter}
                    removeTodoList={removeTodoList}
                />
            })}

        </AppContainer>
    );
};
