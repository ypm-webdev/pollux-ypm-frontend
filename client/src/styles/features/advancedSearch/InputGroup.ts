import styled from 'styled-components'

import theme from '../../theme'

const StyledInputGroupDiv = styled.div`
  border: solid 1px ${theme.color.gray};
  border-radius: ${theme.border.radius};

  .dropdown-toggle {
    color: ${theme.color.button};
    background-color: ${theme.color.white};
    border: 1px solid ${theme.color.button};
    border-radius: 0px!important;

    &.mobileNavigationDropdown {
      color: ${theme.color.button};
      border: none;
      display: flex;
    }
  }

  .dropdown-toggle.show {
    color: ${theme.color.button};
    background-color: ${theme.color.white};
  }

  .dropdown-menu.show {
    max-height: 400px;
    overflow-y: scroll;
    border-radius: 0px!important;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }

  .dropdown-item.active {
    background-color: ${theme.color.primary.blue};
  }

  &#advanced-search-switch {
    display: none;

    @media (min-width: ${theme.breakpoints.md}px) {
      display: block;
    }
  }
`

export default StyledInputGroupDiv
