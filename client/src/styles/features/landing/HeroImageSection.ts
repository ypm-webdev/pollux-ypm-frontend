import styled from 'styled-components'

import theme from '../../theme'

const HeroImageSection = styled.div`
  position: relative;
  min-height: ${theme.landingPage.heroImageSection.minHeight};
  background-color: ${theme.color.white};

  .hero-image-container {
    left: 0;
    top: 0;
    padding-top: 0px;
    overflow: hidden;

    img {
      max-height: ${theme.landingPage.heroImageSection.minHeight};
      object-fit: cover;

      &:focus {
        border: 3px solid ${theme.color.primary.blue};
      }

      @media (min-width: ${theme.breakpoints.md}px) {
        padding-top: 33px;
      }
    }
  }


  .captionDiv {
    position: absolute;
    bottom: 0px;
    font-family: 'Mallory Light', sans-serif;
    font-size: 1em;
    color: #fff;
    letter-spacing: 0;
    font-weight: 300;
    width: 100%;
    display: flex;
    float: right;
    justify-content: end;

    .caption {
      background-color: ${theme.color.black65};
      width: 100%;
      padding-left: 70px;
      padding-right: 42px;
      display: flex;
      justify-content: start;
      z-index: 10; // this is to ensure it is not behind other content at a smaller viewport

      @media (min-width: ${theme.breakpoints.sm}px) {
        justify-content: end;
        padding-left: 2rem;
        padding-right: 2rem;
      }

      @media (min-width: ${theme.breakpoints.md}px) {
        z-index: 0;
      }
    }

    a {
      color: #fff;
      text-decoration: underline;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;

      @media (min-width: ${theme.breakpoints.md}px) {
        max-width: 40%;
      }
      @media (min-width: ${theme.breakpoints.lg}px) {
        max-width: 50%;
      }
    }
  }

  @media (min-width: 992px) {
    .hero-image-container {
      img {
        max-height: none;
        width: 100%;
        height: auto;
      }
    }
  }
`

export default HeroImageSection
