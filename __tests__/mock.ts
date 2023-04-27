import { SegmentSourceRequest } from '../src/types/segment/request'

export const commonSpecs: ['identify', 'page', 'screen'] = ['identify', 'page', 'screen']

export const fingerprintWebhookVisit = {
  visitorId: 'OX6kx8',
  requestId: '1654815516083.OX6kx8',
  browserDetails: {
    browserName: 'Chrome',
    browserMajorVersion: '101',
    browserFullVersion: '101.0.4951',
    os: 'Windows',
    osVersion: '10',
    device: 'Other',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36',
  },
  incognito: false,
  ip: '8.8.8.8',
  ipLocation: {
    accuracyRadius: 1000,
    latitude: 37.75,
    longitude: -97.82,
    timezone: 'America/Chicago',
    country: {
      code: 'US',
      name: 'United States',
    },
    continent: {
      code: 'NA',
      name: 'North America',
    },
  },
  timestamp: 1654815516086,
  time: '2022-06-09T22:58:36Z',
  url: 'https://some.website/path?query=params',
  confidence: { score: 1 },
  visitorFound: true,
  firstSeenAt: {
    global: '2022-05-05T18:28:54.535Z',
    subscription: '2022-06-09T22:58:05.576Z',
  },
  lastSeenAt: {
    global: '2022-05-05T18:28:54.535Z',
    subscription: '2022-06-09T22:58:05.576Z',
  },
}

export function mockRequest(segmentBody: {} | null = {}, fingerprintBody = {}): SegmentSourceRequest {
  return {
    json(): any {
      return {
        ...fingerprintWebhookVisit,
        ...fingerprintBody,
        tag: {
          integrations: {
            segment: {
              ...segmentBody,
            },
          },
        },
      }
    },
    url: new URL('http://localhost'),
    text(): string {
      return JSON.stringify({
        ...fingerprintBody,
        tag: {
          integrations: {
            segment: {
              ...segmentBody,
            },
          },
        },
      })
    },
    headers: new Headers(),
  }
}

export function mockRequestWithNoPayload() {
  return {
    json(): any {
      return {}
    },
    url: new URL('http://localhost'),
    text(): string {
      return ''
    },
    headers: new Headers(),
  }
}
