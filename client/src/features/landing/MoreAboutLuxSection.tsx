import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { Button } from 'react-bootstrap'

import { ICmsResponse, CmsResponseParser } from '../../lib/parse/cms/Parser'
import { LandingPageParser } from '../../lib/parse/cms/LandingPageParser'
import StyledMoreAboutLuxSection from '../../styles/features/landing/MoreAboutLuxSection'

interface IProps {
  data: ICmsResponse
}

const MoreAboutLux: React.FC<IProps> = ({ data }) => {
  const parser = new CmsResponseParser(data)
  const content = parser.getLandingPage()
  const landingPageParser = new LandingPageParser(content)
  const moreAboutLux = landingPageParser.getMoreAboutLux()

  return (
    <React.Fragment>
      <StyledMoreAboutLuxSection id="more-about-section" data-testid="more-about-lux-container">
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(moreAboutLux) }} />
        <Button variant="primary" className="rounded-0" href="/content/about-lux" target="_blank" data-testid="more-about-lux-button">
          More Info - LUX
        </Button>
      </StyledMoreAboutLuxSection>
    </React.Fragment>
  )
}

export default MoreAboutLux
