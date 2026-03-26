import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const StyledMultiContainer = styled(Row)`

    .multi-imagery-inner-container {
        background: none;
        width: 100%;
    }

    .nav-item {
        font-family: 'Mallory Medium', sans-serif;
        font-weight: 500;
        font-size: 1.15rem;
        color: ${theme.color.black};
        }
    
    .nav-link.active {
        background: linear-gradient(to bottom, ${theme.color.white} 0%, ${theme.color.offWhite} 100%);
        border-bottom: 1px solid ${theme.color.offWhite};
    }
`
export default StyledMultiContainer