import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';
import {
    addTodoList,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTodoList,
    todoListsReducer
} from './todoListsReducer';

test('correct todolist should be removed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to Learn', filter: 'all'},
        {id: todoListId2, title: 'What to Buy', filter: 'all'},
    ];

    const endState = todoListsReducer(startState, removeTodoList(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todolist should be added', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = 'New TodoList';

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to Learn', filter: 'all'},
        {id: todoListId2, title: 'What to Buy', filter: 'all'},
    ];

    const endState = todoListsReducer(startState, addTodoList(newTodoListTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should changed its name', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = 'New TodoList';

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to Learn', filter: 'all'},
        {id: todoListId2, title: 'What to Buy', filter: 'all'},
    ];

    const endState = todoListsReducer(startState, changeTodoListTitle(todoListId2, newTodoListTitle));

    expect(endState[0].title).toBe('What to Learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todolist should be changed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListFilter: FilterValuesType = 'active';

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: 'What to Learn', filter: 'all'},
        {id: todoListId2, title: 'What to Buy', filter: 'all'},
    ];

    const endState = todoListsReducer(startState, changeTodoListFilter(todoListId2, newTodoListFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newTodoListFilter);
});