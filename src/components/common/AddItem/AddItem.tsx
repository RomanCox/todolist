import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddItemContainerStyled} from './AddItemStyled';
import {TextField, IconButton} from '@mui/material';
import {AddBox} from '@mui/icons-material';
import {AddItemPropsType} from './AddItem.types';

export const AddItem = React.memo(({addItem, disabled = false, placeHolder = 'Enter value', ...props}: AddItemPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

    const onClickHandler = async () => {
        if (newTaskTitle.trim() !== '') {
            addItem(newTaskTitle.trim(), {setTitle: setNewTaskTitle, setError});
        } else {
            setError('Title is required');
        }
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addItem(newTaskTitle.trim(), {setTitle: setNewTaskTitle, setError});
        }
    };

    return (
        <AddItemContainerStyled>
            <TextField
                value={newTaskTitle}
                onChange={onNewTaskTitleHandler}
                onKeyDown={onKeyPressHandler}
                label={placeHolder}
                error={!!error}
                helperText={error}
                disabled={disabled}
            />
            <IconButton color={'secondary'} onClick={onClickHandler} disabled={disabled}>
                <AddBox sx={{marginLeft: '5px', fontSize: '40px'}}/>
            </IconButton>
        </AddItemContainerStyled>
    );
});