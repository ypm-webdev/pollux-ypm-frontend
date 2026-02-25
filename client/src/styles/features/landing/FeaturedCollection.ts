import { Col } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const FeaturedCollection = styled(Col)`
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
    border-radius: 0;
    box-shadow: 2px 2px 5px ${theme.color.black20};
    height: 100%;
    background-color: ${theme.color.offWhite};
    margin: 0 0.5em;
  }

  .card-body-wrapper {
    border-left: 0px solid ${theme.color.primary.teal};
    padding-left: 0px;
  }

  .image-container {
    background-color: black;
    width: 100%;
    object-fit: contain;
    border-radius: 8px 8px 0px 0px;
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

// OLD STYLESHEET:

// import { Col } from 'react-bootstrap'
// import styled from 'styled-components'

// import theme from '../../theme'

// const FeaturedCollection = styled(Col)`
//   margin-bottom: 1.25em;

//   &:first-child {
//     margin-left: 0;
//   }

//   :last-child {
//     margin-bottom: 0px;
//   }

//   @media (min-width: 768px) {
//     margin-bottom: 0;
//   }

//   .card {
//     border-radius: ${theme.border.radius};
//     box-shadow: 1px 1px 5px ${theme.color.black20};
//     height: 100%;
//   }

//   .image-container {
//     background-color: black;
//     width: 100%;
//     object-fit: contain;
//     border-radius: 8px 8px 0px 0px;
//   }

//   .body {
//     padding: ${theme.spacing.sectionPaddingX};
//   }

//   img {
//     width: 100%;
//     height: auto;
//     border-radius: 8px 8px 0px 0px;
//   }

//   h2 {
//     margin-bottom: 0.5rem;
//     font-family: Inter, sans-serif;
//     font-size: 1.5em;
//     color: ${theme.color.black};
//     letter-spacing: 0;
//     line-height: 32px;
//     font-weight: ${theme.font.weight.bold};
//   }

//   p {
//     margin-bottom: 0.5rem;
//   }
// `

// export default FeaturedCollection
