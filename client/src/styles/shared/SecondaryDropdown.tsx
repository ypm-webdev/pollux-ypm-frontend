import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../theme'

interface IProps {
  actionBgColor?: string
}

const SecondaryDropdown = styled(Button)<IProps>`
  background-color: ${theme.color.white};
  color: ${theme.color.trueBlack};
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-color: ${theme.color.black};
  font-size: 16px;
  padding: 6px;
  font-weight: ${theme.font.weight.regular};
  text-decoration: none;

  div > div > h5 {
    color: ${theme.color.trueBlack};
  }

  &:hover,
  &:focus,
  &:active,
  &:disabled {
    background-color: ${theme.color.tabButtonBgColor};
    border-color: ${theme.color.white};
    color: ${theme.color.white};
    
    div > div > h5 {
      color: ${theme.color.white};
    }
  }

  &:hover > span {
    color: red;
  }
`

export default SecondaryDropdown
