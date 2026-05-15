import styled from 'styled-components'

import { ToppedBorderedDiv } from '../../shared/BorderedDiv'
import theme from '../../theme'

const padX = theme.spacing.sectionPaddingX
const marginX = theme.spacing.contentAbsMarginX

const MoreAboutLux = styled(ToppedBorderedDiv)`
  margin-bottom: ${theme.spacing.landingPageSectionGap};
  padding: 37px ${padX} 25px ${padX};
  width: auto;
  background-color: ${theme.color.white};
  margin-left: ${marginX};
  margin-right: ${marginX};
  @media (max-width: ${theme.breakpoints.md}px) {
    margin-left: 0;
    margin-right: 0;
  }

  h2 {
    font-family: 'Mallory Black', sans-serif;
    font-size: ${theme.font.mobile.h1.size};
    font-weight: ${theme.font.mobile.h2.weight};
    line-height: ${theme.font.mobile.h2.lineHeight};
    letter-spacing: 1px;
    color: ${theme.color.trueBlack};
    margin-bottom: 19px;

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 3.1em;
      line-height: ${theme.font.desktop.h1.lineHeight};
      font-weight: ${theme.font.desktop.h2.weight};
    }
  }

  h3 {
    font-family: 'Mallory Bold', sans-serif;
    letter-spacing: 0;
    font-weight: ${theme.font.mobile.h3.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 1.5em;
      line-height: ${theme.font.desktop.h3.lineHeight};
      font-weight: 700;
    }
  }

  p,
  ul {
    letter-spacing: 0;
    color: #222;
    font-size: ${theme.font.mobile.bodyRegular.size};
    line-height: ${theme.font.mobile.bodyRegular.lineHeight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 1em;
      line-height: 32px;
    }

    a,
    span {
      font-size: inherit;
    }
  }

  p {
    font-weight: ${theme.font.weight.extraLight};
  }

  ul {
    list-style-type: none;
    font-weight: 500;
  }

  li:not(:last-child) {
    margin-bottom: 10px;
  }

  .about-lux-button {
    background-color: ${theme.color.primary.darkBlue} !important;
    border-color: ${theme.color.primary.darkBlue} !important;
    color: ${theme.color.white} !important;

    &:hover,
    &:focus,
    &:active {
      background-color: ${theme.color.primary.darkBlue} !important;
      border-color: ${theme.color.primary.darkBlue} !important;
      color: ${theme.color.white} !important;
      opacity: 0.9;
    }
  }
`

export default MoreAboutLux
