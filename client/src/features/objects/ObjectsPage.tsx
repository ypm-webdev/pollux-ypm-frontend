import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import StyledEntityBody from '../../styles/shared/EntityBody'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import DataSources from '../common/DataSources'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import { ErrorFallback } from '../error/ErrorFallback'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import ArchiveHierarchyContainer from '../archiveHierarchy/ArchiveHierarchyContainer'
import CanIReuseIt from '../common/CanIReuseIt'
import {
  getNextSetUris,
  isEntityAnArchive,
} from '../../lib/util/hierarchyHelpers'
import { archive } from '../../config/setsSearchTags'
import HowDoISeeIt from '../common/HowDoISeeIt'
import IObject from '../../types/data/IObject'
import IDigitalObject from '../../types/data/IDigitalObject'
import Clover from '../common/Clover'
import CI360 from '../common/CI360'
import CIZStack from '../common/CIZStack'
import WikiDataImageViewer from '../common/WikiDataImageViewer'
import ImageryMultiContainer from '../common/ImageryMultiContainer'
import IEntity from '../../types/data/IEntity'

import Carries from './Carries'
import About from './About'

const ObjectsPage: React.FC<{ data: IObject | IDigitalObject }> = ({
  data,
}) => {
  const element = new ObjectParser(data)
  const personUri = element.getAgentFromProductionEvent() || undefined
  const memberOf = element.getMemberOf()
  const objectsWithImagesHalLink = element.getHalLink(archive.searchTag)
  const halLinkTitle = archive.title
  const manifestId = element.getManifestId()  // original IIIF manifest from LUX (2D imagery)
  
  const multiImageManifests = {
    '2d' : manifestId,  // original IIIF manifest from LUX (2D imagery)
    '2d360': 'PATH TO 360 MANIFEST',  // rewrite this later as method such as element.get360ManifestId() to pull from LUX
    '2dzst': 'PATH TO ZSTACK MANIFEST',  // rewrite this later as method such as element.getZStackManifestId() to pull from LUX
    '2drti': 'PATH TO RTI MANIFEST',  // rewrite this later as method such as element.getRTIManifestId() to pull from LUX
    '3dobj': 'PATH TO 3D MANIFEST',  // rewrite this later as method such as element.get3DManifestId() to pull from LUX
    '3dvol': 'PATH TO 3D VOLUME MANIFEST',  // rewrite this later as method such as element.get3DVolumeManifestId() to pull from LUX
  }

  const hierarchyData: {
    entity: IEntity
    currentPageWithinParentResultsHalLink: null | string
  } = {
    entity: data as IEntity,
    currentPageWithinParentResultsHalLink: element.getHalLink(
      'lux:itemCurrentHierarchyPage',
    ),
  }
  
  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader entity={data} primaryAgent={personUri}>
          {element.json.member_of && (
            <GenericBreadcrumbHierarchy
              key={element.json.id}
              entity={data}
              columnClassName="px-0"
              id="object-page"
              getNextEntityUri={getNextSetUris}
              linkFilter={isEntityAnArchive}
              maxLength={8}
            />
          )}
        </EntityHeader>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {manifestId !== '' ? (
          <ImageryMultiContainer
            manifestIiif={multiImageManifests['2d']}
            manifest2dRti={multiImageManifests['2drti']}
            manifest2dZst={multiImageManifests['2dzst']}
            manifest2d360={multiImageManifests['2d360']}
            manifest3dObj={multiImageManifests['3dobj']}
            manifest3dVol={multiImageManifests['3dvol']}
          />
        ) : (
          <WikiDataImageViewer entity={data} />
        )}
      </ErrorBoundary>

      {/* <ErrorBoundary FallbackComponent={ErrorFallback}>
        {manifestId !== '' ? (
          <Clover manifest={manifestId} />
        ) : (
          <WikiDataImageViewer entity={data} />
        )}
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {manifestId !== '' ? (
          <CI360 manifest={manifestId} />
        ) : ( <></>  )}
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {manifestId !== '' ? (
          <CIZStack manifest={manifestId} />
        ) : ( <></> )}
      </ErrorBoundary> */}

      <StyledEntityBody>
        <Col>
          <Row>
            <Col lg={8}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Carries entity={data} />
              </ErrorBoundary>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <About data={data} />
              </ErrorBoundary>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                {memberOf.length > 0 && (
                  <ArchiveHierarchyContainer
                    key={data.id}
                    entityData={hierarchyData}
                    objectsWithImagesHalLink={objectsWithImagesHalLink}
                    halLinkTitle={halLinkTitle}
                  />
                )}
              </ErrorBoundary>
            </Col>
            <Col lg={4}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <StyledEntityPageSection>
                  <HowDoISeeIt data={data} />
                  <CanIReuseIt entity={data} entityType="object" />
                </StyledEntityPageSection>
              </ErrorBoundary>
              <Row>
                <Col xs={12}>
                  <FeedbackButton />
                </Col>
              </Row>
              <StyledEntityPageSection className="row">
                <Col xs={12} className="my-0">
                  <DataSources entity={data} />
                </Col>
              </StyledEntityPageSection>
            </Col>
          </Row>
        </Col>
      </StyledEntityBody>
    </React.Fragment>
  )
}

export default ObjectsPage
