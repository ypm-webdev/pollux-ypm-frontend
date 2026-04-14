import styled from 'styled-components'

import theme from '../../theme'


const StyledTextLabel = styled.dt`
    // overflow-wrap: break-word;
    margin-bottom: 0.5rem!important;
    font-weight: 700;
    font-family: 'Mallory Medium', sans-serif;
    font-size: 1.25rem;
    line-height: 1.5rem;

    @media (max-width: ${theme.breakpoints.md}px) {
        font-size: 1.1rem;
    }
`
export default StyledTextLabel
