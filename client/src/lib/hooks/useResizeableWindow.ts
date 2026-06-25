import { useEffect, useRef } from 'react'

import theme from '../../styles/theme'

export default function useResizeableWindow(
  setIsMobileState: (x: boolean) => void,
): void {
  const setIsMobileStateRef = useRef(setIsMobileState)

  useEffect(() => {
    setIsMobileStateRef.current = setIsMobileState
  }, [setIsMobileState])

  useEffect(() => {
    const listenResizeEvent = (): void => {
      const isMobile = window.innerWidth < theme.breakpoints.md
      setIsMobileStateRef.current(isMobile)
    }

    listenResizeEvent()
    window.addEventListener('resize', listenResizeEvent)

    return () => window.removeEventListener('resize', listenResizeEvent)
  }, [])
}
