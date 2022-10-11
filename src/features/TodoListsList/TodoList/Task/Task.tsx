import React, {ChangeEvent, useCallback} from 'react';
import {TaskStyled} from './TaskStyled';
import {EditableSpan} from '../../../../components/common/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {Checkbox, IconButton} from '@mui/material';
import {deleteTaskTC, updateTaskTC} from './tasksReducer';
import {TaskStatuses, TaskType} from '../../../../api/todoListsAPI';
import {useAppDispatch} from '../../../../app/store';

type TaskPropsType = {
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useAppDispatch();

    const deleteTask = useCallback(() => dispatch(deleteTaskTC({todoListId: props.task.todoListId, taskId: props.task.id})), [props.task.todoListId, props.task.id, dispatch]);
    const changeTaskTitle = useCallback((newTitle: string) => {
        // dispatch(updateTaskTC(props.task.todoListId, props.task.id, {title: newTitle}));
        dispatch(updateTaskTC({todoListId: props.task.todoListId, taskId: props.task.id, domainModel: {title: newTitle}}));
    }, [dispatch, props.task.todoListId, props.task.id]);
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC({todoListId: props.task.todoListId, taskId: props.task.id, domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}}))
    }

    return <TaskStyled status={props.task.status}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(e)}
            color={'secondary'}
        />
        <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
        <IconButton aria-label='delete' onClick={deleteTask}>
            <Delete/>
        </IconButton>
    </TaskStyled>
});