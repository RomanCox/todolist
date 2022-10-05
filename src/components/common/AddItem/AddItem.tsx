import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddItemContainerStyled} from './AddItemStyled';
import {TextField, IconButton} from '@mui/material';
import {AddBox} from '@mui/icons-material';


type AddItemPropsType = {
    addItem: (title: string) => void,
    disabled?: boolean,
    placeHolder?: string,
}

export const AddItem = React.memo(({addItem, disabled = false, placeHolder = 'Enter value', ...props}: AddItemPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

    const onClickHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            setNewTaskTitle('')
            return
        }
        addItem(newTaskTitle.trim());
        setNewTaskTitle('');
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem(newTaskTitle.trim());
            setNewTaskTitle('');
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
                <AddBox sx={{fontSize: '40px'}}/>
            </IconButton>
        </AddItemContainerStyled>
    );
});