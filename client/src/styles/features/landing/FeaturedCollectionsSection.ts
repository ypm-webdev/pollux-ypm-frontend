import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import { ToppedBorderedDiv } from '../../shared/BorderedDiv'
import theme from '../../theme'

const padX = theme.spacing.sectionPaddingX
const marginX = theme.spacing.contentAbsMarginX

const FeaturedCollectionsSection = styled(ToppedBorderedDiv)`
  width: auto;
  background-color: ${theme.color.white};
  padding: 37px ${padX} 25px ${padX};
  margin-bottom: ${theme.spacing.landingPageSectionGap};
  margin-left: ${marginX};
  margin-right: ${marginX};
  @media (max-width: ${theme.breakpoints.md}px) {
    margin-left: 0;
    margin-right: 0;
  }

  .featured-collections-swiper {
    // padding-bottom: 40px;
  }

  .featured-collections-swiper .swiper-pagination {
    position: relative;
    bottom: 0;
    padding-top: 16px;
  }

  h2 {
    font-family: 'Mallory Black', sans-serif;
    font-size: ${theme.font.mobile.h2.size};
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
    letter-spacing: 0;
    text-align: left;
    font-size: ${theme.font.mobile.h3.size};
    line-height: ${theme.font.mobile.h4.lineHeight};
    font-weight: ${theme.font.mobile.h3.weight};

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: ${theme.font.desktop.h3.size};
      line-height: ${theme.font.desktop.h4.lineHeight};
      font-weight: ${theme.font.desktop.h3.weight};
    }
  }

  .featured-collections-swiper {
    width: 100%;
    min-width: 0;
    flex: 1 1 0;
  }

  .featured-collections-swiper .swiper-wrapper {
    align-items: stretch;
    height: inherit!important;
  }

  .featured-collections-swiper .swiper-slide {
    box-sizing: border-box;
    min-width: 0;
    max-width: 100%;
  }

  .featured-collections-swiper .swiper-slide .image-container {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  .featured-collections-swiper .swiper-slide .image-container img,
  .featured-collections-swiper .swiper-slide .card-image {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  .swiper-button-prev,
  .swiper-button-next {
    padding: 0.5rem 0.5rem;
    height: 6rem;
    width: 2rem;
    border: none;
    background: ${theme.color.offWhite};
  }

  .swiper-button-prev:hover,
  .swiper-button-prev:active {
    background: linear-gradient(to left, ${theme.color.offWhite}, ${theme.color.white});
    
    @media (min-width: ${theme.breakpoints.md}px) {
      box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
      background: ${theme.color.offWhite};
    }
  }

  .swiper-button-next:hover,
  .swiper-button-next:active {
    background: linear-gradient(to right, ${theme.color.offWhite}, ${theme.color.white});
    
    @media (min-width: ${theme.breakpoints.md}px) {
      box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
      background: ${theme.color.offWhite};
    }
  }

  .swiper-button-prev {
    transform: translateX(-29px);
    box-shadow: -2px 0px 2px 0px rgba(0, 0, 0, 0.05);
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(to left, ${theme.color.offWhite}, ${theme.color.lightGray}) 1;

    @media (min-width: ${theme.breakpoints.md}px) {
      transform: translateX(-70px);
      border: 1px ${theme.color.lightGray} solid;
      box-shadow: -2px 0px 6px 2px rgba(0, 0, 0, 0.1);
      background: ${theme.color.white};
    }
  }

  .swiper-button-next {
    transform: translateX(29px);
    box-shadow: 2px 0px 2px 0px rgba(0, 0, 0, 0.05);
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(to right, ${theme.color.offWhite}, ${theme.color.lightGray}) 1;

    @media (min-width: ${theme.breakpoints.md}px) {
      transform: translateX(70px);
      border: 1px ${theme.color.lightGray} solid;
      box-shadow: 2px 0px 6px 2px rgba(0, 0, 0, 0.1);
      background: ${theme.color.white};
    }
  }

  .swiper-button-disabled {
    opacity: 0.1;
  }
`

export default FeaturedCollectionsSection

// OLD STYLESHEET

// import { Row } from 'react-bootstrap'
// import styled from 'styled-components'

// import theme from '../../theme'

// const FeaturedCollectionsSection = styled(Row)`
//   width: auto;
//   background-color: ${theme.color.offWhite};
//   margin-bottom: ${theme.spacing.landingPageSectionGap};
// `

// export default FeaturedCollectionsSection
