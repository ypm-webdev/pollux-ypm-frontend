import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import StyledMultiContainer from 'src/styles/features/common/ImageryMultiContainer'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Images, BrightnessAltHighFill, LayersFill, ArrowRepeat, BoxFill, CloudFill  } from 'react-bootstrap-icons'
import Clover from './Clover'
import CI360 from './CI360'
import CIZStack from './CIZStack'
import OpenLime from './OpenLime';
import Three from './Three'
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
  const getFirstActiveTab = () => {
    if (manifestIiif !== '') return '2dIiif'
    if (manifest2dRti !== '') return '2dRti'
    if (manifest2dZst !== '') return '2dZst'
    if (manifest2d360 !== '') return '2d360'
    if (manifest3dObj !== '') return '3dObj'
    if (manifest3dVol !== '') return '3dVol'
    return '2dIiif'
  }

  const [activeTab, setActiveTab] = useState<string>(getFirstActiveTab())

  useEffect(() => {
    setActiveTab(getFirstActiveTab())
  }, [manifestIiif, manifest2dRti, manifest2dZst, manifest2d360, manifest3dObj, manifest3dVol])

  const isSolo = {
    '2d': manifestIiif !== '' && manifest2dRti === '' && manifest2dZst === '' && manifest2d360 === '' && manifest3dObj === '' && manifest3dVol === '',
    '2drti': manifestIiif === '' && manifest2dRti !== '' && manifest2dZst === '' && manifest2d360 === '' && manifest3dObj === '' && manifest3dVol === '',
    '2dzst': manifestIiif === '' && manifest2dRti === '' && manifest2dZst !== '' && manifest2d360 === '' && manifest3dObj === '' && manifest3dVol === '',
    '2d360': manifestIiif === '' && manifest2dRti === '' && manifest2dZst === '' && manifest2d360 !== '' && manifest3dObj === '' && manifest3dVol === '',
    '3dobj': manifestIiif === '' && manifest2dRti === '' && manifest2dZst === '' && manifest2d360 === '' && manifest3dObj !== '' && manifest3dVol === '',
    '3dvol': manifestIiif === '' && manifest2dRti === '' && manifest2dZst === '' && manifest2d360 === '' && manifest3dObj === '' && manifest3dVol !== '',
  }

  console.log("isSolo:" ,isSolo);

  // Check if any solo condition is true
  const soloKey = Object.entries(isSolo).find(([_, value]) => value)?.[0];

  // If solo mode, render just the content without tab structure
  if (soloKey) {
    if (soloKey === '2d') return <Clover manifest={manifestIiif} solo={isSolo['2d']} />
    if (soloKey === '2drti') return <OpenLime manifest={manifest2dRti} solo={isSolo['2drti']} />
    if (soloKey === '2dzst') return <CIZStack manifest={manifest2dZst} solo={isSolo['2dzst']} />
    if (soloKey === '2d360') return <CI360 manifest={manifest2d360} solo={isSolo['2d360']} />
    if (soloKey === '3dobj') return <Three manifest={manifest3dObj} solo={isSolo['3dobj']} />
    if (soloKey === '3dvol') return <div>3D Volume Manifest: {manifest3dVol}</div>
  }

  // Otherwise render tabs
  return (
    <StyledMultiContainer className="multi-imagery-outer-container mx-0">
        <Col className="multi-imagery-inner-container px-0">

            <Tabs
                activeKey={activeTab}
                onSelect={(k) => k && setActiveTab(k)}
                transition={true}
                id="imagery-options"
                className="mb-0 px-4"
                >
                {manifestIiif !== '' ? (
                <Tab eventKey="2dIiif" title={<span><Images />{' '}Images</span>}>
                    {/* IIIF Manifest: {manifestIiif} */}
                    <Clover manifest={manifestIiif} solo={isSolo['2d']} />
                </Tab>) : null}

                {manifest2dRti !== '' ? (
                <Tab eventKey="2dRti" title={<span><BrightnessAltHighFill />{' '}RTI</span>}>
                    {/* 2D RTI Manifest: {manifest2dRti} */}
                    <OpenLime manifest={manifest2dRti} solo={isSolo['2drti']} isActive={activeTab === '2dRti'} />
                </Tab>) : null}

                {manifest2dZst !== '' ? (
                <Tab eventKey="2dZst" title={<span><LayersFill />{' '}Z-Stack</span>}>
                    {/* 2D ZStack Manifest: {manifest2dZst} */}
                    <CIZStack manifest={manifest2dZst} solo={isSolo['2dzst']} />
                </Tab>) : null}
                
                {manifest2d360 !== '' ? (
                <Tab eventKey="2d360" title={<span><ArrowRepeat />{' '}360&deg; View</span>}>
                    {/* 2D 360 Manifest: {manifest2d360} */}
                    <CI360 manifest={manifest2d360} solo={isSolo['2d360']} />
                </Tab>) : null}
                
                {manifest3dObj !== '' ? (
                <Tab eventKey="3dObj" title={<span><BoxFill />{' '}3D Object</span>}>
                    {/* 3D Object Manifest: {manifest3dObj} */}
                    <Three manifest={manifest3dObj} solo={isSolo['3dobj']} />
                </Tab>) : null}
                
                {manifest3dVol !== '' ? (
                <Tab eventKey="3dVol" title={<span><CloudFill />{' '}3D Volume</span>}>
                    3D Volume Manifest: {manifest3dVol}
                </Tab>) : null}

            </Tabs>

        </Col>
    </StyledMultiContainer>
  )
}

export default ImageryMultiContainer