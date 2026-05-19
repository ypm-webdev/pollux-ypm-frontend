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
