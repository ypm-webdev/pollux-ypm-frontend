import React, { useEffect, useState, useMemo } from "react";
import Col from 'react-bootstrap/Col'
import Viewer from '@samvera/clover-iiif/viewer'
import { Summary } from '@samvera/clover-iiif/primitives'

import StyledCloverContainer from '../../styles/features/common/CloverContainer'

type InternationalString = { [language: string]: string[] }

type Params = {
  manifest: string
}

type ManifestData = {
  label?: InternationalString
}

/**
 * Wrapper around Clover IIIF Viewer.
 *
 * @param {manifest: string} - URI of IIIF manifest fed to Viewer
 */

// const SummaryComponent = React.memo(({ label }: { label?: InternationalString }) => {
//   console.log('SummaryComponent label:', label) // Debug log
//   return label ? <Summary summary={label} as="p" /> : <div>No summary available.</div>
// })
const SummaryComponent: React.FC<{ label?: InternationalString }> = ({ label }) => {
  console.log('SummaryComponent label:', label) // Debug log
  return label ? <Summary summary={label} className="summary-panel-inner" as="span" /> : <div className="summary-panel-inner">No summary available.</div>
}
SummaryComponent.displayName = 'SummaryComponent'



const Clover: React.FC<Params> = ({ manifest }) => {
  const [manifestData, setManifestData] = useState<ManifestData | null>(null)
  
  if (manifest === '') {
    return null
  }
  
  useEffect(() => {
    (async () => {
      const response = await fetch(manifest);
      const json = await response.json();
      setManifestData(json);
    })();
  }, [manifest]);

const plugins = useMemo(() => [
  {
    id: "SummaryPlugin",
    informationPanel: {
      component: () => <SummaryComponent label={manifestData?.label} />,
      label: { none: ["Summary"] },
    },
  },
], [manifestData?.label])

  return (
    <StyledCloverContainer className="viewer-container mx-0">
      {/* <Col className="clover-container d-flex justify-content-center"> */}
      <Col className="clover-container d-flex px-0">
        <article>
          <Viewer 
            iiifContent={manifest} 
            plugins={plugins}
            options={{
              showTitle: false,
              canvasBackgroundColor: '#fff',
              informationPanel: {
                open: false,
                renderAbout: true,
                renderAnnotation: true,
              }
            }}
          />
          {manifestData?.label && (
            <div>
              <Summary summary={manifestData.label} as="p" />
            </div>
          )}
        </article>
      </Col>
    </StyledCloverContainer>
  )
}

export default Clover
