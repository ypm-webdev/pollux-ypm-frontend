import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ICmsResponse, CmsResponseParser } from '../../lib/parse/cms/Parser'
import {
  IImageData,
  LandingPageImageParser,
} from '../../lib/parse/cms/LandingPageImageParser'
import { LandingPageParser } from '../../lib/parse/cms/LandingPageParser'
import { UnitCode } from '../../config/cms'
import StyledHeroImageSection from '../../styles/features/landing/HeroImageSection'
import { pushClientEvent } from '../../lib/pushClientEvent'

import WhatIsLux from './WhatIsLux'

interface IProps {
  imagesData: ICmsResponse
  landingPageData: ICmsResponse
  unit: UnitCode
}

const HeroImageSection: React.FC<IProps> = ({ imagesData, landingPageData, unit }) => {
  const [imageData, setImageData] = useState<IImageData | null>(null)
  const [whatIsLuxText, setWhatIsLuxText] = useState<string>('')

  useEffect(() => {
    const imageParser = new CmsResponseParser(imagesData)
    const imageContent = imageParser.getLandingPageImages()
    const landingPageImageParser = new LandingPageImageParser(imageContent)

    setImageData(landingPageImageParser.getHeroImage(unit))

    // Extract field_what_is_lu from landing page data
    const landingPageParser = new CmsResponseParser(landingPageData)
    const landingPageContent = landingPageParser.getLandingPage()
    const parser = new LandingPageParser(landingPageContent)
    setWhatIsLuxText(parser.getWhatIsLux())
  }, [imagesData, landingPageData, unit])

  return (
    <StyledHeroImageSection className="hero">
      {imageData && (
        <React.Fragment>
          <WhatIsLux whatIsLuxText={whatIsLuxText} />
          <div
            className="hero-image-container"
            data-testid="hero-image-container"
          >
            <Link
              to={imageData.recordUrl}
              onClick={() =>
                pushClientEvent('Entity Link', 'Selected', 'Hero Image Link')
              }
            >
              <img alt={imageData.altText} src={imageData.url} />
            </Link>
          </div>
          {imageData.caption && (
            <div className="captionDiv">
              <div className="caption">
                <Link
                  to={imageData.recordUrl}
                  onClick={() =>
                    pushClientEvent(
                      'Entity Link',
                      'Selected',
                      'Hero Image Link',
                    )
                  }
                  data-testid="hero-image-caption-link"
                >
                  {imageData.caption.length > 30
                    ? `${imageData.caption.slice(0, 30)}...`
                    : imageData.caption}
                </Link>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </StyledHeroImageSection>
  )
}

export default HeroImageSection
