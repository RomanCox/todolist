import React, {useState} from 'react';
import {EditableSpanStyled} from './EditableSpanStyled';
import {ChangeItem} from '../ChangeItem/ChangeItem';

type EditableSpanPropsType = {
    title: string,
    changeTitle: (newTitle: string) => void,
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const activateEditMode = () => {
        setEditMode(true)
    };

    return editMode
        ? <ChangeItem title={props.title} changeTitle={props.changeTitle} setEditMode={setEditMode}/>
        : <EditableSpanStyled onDoubleClick={activateEditMode}>{props.title}</EditableSpanStyled>
};