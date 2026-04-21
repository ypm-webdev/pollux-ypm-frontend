import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const ThreeContainer = styled(Row)`
  padding: 0.75rem;
  background-color: ${theme.color.offWhite};
  width: 100%;

  article {
    width: 100%;
    // border-radius: 8px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }

  .three-container {
    position: relative;
    width: 100%;
    // padding: 0 1rem;
    // background-color: ${theme.color.white};
    margin-bottom: 0;
  }

  .viewer-container {
    // padding-top: 0!important;
    margin-top: 0 !important;
  }

  .three-swiper {
    padding: 0.5rem;
    background-color: ${theme.color.white};

    .swiper-button-next,
    .swiper-button-prev {
      color: ${theme.color.darkGray};

      &:after {
        font-size: 1.25rem;
        font-weight: bold;
      }
    }

    .swiper-pagination {
      position: relative;
      padding-top: 0.5rem;
    }

    .swiper-pagination-bullet {
      background-color: ${theme.color.mediumGray};
      opacity: 0.5;

      &.swiper-pagination-bullet-active {
        background-color: ${theme.color.darkGray};
        opacity: 1;
      }
    }
  }
`

export default ThreeContainer
