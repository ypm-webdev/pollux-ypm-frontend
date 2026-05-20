import React, { useEffect, useState, useMemo } from "react";
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'
import { Images, Download } from 'react-bootstrap-icons'
import Viewer  from '@samvera/clover-iiif/viewer'
import { Summary } from '@samvera/clover-iiif/primitives'

import StyledCloverContainer from '../../styles/features/common/CloverContainer'

type InternationalString = { [language: string]: string[] }

type Params = {
  manifest: string,
  solo: boolean
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
  // console.log('SummaryComponent label:', label) // Debug log
  return label ? <Summary summary={label} className="summary-panel-inner" as="span" /> : <div className="summary-panel-inner">No summary available.</div>
}
SummaryComponent.displayName = 'SummaryComponent'



const Clover: React.FC<Params> = ({ manifest, solo }) => {
  const [manifestData, setManifestData] = useState<ManifestData | null>(null)
  const [canvasUri, setCanvasUri] = useState('')
  const [currentImageGuid, setCurrentImageGuid] = useState('')
  
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

  const handleCanvasChange = (activeCanvasId: string) => {
      // Logs the URI of the currently loaded canvas
      // transforms URI into resolvable resource
      const matchGuid = true;
      
      const guidMatch = activeCanvasId.match(/([a-zA-Z0-9_-]+)$/); // finds guid in URI
      const endUriMatch = activeCanvasId.match(/([a-zA-Z0-9_-]+)$/); // fallback to find guid at end of URI if not found in expected place
      const guidA = guidMatch ? guidMatch[1] : '';
      const guidB = endUriMatch ? endUriMatch[1] : '';
      const guid = matchGuid ? guidA : guidB;
      const newCanvasUri = `https://images.collections.yale.edu/iiif/2/ypm:${guid}/full/full/0/default.jpg`; // Construct the image URI
      setCanvasUri(newCanvasUri);
      setCurrentImageGuid(guid);
      // console.log("Currently loaded canvas:", activeCanvasId);
      // console.log("Image asset:", newCanvasUri);
    };

  // console.log("Clover manifestData: ", manifestData);
  
  return (
    <StyledCloverContainer className="viewer-container mx-0 pt-0">
      {/* <Col className="clover-container d-flex justify-content-center"> */}
      <Col className="clover-container d-flex px-0">
        <article>
          {/* {solo? <h3 className="solo-iiif-header"><Images />{' '}Images</h3> : null} */}
          <div className="iiif-header-download-link">
            <a
              href={canvasUri}
              download={`${currentImageGuid}.jpg`}
              target="_blank"
              // rel="noopener noreferrer"
              >
              <Button
                variant="outline-primary"
                size="sm"
                disabled={!canvasUri}
              >
                <Download />{' '}Download Image
              </Button>
            </a>
          </div>
          <Viewer 
            iiifContent={manifest} 
            plugins={plugins}
            canvasIdCallback={handleCanvasChange}
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
          {/* {manifestData?.label && (
            <div>
              <Summary summary={manifestData.label} as="p" />
            </div>
          )} */}
        </article>
      </Col>
    </StyledCloverContainer>
  )
}

export default Clover
