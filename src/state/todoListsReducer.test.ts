import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';
import {
    AddTodoList,
    ChangeTodoListFilter,
    ChangeTodoListTitle,
    RemoveTodoList,
    todoListsReducer
} from './todoListsReducer';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to Learn', filter: 'all'},
        {id: todolistId2, title: 'What to Buy', filter: 'all'},
    ];

    const endState = todoListsReducer(startState, RemoveTodoList(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListTitle = 'New TodoList';

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to Learn', filter: 'all'},
        {id: todolistId2, title: 'What to Buy', filter: 'all'},
    ];

    const endState = todoListsReducer(startState, AddTodoList(newTodoListTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should changed its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListTitle = 'New TodoList';

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to Learn', filter: 'all'},
        {id: todolistId2, title: 'What to Buy', filter: 'all'},
    ];

    const endState = todoListsReducer(startState, ChangeTodoListTitle(todolistId2, newTodoListTitle));

    expect(endState[0].title).toBe('What to Learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListFilter: FilterValuesType = 'active';

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to Learn', filter: 'all'},
        {id: todolistId2, title: 'What to Buy', filter: 'all'},
    ];

    const endState = todoListsReducer(startState, ChangeTodoListFilter(todolistId2, newTodoListFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newTodoListFilter);
});