import React, { useEffect, useState, useMemo } from "react";
import Col from 'react-bootstrap/Col'
import { CI360Viewer } from '@cloudimage/360-view/react'
import '@cloudimage/360-view/css'
import StyledCIZStackContainer from '../../styles/features/common/CIZStackContainer'

type InternationalString = { [language: string]: string[] }

type Params = {
  manifest: string,
  solo: boolean
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
    CIZStack: any
  }
}

const CIZStack: React.FC<Params> = ({ manifest, solo }) => {
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
    <StyledCIZStackContainer className="viewer-container mx-0">
      <Col className="zstack-container d-flex px-0">
        <article>
          <CI360Viewer
            className={"cloudimage-360"}
            folder={"/testData/media/2d-zst/426913/"}
            filenameX={'Plane{index}.jpg'}
            amountX={81}
            autoplay={false}
            speed={100}
            dragSpeed={150}
            fullscreen={true}
            zoomControlsPosition={"top-right"}
            zoomMax={5}
            zoomStep={0.5}
            inertia={false}
            initialIconShown={true}
            bottomCircle={false}
            lazyload={true}
            initOnClick={true}
            keys={false}
            stopAtEdges={true}
            hints={true}
            theme={"dark"}
            scrollHint={true}
            hotspots={[
              {
                  id: "start",
                  orientation: "x",
                  positions:{0: {x: 0, y:0}}
              },
              {
                  id: "end",
                  orientation: "x",
                  positions:{80: {x: 0, y:0}}
              }
            ]}
            hotspotTimelineOnClick={false}
          />
        </article>
      </Col>
    </StyledCIZStackContainer>
  )
}

export default CIZStack
