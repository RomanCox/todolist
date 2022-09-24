import styled from 'styled-components';
import {TaskStatuses} from '../../../../api/todoListsAPI';
type TaskStyledType = {
    status: TaskStatuses
}

export const TaskStyled = styled.li<TaskStyledType>`
  opacity: ${props => props.status === 2 ? '0.5' : '1'};
`