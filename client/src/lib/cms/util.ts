import { UnitCode, YpmDivisionsFeaturedAll } from '../../config/cms'

/**
 * Returns a list of 4 "random" "distinct" unit codes, such that
 * the first element is used for picking a hero image
 * and the rest for picking featured collection contents.
 */
export const pickRandomUnits = (): UnitCode[] => {
  const candidates = [UnitCode.YCBA, UnitCode.YPM, UnitCode.YUAG, UnitCode.YUL]
  let index = Math.floor(Math.random() * candidates.length)
  let result: UnitCode[] = [...candidates.splice(index, 1)]

  // UnitCode.ALL is relevant only for featured collections
  candidates.push(UnitCode.ALL)

  for (let i = 0; i < 3; i += 1) {
    index = Math.floor(Math.random() * candidates.length)
    result = [...result, ...candidates.splice(index, 1)]
  }

  return result
}

/**
 * Returns a list of 4 unit codes of YPM only, such that
 * the first element is used for picking a hero image
 * and the rest for picking featured collection contents.
 */

export const pickYpmFeatured = (): UnitCode[] => {
  const candidates = [UnitCode.YPM]
  // let index = Math.floor(Math.random() * candidates.length)
  // let result: UnitCode[] = [...candidates.splice(index, 1)]
  let result: UnitCode[] = []
  for (let i = 0; i < 4; i += 1) {
    // index = Math.floor(Math.random() * candidates.length)
    // result = [...result, ...candidates.splice(index, 1)]
    result.push(candidates[0])
  }

  return result
}

export const allYpmDivisions = (): UnitCode[] => {
  const candidates = [UnitCode.YPM]
  // let index = Math.floor(Math.random() * candidates.length)
  // let result: UnitCode[] = [...candidates.splice(index, 1)]
  let result: UnitCode[] = []
  for (let i = 0; i < 13; i += 1) {
    // index = Math.floor(Math.random() * candidates.length)
    // result = [...result, ...candidates.splice(index, 1)]
    result.push(candidates[0])
  }

  return result
}
