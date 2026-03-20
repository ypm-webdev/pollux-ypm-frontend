import React, { useEffect, useState, useMemo } from "react"
import Col from 'react-bootstrap/Col'
import { CI360Viewer, CI360ViewerRef } from 'js-cloudimage-360-view/react'
import 'js-cloudimage-360-view/css'
import StyledCI360Container from '../../styles/features/common/CI360Container'

type InternationalString = { [language: string]: string[] }

type Params = {
  manifest: string
}

type ManifestData = {
  label?: InternationalString
}

/**
 * Wrapper around CloudImage 360 Viewer.
 *
 * @param {manifest: string} - URI of IIIF manifest fed to Viewer
 */


declare global {
  interface Window {
    CI360: any
  }
}

const CI360: React.FC<Params> = ({ manifest }) => {
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


  return (
    <StyledCI360Container className="viewer-container mx-0">
      <Col className="360-container d-flex px-0">
        <article>
          <CI360Viewer
            className={"ci360-viewer"}
            autoplay={true}
            fullscreen={true}
            aspectRatio="16/9"
            style={{ width: '100%', height: 'auto' }}
            folder={'/testData/media/2d-360/Spann_TN_082/'}
            filenameX={'a_{indexY}_{index}_3000.jpg'}
            // filenameY='a_{index}_{indexX}_3000.jpg'
            filenameGrid='a_{indexY}_{indexX}_3000.jpg'
            amountX={30}
            amountY={4}
            autoplayBehavior={"spin-xy"}
            autoplayReverse={true}
            speed={100}
            dragSpeed={150}
            zoomMax={3}
            inertia={true}
            initialIconShown={true}
            bottomCircle={true}
            keys={false}
            stopAtEdgesX={false}
            stopAtEdgesY={true}
            dragReverse={true}
            {...{ "spinY": true }} 
          />
        </article>
      </Col>
    </StyledCI360Container>
  )
}

export default CI360
