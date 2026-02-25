import styled from 'styled-components'

import theme from '../theme'

export const BorderedDiv = styled.div`
  border-radius: ${theme.border.radius};
  box-shadow: 2px 2px 5px ${theme.color.black20};
`
export const ToppedBorderedDiv = styled(BorderedDiv)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-style: solid;
  border-top-width: 12px;
  border-top-color: ${theme.color.primary.teal};
`
