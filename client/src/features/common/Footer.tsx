import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import StyledFooter from '../../styles/features/common/Footer'
import theme from '../../styles/theme'
import { pushClientEvent } from '../../lib/pushClientEvent'

import ExternalLink from './ExternalLink'
import FeedbackButton from './FeedbackButton'
import InternalLink from './InternalLink'

const Footer: React.FC = () => (
  <StyledFooter>
    <Container
      fluid
      className="px-0"
      style={{ backgroundColor: theme.color.white }}
    >
      <footer
        className="d-flex flex-wrap align-items-center justify-content-between h-100"
        data-testid="lux-footer"
      >
        <Row
          className="w-100 py-4 mx-0 px-0"
          style={{ backgroundColor: theme.color.primary.darkBlue }}
        >
          <Col xs={12} sm={6} className="lux-footer-yale-col d-flex">
            <Link
              id="lux-footer-yale"
              to="https://www.yale.edu"
              onClick={() =>
                pushClientEvent('External Link', 'Selected', 'External Yale')
              }
            >
              Yale
            </Link>
          </Col>
          <Col xs={12} sm={6} className="d-flex" id="lux-footer-nav-items-col">
            <ul className="nav" id="lux-footer-nav-items">
              <li className="nav-item">
                <ExternalLink
                  url="https://usability.yale.edu/web-accessibility/accessibility-yale"
                  name="Accessibility"
                />
              </li>
              <li className="nav-item">
                <ExternalLink
                  url="https://privacy.yale.edu/resources/privacy-statement"
                  name="Privacy"
                />
              </li>
              <li className="nav-item">
                <InternalLink
                  uri="/content/terms-of-use"
                  name="Terms of Use"
                  linkCategory="Terms of Use"
                />
              </li>
              <li className="nav-item">
                <ExternalLink
                  url="https://peabody.yale.edu/about/collections-policies"
                  name="Collections Policies"
                />
              </li>
            </ul>
          </Col>
        </Row>
        <Row
          className="w-100 mx-0 px-0"
          style={{ backgroundColor: theme.color.white }}
        >
          <Col xs={12} sm={6} className="px-4 py-4">
            &copy; 2026 Yale Peabody Museum
          </Col>
          <Col xs={12} sm={6} className="px-4 py-4">
            <ul
              className="nav d-flex flex-row-reverse mx-0"
              id="lux-footer-ypm-items"
            >
              <li className="nav-item">
                <ExternalLink
                  url="https://peabody.yale.edu"
                  name="peabody.yale.edu"
                />
              </li>
              {/* <li className="nav-item">
                <ExternalLink
                  url="http://ipt.peabody.yale.edu/ipt/"
                  name="Peabody IPT"
                />
              </li>
              <li className="nav-item">
                <ExternalLink
                  url="http://collections.peabody.yale.edu/cgi-bin/GNIS/"
                  name="Peabody GNIS Service"
                />
              </li> */}
            </ul>
          </Col>
        </Row>
      </footer>
    </Container>
  </StyledFooter>
)

export default Footer
