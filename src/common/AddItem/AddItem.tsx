import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {
    AddItemContainerStyled, ErrorMessageStyled, InputStyled, ButtonAdd
} from './AddItemStyled';
import { TextField, IconButton } from '@mui/material';
import { PlaylistAddCircle, AddBox } from "@mui/icons-material";


type AddItemPropsType = {
    addItem: (title: string) => void,
}

export const AddItem = (props: AddItemPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

    let border = 'black 1px solid';
    if (error) {
        border = 'red 2px solid'
    }

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
        setError(null)
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
                <IconButton color={'secondary'} onClick={onClickHandler} >
                    {/*<PlaylistAddCircle sx={{fontSize: '40px'}} />*/}
                    <AddBox sx={{fontSize: '40px'}} />
                </IconButton>
            </AddItemContainerStyled>
    );
};