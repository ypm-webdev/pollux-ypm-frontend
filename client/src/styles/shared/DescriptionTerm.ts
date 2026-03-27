import styled from 'styled-components'

import theme from '../theme'

const Term = styled.dt`
  font-size: 1em;
  color: ${theme.color.black};
  letter-spacing: 0;
  line-height: 24px;
  font-weight: 700;
  float: left;
  clear: left;
  margin-right: 5px;
  white-space: normal;

  .results-object-callnumber {
    font-family: 'Mallory MP Bold';
    font-weight: 700;
    font-size: 0.95rem;
  }
`

export default Term
