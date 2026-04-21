import React, {useEffect, useRef } from "react"
import { Col } from 'react-bootstrap'
import { Viewer, LayerRTI } from 'openlime';
import '/node_modules/openlime/dist/css/skin.css'; 
import StyledOpenLimeContainer from '../../styles/features/common/OpenLimeContainer'

interface OpenLIMEViewerProps {
  // Point this to the FOLDER containing the info.json from Relight Lab
  manifest: string;
  solo: boolean;
  isActive?: boolean;
}

const OpenLime: React.FC<OpenLIMEViewerProps> = ({ manifest, solo, isActive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<Viewer | null>(null);
  
  // Map dummy manifest IDs to test data paths for development
  // TODO: In production, replace this with actual LUX API call to fetch RTI manifest URL
  // Once integrated with LUX, manifest prop will be a real URL and won't need mapping
  const getRTIPath = (manifestId: string): string => {
    // Development: Map placeholder ID to test data
    if (manifestId.length === 16 && /^[A-Za-z0-9]+$/.test(manifestId)) {
      console.log(`📍 DEV MODE: Mapping placeholder "${manifestId}" to demo RTI data`);
      return '/testData/media/2d-rti/demo/hsh';
    }
    
    // Production: manifestId should be a real URL from LUX
    // Just return it as-is
    return manifestId;
  };
  
  const rtiPath = getRTIPath(manifest);

  useEffect(() => {
    // Only initialize if the tab is active
    if (!isActive || !containerRef.current) return;

    console.log('✓ OpenLime tab is active, initializing...');
    console.log('  Manifest ID:', manifest);
    console.log('  RTI Path:', rtiPath);

    // Use requestAnimationFrame to ensure DOM is fully laid out
    const rafId = requestAnimationFrame(() => {
      setTimeout(async () => {
        const width = containerRef.current?.clientWidth || 0;
        const height = containerRef.current?.clientHeight || 0;
        const parentWidth = containerRef.current?.parentElement?.clientWidth || 0;
        const parentHeight = containerRef.current?.parentElement?.clientHeight || 0;
        
        console.log(`\n>>> Container dimensions: ${width}x${height}`);
        console.log(`>>> Parent dimensions: ${parentWidth}x${parentHeight}`);
        console.log(`>>> Display: ${containerRef.current?.style.display}`);
        
        if (width === 0 || height === 0) {
          console.warn('⚠ Container has zero dimensions, waiting for layout...');
          return;
        }

        try {
          // 1. Fetch info.json to get actual number of planes
          console.log(`🔍 Fetching RTI from: ${rtiPath}/info.json`);
          const infoResponse = await fetch(`${rtiPath}/info.json`);
          if (!infoResponse.ok) {
            throw new Error(`Failed to fetch info.json: ${infoResponse.status} ${infoResponse.statusText}`);
          }
          const infoText = await infoResponse.text();
          console.log(`📄 Fetch response (${infoText.length} chars):`, infoText.substring(0, 200));
          
          let info;
          try {
            info = JSON.parse(infoText);
          } catch (parseErr) {
            console.error('✗ Failed to parse info.json:', parseErr);
            console.error('Raw response:', infoText);
            throw parseErr;
          }
          
          const nPlanes = info.nplanes || info.planes || 6;
          console.log(`✓ Loaded info.json, detected ${nPlanes} planes`, info);

          // 2. Create viewer
          console.log("✓ Creating viewer");
          const viewer = new Viewer(containerRef.current!);
          console.log("✓ Viewer created successfully");
          
          // Force canvas to resize to match container
          const canvas = (viewer as any).canvas;
          if (canvas && canvas.updateSize) {
            canvas.updateSize();
            console.log('✓ Canvas size updated');
          }

          // 3. Load RTI using info.json
          const rtiUrl = `${rtiPath}/info.json`;
          console.log(`\n>>> Attempting to load RTI from: ${rtiUrl}`);
          console.log(`>>> RTI Type: ${info.type}`);
          
          // Now try to create the layer
          console.log(`\n>>> Creating LayerRTI with layout='deepzoom'`);
          const rtiLayer = new LayerRTI({
            url: rtiUrl,
            layout: 'deepzoom'
          } as any);
          
          console.log('✓ LayerRTI created successfully');
          
          // Add to viewer
          viewer.addLayer('plane-0', rtiLayer as any);
          console.log('✓ Layer added to viewer successfully');
          
          // Make sure the layer is visible
          (rtiLayer as any).setVisible(true);
          console.log('✓ Layer visibility set to true');
          
          // Skip camera fit for now - let OpenLime handle viewport
          console.log('⏭ Skipping camera fit (viewport not initialized)');
          
          // Force a redraw
          viewer.redraw();
          console.log('✓ Viewer redraw requested');

          console.log(`\n>>> Viewer initialized successfully`);
          viewerInstance.current = viewer;

        } catch(e) {
          console.error("✗ OpenLIME init error:", e);
          console.error("  Message:", (e as any).message);
          if ((e as any).stack) console.error("  Stack:", (e as any).stack);
        }
      }, 1000); // Increased from 500ms to give tab time to layout
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isActive, rtiPath]);

return (    
      <StyledOpenLimeContainer className="viewer-container mx-0">
        <Col className="openlime-container d-flex px-0">
          <article>
            <div style={{ width: '100%', height: '650px', overflow: 'hidden' }}>
                <div 
                    ref={containerRef} 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        position: 'relative', 
                        backgroundColor: '#000',
                        overflow: 'hidden'
                    }} 
                />
            </div>
          </article>
        </Col>
      </StyledOpenLimeContainer>

)
}

export default OpenLime
