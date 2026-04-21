import React, { useRef, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col'
import { BoxFill, Lightbulb, CircleHalf, ArrowCounterclockwise, ZoomOut, Fullscreen, ZoomIn } from 'react-bootstrap-icons'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import StyledThreeContainer from '../../styles/features/common/ThreeContainer'
import LoadingSpinner from './LoadingSpinner'
import theme from '../../styles/theme'

SwiperCore.use([Navigation, Pagination])

type ThreeProps = {
  manifest: string
  width?: string
  height?: string
  dracoPath?: string
  solo: boolean
}

/**
 * @param {string} manifest - The URL to your .glb file
 * @param {string} width - Container width (default: 100%)
 * @param {string} height - Container height (default: 500px)
 */
export const Three: React.FC<ThreeProps> = ({ 
  manifest, 
  solo,
  width = '100%', 
  height = '550px',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const hasInitializedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomChanged, setIsZoomChanged] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [lightIntensity, setLightIntensity] = useState(1.0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isFullscreenRef = useRef(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
  const modelCenterRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const initialCameraDistanceRef = useRef<number>(1);
  const lastCameraDistanceRef = useRef<number>(1);
  const scrollZoomDetectedRef = useRef(false);
  const hasUserInteractedRef = useRef(false);
  const animationStateRef = useRef({
    isAnimating: false,
    startPosition: new THREE.Vector3(),
    targetPosition: new THREE.Vector3(),
    startTime: 0,
    duration: 400
  });

  const primaryBlue = theme.color.primary.blue;
  
  const folderPath = '/testData/media/3d-obj/';
  const glbFiles = [
    [
      { uri: 'ypmvppu.014554.i_antrodemus_valens_manual_ungual.glb', label: 'Manual Ungual' },
      { uri: 'ypm_vppu.014554.j_antrodemus_valens_pedal_ungual.glb', label: 'Pedal Ungual' },
      { uri: 'dummy.glb', label: 'Dummy' },
      { uri: 'dummy2.glb', label: 'Dummy' },
      { uri: 'dummy3.glb', label: 'Dummy' }

    ],
    [
      { uri: 'ypm_pb.053910a_pecopteris_miltoni_fossil_leaf.glb', label: 'Fossil Leaf A' },
      { uri: 'ypm_pb.053910b_pecopteris_miltoni_fossil_leaf.glb', label: 'Fossil Leaf B' }
    ],
    [
      { uri: 'ypm_ant.148252.glb', label: 'Scarab Specimen' }
    ],
    [
      { uri: 'ypm_bc.006943_nbc_03968.glb', label: 'Cylinder Seal' },
      { uri: 'ypm_bc.006943_nbc_03968_virtual_impression.glb', label: 'Virtual Impression' }
    ],
    [
      { uri: 'ypm_ent.619345_scarab_chrysina_gloriosa.glb', label: 'Chrysina Gloriosa' }
    ],
    [
      { uri: 'ypm_ent.626825_orthoptera_melanoplus_spretus.glb', label: 'Melanoplus Spretus' }
    ]
  ];

  // Initialize with a random set
  useEffect(() => {
    const randomSetIndex = Math.floor(Math.random() * glbFiles.length);
    setCurrentSetIndex(randomSetIndex);
    setCurrentFileIndex(0);
    setIsZoomChanged(false);
  }, []);

  // Reset user interaction flag when file changes
  useEffect(() => {
    hasUserInteractedRef.current = false;
  }, [currentFileIndex, currentSetIndex]);

  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current || !controlsRef.current) return;
    
    // Don't start a new animation if one is already playing
    if (animationStateRef.current.isAnimating) return;

    const zoomFactor = direction === 'in' ? 0.9 : 1.1;
    const camera = cameraRef.current;
    const center = modelCenterRef.current;
    const direction3d = camera.position.clone().sub(center).normalize();
    
    const currentDistance = camera.position.distanceTo(center);
    const newDistance = currentDistance * zoomFactor;
    
    const targetPosition = center.clone().add(direction3d.multiplyScalar(newDistance));
    
    // Set up animation
    animationStateRef.current = {
      isAnimating: true,
      startPosition: camera.position.clone(),
      targetPosition: targetPosition,
      startTime: Date.now(),
      duration: 400
    };
    
    setIsZoomChanged(true);
  };

  const handleResetZoom = () => {
    if (!cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const center = modelCenterRef.current;
    const distance = initialCameraDistanceRef.current;
    const direction3d = camera.position.clone().sub(center).normalize();

    const targetPosition = center.clone().add(direction3d.multiplyScalar(distance));
    
    // Set up animation
    animationStateRef.current = {
      isAnimating: true,
      startPosition: camera.position.clone(),
      targetPosition: targetPosition,
      startTime: Date.now(),
      duration: 400
    };
    
    scrollZoomDetectedRef.current = false;
    setIsZoomChanged(false);
  };

  const handleFullscreenToggle = () => {
    const element = containerRef.current?.parentElement as any;
    
    if (!document.fullscreenElement && element) {
      // Enter fullscreen
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const createGradientBackground = (isDark: boolean) => {
    return new THREE.Color(isDark ? '#111' : '#fff');
  };

  const initViewer = (setIndex: number, fileIndex: number) => {
    if (!containerRef.current) return null;

    // Clear any existing renderer
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // Load GLB file from current set and file index
    const currentSet = glbFiles[setIndex];
    const glbUrl = folderPath + currentSet[fileIndex].uri;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    console.log('initViewer called:', { setIndex, fileIndex, currentSet, glbUrl, width, height });

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = createGradientBackground(isDarkMode);

    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    camera.position.z = 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    // Mouse controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controls.enableZoom = false;
    controlsRef.current = controls;

    // Disable auto-rotate on user interaction
    const handleUserInteraction = () => {
      if (!hasUserInteractedRef.current) {
        hasUserInteractedRef.current = true;
        controls.autoRotate = false;
        renderer.domElement.removeEventListener('mousedown', handleUserInteraction);
        renderer.domElement.removeEventListener('touchstart', handleUserInteraction);
      }
    };

    renderer.domElement.addEventListener('mousedown', handleUserInteraction);
    renderer.domElement.addEventListener('touchstart', handleUserInteraction);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, lightIntensity);
    light1.position.set(10, 10, 10);
    light1.castShadow = true;
    light1.shadow.mapSize.width = 2048;
    light1.shadow.mapSize.height = 2048;
    directionalLightRef.current = light1;
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.3);
    light2.position.set(-10, 5, 5);
    scene.add(light2);

    const light3 = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(light3);

    // Load GLB
    const loader = new GLTFLoader();
    loader.load(
      glbUrl,
      (gltf) => {
        console.log('GLB loaded successfully:', gltf);
        const model = gltf.scene;
        
        // Count meshes and log model structure
        let meshCount = 0;
        model.traverse((node: any) => {
          if (node.isMesh) meshCount++;
        });
        console.log('Mesh count:', meshCount);
        
        // Preserve materials and colors from the GLB
        model.traverse((node: any) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            
            // Handle both single material and array of materials
            const materials = Array.isArray(node.material) ? node.material : [node.material];
            materials.forEach((mat: any) => {
              if (mat) {
                // Preserve original material properties
                mat.needsUpdate = true;
                // Set DoubleSide for all models to handle inverted normals
                if (!mat.side || mat.side === THREE.FrontSide) {
                  mat.side = THREE.DoubleSide;
                }
                // Log material info for debugging
                console.log('Material:', {
                  type: mat.type,
                  color: mat.color?.getHexString?.(),
                  map: mat.map ? 'yes' : 'no',
                  metalness: mat.metalness,
                  roughness: mat.roughness
                });
              }
            });
          }
        });
        
        scene.add(model);
        
        // Scale model if it's too small
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // If model is very small, scale it up
        if (maxDim < 1) {
          const scaleFactor = 2 / maxDim;
          model.scale.multiplyScalar(scaleFactor);
          console.log('Model was too small, scaled by:', scaleFactor);
        }

        // Recalculate bounding box after scaling
        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledSize = scaledBox.getSize(new THREE.Vector3());
        const scaledMaxDim = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);
        
        // Center and fit model
        const center = scaledBox.getCenter(new THREE.Vector3());
        console.log('Scaled bounding box:', {
          minX: scaledBox.min.x, minY: scaledBox.min.y, minZ: scaledBox.min.z,
          maxX: scaledBox.max.x, maxY: scaledBox.max.y, maxZ: scaledBox.max.z,
          size: { x: scaledSize.x, y: scaledSize.y, z: scaledSize.z, maxDim: scaledMaxDim }
        });
        
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(scaledMaxDim / 2 / Math.tan(fov / 2));
        
        console.log('Camera positioning:', { 
          center, 
          cameraZ, 
          newPos: { x: center.x, y: center.y, z: center.z + cameraZ * 1.0 }
        });

        camera.position.set(center.x, center.y, center.z + cameraZ * 1.0);
        camera.lookAt(center);
        camera.updateProjectionMatrix();
        
        // Store model center and initial distance for zoom handlers
        modelCenterRef.current = center;
        initialCameraDistanceRef.current = camera.position.distanceTo(center);
        
        // Update controls target
        controls.target.copy(center);
        controls.update();
        
        // Model is now loaded, hide spinner
        setIsLoading(false);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error) => {
        console.error('Failed to load GLB:', error);
        setIsLoading(false);
      }
    );

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Detect scroll zoom only when in fullscreen mode and not animating
      if (isFullscreenRef.current && cameraRef.current && !animationStateRef.current.isAnimating) {
        const currentDistance = cameraRef.current.position.distanceTo(modelCenterRef.current);
        const tolerance = 0.01;
        if (Math.abs(currentDistance - initialCameraDistanceRef.current) > tolerance) {
          if (!scrollZoomDetectedRef.current) {
            scrollZoomDetectedRef.current = true;
          }
        }
      }
      
      // Handle zoom animation
      if (animationStateRef.current.isAnimating && cameraRef.current && controlsRef.current) {
        const elapsed = Date.now() - animationStateRef.current.startTime;
        const progress = Math.min(elapsed / animationStateRef.current.duration, 1);
        
        // Easing function (ease-out cubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        // Lerp between start and target position
        cameraRef.current.position.lerpVectors(
          animationStateRef.current.startPosition,
          animationStateRef.current.targetPosition,
          easeProgress
        );
        
        controlsRef.current.update();
        
        // Animation complete
        if (progress >= 1) {
          animationStateRef.current.isAnimating = false;
          cameraRef.current.position.copy(animationStateRef.current.targetPosition);
          controlsRef.current.update();
        }
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleUserInteraction);
      renderer.domElement.removeEventListener('touchstart', handleUserInteraction);
      cancelAnimationFrame(animationId);
      controls.dispose();
      if (containerRef.current && renderer.domElement.parentElement === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // If container has no dimensions (hidden tab), use Intersection Observer
    if (width === 0 || height === 0) {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && containerRef.current) {
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          if (w > 0 && h > 0) {
            setIsLoading(true);
            const cleanup = initViewer(currentSetIndex, currentFileIndex);
            observer.disconnect();
            if (cleanup) {
              // Store cleanup for the return statement
              return;
            }
          }
        }
      }, { threshold: 0.1 });

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      // Container has dimensions, initialize directly
      setIsLoading(true);
      const cleanup = initViewer(currentSetIndex, currentFileIndex);
      if (cleanup) {
        return cleanup;
      }
    }
  }, [currentFileIndex, currentSetIndex]);

  // Update scroll zoom based on fullscreen state
  useEffect(() => {
    isFullscreenRef.current = isFullscreen;
    if (controlsRef.current) {
      controlsRef.current.enableZoom = isFullscreen;
    }
    // Reset zoom detection when exiting fullscreen
    if (!isFullscreen) {
      scrollZoomDetectedRef.current = false;
    }
  }, [isFullscreen]);

  // Update zoom changed state when scroll zoom is detected
  useEffect(() => {
    const checkForScrollZoom = setInterval(() => {
      if (scrollZoomDetectedRef.current && !isZoomChanged) {
        setIsZoomChanged(true);
      }
    }, 50);
    
    return () => clearInterval(checkForScrollZoom);
  }, [isZoomChanged]);

  // Sync Swiper with currentFileIndex
  useEffect(() => {
    if (swiperRef.current && glbFiles[currentSetIndex].length > 1) {
      swiperRef.current.slideTo(currentFileIndex);
    }
  }, [currentFileIndex, currentSetIndex]);

  // Reset file index when set changes
  useEffect(() => {
    setCurrentFileIndex(0);
    setIsZoomChanged(false);
  }, [currentSetIndex]);

  // Update light intensity when slider changes
  useEffect(() => {
    if (directionalLightRef.current) {
      directionalLightRef.current.intensity = lightIntensity;
    }
  }, [lightIntensity]);

  // Update background color when dark mode changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.background = createGradientBackground(isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <StyledThreeContainer className="viewer-container mx-0">
      <Col className="three-container d-flex px-0">
        <article>
          <div 
            style={{
              width: '100%',
              height: height,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {isLoading && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <LoadingSpinner />
                <p>Loading 3D model...</p>
              </div>
            )}
            <div
              style={{
                position: 'absolute',
                left: '1rem',
                top: '1rem',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '0.75rem',
                width: '60px',
                height: '220px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ paddingBottom: '10px' }}>
                <Lightbulb size={20} />
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={lightIntensity}
                onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                style={{
                  width: '130px',
                  height: '30px',
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'center',
                  cursor: 'pointer',
                  accentColor: '#006DC6',
                  pointerEvents: 'auto',
                  paddingTop: '10px',
                  paddingBottom: '10px'
                }}
                title="Light Intensity"
              />
              <div style={{ fontSize: '0.7rem', color: '#666', fontWeight: '500', paddingTop: '10px' }}>
                {lightIntensity.toFixed(1)}
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <button
                onClick={() => handleZoom('in')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
                title="Zoom in"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={() => handleZoom('out')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
                title="Zoom out"
              >
                <ZoomOut size={20} />
              </button>
              {isZoomChanged && (
                <button
                  onClick={() => handleResetZoom()}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}
                  title="Reset zoom"
                >
                  <ArrowCounterclockwise size={20} />
                </button>
              )}
              <button
                onClick={() => handleFullscreenToggle()}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  fontSize: '26px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                <Fullscreen size={20} />
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  backgroundColor: isDarkMode ? '#222' : '#fff',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDarkMode ? '#fff' : '#000',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#333' : '#f0f0f0';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#222' : '#fff';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
                title={isDarkMode ? 'Light mode' : 'Dark mode'}
              >
                <CircleHalf size={20} />
              </button>
            </div>
            <div 
              ref={containerRef} 
              style={{ 
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
            />
          </div>
          {currentSetIndex !== undefined && glbFiles[currentSetIndex] && glbFiles[currentSetIndex].length > 1 && (
            <div style={{ width: '100%', marginTop: '1rem', backgroundColor: '#fff' }}>
              <Swiper
                initialSlide={currentFileIndex}
                onSwiper={(swiper: any) => {
                  swiperRef.current = swiper;
                }}
                slidesPerView="auto"
                spaceBetween={12}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={(swiper: any) => setCurrentFileIndex(swiper.activeIndex)}
                className="three-swiper"
              >
                {glbFiles[currentSetIndex].map((file, index) => (
                  <SwiperSlide key={index} style={{ width: 'auto' }}>
                    <button
                      onClick={() => setCurrentFileIndex(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{
                        width: '160px',
                        height: '100px',
                        backgroundColor: index === currentFileIndex ? '#d3d3d3' : '#e8e8e8',
                        borderRadius: '0',
                        flex: '0 0 auto',
                        borderBottom: index === currentFileIndex ? `3px solid ${primaryBlue}` : '1px solid #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <BoxFill size={32} color="#999" />
                      </div>
                      <div style={{
                        width: '160px',
                        fontSize: '0.9rem',
                        wordBreak: 'break-word',
                        textAlign: 'center',
                        color: '#666',
                        fontFamily: 'Mallory Medium',
                        lineHeight: '1.2em',
                        fontWeight: index === currentFileIndex ? '700' : '400'
                      }}>
                        {file.label}
                      </div>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </article>
      </Col>
    </StyledThreeContainer>
  );
}

export default Three
