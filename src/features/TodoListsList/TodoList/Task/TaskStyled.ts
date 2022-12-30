// import styled from 'styled-components';
import {TaskStatuses} from '../../../../api/todoListsAPI.types';
import {Paper, styled} from "@mui/material";
type TaskStyledType = {
    status: TaskStatuses
}

export const TaskStyled = styled(Paper)<TaskStyledType>`
  position: relative;
  opacity: ${props => props.status === 2 ? '0.5' : '1'};
  cursor: grab;
`