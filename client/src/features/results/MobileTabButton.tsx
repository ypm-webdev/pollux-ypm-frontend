import React from 'react'
import { Col, Row } from 'react-bootstrap'

import { advancedSearchTitles } from '../../config/searchTypes'
import { getIcon } from '../../lib/advancedSearch/searchHelper'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import SecondaryButton from '../../styles/shared/SecondaryButton'
import LoadingSpinner from '../common/LoadingSpinner'

interface IProps {
  estimate: number | string
  icon: string
  tab: string
  handleClick: () => void
  role: string
  requestState: { isFetching: boolean; isLoading: boolean }
  showArrow?: boolean
  isCurrentTab?: boolean
}

const MobileTabButton: React.FC<IProps> = ({
  estimate,
  icon,
  tab,
  handleClick,
  role,
  requestState,
  showArrow = false,
  isCurrentTab = false,
}) => {
  const { isFetching, isLoading } = requestState

  return (
    <SecondaryButton
      role={role}
      className="border border-0 w-100"
      onClick={() => handleClick()}
      $actionBgColor={theme.color.lightGray}
    >
      <Row>
        <Col xs={2} className="d-flex align-items-center justify-content-center">
          <img
            className="navIcon"
            src={getIcon(icon)}
            alt="icon"
            aria-label="icon"
            height={showArrow ? 55 : 45}
            width={showArrow ? 55 : 45}
          />
        </Col>
        <Col xs={showArrow || isCurrentTab ? 8 : 10}>
          <Row className="d-flex float-start">
            <Col xs={12} className="linkTitle d-flex float-start">
              <h3>{advancedSearchTitles[tab]}</h3>
            </Col>
            <Col xs={12} className="linkSubtext d-flex float-start">
              {isLoading || isFetching ? (
                <LoadingSpinner size="sm" />
              ) : (
                <span className={`badge ${isCurrentTab ? 'badge-primary' : 'badge-secondary'}`}>{estimate}</span>
              )}{' '}
              <span style={{ marginLeft: '4px' }}>result{estimate !== 1 ? 's' : ''}</span>
            </Col>
          </Row>
        </Col>
        {showArrow && (
          <Col xs={2}>
            <h3
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <i className="bi bi-chevron-down" />
            </h3>
          </Col>
        )}
        {isCurrentTab && (
          <Col xs={2}>
            <h3
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                color: theme.color.primary.blue,
              }}
            >
              <i className="bi bi-check-lg fs-1 mt-2" />
            </h3>
          </Col>
        )}
      </Row>
      <StyledHr
        width="100%"
        color={theme.color.lightGray}
        $hiddenOnDesktop
        className="mobileTabButtonHr"
      />
    </SecondaryButton>
  )
}

export default MobileTabButton
