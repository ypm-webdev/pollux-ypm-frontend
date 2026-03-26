import React, {useEffect, useRef } from "react"
import { Col } from 'react-bootstrap'
import { Viewer, LayerRTI } from 'openlime';
import '/node_modules/openlime/dist/css/skin.css'; 
import StyledOpenLimeContainer from '../../styles/features/common/OpenLimeContainer'

type Params = {
  manifest: string
}

interface OpenLIMEViewerProps {
  // Point this to the FOLDER containing the info.json from Relight Lab
  manifest: string; 
}

const customManifest = "/testData/media/2d-rti/YBC07289_o/"

const OpenLime: React.FC<OpenLIMEViewerProps> = ({ manifest }) => {
  const containerRef = useRef(null);
  const viewerInstance = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Create the Viewer instance on the ref'd div
    const viewer = new Viewer(containerRef.current);

    // 2. Configure the LRGB PTM Layer
    
    try {
        const rtiLayer = new LayerRTI({
        url: customManifest,
        layout: 'deepzoom'
        });
        console.log("layer created: ", rtiLayer)
        viewer.addLayer('ptm-layer',rtiLayer as any);
    } catch(e) {
        console.error("OpenLIME failed to initialize layer:", e);
    }


    // 3. Add necessary interaction controllers
    // viewer.addController(new ControllerPanZoom());
    // viewer.addController(new ControllerLight());

    // viewerInstance.current = viewer;

    // Cleanup to prevent memory leaks and duplicate viewers on re-render
    return () => {
      if (viewerInstance.current) {
        // Most OpenLIME versions use a destroy or similar method
        // to clean up WebGL contexts
        // viewerInstance.current.destroy(); 
      }
    };
  }, [customManifest]);

return (    
    <StyledOpenLimeContainer className="viewer-container mx-0">    
        <Col className="openlime-container d-flex px-0">
            <article>
                <h2>OpenLIME viewer</h2>
                <div 
                    ref={containerRef} 
                    style={{ 
                        width: '100%', 
                        height: '600px', 
                        position: 'relative', 
                        backgroundColor: '#000' 
                    }} 
                />
            </article>

        </Col>
    </StyledOpenLimeContainer>
)
}

export default OpenLime
