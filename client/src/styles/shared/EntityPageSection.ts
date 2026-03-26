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

  h2, h2.panel-heading {
    font-family: 'Mallory Bold', sans-serif;
    text-transform: none;
    font-weight: 700;
    letter-spacing: 0px;
  }


  .accordion-item {
    border-radius: ${theme.border.radius};
    border: none;
  }

  .accordion-item:first-child > h2 > .accordion-button {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .accordion-item:last-child > h2 > .accordion-button.collapsed {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
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
