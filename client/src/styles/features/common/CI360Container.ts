import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const CI360Container = styled(Row)`
  padding: 0.75rem;
  background-color: ${theme.color.offWhite};
  width: 100%;

  article {
    width: 100%;
    border-radius: 8px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2)
  }
  
  .360-container {
    position: relative;
    width: 100%;
    background-color: ${theme.color.white};
    margin-bottom: 0;

`

export default CI360Container
