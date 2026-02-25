import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { Row, Col } from 'react-bootstrap'

import {
  collectionsIcon,
  conceptsIcon,
  eventsIcon,
  objectsIcon,
  peopleOrgsIcon,
  placesIcon,
  workIcon,
} from '../../config/resources'
import { IStats } from '../../redux/api/returnTypes'
import { ICmsResponse, CmsResponseParser } from '../../lib/parse/cms/Parser'
import { LandingPageParser } from '../../lib/parse/cms/LandingPageParser'
import StyledInfographicsSection from '../../styles/features/landing/InfographicsSection'

import InfographicsCard from './InfographicsCard'
import InfographicsBubble from './InfographicsBubble'
// import { head } from 'lodash'

interface IProps {
  data: IStats
  cmsData: ICmsResponse
  chartType: String
  heading: String
}

// CHART TYPES:
// "cards" | "bubbles"
//
//
// default "cards"

const InfographicsSection: React.FC<IProps> = ({
  data,
  cmsData,
  chartType,
  heading,
}) => {
  const parser = new CmsResponseParser(cmsData)
  const content = parser.getLandingPage()
  const landingPageParser = new LandingPageParser(content)
  const stats = data.estimates.searchScopes

  const type = !chartType ? 'cards' : chartType
  const numbersDisclaimer = landingPageParser.getNumbersDisclaimer()

  const numItems = 7

  switch (type) {
    case 'bubbles':
      return (
        <StyledInfographicsSection data-testid="whats-in-lux-container">
          <h2>{heading}</h2>
          <Row>
            <Col xs={12}>
              <div className="bubbles">
                <ul
                  className="bubbles__list"
                  style={{ '--item-total': numItems } as React.CSSProperties}
                >
                  <InfographicsBubble
                    idx={1}
                    total={numItems}
                    icon={objectsIcon}
                    number={stats.item}
                    label="Objects*"
                    link="/view/results/objects?q="
                  />
                  <InfographicsBubble
                    idx={2}
                    total={numItems}
                    icon={conceptsIcon}
                    number={stats.concept}
                    label="Concepts"
                    link="/view/results/concepts?q="
                  />
                  <InfographicsBubble
                    idx={3}
                    total={numItems}
                    icon={collectionsIcon}
                    number={stats.set}
                    label="Collections"
                    link="/view/results/collections?q="
                  />
                  <InfographicsBubble
                    idx={4}
                    total={numItems}
                    icon={peopleOrgsIcon}
                    number={stats.agent}
                    label="People & Groups"
                    link="/view/results/people?q="
                  />
                  <InfographicsBubble
                    idx={5}
                    total={numItems}
                    icon={placesIcon}
                    number={stats.place}
                    label="Places"
                    link="/view/results/places?q="
                  />
                  <InfographicsBubble
                    idx={6}
                    total={numItems}
                    icon={eventsIcon}
                    number={stats.event}
                    label="Events"
                    link="/view/results/events?q="
                  />
                  <InfographicsBubble
                    idx={7}
                    total={numItems}
                    icon={workIcon}
                    number={stats.work}
                    label="Works"
                    link="/view/results/works?q="
                  />
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(numbersDisclaimer),
              }}
              id="about-numbers-disclaimer"
              data-testid="about-numbers-disclaimer-container"
            ></div>
          </Row>
        </StyledInfographicsSection>
      )
      break

    default:
      return (
        <StyledInfographicsSection data-testid="whats-in-lux-container">
          <h2>{heading}</h2>
          <Row className="d-flex justify-content-around">
            <InfographicsCard
              icon={objectsIcon}
              number={stats.item}
              label="Objects*"
              dataTestId="Objects"
              link="/view/results/objects?q="
            />
            <InfographicsCard
              icon={conceptsIcon}
              number={stats.concept}
              label="Concepts"
              dataTestId="concepts"
              link="/view/results/concepts?q="
            />
            <InfographicsCard
              icon={collectionsIcon}
              number={stats.set}
              label="Collections"
              dataTestId="collections"
              link="/view/results/collections?q="
            />
            <InfographicsCard
              icon={peopleOrgsIcon}
              number={stats.agent}
              label="People & Groups"
              dataTestId="people"
              link="/view/results/people?q="
            />
            <InfographicsCard
              icon={placesIcon}
              number={stats.place}
              label="Places"
              dataTestId="places"
              link="/view/results/places?q="
            />
            <InfographicsCard
              icon={eventsIcon}
              number={stats.event}
              label="Events"
              dataTestId="events"
              link="/view/results/events?q="
            />
            <InfographicsCard
              icon={workIcon}
              number={stats.work}
              label="Works"
              dataTestId="works"
              link="/view/results/works?q="
            />
          </Row>
          <Row>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(numbersDisclaimer),
              }}
              id="about-numbers-disclaimer"
              data-testid="about-numbers-disclaimer-container"
            ></div>
          </Row>
        </StyledInfographicsSection>
      )
      break
  }
}

export default InfographicsSection
