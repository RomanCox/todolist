import React from 'react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatuses} from '../../../../api/todoListsAPI.types';
import {ReduxStoreProviderDecorator} from '../../../../stories/ReduxStoreProviderDecorator';


export default {
    title: 'Task Stories',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

const deleteCallback = action('Delete Button inside Task clicked');
const changeStatusCallback = action('Status changed inside Task');
const changeTitleCallback = action('Title changed inside Task');

export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task
                task={{
                    id: '1', status: TaskStatuses.Completed, title: 'CSS', todoListId: 'todoListId1', description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                }}
            />
            <Task
                task={{
                    id: '2', status: TaskStatuses.New, title: 'JS', todoListId: 'todoListId1', description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                }}
            />
        </div>
    )
}