import styled from 'styled-components'

import theme from '../../theme'

export const LinksContainerRow = styled.div`
  width: ${theme.searchBox.width};

  .powered-by {
    font-family: YaleDesign, serif !important;
    letter-spacing: 0px;
    float: right;
  }

  .powered-by span.lux-powered-by {
    font-family: YaleDesign, serif !important;
    font-size: 1.25em;
    letter-spacing: 0px;
  }

  .powered-by span.lux-name {
    font-family: YaleDesign, serif !important;
    font-size: 1.25em;
    letter-spacing: 0px;
    font-weight: 700;
  }
`
