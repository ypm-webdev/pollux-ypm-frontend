import React from 'react'
import { Row, Card } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html'
import theme from '../../styles/theme'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { UnitCode } from '../../config/cms'
import {
  ICmsResponse,
  FeaturedCollectionParser,
} from '../../lib/parse/cms/FeaturedCollectionParser'
import StyledFeaturedCollection from '../../styles/features/landing/FeaturedCollection'
import StyledFeaturedCollectionsSection from '../../styles/features/landing/AllCollectionsSection'
import InternalLink from '../common/InternalLink'

interface IProps {
  data: ICmsResponse
  units: UnitCode[]
  isMobile: boolean
}

const AllCollectionsSection: React.FC<IProps> = ({ data, units, isMobile }) => {
  const featuredCollectionParser = new FeaturedCollectionParser(data)
  const collections = featuredCollectionParser.getCollectionsAll(units)

  if (isMobile) {
    // Mobile: single-item swiper
    return (
      <StyledFeaturedCollectionsSection
        className="d-flex flex-column"
        id="all-collections-section"
        data-testid="all-collections-container"
      >
        <h2>The Collections</h2>
        <p>
          Click on any of the images below to browse each of our unique
          collections divisions:
        </p>
        <div style={{ flex: '1 1 auto', minHeight: 0 }}>
          <Swiper
            modules={[Navigation, Pagination]}
            className="all-collections-swiper"
            style={{ width: '100%', height: '100%', paddingBottom: '2rem' }}
            spaceBetween={16}
            loop={false}
            pagination={{
              clickable: true,
              type: 'bullets',
            }}
            slidesPerView={1}
          >
            {collections.map((coll, ind) => {
              const { searchUrl, imageAlt, imageUrl, bodyHtml, title } = coll
              return (
                <SwiperSlide key={searchUrl}>
                  <StyledFeaturedCollection
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    isInSwiper={true}
                    data-testid={`all-collection-swiper-${ind}`}
                  >
                    <Card className="featured-card">
                      <div className="image-container">
                        <InternalLink uri={searchUrl} linkCategory="All Collections">
                          <img alt={imageAlt} src={imageUrl} className="card-image" />
                        </InternalLink>
                      </div>
                      <Card.Body>
                        <h3>
                          <InternalLink
                            uri={searchUrl}
                            name={title}
                            linkCategory="All Collections"
                          />
                        </h3>
                        <div
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(bodyHtml) }}
                        />
                        <div className="search-url">
                          <InternalLink
                            uri={searchUrl}
                            name="View Collection"
                            linkCategory="All Collections"
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </StyledFeaturedCollection>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </StyledFeaturedCollectionsSection>
    )
  }

  // Desktop: grid layout
  const blockElems = collections.map((coll, ind) => {
    const { searchUrl, imageAlt, imageUrl, bodyHtml, title } = coll
    const viewTitleString = `View ${title}`
    return (
      <StyledFeaturedCollection
        key={searchUrl}
        xs={12}
        sm={12}
        md={6}
        lg={4}
        data-testid={`all-collection-${ind}`}
      >
        <Card>
          <div className="image-container">
            <InternalLink uri={searchUrl} linkCategory="All Collections">
              <img alt={imageAlt} src={imageUrl} />
            </InternalLink>
          </div>
          <Card.Body>
            <div className="card-body-wrapper">
              <h3>
                <InternalLink
                  uri={searchUrl}
                  name={title}
                  linkCategory="All Collections"
                />
              </h3>
              <div
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(bodyHtml) }}
              />
              <div className="search-url">
                <InternalLink
                  uri={searchUrl}
                  name={viewTitleString}
                  linkCategory="All Collections"
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </StyledFeaturedCollection>
    )
  })

  return (
    <StyledFeaturedCollectionsSection
      id="all-collections-section"
      data-testid="all-collections-container"
    >
      <h2>About our Collections</h2>
      <p>
        Click on any of the images below to browse each of our unique
        collections divisions:
      </p>
      <Row className="d-flex justify-content-between">{blockElems}</Row>
    </StyledFeaturedCollectionsSection>
  )
}

export default AllCollectionsSection
