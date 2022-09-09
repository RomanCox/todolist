import {TasksStateType} from '../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {addTodoListAC, removeTodoListAC} from "./todoListsReducer";

test('correct task should be removed', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS&HTML', isDone: true,},
            {id: '2', title: 'JS', isDone: true,},
            {id: '3', title: 'REACT.JS', isDone: false,},
        ],
        'todoListId2': [
            {id: '1', title: 'MILK', isDone: true,},
            {id: '2', title: 'BOOK', isDone: true,},
            {id: '3', title: 'BEER', isDone: false,},
        ]
    };

    const action = removeTaskAC('todoListId1', '2');
    const endState = tasksReducer(startState, action);

    expect(endState['todoListId1'].length).toBe(2);
    expect(endState['todoListId2'].length).toBe(3);
    expect(endState['todoListId1'].every(t => t.id !== '2')).toBeTruthy();
});

test('correct task should be added', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS&HTML', isDone: true,},
            {id: '2', title: 'JS', isDone: true,},
            {id: '3', title: 'REACT.JS', isDone: false,},
        ],
        'todoListId2': [
            {id: '1', title: 'MILK', isDone: true,},
            {id: '2', title: 'BOOK', isDone: true,},
            {id: '3', title: 'BEER', isDone: false,},
        ]
    };

    const action = addTaskAC('todoListId2', 'New Task')
    const endState = tasksReducer(startState, action);

    expect(endState['todoListId2'].length).toBe(4);
    expect(endState['todoListId2'][0].title).toBe('New Task');
    expect(endState['todoListId2'][0].isDone).toBe(false);
});

test('correct task should changed its name', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS&HTML', isDone: true,},
            {id: '2', title: 'JS', isDone: true,},
            {id: '3', title: 'REACT.JS', isDone: false,},
        ],
        'todoListId2': [
            {id: '1', title: 'MILK', isDone: true,},
            {id: '2', title: 'BOOK', isDone: true,},
            {id: '3', title: 'BEER', isDone: false,},
        ]
    };

    const endState = tasksReducer(startState, changeTaskTitleAC('todoListId1', '3', 'React + JS'));

    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId1'][2].title).toBe('React + JS');
    expect(endState['todoListId2'][2].title).toBe('BEER');
});

test('correct task status should be changed', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS&HTML', isDone: true,},
            {id: '2', title: 'JS', isDone: true,},
            {id: '3', title: 'REACT.JS', isDone: false,},
        ],
        'todoListId2': [
            {id: '1', title: 'MILK', isDone: true,},
            {id: '2', title: 'BOOK', isDone: true,},
            {id: '3', title: 'BEER', isDone: false,},
        ]
    };

    const endState = tasksReducer(startState, changeTaskStatusAC('todoListId1', '3', true));

    expect(endState['todoListId1'][2].isDone).toBeTruthy();
    expect(endState['todoListId2'][2].isDone).toBeFalsy();
});

test('new property with new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS&HTML', isDone: true,},
            {id: '2', title: 'JS', isDone: true,},
            {id: '3', title: 'REACT.JS', isDone: false,},
        ],
        'todoListId2': [
            {id: '1', title: 'MILK', isDone: true,},
            {id: '2', title: 'BOOK', isDone: true,},
            {id: '3', title: 'BEER', isDone: false,},
        ]
    };

    const action = addTodoListAC('title no matter');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k === action.payload.todoListId);
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS&HTML', isDone: true,},
            {id: '2', title: 'JS', isDone: true,},
            {id: '3', title: 'REACT.JS', isDone: false,},
        ],
        'todoListId2': [
            {id: '1', title: 'MILK', isDone: true,},
            {id: '2', title: 'BOOK', isDone: true,},
            {id: '3', title: 'BEER', isDone: false,},
        ]
    };

    const action = removeTodoListAC('todoListId2');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todoListId2']).not.toBeDefined();
    expect(endState['todoListId2']).toBeUndefined();
});