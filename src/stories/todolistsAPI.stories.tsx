import React, {useEffect, useState} from 'react';
import {todoListsAPI} from '../api/todoListsAPI';

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodoLists()
            .then((res) => {
                    setState(res.data)
                })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null);
    const [todoListTitle, setTodoListTitle] = useState<string>('');
    const addTodoListHandler = () => {
        todoListsAPI.createTodoLists(todoListTitle)
            .then((res) => {
                    setState(res.data)
                })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'TodoList Title'} value={todoListTitle} onChange={(e) => {setTodoListTitle(e.currentTarget.value)}}/>
            <button onClick={addTodoListHandler}>Add TodoList</button>
        </div>
    </div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null);
    const [todoListId, setTodoListId] = useState<any>('');
    const deleteTodoListHandler = () => {
        todoListsAPI.deleteTodoLists(todoListId)
            .then((res) => {
                    setState(res.data)
                })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'TodoList Id'} value={todoListId} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
            <button onClick={deleteTodoListHandler}>Delete TodoList</button>
        </div>
    </div>
}
export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todoListId, setTodoListId] = useState<any>('');
    const [todoListTitle, setTodoListTitle] = useState<string>('');
    const deleteTodoListHandler = () => {
        todoListsAPI.updateTodoLists(todoListId, todoListTitle)
            .then((res) => {
                    setState(res.data)
                })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'TodoList Title'} value={todoListTitle} onChange={(e) => {setTodoListTitle(e.currentTarget.value)}}/>
            <input placeholder={'TodoList Id'} value={todoListId} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
            <button onClick={deleteTodoListHandler}>Update TodoList</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todoListId, setTodoListId] = useState<string>('');
    const getTaskHandler = () => {
        todoListsAPI.getTasks(todoListId)
            .then((res) => {
                    setState(res.data.items)
                })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'TodoList Id'} value={todoListId} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
            <button onClick={getTaskHandler}>Get Tasks</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>('');
    const [todoListId, setTodoListId] = useState<any>('');
    const deleteTaskHandler = () => {
        todoListsAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                    setState(res.data)
                })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'TodoList Id'} value={todoListId} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
            <input placeholder={'Task Id'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTaskHandler}>Delete Task</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [todoListId, setTodoListId] = useState<any>('');
    const addTaskHandler = () => {
        todoListsAPI.createTask(todoListId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'TodoList Id'} value={todoListId} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
            <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
            <button onClick={addTaskHandler}>Add Task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [todoListId, setTodoListId] = useState<any>('');
    const [taskId, setTaskId] = useState<any>('');
    const updateTaskHandler = () => {
        todoListsAPI.changeTaskTitle(todoListId, taskId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'TodoList Id'} value={todoListId} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
            <input placeholder={'Task Id'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
            <button onClick={updateTaskHandler}>Update Task</button>
        </div>
    </div>
}
