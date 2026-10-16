import React, { useEffect, useState } from 'react'

import theme from '../../styles/theme'

import SearchContainer from './SearchContainer'

const StickySearchContainer: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>(theme.color.white)
  const [searchTipsStyle, setSearchTipsStyle] = useState<{
    color: string
    textDecoration: string
  }>({ color: theme.color.link, textDecoration: 'none' })
  const [isSticky, setIsSticky] = useState<boolean>(false)

  useEffect(() => {
    const listenScrollEvent = (): void => {
      if (window.scrollY < theme.stickyHeader.topOffset) {
        setBgColor(theme.color.white)
        setSearchTipsStyle({ color: theme.color.link, textDecoration: 'none' })
        setIsSticky(false)
      }
      if (window.scrollY > theme.stickyHeader.topOffset) {
        setBgColor(theme.color.primary.darkBlue)
        setSearchTipsStyle({
          color: theme.color.white,
          textDecoration: 'none',
        })
        setIsSticky(true)
      }
    }

    window.addEventListener('scroll', listenScrollEvent)

    return () => window.removeEventListener('scroll', listenScrollEvent)
  }, [])

  return (
    <SearchContainer
      className="sticky-top"
      bgColor={bgColor}
      linkStyle={searchTipsStyle}
      id="landing-page-search-container"
      isStickyHeaderActive={isSticky}
    />
  )
}

export default StickySearchContainer
