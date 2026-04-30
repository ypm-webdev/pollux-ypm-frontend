import { UnitCode, unitCodeFromNumString } from '../../../config/cms'

export interface ICmsResponse {
  data: ICmsData[] | { [key: string]: ICmsData }
}

export interface ICmsData {
  id: string
  attributes: {
    title: string
    body: { value: string; format: string; processed: string }
    field_iiif_image: {
      uri: string
      title: string
    }
    field_url_path: string
    field_chit_unit?: string[]
  }
  relationships?: {
    field_featured_image?: {
      data: {
        id: string
        meta: {
          alt: string
        }
      }
    }
  }
}

export interface ICollection {
  imageUrl: string
  imageAlt: string
  title: string
  bodyHtml: string
  searchUrl: string
}

const selectCollection = (
  unit: UnitCode,
  candidates: ICmsData[],
): [ICollection, ICmsData[]] => {
  let items = candidates.filter(
    (item) =>
      item.attributes.field_chit_unit && 
      unitCodeFromNumString(item.attributes.field_chit_unit[0]) === unit,
  )

  // In case there's no items available for the requested unit,
  // just pick any.
  if (items.length === 0) {
    items = candidates
  }

  const numItems = items.length
  const chosenIndex = Math.floor(Math.random() * numItems)
  const item = items[chosenIndex]
  const attr = item.attributes
  const imageUrl = attr.field_iiif_image.uri
  const imageAlt = attr.field_iiif_image.title
  const remaining = candidates.filter((c) => c.id !== item.id)

  return [
    {
      imageUrl,
      imageAlt,
      title: attr.title,
      bodyHtml: typeof attr.body === 'string' ? attr.body : attr.body.value,
      searchUrl: attr.field_url_path,
    },
    remaining,
  ]
}

export class FeaturedCollectionParser {
  data: ICmsData[]

  constructor(json: ICmsResponse) {
    // Handle data being either an array or an object with numeric keys
    if (Array.isArray(json.data)) {
      this.data = json.data
    } else {
      this.data = Object.values(json.data)
    }
  }

  getCollections(units: UnitCode[]): ICollection[] {
    const colls: ICollection[] = []
    let candidates = this.data

    for (let i = 0; i < 3; i += 1) {
      ;[colls[i], candidates] = selectCollection(units[i], candidates)
    }
    return colls
  }

  getCollectionsAll(units: UnitCode[]): ICollection[] {
    const colls: ICollection[] = []
    let candidates = this.data

    for (let i = 0; i < 14; i += 1) {
      ;[colls[i], candidates] = selectCollection(units[i], candidates)
    }
    return colls
  }
}
