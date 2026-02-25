export interface ILandingPage {
  type: string

  attributes: {
    field_what_is_lu: string
    field_more_about_lux: string
    field_footer_blocks: string[]
  }
}

const moreAboutLuxButton = "<p><a role='button' tabindex='0' href='https://lux.collections.yale.edu/content/about-lux' className='btn btn-primary'>More Info - LUX</a></p>"

export class LandingPageParser {
  content: ILandingPage

  constructor(content: ILandingPage) {
    this.content = content
  }

  getWhatIsLux(): string {
    return this.content.attributes.field_what_is_lu
  }

  getMoreAboutLux(): string {
    let hardcodedText = this.content.attributes.field_more_about_lux
      .split('</p>')
      .join('</p><p>' + this.getPeabodyLuxRelationship() + '</p>')
    // return this.content.attributes.field_more_about_lux
    return hardcodedText
  }

  getNumbersDisclaimer(): string {
    return "These figures are updated on a regular basis.  The records contained in this online catalog are a part of <a href='https://lux.collections.yale.edu' target='_blank'>LUX: Yale Collections Discovery</a>. This website features a limited data set with additional search functionality, collection-building tools, and specialized data displays. <br /><br /><em>* Note: The total number of objects and specimens in the Yale Peabody Museum collections database does not always equal the number of object records reflected in this online catalog.</em><br /><br /><strong>TODO: This entire text section must come from Drupal CMS</strong>"
  }

  getFooterBlocks(): string[] {
    return this.content.attributes.field_footer_blocks
  }

  getPeabodyLuxRelationship(): string {
    return "All of the Yale Peabody Museum's catalogued collections records are represented in <a href='https://lux.collections.yale.edu' target='_blank'>LUX</a>, enabling users to search across Yale’s museums, archives, and library collections. This includes works of art, archives, scientific specimens, and other cultural heritage items held at the  University. This transformative service enables users to identify, access, and engage with items of interest within Yale’s physical and  digital collections. It also uncovers relationships among items, inviting users to explore additional materials across collections.<br /><br /><strong>TODO: The previous paragraph must come from Drupal CMS</strong>"
  }
}
