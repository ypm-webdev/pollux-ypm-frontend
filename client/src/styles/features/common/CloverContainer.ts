import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const CloverContainer = styled(Row)`
  padding: 0.75rem;
  background-color: ${theme.color.offWhite};
  width: 100%;

  article {
    width: 100%;
    border-radius: 8px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2)
  }
  
  .clover-container {
    position: relative;
    width: 100%;
    padding: 0 1rem;
    background-color: ${theme.color.white};
    margin-bottom: 0;

    @media (min-width: 1200px) {
      padding: 0;
      // height: 800px;
    }

    .clover-viewer {
      width: 100%;
    }

    .clover-viewer-painting {
      border-bottom-left-radius: 8px !important;
    }
  }  

  .summary-panel-inner {
    padding: 1.5rem 1.618rem;
  }
`

export default CloverContainer
