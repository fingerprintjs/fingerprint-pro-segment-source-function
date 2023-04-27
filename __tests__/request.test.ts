import onRequest from '../src'
import { fingerprintWebhookVisit, mockRequest, mockRequestWithNoPayload } from './mock'
import { handleRequest } from '../src/handlers/requestHandler'
import { handleIdentify } from '../src/handlers/identifyHandler'
import * as request from '../src/handlers/requestHandler'
import { handlePage } from '../src/handlers/pageHandler'
import { handleTrack } from '../src/handlers/trackHandler'
import { handleGroup } from '../src/handlers/groupHandler'

const contains = expect.objectContaining

beforeAll(() => {
  jest.spyOn(request, 'handleRequest')
})

describe('onRequest', () => {
  it('should skip integration', () => {
    onRequest(mockRequest({ skipIntegration: true }))
    expect(handleRequest).toHaveBeenCalled()
    expect(Segment.identify).not.toHaveBeenCalled()
  })
  it('should return visitorId & userId', () => {
    const userId = 'test'
    onRequest(mockRequest({ skipIntegration: false, identify: { userId } }))
    expect(handleRequest).toHaveBeenCalled()
    expect(handleIdentify).toHaveBeenCalled()
    expect(Segment.identify).toHaveBeenCalledWith(contains({ userId, anonymousId: fingerprintWebhookVisit.visitorId }))
  })
  it('should not run if no payload', () => {
    onRequest(mockRequestWithNoPayload())
    expect(handleRequest).toHaveBeenCalled()
    expect(handleIdentify).not.toHaveBeenCalled()
    expect(handlePage).not.toHaveBeenCalled()
    expect(handleTrack).not.toHaveBeenCalled()
    expect(handleGroup).not.toHaveBeenCalled()
  })
})
