import React, {ChangeEvent, useCallback} from 'react';
import {
    TaskStyled
} from './TaskStyled';
import {EditableSpan} from '../../common/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {IconButton, Checkbox} from '@mui/material';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/tasksReducer';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TaskPropsType = {
    todoListId: string,
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();

    const onClickHandler = useCallback(() => dispatch(removeTaskAC(props.todoListId, props.task.id)), [dispatch, props.todoListId, props.task.id]);
    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.todoListId, props.task.id, newTitle));
    }, [dispatch, props.todoListId, props.task.id]);

    return <TaskStyled isDone={props.task.isDone}>
        <Checkbox
            checked={props.task.isDone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(props.todoListId, props.task.id, e.currentTarget.checked))}
            color={'secondary'}
        />
        <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
        <IconButton aria-label='delete' onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </TaskStyled>
});