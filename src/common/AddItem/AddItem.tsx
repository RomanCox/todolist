import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {
    AddItemContainerStyled, ErrorMessageStyled, InputStyled
} from './AddItemStyled';

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
                <InputStyled
                    value={newTaskTitle}
                    onChange={onNewTaskTitleHandler}
                    onKeyDown={onKeyPressHandler}
                    border={border}
                />
                <button onClick={onClickHandler}>+</button>
                {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}
            </AddItemContainerStyled>
    );
};