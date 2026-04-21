import React, { useEffect, useRef } from "react"
import { Col } from 'react-bootstrap'
import StyledOpenLimeContainer from '../../styles/features/common/OpenLimeContainer'

interface RelightViewerProps {
  // Point this to the FOLDER containing the info.json from Relight Lab
  manifest: string;
  solo: boolean;
}

const customManifest = "/testData/media/2d-rti/YBC07289_o"

declare global {
  interface Window {
    Relight: any;
  }
}

const Relight: React.FC<RelightViewerProps> = ({ manifest, solo }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const relightInstance = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Ensure canvas has dimensions before initializing Relight
    const parent = canvasRef.current.parentElement;
    if (parent && canvasRef.current) {
      canvasRef.current.width = parent.clientWidth;
      canvasRef.current.height = 600;
    }

    // Load and initialize relight.js
    const loadAndInit = async () => {
      if (!window.Relight) {
        const script = document.createElement('script');
        script.src = '/vendor/relight.min.js';
        script.async = false; // Changed to false to ensure it loads before we use it
        script.onload = () => {
          console.log("Relight.js loaded successfully");
          // Small delay to ensure library is fully ready
          setTimeout(initializeRelight, 100);
        };
        script.onerror = () => {
          console.error("Failed to load relight.js from vendor directory");
        };
        document.body.appendChild(script);
      } else {
        setTimeout(initializeRelight, 100);
      }
    };

    function initializeRelight() {
      try {
        if (!window.Relight) {
          console.error("Relight library not available");
          return;
        }

        console.log("Canvas element:", canvasRef.current);
        console.log("Canvas dimensions:", canvasRef.current?.width, "x", canvasRef.current?.height);
        console.log("Window.Relight available:", typeof window.Relight);

        // Try to get WebGL context to debug
        const ctx = canvasRef.current?.getContext('webgl') || canvasRef.current?.getContext('experimental-webgl');
        console.log("WebGL context:", ctx);

        const options = {
          url: customManifest,
          layout: 'image',
          light: [0.5, 0.5, 1.0],
          fit: true
        };

        console.log("Creating Relight instance with options:", options);
        relightInstance.current = new window.Relight(canvasRef.current, options);
        console.log("Relight viewer initialized successfully");
      } catch (e) {
        console.error("Relight initialization error:", e);
        console.error("Stack trace:", e instanceof Error ? e.stack : "No stack trace");
      }
    }

    loadAndInit();

    // Handle canvas resize
    const handleResize = () => {
      if (canvasRef.current && relightInstance.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          const width = parent.clientWidth;
          const height = parent.clientHeight;
          relightInstance.current.resize(width, height);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [customManifest]);

  return (
    <StyledOpenLimeContainer className="viewer-container mx-0">
      <Col className="openlime-container d-flex px-0">
        <article>
          {/* <h2>Relight viewer</h2> */}
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '600px',
              position: 'relative',
              backgroundColor: '#000',
              display: 'block'
            }}
          />
        </article>
      </Col>
    </StyledOpenLimeContainer>
  )
}

export default Relight
