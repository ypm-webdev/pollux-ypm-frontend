import styled from 'styled-components'

import theme from '../../theme'
import { BorderedDiv } from '../../shared/BorderedDiv'

const { h2, ul } = theme.contentPage

const TermsOfUsePage = styled(BorderedDiv)`
  margin-top: ${theme.contentPage.headerGap};
  margin-bottom: ${theme.contentPage.footerGap};
  margin-left: ${theme.spacing.sectionAbsMarginX};
  margin-right: ${theme.spacing.sectionAbsMarginX};

  padding: ${theme.spacing.sectionPaddingX};
  background-color: ${theme.color.white};

  h1, h1.page-title {
    margin-bottom: 0.5rem;
    font-family: 'Mallory Bold', sans-serif;
    line-height: 1.1em;
    background-color: ${theme.color.white};
  }
  h2 {
    font-size: 1.75rem;
    font-family: "Mallory Bold", sans-serif;
    font-weight: ${h2.fontWeight};
    letter-spacing: ${h2.letterSpacing};
    line-height: 1.25em;
    color: black;
    margin-bottom: 0.5rem;
  }

  ul {
    padding-left: ${ul.paddingLeft};
  }
`

export default TermsOfUsePage
