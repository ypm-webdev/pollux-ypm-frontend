import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import theme from '../../theme'

const EntityHeader = styled(Row)`
  margin: 0;
  padding: 1rem;
  // background-color: ${theme.color.white};
  background: linear-gradient(to bottom, ${theme.color.white} 0%, ${theme.color.offWhite} 100%);

  h1, h1.main-label-title {
    font-family: 'Mallory Bold', sans-serif;
    text-transform: none;
    font-weight: 700;
    letter-spacing: 0px;
    flex-grow: 1;
    margin: 0;
    display: flex;
    line-height: 1.1em;
    // padding-left: 1.5rem;
  }

  .entity-supertype-icon {
    margin-left: auto;
  }

  .entity-agent-header-data {
    margin-top: 0rem;
    // margin-left: 1.5rem;
    font-size: ${theme.font.mobile.h4.size};
    font-family: 'Mallory Bold', sans-serif;
    font-weight: 500;
    letter-spacing: 0px;
  }

  .catalog-number-display {
    font-family: 'Mallory Medium', sans-serif;
    font-weight: 500;
    font-size: 0.95rem;
  }

  a.identifier-anchor-link {
    color: ${theme.color.black};
    text-decoration: none;
    
    &:hover {
      color: ${theme.color.black65};
      text-decoration: underline;
    }

  }

`

export default EntityHeader
