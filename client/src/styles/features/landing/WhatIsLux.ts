import styled from 'styled-components'

import theme from '../../theme'

// The "What is LUX" panel layered over the hero image
const WhatIsLux = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: ${theme.spacing.contentAbsMarginX};
  width: auto;
  background-color: ${theme.color.teal90};
  margin-right: 40px;
  z-index: 1;

  h2 {
    position: absolute;
    left: 0px;
    top: 33px;
    width: 110%;
    height: auto;
    padding: 25px ${theme.spacing.contentAbsMarginX};
    color: ${theme.color.white};
    background-color: ${theme.color.primary.darkBlue};
    font-family: 'Mallory Bold', sans-serif;
    font-size: ${theme.font.mobile.h1.size};
    font-weight: ${theme.font.weight.extraLight};
    letter-spacing: 0px;
    z-index: 2;
    box-shadow: 5px 4px 4px rgba(0, 0, 0, 0.25);

    @media (min-width: ${theme.breakpoints.sm}px) {
      font-size: ${theme.font.desktop.h1.size};
      left: -${theme.spacing.contentAbsMarginX};
      width: auto;
      // box-shadow: none;
    }
  }

  p {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 140px;
    font-family: 'Mallory Light', sans-serif;
    font-size: 1.2rem;
    color: ${theme.color.offWhite};
    letter-spacing: 0;
    text-align: left;
    line-height: 1.8rem;
    font-weight: ${theme.font.weight.light};
  
    @media (min-width: ${theme.breakpoints.md}px) {
      padding-top: 150px;
      padding-left: 47px;
      padding-right: 56px;
      font-size: ${theme.font.desktop.h3.size};
      line-height: 1.25em;
    }
  }

  a {
    font-family: 'Mallory Medium', sans-serif;
  }

  a:link,
  a:visited {
    text-decoration: none;
    color: ${theme.color.trueBlack};
    font-size: 0.9em;
    background-color: ${theme.color.white};
    padding: 10px 20px;
    border: none;
  
    @media (min-width: ${theme.breakpoints.lg}px) {
      font-size: 0.8em;
    }
  }

  a:hover,
  a:focus {
    background-color: ${theme.color.offWhite};
  }

  @media (min-width: 552px) {
    max-width: 460px;
    margin-right: 0;
  }

  @media (max-width: ${theme.breakpoints.sm}px) {
    left: 0;
    width: 65%;
    margin-right: 0;
  }

  @media (min-width: 992px) {
    p {
      padding-top: 170px;
      font-size: 1.4em;
      line-height: 2.5rem;
    }
  }

  @media (min-width: 1200px) {
    p {
      padding-top: 176px;
      font-size: 2em;
      line-height: 2.5rem;
    }
  }
`

export default WhatIsLux
