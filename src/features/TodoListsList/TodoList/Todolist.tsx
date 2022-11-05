import React, {useCallback, useEffect} from 'react';
import {TitleContainerStyled, TitleStyled} from './TodoListStyled';
import {AddItem} from '../../../components/common/AddItem/AddItem';
import {AddItemFormSubmitHelperType} from '../../../components/common/AddItem/AddItem.types';
import {EditableSpan} from '../../../components/common/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {Button, IconButton, Paper} from '@mui/material';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../utils/reduxUtils.types';
import {useAppDispatch} from '../../../utils/reduxUtils';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todoListsAPI.types';
import {tasksActions, todoListsActions} from '../index';
import {useActions} from '../../../utils/reduxUtils';
import {ColorType, FilterValuesType, TodoListPropsType} from './Todolist.types';

export const Todolist = React.memo(({demo = false, ...props}: TodoListPropsType) => {
    const {deleteTodoList, changeTodoListFilter} = useActions(todoListsActions);
    const {fetchTasks} = useActions(tasksActions);
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoList.id]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) {
            return;
        }
        if (!tasks.length) {
            fetchTasks(props.todoList.id);
        }
    }, [demo, props.todoList.id, fetchTasks]);

    const deleteTodoListHandler = () => deleteTodoList(props.todoList.id);

    const onFilterClickHandler = (filter: FilterValuesType) => changeTodoListFilter({id: props.todoList.id, filter})

    const addTaskHandler = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = tasksActions.addTask({todoListId: props.todoList.id, title});
        const resultAction = await dispatch(thunk);

        if (tasksActions.addTask.rejected.match(resultAction)) {
            helper.setError(resultAction.payload?.errors?.length ? resultAction.payload.errors[0] : 'Some error occurred');
        } else {
            helper.setTitle('')
        }

    }, [props.todoList.id, tasksActions.addTask]);

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle({id: props.todoList.id, title: newTitle})
    }, [props]);

    const renderFilterButton = (buttonFilter: FilterValuesType,
                                color: ColorType,
                                text: string) => {
        return <Button color={color}
                       variant={props.todoList.filter === buttonFilter ? 'outlined' : 'text'}
                       onClick={() => onFilterClickHandler(buttonFilter)}>{text}
        </Button>
    }

    let tasksForTodo: Array<TaskType> = tasks;

    if (props.todoList.filter === 'active') {
        tasksForTodo = tasks.filter(f => f.status === TaskStatuses.New)
    }
    if (props.todoList.filter === 'completed') {
        tasksForTodo = tasks.filter(f => f.status === TaskStatuses.Completed)
    }

    return (
        <Paper style={{padding: '10px', position: 'relative'}}>
            <IconButton
                size={'small'}
                aria-label={'delete'} onClick={deleteTodoListHandler} disabled={props.todoList.entityStatus === 'loading'}
                style={{position: 'absolute', right: '5px', top: '5px'}}
            >
                <Delete fontSize={'small'}/>
            </IconButton>
            <TitleContainerStyled>
                <TitleStyled><EditableSpan title={props.todoList.title} changeTitle={changeTodoListTitle}/></TitleStyled>
            </TitleContainerStyled>
            <AddItem addItem={addTaskHandler} disabled={props.todoList.entityStatus === 'loading'} placeHolder={'Task Name'}/>
            <ul>
                {tasksForTodo.map(task => <Task
                    key={task.id}
                    task={task}
                />)}
            </ul>
            {!tasksForTodo.length && <div style={{padding: '10px', color: 'grey'}}>No tasks</div>}
            <div style={{paddingTop: '10px'}}>
                {renderFilterButton('all', 'secondary', 'All')}
                {renderFilterButton('active', 'primary', 'Active')}
                {renderFilterButton('completed', 'error', 'Completed')}
            </div>
        </Paper>
    )
});