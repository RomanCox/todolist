import {todoListsAsyncActions as todoListsActions} from './TodoList/todoListsReducer';
import {TodoListDomainType} from './TodoList/Todolist.types';
import {TasksStateType} from './TodoList/Task/Task.types';
import {tasksReducer, todoListsReducer} from './';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    const action = todoListsActions.addTodoList.fulfilled({todoList: {title: 'New TodoList', id: 'newToDo', order: 0, addedDate: ''}}, 'requestId', 'New TodoList');
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodoListsState = todoListsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodoLists).toBe(action.payload.todoList.id);
});