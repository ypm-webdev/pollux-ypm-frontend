import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import theme from '../theme'

const padX = theme.spacing.sectionPaddingX
const marginX = theme.spacing.contentAbsMarginX

const EntityBody = styled(Row)`
  // margin: 0 0;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: ${marginX};
  margin-right: ${marginX};
  padding-top: ${theme.spacing.sectionGap};
  background-color: ${theme.color.offPanel};

  @media (max-width: ${theme.breakpoints.md}px) {
    margin-left: 0;
    margin-right: 0;
  }
`

export default EntityBody
