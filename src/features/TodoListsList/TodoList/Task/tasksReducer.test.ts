import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType, updateTaskAC} from './tasksReducer';
import {addTodoListAC, deleteTodoListAC, setTodoListsAC} from '../todoListsReducer';
import {TaskPriorities, TaskStatuses} from '../../../../api/todoListsAPI';

let startState: TasksStateType = {};

beforeEach(() => {
    startState = {
        'todoListId1': [
            {id: '1', title: 'CSS&HTML', status: TaskStatuses.Completed, completed: true, todoListId: 'todoListId1', priority: TaskPriorities.Low, description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, completed: true, todoListId: 'todoListId1', priority: TaskPriorities.Low, description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
            {id: '3', title: 'REACT.JS', status: TaskStatuses.New, completed: false, todoListId: 'todoListId1', priority: TaskPriorities.Low, description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
        ],
        'todoListId2': [
            {id: '1', title: 'MILK', status: TaskStatuses.Completed, completed: true, todoListId: 'todoListId2', priority: TaskPriorities.Low, description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
            {id: '2', title: 'BOOK', status: TaskStatuses.Completed, completed: true, todoListId: 'todoListId2', priority: TaskPriorities.Low, description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
            {id: '3', title: 'BEER', status: TaskStatuses.New, completed: false, todoListId: 'todoListId2', priority: TaskPriorities.Low, description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
        ]
    }
});

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC('todoListId1', '2'));

    expect(endState['todoListId1'].length).toBe(2);
    expect(endState['todoListId2'].length).toBe(3);
    expect(endState['todoListId1'].every(t => t.id !== '2')).toBeTruthy();
});

test('correct task should be added', () => {
    const endState = tasksReducer(startState, addTaskAC({
        todoListId: 'todoListId2',
        id: 'id exist',
        status: 0,
        title: 'New Task',
        addedDate: '',
        completed: false,
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
    }));

    expect(endState['todoListId2'].length).toBe(4);
    expect(endState['todoListId2'][0].title).toBe('New Task');
    expect(endState['todoListId2'][0].status).toBe(TaskStatuses.New);
});

test('correct task should changed its name', () => {
    const endState = tasksReducer(startState, updateTaskAC('todoListId1', '3', {title: 'React + JS'}));

    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId1'][2].title).toBe('React + JS');
    expect(endState['todoListId2'][2].title).toBe('BEER');
});

test('correct task status should be changed', () => {
    const endState = tasksReducer(startState, updateTaskAC('todoListId1', '3', {status: TaskStatuses.Completed}));

    expect(endState['todoListId1'][2].status).toBe(TaskStatuses.Completed);
    expect(endState['todoListId2'][2].status).toBe(TaskStatuses.New);
});

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodoListAC({title: 'title no matter', id: 'newToDo', order: 0, addedDate: ''})
    const endState = tasksReducer(startState, action);
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k === action.payload.todoList.id);
    if (!newKey) {
        throw Error('new key should be added')
    };

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = setTodoListsAC([
        {id: '1', title: 'What to Learn', addedDate: '', order: 0},
        {id: '2', title: 'What to Buy', addedDate: '', order: 0},
    ])
    const endState = tasksReducer(startState, deleteTodoListAC('todoListId2'));
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todoListId2']).not.toBeDefined();
    expect(endState['todoListId2']).toBeUndefined();
});

test('empty arrays should be added when we set todoLists', () => {
    const action = setTodoListsAC([
        {id: '1', title: 'What to Learn', addedDate: '', order: 0},
        {id: '2', title: 'What to Buy', addedDate: '', order: 0},
    ])
    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});

test('tasks should be added for todoList', () => {
    const endState = tasksReducer({'todoListId1': [], 'todoListId2': [],}, setTasksAC('todoListId2', startState['todoListId2']));

    expect(endState['todoListId2'].length).toBe(3);
    expect(endState['todoListId1'].length).toBe(0);
});