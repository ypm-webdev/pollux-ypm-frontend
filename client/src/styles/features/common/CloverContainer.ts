import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const CloverContainer = styled(Row)`
  padding: 0.75rem;
  background-color: ${theme.color.offWhite};
  width: 100%;

  article {
    width: 100%;
    // border-radius: 8px;
    // box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2)
  }

  .viewer-container {
    // padding-top: 0!important;
    margin-top: 0 !important;
  }

  .clover-container {
    position: relative;
    width: 100%;
    padding: 0 1rem;
    // background-color: ${theme.color.white};
    background: transparent;
    margin-bottom: 0;

    @media (min-width: 1200px) {
      padding: 0;
      // height: 800px;
    }

    .clover-viewer {
      width: 100%;
    }
    .clover-viewer-information-panel {
      padding-top: 1rem;
    }

    .clover-viewer-content {
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
      background-color: ${theme.color.white};
    }

    .clover-viewer-painting {
      // border-bottom-left-radius: 8px !important;
    }
  }

  .solo-iiif-header {
    position: absolute;
    transform: translateY(12px);
    font-family: 'Mallory Medium', sans-serif;
    font-weight: 500;
    padding-left: 1.5rem;
    margin-bottom: 0px !important;
    font-size: 1.25rem;
  }

  .summary-panel-inner {
    padding: 1.5rem 1.618rem;
  }
`

export default CloverContainer
