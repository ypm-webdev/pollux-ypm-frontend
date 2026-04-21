import React, { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { BorderedDiv } from '../../styles/shared/BorderedDiv'
import StyledErrorPage from '../../styles/features/error/ErrorPage'
import theme from '../../styles/theme'
import SearchContainer from '../search/SearchContainer'
import { pushClientEvent } from '../../lib/pushClientEvent'

interface IProps {
  code: number | undefined
}

const getMessage = (code: number | undefined): string => {
  switch (code) {
    case 404:
      return `Sorry, we can't find the page you are looking for. [404 error]`
    default:
      return 'Sorry, an error occurred retrieving the data.'
  }
}

const ErrorPage: React.FC<IProps> = ({ code }) => {
  const spacerStyle: React.CSSProperties = {
    height: '1rem',
    display: 'block',
    width: '100%',
    background: 'linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%)',
  }

  useEffect(() => {
    pushClientEvent('Error', 'Triggered', 'Page Not Found 404')
  }, [])

  return (
    <div className="error-page-container">
      <div style={spacerStyle}></div>
      <StyledErrorPage className="row mx-0" data-testid="error-page">
        <BorderedDiv className="col section">
          <Row>
            <Col xs={12}>
              <div className="message d-flex justify-content-md-center">
                <div>{getMessage(code)}</div>
              </div>
              <div className="search">
                <SearchContainer
                  className="errorPageSearchBox"
                  bgColor={theme.color.white}
                  id="error-page-search-box"
                  isBelowFold={false}
                />
              </div>
            </Col>
            {/* TODO: add image
            <Col xs={12} md={4}">
            <div className="image-container">
            <img src="" alt="" />
            </div>
            </Col>
            */}
          </Row>
        </BorderedDiv>
      </StyledErrorPage>
    </div>
  )
}

export default ErrorPage
