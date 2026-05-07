import React, { useEffect, useRef, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { searchScope } from '../../config/searchTypes'
import { checkForStopWords, translate } from '../../lib/util/translate'
import {
  addSimpleSearchInput,
  ISimpleSearchState,
} from '../../redux/slices/simpleSearchSlice'
import theme from '../../styles/theme'
import LoadingSpinner from '../common/LoadingSpinner'
import { pushClientEvent } from '../../lib/pushClientEvent'
import searchIcon from '../../resources/images/icons/search.svg'

const SearchImg = styled.img`
  float: left;
`
const StyledSearchBox = styled.div`
  display: flex;
  width: ${theme.searchBox.width};
  border: ${theme.searchBox.borderStyle};
  border-radius: ${theme.searchBox.borderRadius};
  font-size: 2rem;

  @media (min-width: ${theme.breakpoints.md}px) {
    border-radius: ${theme.searchBox.borderRadius};
  }

  .form-control {
    border: none;
    border-radius: ${theme.searchBox.borderRadiusMobile} 0 0
      ${theme.searchBox.borderRadiusMobile} !important;
    margin-left: 0px !important;
    max-width: ${theme.searchBox.width};
    font-weight: 300;
    height: 48px;
    font-size: inherit;
    font-size: 1.2rem;
  }

  input.ypm-search {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  input::placeholder {
    color: #aaa;
  }

  .search-icon {
    font-size: 0.9em;
    vertical-align: 0 !important;
    color: ${theme.color.white};
  }

  .submitButton {
    background-color: ${theme.color.primary.darkBlue};
    border-radius: 0 ${theme.searchBox.borderRadius}
      ${theme.searchBox.borderRadius} 0;
    height: 48px;
    font-size: inherit;
    border-color: ${theme.color.primary.darkBlue};
  }
`

const SearchBox: React.FC<{
  unselectable?: boolean
  closeSearchBox?: () => void
  id: string
  isResults?: boolean
  setIsError: (x: boolean) => void
  isBelowFold: boolean
  isSearchOpen?: boolean
}> = ({
  unselectable: isUnselectable,
  closeSearchBox,
  id,
  isBelowFold,
  isResults,
  setIsError,
  isSearchOpen = false,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const currentState = useAppSelector(
    (state) => state.simpleSearch as ISimpleSearchState,
  )

  // const ibf = isBelowFold?'true':'false'
  const buttonStyle = isBelowFold
    ? {
        backgroundColor: theme.color.primary.blue,
        outline: '1px ' + theme.color.primary.blue + ' solid',
        border: 'none',
      }
    : {
        backgroundColor: theme.color.primary.darkBlue,
        outline: '1px ' + theme.color.primary.darkBlue + ' solid',
        border: 'none',
      }

  const dispatch = useAppDispatch()

  let simpleQuery: string | null = null
  const { search } = useLocation()
  const tab = useParams<{ tab: string }>().tab || 'objects'
  const queryString = new URLSearchParams(search)
  simpleQuery = queryString.get('sq') || ''

  useEffect(() => {
    if (simpleQuery !== null) {
      dispatch(addSimpleSearchInput({ value: simpleQuery }))
    }
  }, [dispatch, simpleQuery])

  // If on the results page, get the current search query
  if (isResults) {
    if (currentState.value === null) {
      dispatch(addSimpleSearchInput({ value: simpleQuery }))
    }
  }

  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.currentTarget
    dispatch(addSimpleSearchInput({ value }))
  }

  const validateInput = (): boolean => {
    const { value } = currentState
    return value !== null && value.trim() !== '' // ignore empty search string
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (validateInput()) {
      const valueToSubmit = checkForStopWords(currentState.value!)
      translate({
        query: valueToSubmit,
        scope: searchScope[tab],
        onSuccess: (translatedString) => {
          const newUrlParams = new URLSearchParams()
          const query = JSON.parse(translatedString)
          delete query._scope
          newUrlParams.set('q', JSON.stringify(query))
          newUrlParams.set('sq', valueToSubmit)
          if (closeSearchBox) {
            closeSearchBox()
          }
          inputRef.current!.value = ''
          setIsError(false)
          setIsLoading(false)
          pushClientEvent('Search Button', 'Submit', 'Simple Search')
          navigate(
            {
              pathname: `/view/results/${tab}`,
              search: `${newUrlParams.toString()}`,
            },
            {
              state: {
                fromNonResultsPage: !isResults,
              },
            },
          )
        },
        onError: () => {
          setIsLoading(false)
          setIsError(true)
        },
        onLoading: () => setIsLoading(true),
      })
    }
  }

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus()
    }

    if (isSearchOpen) {
      inputRef.current!.focus()
    }
  }, [isSearchOpen])

  const [searchBoxStyle, setSearchBoxStyle] = useState<{
    backgroundColor: string
    borderColor: string
  }>({
    backgroundColor: theme.color.primary.darkBlue,
    borderColor: theme.color.primary.darkBlue,
  })

  useEffect(() => {
    if (!isBelowFold) {
      setSearchBoxStyle({
        backgroundColor: theme.color.primary.darkBlue,
        borderColor: theme.color.primary.darkBlue,
      })
    } else {
      setSearchBoxStyle({
        backgroundColor: theme.color.primary.blue,
        borderColor: theme.color.primary.blue,
      })
    }
  }, [])

  return (
    <Row className={`${isResults ? 'py-3' : ''} mx-0`}>
      <div className="col-12 d-flex justify-content-center">
        <p></p>
        <StyledSearchBox>
          <form
            className="w-100"
            onSubmit={submitHandler}
            data-testid={`${id}-simple-search-form`}
          >
            <div className="input-group">
              <label htmlFor={id} className="d-none">
                Search Input Box
              </label>
              {/* If it is the results page, return input with value property */}
              <input
                id={id}
                type="text"
                className="form-control ypm-search"
                placeholder="Search the Collections..."
                // placeholder={ibf}
                onChange={handleInputChange}
                ref={inputRef}
                tabIndex={isUnselectable ? -1 : 0}
                value={currentState.value !== null ? currentState.value : ''}
                data-testid={`${id}-search-submit-input`}
              />
              <div className="input-group-append submitButtonDiv">
                <button
                  disabled={!validateInput()}
                  type="submit"
                  className="btn submitButton"
                  aria-label="submit search input"
                  data-testid={`${id}-search-submit-button`}
                  style={buttonStyle}
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <React.Fragment>
                      {/* <i className="bi bi-search search-icon" /> */}
                      <SearchImg alt="Open Search" src={searchIcon} />
                    </React.Fragment>
                  )}
                </button>
              </div>
            </div>
          </form>
        </StyledSearchBox>
      </div>
    </Row>
  )
}

export default SearchBox
