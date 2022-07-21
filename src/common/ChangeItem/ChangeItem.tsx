import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {
    ChangeItemContainerStyled, ErrorMessageStyled, InputStyled
} from './ChangeItemStyled';

type AddItemPropsType = {
    title: string
    changeTitle: (newTitle: string) => void,
    setEditMode: (editMode: boolean) => void,
}

export const ChangeItem = (props: AddItemPropsType) => {

    const [newTitle, setNewTitle] = useState<string>(props.title);
    const [error, setError] = useState<string | null>(null);
    let border = 'black 1px solid';
    if (error) {
        border = 'red 2px solid'
    }

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
                <InputStyled
                    value={newTitle}
                    onBlur={disActivateEditMode}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyUpHandler}
                    border={border}
                    autoFocus
                />
                {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}
            </ChangeItemContainerStyled>
    );
};