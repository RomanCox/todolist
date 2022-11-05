import {v1} from 'uuid';
import {
    changeTodoListFilter,
    changeTodoListEntityStatus
} from './todoListsReducer';
import {todoListsReducer} from '../';
import {AppStatusesType} from '../../Application';
import {todoListsActions} from '../';
import {FilterValuesType, TodoListDomainType} from './Todolist.types';

let todoListId1: string;
let todoListId2: string;
let startState: Array<TodoListDomainType> = [];

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();
    startState = [
        {id: todoListId1, title: 'What to Learn', entityStatus: 'idle', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to Buy', entityStatus: 'idle', filter: 'all', addedDate: '', order: 0},
    ];
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, todoListsActions.deleteTodoList.fulfilled({todoListId: todoListId1}, 'requestId', todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todolist should be added', () => {
    let newTodoList = {title: 'New TodoList', id: 'newToDo', order: 0, addedDate: ''};
    const endState = todoListsReducer(startState, todoListsActions.addTodoList.fulfilled({todoList: newTodoList}, 'requestId', newTodoList.title));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoList.title);
    expect(endState[0].filter).toBe('all');
});

test('correct todolist should changed its name', () => {
    let newTodoListTitle = 'New TodoList';
    const param = {id: todoListId2, title: newTodoListTitle};
    const endState = todoListsReducer(startState, todoListsActions.changeTodoListTitle.fulfilled(param, 'requestId', param));

    expect(endState[0].title).toBe('What to Learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todolist should be changed', () => {
    let newTodoListFilter: FilterValuesType = 'active';
    const endState = todoListsReducer(startState, changeTodoListFilter({id: todoListId2, filter: newTodoListFilter}));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newTodoListFilter);
});

test('todolists should be set to the state', () => {
    const endState = todoListsReducer([], todoListsActions.fetchTodoLists.fulfilled({todoLists: startState}, 'requestId', undefined));

    expect(endState.length).toBe(2);
});

test('correct entityStatus of todolist should be changed', () => {
    let newTodoListEntityStatus: AppStatusesType = 'loading';
    const endState = todoListsReducer(startState, changeTodoListEntityStatus({id: todoListId2, status: newTodoListEntityStatus}));

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newTodoListEntityStatus);
});