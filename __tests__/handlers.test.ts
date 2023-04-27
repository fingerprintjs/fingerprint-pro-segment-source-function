import { handleRequest } from '../src/handlers/requestHandler'
import { fingerprintWebhookVisit, mockRequest } from './mock'
import { handleIdentify } from '../src/handlers/identifyHandler'
import { handlePage } from '../src/handlers/pageHandler'
import { handleGroup } from '../src/handlers/groupHandler'
import { handleTrack } from '../src/handlers/trackHandler'
import { handleScreen } from '../src/handlers/screenHandler'

const contains = expect.objectContaining

describe('Integration', () => {
  it('should skip integration', () => {
    handleRequest(mockRequest({ skipIntegration: true }))
    expect(handleIdentify).not.toHaveBeenCalled()
    expect(Segment.identify).not.toHaveBeenCalled()
  })
})

describe('handleIdentify', () => {
  it('should called with no visitorId or anonymousId', () => {
    handleRequest(mockRequest({ skipIntegration: false }, { visitorId: undefined }))
    expect(handleIdentify).toHaveBeenCalledWith(undefined, undefined, contains({ visitorId: undefined }))
    expect(Segment.identify).toHaveBeenCalledWith(contains({ userId: undefined, anonymousId: undefined }))
  })
  it('should have called with userId & visitorId', () => {
    handleRequest(mockRequest({ skipIntegration: false, identify: { userId: 'testUserId' } }))
    expect(handleIdentify).toHaveBeenCalledWith(
      contains({ userId: 'testUserId' }),
      'testUserId',
      contains({ visitorId: fingerprintWebhookVisit.visitorId })
    )
    expect(Segment.identify).toHaveBeenCalledWith(
      contains({ userId: 'testUserId', anonymousId: fingerprintWebhookVisit.visitorId })
    )
  })
  it('should have called with traits', () => {
    const name = 'Fingerprint Support'
    handleRequest(mockRequest({ skipIntegration: false, identify: { traits: { name } } }))
    expect(handleIdentify).toHaveBeenCalledWith(
      contains({ traits: { name } }),
      undefined,
      contains({ visitorId: fingerprintWebhookVisit.visitorId })
    )
    expect(Segment.identify).toHaveBeenCalledWith(
      contains({
        anonymousId: fingerprintWebhookVisit.visitorId,
        traits: contains({ name }),
      })
    )
  })
})

describe('handlePage', () => {
  it('should have visitorId', () => {
    handleRequest(mockRequest({ page: { name: 'Test' } }))
    expect(Segment.identify).toHaveBeenCalledWith(
      contains({
        anonymousId: fingerprintWebhookVisit.visitorId,
      })
    )
  })
  it('should called with page title', () => {
    const name = 'Update Password'
    handleRequest(mockRequest({ skipIntegration: false, page: { name } }))
    expect(handlePage).toHaveBeenCalledWith(
      contains({ name }),
      undefined,
      contains({
        tag: contains({
          integrations: contains({
            segment: contains({
              page: contains({
                name,
              }),
            }),
          }),
        }),
      })
    )
    expect(Segment.page).toHaveBeenCalledWith(
      contains({
        name,
      })
    )
  })
  it('should have ip address', () => {
    handleRequest(mockRequest({ page: { name: 'Test' } }))
    expect(Segment.page).toHaveBeenCalledWith(
      contains({
        context: contains({
          ip: fingerprintWebhookVisit.ip,
        }),
      })
    )
  })
  it('should have url', () => {
    handleRequest(mockRequest({ page: { name: 'Test' } }))
    expect(Segment.page).toHaveBeenCalledWith(
      contains({
        properties: contains({
          url: fingerprintWebhookVisit.url,
        }),
      })
    )
  })
  it('should not run page if not specified', () => {
    handleRequest(mockRequest())
    expect(handlePage).toHaveBeenCalled()
    expect(Segment.page).not.toHaveBeenCalled()
  })
})

describe('handleGroup', () => {
  it('should have groupId', () => {
    const groupId = 'test'
    handleRequest(mockRequest({ group: { groupId } }))
    expect(handleGroup).toHaveBeenCalledWith(
      contains({ groupId }),
      undefined,
      contains({
        tag: contains({
          integrations: contains({
            segment: contains({
              group: contains({
                groupId,
              }),
            }),
          }),
        }),
      })
    )
    expect(Segment.group).toHaveBeenCalledWith(
      contains({
        groupId,
      })
    )
  })
  it('should have visitorId', () => {
    handleRequest(mockRequest({ group: { groupId: 'Test' } }))
    expect(Segment.identify).toHaveBeenCalledWith(
      contains({
        anonymousId: fingerprintWebhookVisit.visitorId,
      })
    )
  })
  it('should not run group if not specified', () => {
    handleRequest(mockRequest())
    expect(handleGroup).toHaveBeenCalled()
    expect(Segment.group).not.toHaveBeenCalled()
  })
})

describe('handleTrack', () => {
  it('should have event', () => {
    const event = 'test'
    handleRequest(mockRequest({ track: { event } }))
    expect(handleTrack).toHaveBeenCalledWith(
      contains({ event }),
      undefined,
      contains({
        tag: contains({
          integrations: contains({
            segment: contains({
              track: contains({
                event,
              }),
            }),
          }),
        }),
      })
    )
    expect(Segment.track).toHaveBeenCalledWith(
      contains({
        event,
      })
    )
  })
  it('should have visitorId', () => {
    handleRequest(mockRequest({ track: { event: 'Test' } }))
    expect(Segment.identify).toHaveBeenCalledWith(
      contains({
        anonymousId: fingerprintWebhookVisit.visitorId,
      })
    )
  })
  it('should not run track if not specified', () => {
    handleRequest(mockRequest())
    expect(handleTrack).toHaveBeenCalled()
    expect(Segment.track).not.toHaveBeenCalled()
  })
})

describe('handleScreen', () => {
  it('should not run until enabled', () => {
    handleRequest(mockRequest({ screen: { name: 'Test' } }))
    expect(handleScreen).not.toHaveBeenCalled()
  })
})
