import styled from 'styled-components';
type InputStyledPropsType = {
    border: string,
}

export const AddItemContainerStyled = styled.div``

export const InputStyled = styled.input<InputStyledPropsType>`
  border: ${props => props.border};
`

export const ErrorMessageStyled = styled.div`
  color: red;
`
