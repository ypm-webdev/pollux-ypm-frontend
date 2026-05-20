export interface ILandingPage {
  type: string

  attributes: {
    field_what_is_lu: { value: string; format: string; processed: string }
    field_more_about_lux: { value: string; format: string; processed: string }
    field_footer_blocks: { value: string; format: string; processed: string }[]
  }
}

const moreAboutLuxButton = "<p><a role='button' tabindex='0' href='https://lux.collections.yale.edu/content/about-lux' className='btn btn-primary'>More Info - LUX</a></p>"

export class LandingPageParser {
  content: ILandingPage

  constructor(content: ILandingPage) {
    this.content = content
  }

  getWhatIsLux(): string {
    return this.content.attributes.field_what_is_lu.value
  }

  getMoreAboutLux(): string {
    return this.content.attributes.field_more_about_lux.value
  }

  getNumbersDisclaimer(): string {
    return "<p>These figures are updated on a regular basis.  The records contained in this online catalog are a part of <a href='https://lux.collections.yale.edu' target='_blank'>LUX: Yale Collections Discovery</a>. This website features a limited data set with additional search functionality, collection-building tools, and specialized data displays. <br /><br /><em>* Note: The total number of objects and specimens in the Yale Peabody Museum collections database does not always equal the number of object records reflected in this online catalog.</em></p>"
  }

  getFooterBlocks(): string[] {
    return this.content.attributes.field_footer_blocks.map((block) => block.value)
  }

  getPeabodyLuxRelationship(): string {
    return "<p>All of the Yale Peabody Museum's catalogued collections records are represented in <a href='https://lux.collections.yale.edu' target='_blank'>LUX</a>, enabling users to search across Yale&apos;s museums, archives, and library collections. This includes works of art, archives, scientific specimens, and other cultural heritage items held at the  University. This transformative service enables users to identify, access, and engage with items of interest within Yale&apos;s physical and  digital collections. It also uncovers relationships among items, inviting users to explore additional materials across collections.</p>"
  }
}
