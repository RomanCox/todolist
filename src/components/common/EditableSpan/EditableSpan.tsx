import React, {useState} from 'react';
import {EditableSpanStyled} from './EditableSpanStyled';
import {ChangeItem} from '../ChangeItem/ChangeItem';
import {EditableSpanPropsType} from './EditableSpan.types';

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const activateEditMode = () => {
        setEditMode(true)
    };

    return editMode
        ? <ChangeItem title={props.title} changeTitle={props.changeTitle} setEditMode={setEditMode}/>
        : <EditableSpanStyled onDoubleClick={activateEditMode}>{props.title}</EditableSpanStyled>
});