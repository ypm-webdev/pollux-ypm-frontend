import styled from 'styled-components'

import theme from '../../theme'

const PageLoading = styled.div`
  padding-left: ${theme.spacing.contentAbsMarginX};
  padding-right: ${theme.spacing.contentAbsMarginX};
  // background: linear-gradient(to bottom, ${theme.color.white} 0%, ${theme.color.offWhite} 100%);

  h2 {
    font-family: 'Mallory Bold', sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
  }
  
`

export default PageLoading
