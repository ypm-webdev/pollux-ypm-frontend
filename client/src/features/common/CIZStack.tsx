import React, { useEffect, useState, useMemo } from "react";
import Col from 'react-bootstrap/Col'
// import { CI360Viewer } from 'js-cloudimage-360-view/react'
import StyledCIZStackContainer from '../../styles/features/common/CIZStackContainer'

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



const CIZStack: React.FC<Params> = ({ manifest }) => {
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
          <h1>Z-Stack Viewer</h1>
        </article>
      </Col>
    </StyledCIZStackContainer>
  )
}

export default CIZStack
