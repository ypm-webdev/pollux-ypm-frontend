import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Row, Col } from 'react-bootstrap'

import config from '../../config/config'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import { UnitCode } from '../../config/cms'
import {
  pickRandomUnits,
  pickYpmFeatured,
  allYpmDivisions,
} from '../../lib/cms/util'
import { ErrorFallback } from '../error/ErrorFallback'
import {
  useGetFeaturedCollectionsQuery,
  useGetAllCollectionsDivisionsQuery,
  useGetLandingPageQuery,
  useGetLandingPageImagesQuery,
  useGetAllDescriptiveTextsQuery,
} from '../../redux/api/cmsApi'
import { useGetStatsQuery } from '../../redux/api/ml_api'
import {
  HeaderContainerCol,
  StyledLandingPage,
} from '../../styles/features/landing/LandingPage'
import useTitle from '../../lib/hooks/useTitle'
import StyledHeadingOne from '../../styles/features/landing/HeadingOne'
import StickySearchContainer from '../search/StickySearchContainer'

import FeaturedCollectionsSection from './FeaturedCollectionsSection'
import AllCollectionsSection from './AllCollectionsSection'
import FooterBlocks from './FooterBlocksSection'
import HeroImageSection from './HeroImageSection'
import Infographics from './InfographicsSection'
import MoreAboutLux from './MoreAboutLuxSection'

const Landing: React.FC = () => {
  const [units, setUnits] = useState([] as UnitCode[])

  const landingPageResult = useGetLandingPageQuery()
  const imagesResult = useGetLandingPageImagesQuery()
  const featuredResult = useGetFeaturedCollectionsQuery()
  const allCollectionsResult = useGetAllCollectionsDivisionsQuery()
  const statsResult = useGetStatsQuery()
  const descriptiveTextsResult = useGetAllDescriptiveTextsQuery()

  if (
    imagesResult.isSuccess &&
    featuredResult.isSuccess &&
    units.length === 0
  ) {
    // setUnits(pickRandomUnits())
    setUnits(pickYpmFeatured())
  }
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)
  useTitle('Collections Discovery');

  const cmsApiUrl = config.env.cmsApiBaseUrl || ''
  

  // console.warn("isMobile: ", isMobile);
  return (
    <StyledLandingPage id="landing-body" className="mx-0">
      <Col xs={12} className="px-0">
        <Row className="mx-0 py-2 bg-white">
          {/* <HeaderContainerCol className="col-12 text-center">
            <StyledHeadingOne>Explore The Peabody Collections</StyledHeadingOne>
          </HeaderContainerCol> */}
        </Row>
        <StickySearchContainer />
        <Row id="srch-hero-container" className="mx-0">
          {imagesResult.isSuccess && units.length > 0 && landingPageResult.isSuccess && (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Row className="d-flex row mx-0 px-0 pt-4">
                <Col className="px-0">
                  <HeroImageSection imagesData={imagesResult.data} landingPageData={landingPageResult.data} unit={units[0]} />
                </Col>
              </Row>
            </ErrorBoundary>
          )}
        </Row>
        {featuredResult.isSuccess && units.length > 0 && (
          <Row className="mx-0">
            <Col xs={12}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <FeaturedCollectionsSection
                  data={featuredResult.data}
                  units={units.slice(1)}
                />
              </ErrorBoundary>
            </Col>
          </Row>
        )}
        {statsResult.isSuccess &&
          statsResult.data &&
          landingPageResult.isSuccess &&
          landingPageResult && (
            <Row className="mx-0">
              <Col xs={12}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Infographics
                    heading={'By the Numbers'}
                    chartType={isMobile?'cards':'bubbles'}
                    data={statsResult.data}
                    cmsData={landingPageResult.data}
                    descriptiveTexts={descriptiveTextsResult.data}
                  />
                </ErrorBoundary>
              </Col>
            </Row>
          )}
        {allCollectionsResult.isSuccess && units.length > 0 && (
          <Row className="mx-0">
            <Col xs={12}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <AllCollectionsSection
                  data={allCollectionsResult.data}
                  units={units}
                  isMobile={isMobile}
                />
              </ErrorBoundary>
            </Col>
          </Row>
        )}
        {landingPageResult.isSuccess && landingPageResult.data && (
          <Row className="mx-0">
            <Col xs={12}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <MoreAboutLux data={landingPageResult.data} />
              </ErrorBoundary>
            </Col>
          </Row>
        )}
        {landingPageResult.isSuccess && landingPageResult.data && (
          <Row className="mx-0">
            <Col xs={12}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <FooterBlocks data={landingPageResult.data} />
              </ErrorBoundary>
            </Col>
          </Row>
        )}
      </Col>
    </StyledLandingPage>
  )
}

export default Landing
