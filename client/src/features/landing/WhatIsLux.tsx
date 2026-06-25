import React from 'react'
import sanitizeHtml from 'sanitize-html'

import { pushClientEvent } from '../../lib/pushClientEvent'
import StyledWhatIsLux from '../../styles/features/landing/WhatIsLux'

interface IProps {
  whatIsLuxText: string
}

const WhatIsLux: React.FC<IProps> = ({ whatIsLuxText }) => {
  const sanitizedHtml = sanitizeHtml(whatIsLuxText)

  return (
  <React.Fragment>
  <StyledWhatIsLux data-testid="marketing-paragraph" className="marketing-paragraph">
    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  </StyledWhatIsLux>
  </React.Fragment>
)
}

export default WhatIsLux
