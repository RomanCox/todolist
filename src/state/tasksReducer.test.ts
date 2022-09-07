import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask, tasksReducer} from "./tasksReducer";

test('correct task should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let taskId1 = v1();

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId1, title: 'CSS&HTML', isDone: true,},
            {id: v1(), title: 'JS', isDone: true,},
            {id: v1(), title: 'REACT.JS', isDone: false,},
            {id: v1(), title: 'REST API', isDone: false,},
            {id: v1(), title: 'GraphQL', isDone: false,},
        ],
        [todolistId2]: [
            {id: v1(), title: 'MILK', isDone: true,},
            {id: v1(), title: 'BOOK', isDone: true,},
            {id: v1(), title: 'BEER', isDone: false,},
        ]
    };

    const endState = tasksReducer(startState, RemoveTask(todolistId1, taskId1));

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId2].length).toBe(3);
});

test('correct task should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTaskTitle = 'New Task';

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true,},
            {id: v1(), title: 'JS', isDone: true,},
            {id: v1(), title: 'REACT.JS', isDone: false,},
            {id: v1(), title: 'REST API', isDone: false,},
            {id: v1(), title: 'GraphQL', isDone: false,},
        ],
        [todolistId2]: [
            {id: v1(), title: 'MILK', isDone: true,},
            {id: v1(), title: 'BOOK', isDone: true,},
            {id: v1(), title: 'BEER', isDone: false,},
        ]
    };

    const endState = tasksReducer(startState, AddTask(todolistId2, newTaskTitle));

    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId2][0].title).toBe(newTaskTitle);
    expect(endState[todolistId2][0].isDone).toBe(false);
});

test('correct task should changed its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTaskTitle = 'React + JS';

    let taskId3 = v1();

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true,},
            {id: v1(), title: 'JS', isDone: true,},
            {id: taskId3, title: 'REACT.JS', isDone: false,},
            {id: v1(), title: 'REST API', isDone: false,},
            {id: v1(), title: 'GraphQL', isDone: false,},
        ],
        [todolistId2]: [
            {id: v1(), title: 'MILK', isDone: true,},
            {id: v1(), title: 'BOOK', isDone: true,},
            {id: v1(), title: 'BEER', isDone: false,},
        ]
    };

    const endState = tasksReducer(startState, ChangeTaskTitle(todolistId1, taskId3, newTaskTitle));

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][2].title).toBe(newTaskTitle);
    expect(endState[todolistId2][2].title).toBe('BEER');
});

test('correct task status should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let isDone = true;

    let taskId3 = v1();

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true,},
            {id: v1(), title: 'JS', isDone: true,},
            {id: taskId3, title: 'REACT.JS', isDone: false,},
            {id: v1(), title: 'REST API', isDone: false,},
            {id: v1(), title: 'GraphQL', isDone: false,},
        ],
        [todolistId2]: [
            {id: v1(), title: 'MILK', isDone: true,},
            {id: v1(), title: 'BOOK', isDone: true,},
            {id: v1(), title: 'BEER', isDone: false,},
        ]
    };

    const endState = tasksReducer(startState, ChangeTaskStatus(todolistId1, taskId3, isDone));

    expect(endState[todolistId1][2].isDone).toBe(isDone);
    expect(endState[todolistId2][2].isDone).toBe(false);
});