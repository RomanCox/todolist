import styled from 'styled-components';
import {TaskStatuses} from '../../../../api/todoListsAPI.types';
type TaskStyledType = {
    status: TaskStatuses
}

export const TaskStyled = styled.li<TaskStyledType>`
  position: relative;
  opacity: ${props => props.status === 2 ? '0.5' : '1'};
`