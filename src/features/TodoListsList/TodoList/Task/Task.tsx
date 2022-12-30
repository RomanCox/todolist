import React, {ChangeEvent, useCallback, useState} from 'react';
import {TaskStyled} from './TaskStyled';
import {EditableSpan} from '../../../../components/common/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {Checkbox, IconButton} from '@mui/material';
import {TaskStatuses, TaskType} from '../../../../api/todoListsAPI.types';
import {tasksActions} from '../../';
import {useActions} from '../../../../utils/reduxUtils';
import {TaskPropsType} from './Task.types';

export const Task = React.memo(({
                                    task,
                                    // onDragStart,
                                    // onDragLeave,
                                    // onDragEnd,
                                    // onDragOver,
                                    // onDrop,
                                    tasks
                                }: TaskPropsType) => {

    const {deleteTask, updateTask, reOrderTask} = useActions(tasksActions);
    const [currentTask, setCurrentTask] = useState<TaskType>(task);

    const deleteTaskHandler = () => deleteTask({todoListId: task.todoListId, taskId: task.id});
    const onChangeTaskTitleHandler = useCallback((newTitle: string) => {
        updateTask({
            todoListId: task.todoListId,
            taskId: task.id,
            domainModel: {title: newTitle}
        })
    }, [updateTask, task.id, task.todoListId]);
    const onChangeTaskStatusHandler = useCallback((e: any) => {
        updateTask({
            todoListId: task.todoListId,
            taskId: task.id,
            domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        })
    }, [updateTask, task.todoListId, task.id]);
    const onDragStartHandler = (e: React.DragEvent<HTMLElement>, task: TaskType) => {
        // reOrderTask({
        //     todoListId: task.todoListId,
        //     taskId: task.id,
        //     reOrderModel: {putAfterItemId: currentTask.id}
        // })
        setCurrentTask(task)
    };
    const onDragLeaveHandler = (e: React.DragEvent<HTMLElement>) => {
        e.currentTarget.style.background = 'white';
    };
    const onDragEndHandler = (e: React.DragEvent<HTMLElement>) => {
        e.currentTarget.style.background = 'white';
    };
    const onDragOverHandler = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.currentTarget.style.background = 'lightgrey';
    };
    const onDropHandler = (e: React.DragEvent<HTMLElement>, task: TaskType) => {
        e.preventDefault();
        if (tasks.length) {
            tasks.map(t => {
                if (t.id === task.id) {
                    return {...t, order: currentTask.order}
                }
                if (t.id === currentTask.id) {
                    return {...t, order: task.order}
                }
                return t
            })
        }
        e.currentTarget.style.background = 'white';
    };

    return <TaskStyled
        status={task.status}
        draggable={true}
        onDragStart={(e) => onDragStartHandler(e, task)}
        onDragLeave={(e) => onDragLeaveHandler(e)}
        onDragEnd={(e) => onDragEndHandler(e)}
        onDragOver={(e) => onDragOverHandler(e)}
        onDrop={(e) => onDropHandler(e, task)}
    >
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeTaskStatusHandler(e)}
            color={'secondary'}
        />
        <EditableSpan title={task.title} changeTitle={onChangeTaskTitleHandler}/>
        <IconButton aria-label='delete' onClick={deleteTaskHandler}
                    style={{position: 'absolute', top: '2px', right: '2px'}}>
            <Delete fontSize={'small'}/>
        </IconButton>
    </TaskStyled>
});