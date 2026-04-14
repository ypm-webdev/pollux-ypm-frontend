import styled from 'styled-components'

import theme from '../theme'

interface IProps {
  $borderTopLeftRadius?: string
  $borderTopRightRadius?: string
}

const EntityPageSection = styled.div<IProps>`
  background: ${theme.color.white};
  box-shadow: 1px 1px 5px ${theme.color.black20};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  margin: 0 0 ${theme.spacing.sectionGap};
  padding: 0.5rem;

  @media (min-width: ${theme.breakpoints.md}px) {
    padding: 1rem;
  }

  p.no-results {
    line-height: 1.25em;
    font-size: 1.25rem!important;
  }

  h2, h2.panel-heading {
    font-family: 'Mallory Bold', sans-serif;
    text-transform: none;
    font-weight: 700;
    letter-spacing: 0px;
  }

  .resultsSearchContainer {
    background-color: cyan!important;
  }

  .accordion-item {
    border-radius: 0;
    border: none;
  }

  .accordion-item:first-child > h2 > .accordion-button {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }

  .accordion-item:last-child > h2 > .accordion-button.collapsed {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  &.results,
  &.resultsAlert {
    box-shadow: 0px 4px 5px 0px ${theme.color.black20};
  }

  &.resultsEntityPageSection {
    padding: 0px;
  }
`

export default EntityPageSection
