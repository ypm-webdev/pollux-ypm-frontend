import { createApi } from '@reduxjs/toolkit/query/react'

import { OverlayKey, overlays, PageKey, pagePaths } from '../../config/cms'
import { ICmsResponse } from '../../lib/parse/cms/Parser'
import { ICmsResponse as IFeaturedCollectionsResponse } from '../../lib/parse/cms/FeaturedCollectionParser'
import { getCmsApiBaseUrl } from '../../config/config'

import { baseQuery } from './baseQuery'
import { ICmsPage } from './returnTypes'

export interface IPageInput {
  [key: string]: PageKey
  pageKey: PageKey
}

export interface IResultsPageOverlay {
  overlay: OverlayKey
}

export interface IFaq {
  attributes: {
    title: string
    body: string
    field_faq_tag: string | Array<string>
    field_sort_weight: number
  }
}

export interface IFaqsResponse {
  data: IFaq[]
}

export const cmsApi = createApi({
  reducerPath: 'cmsApi',
  baseQuery: baseQuery(getCmsApiBaseUrl),
  tagTypes: [],
  endpoints: (builder) => ({
    getFaq: builder.query<IFaqsResponse, void>({
      query: () => ({
        url: 'node/faq?page[limit]=100',
        method: 'GET',
      }),
    }),
    getFeaturedCollections: builder.query<IFeaturedCollectionsResponse, void>({
      query: () => ({
        url: 'node/ypm_landing_featured_block?page[limit]=100',
        method: 'GET',
      }),
    }),
    getLandingPage: builder.query<ICmsResponse, void>({
      query: () => ({
        url: 'node/ypm_landing_page',
        method: 'GET',
      }),
    }),
    getLandingPageImages: builder.query<ICmsResponse, void>({
      query: () => ({
        url: 'node/landing_page_image?page[limit]=100',
        method: 'GET',
      }),
    }),
    getPage: builder.query<ICmsPage, IPageInput>({
      query: (params) => ({
        url: pagePaths[params.pageKey],
        method: 'GET',
      }),
    }),
    getDescriptiveText: builder.query<ICmsPage, IResultsPageOverlay>({
      query: (params) => ({
        url: overlays[params.overlay],
        method: 'GET',
      }),
    }),
    getAllDescriptiveTexts: builder.query<Record<OverlayKey, string>, void>({
      queryFn: async () => {
        try {
          const keys: OverlayKey[] = [
            'objects',
            'works',
            'collections',
            'peopleAndOrgs',
            'places',
            'conceptsAndGroupings',
            'events',
          ]
          const results: Record<OverlayKey, string> = {} as Record<OverlayKey, string>
          
          // Fetch all descriptive texts in parallel
          const responses = await Promise.all(
            keys.map(async (key) => {
              const response = await fetch(`${getCmsApiBaseUrl()}${overlays[key]}`)
              const data = await response.json()
              return { key, data }
            })
          )
          
          responses.forEach(({ key, data }) => {
            if (data?.data?.attributes?.body) {
              results[key] = data.data.attributes.body
            } else {
              results[key] = ''
            }
          })
          
          return { data: results }
        } catch (error) {
          return { error: { status: 500, data: 'Failed to fetch descriptive texts' } }
        }
      },
    }),
  }),
})

export const {
  useGetFaqQuery,
  useGetFeaturedCollectionsQuery,
  useGetLandingPageQuery,
  useGetLandingPageImagesQuery,
  useGetPageQuery,
  useGetDescriptiveTextQuery,
  useGetAllDescriptiveTextsQuery,
} = cmsApi
