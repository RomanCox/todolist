import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ChangeItemContainerStyled, ErrorMessageStyled} from './ChangeItemStyled';
import {TextField} from '@mui/material';

type AddItemPropsType = {
    title: string
    changeTitle: (newTitle: string) => void,
    setEditMode: (editMode: boolean) => void,
}

export const ChangeItem = (props: AddItemPropsType) => {

    const [newTitle, setNewTitle] = useState<string>(props.title);
    const [error, setError] = useState<string | null>(null);

    const disActivateEditMode = () => {
        if (newTitle.trim() === '') {
            setError('Title is required')
            return
        }
        setError(null)
        props.setEditMode(false)
        props.changeTitle(newTitle)
    };

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            props.setEditMode(false)
            setNewTitle(props.title)
        }
        if (e.key === 'Enter') {
            disActivateEditMode()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }

    return (
        <ChangeItemContainerStyled>
            <TextField
                value={newTitle}
                onBlur={disActivateEditMode}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
                error={!!error}
                autoFocus
                variant={'standard'}
                color={'secondary'}
            />
            {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}
        </ChangeItemContainerStyled>
    );
};