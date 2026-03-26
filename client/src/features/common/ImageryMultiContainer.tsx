import React from 'react'
import { Row, Col } from 'react-bootstrap'
import StyledMultiContainer from 'src/styles/features/common/ImageryMultiContainer'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Images, BrightnessAltHighFill, LayersFill, ArrowRepeat, BoxFill, CloudFill  } from 'react-bootstrap-icons'
import Clover from './Clover'
import CI360 from './CI360'
import CIZStack from './CIZStack'
import OpenLime from './OpenLime';
import WikiDataImageViewer from '../common/WikiDataImageViewer'

type Params = {
  manifestIiif: string
  manifest2dRti: string
  manifest2dZst: string
  manifest2d360: string
  manifest3dObj: string
  manifest3dVol: string
}

const ImageryMultiContainer: React.FC<Params> = ({ manifestIiif, manifest2dRti, manifest2dZst, manifest2d360, manifest3dObj, manifest3dVol }) => {
  return (
    <StyledMultiContainer className="multi-imagery-outer-container mx-0">
        <Col className="multi-imagery-inner-container px-0">

            <Tabs
                defaultActiveKey="2dIiif"
                transition={true}
                id="imagery-options"
                className="mb-0 px-4"
                >
                <Tab eventKey="2dIiif" title={<span><Images />{' '}Images</span>}>
                    {/* IIIF Manifest: {manifestIiif} */}
                    <Clover manifest={manifestIiif} />
                </Tab>
                <Tab eventKey="2dRti" title={<span><BrightnessAltHighFill />{' '}RTI</span>}>
                    {/* 2D RTI Manifest: {manifest2dRti} */}
                    <OpenLime manifest={manifest2dRti} />
                </Tab>
                <Tab eventKey="2dZst" title={<span><LayersFill />{' '}Z-Stack</span>}>
                    {/* 2D ZStack Manifest: {manifest2dZst} */}
                    <CIZStack manifest={manifest2dZst} />
                </Tab>
                <Tab eventKey="2d360" title={<span><ArrowRepeat />{' '}360&deg; View</span>}>
                    {/* 2D 360 Manifest: {manifest2d360} */}
                    <CI360 manifest={manifest2d360} />
                </Tab>
                <Tab eventKey="3dObj" title={<span><BoxFill />{' '}3D Object</span>}>
                    3D Object Manifest: {manifest3dObj}
                </Tab>
                <Tab eventKey="3dVol" title={<span><CloudFill />{' '}3D Volume</span>}>
                    3D Volume Manifest: {manifest3dVol}
                </Tab>
            </Tabs>
            {/* <ul>
                <li>IIIF Manifest: {manifestIiif}</li>
                <li>2D RTI Manifest: {manifest2dRti}</li>
                <li>2D ZStack Manifest: {manifest2dZst}</li>
                <li>2D 360 Manifest: {manifest2d360}</li>
                <li>3D Object Manifest: {manifest3dObj}</li>
                <li>3D Volume Manifest: {manifest3dVol}</li>
            </ul> */}
        </Col>
    </StyledMultiContainer>
  )
}

export default ImageryMultiContainer