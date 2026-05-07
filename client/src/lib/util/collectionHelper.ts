/* eslint-disable @typescript-eslint/no-explicit-any */
import IEntity from '../../types/data/IEntity'
import EntityParser from '../parse/data/EntityParser'

import { fetchWithToken } from './fetchWithToken'

function transformPath(uri: string): string {
  return uri.replace('/view/', '/data/')
}

export function getMemberOfUris(entity: IEntity): Array<string> {
  const record = new EntityParser(entity)
  return record.getMemberOf()
}

export const fetchCollection = (
  entityId: string,
  aatClassification: string,
): Promise<any> =>
  fetchWithToken(transformPath(entityId))
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          const parser = new EntityParser(data)
          if (parser.isClassifiedAs(aatClassification)) {
            return parser.json.id
          }
          return null
        })
      }
      return null
    })
    .catch(
      () =>
        new Error('An error occurred while retreiving data for collections.'),
    )

export function getCollections(
  entity: IEntity,
  aatClassification: string,
): any {
  const memberOf = getMemberOfUris(entity)
  const promises = memberOf.map((id) => fetchCollection(id, aatClassification))
  return Promise.all(promises).then((result) => ({ data: result }))
}


// EDIT : Deprecated : Moved to its own component file to correctly render sanitized HTML strings 
// (features/common/FormattedDisplayName.tsx) - AM
export function formatScientificName(text: string): string {
  // Custom function - AM
  // Format text string to display proper scientific binomial nomenclature (species / scientific names)
  // can handle sp., ssp. or variations
  // Searches [Upper/Lower]Word + space + [Lower]Word
  // const binomialRegex = /\b([A-Z][a-z]+)\s+([a-z]+)\b/g;
  // const binomialRegex = /\b([A-Z](?:[a-z]+|\.))\s+([a-z]+)(?:\s+(s?sp\.))?\b/g;
  // const binomialRegex = /\b([A-Z](?:[a-z]+|\.))\s+([a-z]+)(?:\s+(s?sp\.))?\b/g;
  // const binomialRegex = /\b([A-Z](?:[a-z]+|\.))\s+(?!(?:s?sp\.))([a-z]+)(?:\s+(?!(?:s?sp\.))([a-z]+))?(?:\s+(s?sp\.))?\b/g;
  const binomialRegex = /\b([A-Z](?:[a-z]+|\.))(?:\s+(?!(?:s?sp\.))([a-z]+))?(?:\s+(s?sp\.))?\b/g;

  const formatted = text.replace(binomialRegex, (match, genus, species, subspecies, marker) => {
    // Start italics with Genus
    let italicPart = `<i>${genus}`;
    
    // Add species if it exists (and it won't be "sp." because of our regex)
    if (species) italicPart += ` ${species}`;
    
    // Add subspecies if it exists
    if (subspecies) italicPart += ` ${subspecies}`;
    
    italicPart += `</i>`;

    // Add the marker outside the italics
    return marker ? `${italicPart} ${marker}` : italicPart;
  });
  return formatted;
}
