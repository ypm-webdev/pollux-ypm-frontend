import React, { useEffect, useState } from 'react'

import theme from '../../styles/theme'

import SearchContainer from './SearchContainer'

const StickySearchContainer: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>(theme.color.white)
  const [searchTipsStyle, setSearchTipsStyle] = useState<{
    color: string
    textDecoration: string
  }>({ color: theme.color.link, textDecoration: 'none' })
  const [isBelowFold, setIsBelowFold] = useState<boolean>(false)

  useEffect(() => {
    const listenScrollEvent = (): void => {
      if (window.scrollY < theme.stickyHeader.topOffset) {
        setIsBelowFold(false)
        setBgColor(theme.color.white)
        setSearchTipsStyle({ color: theme.color.link, textDecoration: 'none' })
      }
      if (window.scrollY > theme.stickyHeader.topOffset) {
        setBgColor(theme.color.primary.darkBlue)
        setIsBelowFold(true)
        setSearchTipsStyle({
          color: theme.color.white,
          textDecoration: 'none',
        })
      }
    }

    window.addEventListener('scroll', listenScrollEvent)

    return () => window.removeEventListener('scroll', listenScrollEvent)
  }, [])

  return (
    <SearchContainer
      className="sticky-top"
      bgColor={bgColor}
      isBelowFold={isBelowFold}
      searchTipsStyle={searchTipsStyle}
      id="landing-page-search-container"
    />
  )
}

export default StickySearchContainer
