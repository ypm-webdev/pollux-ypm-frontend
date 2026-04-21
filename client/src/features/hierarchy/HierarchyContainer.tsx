import React, { useRef, useEffect, useState, type JSX } from 'react'
import { Col, Row } from 'react-bootstrap'

import config from '../../config/config'
import IEntity from '../../types/data/IEntity'
import {
  useGetItemsQuery,
  useGetSearchRelationshipQuery,
} from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import { getParentData } from '../../lib/util/hierarchyHelpers'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import ILinks from '../../types/data/ILinks'
import { IHalLink } from '../../types/IHalLink'
import { ISearchResults } from '../../types/ISearchResults'
import IPlace from '../../types/data/IPlace'
import IConcept from '../../types/data/IConcept'
import { useAppSelector } from '../../app/hooks'
import { IHierarchy } from '../../redux/slices/hierarchySlice'

import ListContainer from './ListContainer'
import MoreLessButton from './MoreLessButton'

interface IProps {
  entity: IPlace | IConcept
  id: string
  // a function to get the next (parent) entity in the hierarchy
  getNextEntityUri: (entity: IEntity) => Array<string>
  halLink: IHalLink
  linkFilter?: (entity: IEntity) => boolean
  maxLength: number
  getParentUris: (entity: IPlace | IConcept) => Array<string>
}

const getHalLink = (
  links: ILinks | undefined,
  halLink: IHalLink,
): string | null => {
  if (links === undefined) {
    return null
  }

  const { searchTag } = halLink
  if (links.hasOwnProperty(searchTag)) {
    return links[searchTag].href
  }

  return null
}

const HierarchyContainer: React.FC<IProps> = ({
  entity,
  halLink,
  getParentUris,
  getNextEntityUri,
  linkFilter,
  maxLength,
}) => {
  const currentState = useAppSelector(
    (hierarchyState) => hierarchyState.hierarchy as IHierarchy,
  )
  const hierarchyRef = useRef<HTMLDivElement>(null)
  const childrenUri = getHalLink(entity._links, halLink)

  // replace shallow parent URI fetch with deeper hierarchical query (used in GenericBreadcrumbHierarchy.tsx)
  const parents = getParentUris(entity)
  const [done, setDone] = useState(false)
  const [entities, setEntities] = useState([entity])

  // useEffect(() => {
  //   // Reset done and entities when props.entity changes.
  //   // Otherwise the state remains the same when the component is
  //   // refreshed under new react route.
  //   setDone(false)
  //   setEntities([entity])
  // }, [entity])

  // const uris = getNextEntityUri(entities[0])
  // const skipP = uris.length > 0 ? false : true

  // const { dataP, isSuccessP, isErrorP, isLoadingP } = useGetItemsQuery(
  //   {
  //     uris,
  //     profile: 'results',
  //   },
  //   {
  //     skipP,
  //   },
  // )

  // Add the returned data to the current list of parents/entities and set done to true to stop retrieving items
  // if (isSuccessP && !done) {
  //   const entityAsParent = getParentData(dataP, linkFilter)
  //   // Determine if the parent has ancestors
  //   console.log("entity has parents: ", entityAsParent)
  //   if (
  //     entityAsParent === null ||
  //     getNextEntityUri(entityAsParent).length === 0 ||
  //     entities.length > maxLength
  //   ) {
  //     setDone(true)
  //   }

  //   if (entityAsParent !== null) {
  //     setEntities([entityAsParent, ...entities])
  //   }
  // }

  // use this block to query child entities
  const skip = childrenUri === null
  const { data, isSuccess, isError, isLoading } = useGetSearchRelationshipQuery(
    {
      uri: childrenUri!,
    },
    {
      skip,
    },
  )

  if (isError) {
    console.log(
      'An error occurred retrieving the children of the current entity.',
    )
  }

  if (skip && parents.length === 0) {
    return null
  }

  // console.log("parents: ", parents, "ancestors:", entities, "descendants: ", (data as ISearchResults))

  if ((isSuccess && data) || skip) {
    return (
      <StyledEntityPageSection
        className="hierarchyContainer p-4"
        ref={hierarchyRef}
        data-testid="explore-the-hierarchy"
      >
        <Row>
          <Col xs={12}>
            <h2>Explore</h2>
          </Col>
        </Row>
        <ListContainer
          parents={parents}
          descendents={(data as ISearchResults) || {}}
          currentEntity={entity}
        >
          {parents.length > currentState.defaultDisplayLength && (
            <MoreLessButton
              parentsArrayLength={parents.length}
              displayLength={currentState.currentPageLength}
            />
          )}
        </ListContainer>
      </StyledEntityPageSection>
    )
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  return null
}

export default HierarchyContainer
