import styled from 'styled-components'

import theme from '../../theme'

const Header = styled.div`
  width: 100%;
  .navbar {
    background-color: ${theme.color.primary.darkBlue} !important;
    padding: 1.25 auto;

    .container {
      width: 100%;
    }
  }

  .powered-by-lux {
    float: right;
    padding-right: 1em;
  }

  .powered-by-lux span.lux-powered-by {
    font-family: YaleDesign, serif;
    font-size: 1.25em;
    letter-spacing: 0px;
    color: ${theme.color.primary.darkBlue};
  }

  .powered-by-lux span.lux-name {
    font-family: YaleDesign, serif;
    font-size: 1.25em;
    letter-spacing: 0px;
    font-weight: 700;
    color: ${theme.color.primary.darkBlue};
  }

  .navbarContainer {
    justify-content: start;

    @media (min-width: ${theme.breakpoints.md}px) {
      justify-content: space-between;
    }
  }

  .navbar-brand {
    font-family: YaleDesign, serif;
    font-weight: 400;
    color: ${theme.color.white};
    white-space: pre-wrap;
    order: 2;

    @media (min-width: ${theme.breakpoints.md}px) {
      order: 1;
    }
  }

  .logo-top {
    padding-left: 10px;
    padding-bottom: 10px;
    width: 70%;
    height: auto;
    display: block;

    @media (max-width: ${theme.breakpoints.xs}px) {
      width: 100%;
    }

    @media (min-width: ${theme.breakpoints.md}px) {
      display: none;
      width: 100%;
    }
  }

  .logo-left {
    width: 80%;
    height: auto;
    display: none;

    @media (min-width: ${theme.breakpoints.md}px) {
      display: block;
    }
  }

  .main-header-container {
    background-color: ${theme.color.white};
  }

  #nav-links a {
    color: ${theme.color.white};
    font-weight: ${theme.font.weight.medium};
  }

  .navbar-dark .navbar-toggler {
    color: ${theme.color.white};
    border: none;
    font-weight: ${theme.font.weight.medium};
    order: 1;

    @media (min-width: ${theme.breakpoints.lg}px) {
      float: right;
      padding: 0;
    }

    @media (min-width: ${theme.breakpoints.md}px) {
      order: 2;
    }
  }

  .navbar-collapse {
    order: 3;
  }

  @media (min-width: ${theme.breakpoints.sm}px) {
    &.navbar-collapse {
      display: block;
      flex-basis: auto;
    }

    .navbar-brand {
      font-size: 2em;
    }
  }
`

export default Header

// OLD STYLESHEET

// import styled from 'styled-components'

// import theme from '../../theme'

// const Header = styled.div`
//   width: 100%;
//   .navbar {
//     background-color: ${theme.color.primary.darkBlue} !important;
//     padding: 1.25 auto;

//     .container {
//       width: 100%;
//     }
//   }

//   .navbarContainer {
//     justify-content: start;

//     @media (min-width: ${theme.breakpoints.md}px) {
//       justify-content: space-between;
//     }
//   }

//   .navbar-brand {
//     font-family: YaleDesign, serif;
//     font-weight: 400;
//     color: ${theme.color.white};
//     white-space: pre-wrap;
//     order: 2;

//     @media (min-width: ${theme.breakpoints.md}px) {
//       order: 1;
//     }
//   }

//   #nav-links a {
//     color: ${theme.color.white};
//     font-weight: ${theme.font.weight.medium};

//     &.navDropdownItem {
//       color: ${theme.color.trueBlack};

//       &:active {
//         color: ${theme.color.white};
//         background-color: ${theme.color.primary.blue};
//       }
//     }
//   }

//   .navbar-dark .navbar-toggler {
//     color: ${theme.color.white};
//     border: none;
//     font-weight: ${theme.font.weight.medium};
//     order: 1;

//     @media (min-width: ${theme.breakpoints.lg}px) {
//       float: right;
//       padding: 0;
//     }

//     @media (min-width: ${theme.breakpoints.md}px) {
//       order: 2;
//     }
//   }

//   .navbar-collapse {
//     order: 3;
//   }

//   @media (min-width: ${theme.breakpoints.sm}px) {
//     &.navbar-collapse {
//       display: block;
//       flex-basis: auto;
//     }

//     .navbar-brand {
//       font-size: 2em;
//     }
//   }
// `

// export default Header
