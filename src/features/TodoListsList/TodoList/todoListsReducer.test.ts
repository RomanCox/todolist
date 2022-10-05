import {v1} from 'uuid';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    deleteTodoListAC, setTodoListsAC, TodoListDomainType,
    todoListsReducer, changeTodoListEntityStatusAC
} from './todoListsReducer';
import {AppStatusesType} from "../../../app/appReducer";

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
    const endState = todoListsReducer(startState, deleteTodoListAC({todoListId: todoListId1}));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todolist should be added', () => {
    let newTodoList = {title: 'New TodoList', id: 'newToDo', order: 0, addedDate: ''};
    const endState = todoListsReducer(startState, addTodoListAC({todoList: newTodoList}));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoList.title);
    expect(endState[0].filter).toBe('all');
});

test('correct todolist should changed its name', () => {
    let newTodoListTitle = 'New TodoList';
    const endState = todoListsReducer(startState, changeTodoListTitleAC({id: todoListId2, newTodoListTitle}));

    expect(endState[0].title).toBe('What to Learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todolist should be changed', () => {
    let newTodoListFilter: FilterValuesType = 'active';
    const endState = todoListsReducer(startState, changeTodoListFilterAC({id: todoListId2, filter: newTodoListFilter}));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newTodoListFilter);
});

test('todolists should be set to the state', () => {
    const endState = todoListsReducer([], setTodoListsAC({todoLists: startState}));

    expect(endState.length).toBe(2);
});

test('correct entityStatus of todolist should be changed', () => {
    let newTodoListEntityStatus: AppStatusesType = 'loading';
    const endState = todoListsReducer(startState, changeTodoListEntityStatusAC({id: todoListId2, status: newTodoListEntityStatus}));

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newTodoListEntityStatus);
});