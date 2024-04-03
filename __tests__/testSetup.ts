import * as identify from '../src/handlers/identifyHandler'
import * as group from '../src/handlers/groupHandler'
import * as track from '../src/handlers/trackHandler'
import * as page from '../src/handlers/pageHandler'
import * as screen from '../src/handlers/screenHandler'

function setupSegment() {
  Object.defineProperty(globalThis, 'Segment', {
    value: {
      identify: jest.fn(() => null),
      group: jest.fn(() => null),
      track: jest.fn(() => null),
      page: jest.fn(() => null),
    },
  })
  jest.spyOn(Segment, 'identify')
  jest.spyOn(Segment, 'group')
  jest.spyOn(Segment, 'track')
  jest.spyOn(Segment, 'page')
  jest.spyOn(identify, 'handleIdentify')
  jest.spyOn(group, 'handleGroup')
  jest.spyOn(page, 'handlePage')
  jest.spyOn(track, 'handleTrack')
  jest.spyOn(screen, 'handleScreen')
}

beforeAll(() => {
  setupSegment()
})

beforeEach(() => {
  jest.clearAllMocks()
})
