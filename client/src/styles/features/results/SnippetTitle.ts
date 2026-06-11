import styled from 'styled-components'

import theme from '../../theme'

const SnippetTitle = styled.span`
  font-size: ${theme.font.mobile.h3.size};
  line-height: ${theme.font.mobile.h3.lineHeight};
  color: ${theme.color.link};
  font-family: 'Mallory Bold', sans-serif;
  letter-spacing: 0;
  text-align: left;
  font-weight: ${theme.font.mobile.h3.weight};
  overflow-wrap: anywhere;
  padding: 0.25em 0;

  @media (min-width: ${theme.breakpoints.md}px) {
    font-size: ${theme.font.desktop.h3.size};
    line-height: ${theme.font.desktop.h3.lineHeight};
    font-weight: ${theme.font.desktop.h3.weight};
  }

`

export default SnippetTitle
