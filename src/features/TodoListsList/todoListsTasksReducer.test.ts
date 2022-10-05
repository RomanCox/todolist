import {
    addTodoListAC, TodoListDomainType,
    todoListsReducer
} from './TodoList/todoListsReducer';
import {tasksReducer, TasksStateType} from './TodoList/Task/tasksReducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    const action = addTodoListAC({todoList: {title: 'New TodoList', id: 'newToDo', order: 0, addedDate: ''}});
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodoListsState = todoListsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodoLists).toBe(action.payload.todoList.id);
});