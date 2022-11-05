import React, {ChangeEvent, useCallback} from 'react';
import {TaskStyled} from './TaskStyled';
import {EditableSpan} from '../../../../components/common/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {Checkbox, IconButton} from '@mui/material';
import {TaskStatuses} from '../../../../api/todoListsAPI.types';
import {tasksActions} from '../../';
import {useActions} from '../../../../utils/reduxUtils';
import {TaskPropsType} from './Task.types';

export const Task = React.memo((props: TaskPropsType) => {

    const {deleteTask, updateTask} = useActions(tasksActions);

    const deleteTaskHandler = () => deleteTask({todoListId: props.task.todoListId, taskId: props.task.id});
    const onChangeTaskTitleHandler = useCallback((newTitle: string) => {
        updateTask({
            todoListId: props.task.todoListId,
            taskId: props.task.id,
            domainModel: {title: newTitle}})
    }, [updateTask, props.task.id, props.task.todoListId]);
    const onChangeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todoListId: props.task.todoListId,
            taskId: props.task.id,
            domainModel: {status: e.currentTarget.value ? TaskStatuses.Completed : TaskStatuses.New}})
    }, [updateTask, props.task.todoListId, props.task.id]);

    return <TaskStyled status={props.task.status}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeTaskStatusHandler(e)}
            color={'secondary'}
        />
        <EditableSpan title={props.task.title} changeTitle={onChangeTaskTitleHandler}/>
        <IconButton aria-label='delete' onClick={deleteTaskHandler} style={{position: 'absolute', top: '2px', right: '2px'}}>
            <Delete fontSize={'small'}/>
        </IconButton>
    </TaskStyled>
});