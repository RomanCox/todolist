import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddItemContainerStyled} from './AddItemStyled';
import {TextField, IconButton} from '@mui/material';
import {AddBox} from '@mui/icons-material';


type AddItemPropsType = {
    addItem: (title: string) => void
}

export const AddItem = React.memo((props: AddItemPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

    const onClickHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            setNewTaskTitle('')
            return
        }
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle('');
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        }
    };

    return (
        <AddItemContainerStyled>
            <TextField
                value={newTaskTitle}
                onChange={onNewTaskTitleHandler}
                onKeyDown={onKeyPressHandler}
                label={'Task name'}
                error={!!error}
                helperText={error}
            />
            <IconButton color={'secondary'} onClick={onClickHandler}>
                <AddBox sx={{fontSize: '40px'}}/>
            </IconButton>
        </AddItemContainerStyled>
    );
});