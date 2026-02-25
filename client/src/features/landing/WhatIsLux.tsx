import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { pushClientEvent } from '../../lib/pushClientEvent'
import StyledWhatIsLux from '../../styles/features/landing/WhatIsLux'

const WhatIsLux: React.FC = () => (
  <StyledWhatIsLux data-testid="marketing-paragraph">
    <h2>Earth&apos;s Story</h2>
    <p>
      Browse over 14 million specimens and objects from 10 curated collections
      that tell the story of our planet, its life, history, and cultures.
      <br />
      <br />
      <small> (fetch from Drupal CMS)</small>
      <br />
      <Button variant="light" href="/search/" size="lg">
        Get Started
      </Button>
    </p>
  </StyledWhatIsLux>
)

export default WhatIsLux
