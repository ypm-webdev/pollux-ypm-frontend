import React, { type JSX } from 'react'

interface ITab {
  title: string
  currentTab?: string
  children: Array<React.JSX.Element> | React.JSX.Element
}

const Tab: React.FC<ITab> = ({ children }) => <div>{children}</div>

export default Tab
