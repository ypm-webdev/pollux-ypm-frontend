import React from 'react'
import { Row, Card } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html'

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
}

const AllCollectionsSection: React.FC<IProps> = ({ data, units }) => {
  const featuredCollectionParser = new FeaturedCollectionParser(data)
  const collections = featuredCollectionParser.getCollectionsAll(units)

  const blockElems = collections.map((coll, ind) => {
    const { searchUrl, imageAlt, imageUrl, bodyHtml, title } = coll
    const viewTitleString = `View ${title}`
    return (
      <StyledFeaturedCollection
        key={searchUrl}
        xs={12}
        sm={12}
        md={4}
        data-testid={`all-collection-${ind}`}
      >
        <Card>
          <div className="image-container">
            <InternalLink uri={searchUrl} linkCategory="Featured Collection">
              <img alt={imageAlt} src={imageUrl} />
            </InternalLink>
          </div>
          <Card.Body>
            <div className="card-body-wrapper">
              <h3>
                <InternalLink
                  uri={searchUrl}
                  name={title}
                  linkCategory="Featured Collection"
                />
              </h3>
              <div
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(bodyHtml) }}
              />
              <div className="search-url">
                <InternalLink
                  uri={searchUrl}
                  name={viewTitleString}
                  linkCategory="Featured Collection"
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
      id="featured-collections-section"
      data-testid="featured-collections-container"
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
