import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import theme from '../../theme'

const TitleHeader = styled(Row)`
  margin: 0;
  padding: 1rem 1.5rem;
  background-color: ${theme.color.white};

  h2, h2.page-title, h1, h1.page-title {
    font-family: 'Mallory Bold', sans-serif;
    font-weight: 700;
    color: ${theme.color.black};
    letter-spacing: 1px;
    line-height: 1.2em;
  }

`

export default TitleHeader
