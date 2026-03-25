import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const CIZStackContainer = styled(Row)`
  padding: 0.75rem;
  background-color: ${theme.color.offWhite};
  width: 100%;

  article {
    width: 100%;
    // border-radius: 8px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2)
  }
  
  .zstack-container {
    position: relative;
    width: 100%;
    // padding: 0 1rem;
    background-color: ${theme.color.white};
    margin-bottom: 0;

  .cloudimage-360-zoom-controls, .cloudimage-360-zoom-controls[data-position="top-right"] {
    right: 75px;
    top: 15px;
    background:none;
  }

  .cloudimage-360-zoom-controls .cloudimage-360-zoom-btn {
    background: rgba(0, 0, 0, 0.8);
    margin: 0 5px;
  }
`

export default CIZStackContainer
