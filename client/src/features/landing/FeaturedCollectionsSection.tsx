import React from 'react'
import { Card } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html'
import theme from 'src/styles/theme'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

SwiperCore.use([Navigation, Pagination])

import { UnitCode } from '../../config/cms'
import {
  ICmsResponse,
  FeaturedCollectionParser,
} from '../../lib/parse/cms/FeaturedCollectionParser'
import StyledFeaturedCollection from '../../styles/features/landing/FeaturedCollection'
import StyledFeaturedCollectionsSection from '../../styles/features/landing/FeaturedCollectionsSection'
import InternalLink from '../common/InternalLink'

interface IProps {
  data: ICmsResponse
  units: UnitCode[]
}

const FeaturedCollectionsSection: React.FC<IProps> = ({ data, units }) => {
  const featuredCollectionParser = new FeaturedCollectionParser(data)
  const collections = featuredCollectionParser.getCollections(units)

  return (
    <StyledFeaturedCollectionsSection
      className="d-flex justify-content-between"
      id="featured-collections-section"
      data-testid="featured-collections-container"
    >
      <Swiper
        className="featured-collections-swiper"
        style={{ width: '100%', minWidth: 0, flex: '1 1 0' }}
        spaceBetween={16}
        loop={false}
        pagination={{
          clickable: true,
          type: 'bullets',
        }}
        slidesPerView={1}
        breakpoints={{
          [theme.breakpoints.md]: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          [theme.breakpoints.lg]: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
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
                data-testid={`featured-collection-${ind}`}
              >
                <Card className="featured-card">
                <div className="image-container">
                  <InternalLink uri={searchUrl} linkCategory="Featured Collection">
                    <img alt={imageAlt} src={imageUrl} className="card-image" />
                  </InternalLink>
                </div>
                <Card.Body>
                  <h3>
                    <InternalLink
                      uri={searchUrl}
                      name={title}
                      linkCategory="Featured Collection"
                    />
                  </h3>
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(bodyHtml) }} />
                  <div className="search-url">
                    <InternalLink
                      uri={searchUrl}
                      name={title}
                      linkCategory="Featured Collection"
                    />
                  </div>
                </Card.Body>
              </Card>              </StyledFeaturedCollection>            </SwiperSlide>
          )
        })}
      </Swiper>
    </StyledFeaturedCollectionsSection>
  )
}

export default FeaturedCollectionsSection
