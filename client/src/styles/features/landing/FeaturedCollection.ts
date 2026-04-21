import { Col } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const FeaturedCollection = styled(Col)<{ isInSwiper?: boolean }>`
  margin-bottom: 1.25em;
  @media (min-width: ${theme.breakpoints.md}px) {
    margin-bottom: 1.5em !important;
  }

  &:first-child {
    margin-left: 0;
  }

  :last-child {
    margin-bottom: 0px;
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
  }

  .card {
    // border-radius: ${theme.border.radius};
    border-radius: 0px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    height: 100%;
    background-color: ${theme.color.offWhite};
    margin: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .card.featured-card {
    /* More specific styles for Swiper cards */
    border-radius: 0px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    height: 100%;
    background-color: ${theme.color.offWhite};
    margin: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .card-body-wrapper {
    border-left: 0px solid ${theme.color.primary.teal};
    padding-left: 0px;
  }

  .image-container {
    display: block;
    width: 100% !important;
    max-width: 100% !important;
    background-color: black;
    object-fit: contain;
    // border-radius: 8px 8px 0px 0px;
    border-radius: 0px;
  }

  .image-container > a {
    display: block;
    width: 100%;
    max-width: 100%;
  }

  .image-container img,
  .card-image {
    display: block;
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
  }

  .body {
    padding: ${theme.spacing.sectionPaddingX};
  }

  div.search-url {
    padding-top: 1em;
    line-height: 22px;
  }

  img {
    width: 100%;
    height: auto;
    // border-radius: 8px 8px 0px 0px;
    border-radius: 0px;
  }

  h2 {
    margin-bottom: 0.5rem;
    font-family:
      'Mallory Bold' !important,
      sans-serif;
    font-size: 1.5em;
    color: ${theme.color.black};
    letter-spacing: 0;
    line-height: 32px !important;
    font-weight: ${theme.font.weight.bold};
  }

  p {
    margin-bottom: 0.5rem;
  }

  a {
    font-family: 'Mallory Medium', sans-serif;
  }

  a:link,
  a:visited {
    text-decoration: none;
  }

  a:hover,
  a:focus {
    text-decoration: underline;
  }
`

export default FeaturedCollection
