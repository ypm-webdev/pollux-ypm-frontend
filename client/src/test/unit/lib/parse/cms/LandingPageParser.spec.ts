import {
  ILandingPage,
  LandingPageParser,
} from '../../../../../lib/parse/cms/LandingPageParser'

const mockLandingPageData: ILandingPage = {
  type: 'type',
  attributes: {
    field_what_is_lu: {
      value: 'field_what_is_lu',
      format: 'basic_html',
      processed: 'field_what_is_lu',
    },
    field_more_about_lux: {
      value: 'field_more_about_lux',
      format: 'basic_html',
      processed: 'field_more_about_lux',
    },
    field_footer_blocks: [
      {
        value: 'block1',
        format: 'basic_html',
        processed: 'block1',
      },
      {
        value: 'block2',
        format: 'basic_html',
        processed: 'block2',
      },
    ],
  },
}

describe('LandingPageParser', () => {
  describe('getWhatIsLux', () => {
    it('returns object containing hero image data', () => {
      const parser = new LandingPageParser(mockLandingPageData)
      expect(parser.getWhatIsLux()).toEqual('field_what_is_lu')
    })
  })

  describe('getMoreAboutLux', () => {
    it('returns object containing hero image data', () => {
      const parser = new LandingPageParser(mockLandingPageData)
      expect(parser.getMoreAboutLux()).toEqual('field_more_about_lux')
    })
  })

  describe('getFooterBlocks', () => {
    it('returns object containing hero image data', () => {
      const parser = new LandingPageParser(mockLandingPageData)
      expect(parser.getFooterBlocks()).toEqual(['field_footer_blocks'])
    })
  })
})
