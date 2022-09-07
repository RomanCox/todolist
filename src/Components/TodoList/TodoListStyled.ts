import styled from 'styled-components';
type TaskStyledType = {
    opacity: string
}

export const TodoListStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`
export const TitleContainerStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const TitleStyled = styled.h3``

export const TaskStyled = styled.li<TaskStyledType>`
  opacity: ${props => props.opacity};
`