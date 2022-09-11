import styled from 'styled-components';
type TaskStyledType = {
    isDone: boolean
}

export const TaskStyled = styled.li<TaskStyledType>`
  opacity: ${props => props.isDone ? '0.5' : '1'};
`