import React, {useCallback, useEffect} from 'react';
import {TitleContainerStyled, TitleStyled} from './TodoListStyled';
import {AddItem} from '../../../components/common/AddItem/AddItem';
import {AddItemFormSubmitHelperType} from '../../../components/common/AddItem/AddItem.types';
import {EditableSpan} from '../../../components/common/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {Button, IconButton, Paper, Stack} from '@mui/material';
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

    // const onDragStartHandler = (e: React.DragEvent<HTMLElement>, task: TaskType) => {
    //     console.log("start drag " + task.title)
    // };
    // const onDragLeaveHandler = (e: React.DragEvent<HTMLElement>) => {
    //     console.log("start drag")
    // };
    // const onDragEndHandler = (e: React.DragEvent<HTMLElement>) => {
    //     console.log("end drag")
    // };
    // const onDragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    //     e.preventDefault();
    //     console.log("drag over")
    // };
    // const onDropHandler = (e: React.DragEvent<HTMLElement>, currentTask: TaskType) => {
    //     e.preventDefault();
    //     if (tasks.length) {
    //         tasks.map(task => {
    //             if (task.id === currentTask.id) {
    //                 return {...task, order: currentTask.order}
    //             }
    //         })
    //     }
    // };
    const sortTasks = (a: TaskType, b: TaskType) => {
        if (a.order < b.order) {
            return 1
        } else {
            return -1
        }
    }
    if (tasksForTodo.length > 2) {
        //console.log(tasksForTodo.sort(sortTasks))
    }

    return (
        <Paper style={{height: '100%', padding: '10px', position: 'relative'}}>
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
            <Stack spacing={2} style={{maxHeight: 'calc(60vh - 200px)', overflowY: 'auto', marginTop: '20px'}}>
                {tasksForTodo.map(task => <Task
                    key={task.id}
                    task={task}
                    tasks={tasks}
                    // onDragStart={(e: React.DragEvent<HTMLElement>) => onDragStartHandler(e, task)}
                    // onDragLeave={(e: React.DragEvent<HTMLElement>) => onDragLeaveHandler(e)}
                    // onDragEnd={(e: React.DragEvent<HTMLElement>) => onDragEndHandler(e)}
                    // onDragOver={(e: React.DragEvent<HTMLElement>) => onDragOverHandler(e)}
                    // onDrop={(e: React.DragEvent<HTMLElement>) => onDropHandler(e, task)}
                />)}
            </Stack>
            {!tasksForTodo.length && <div style={{padding: '10px', color: 'grey'}}>No tasks</div>}
            <div style={{paddingTop: '10px'}}>
                {renderFilterButton('all', 'secondary', 'All')}
                {renderFilterButton('active', 'primary', 'Active')}
                {renderFilterButton('completed', 'error', 'Completed')}
            </div>
        </Paper>
    )
});