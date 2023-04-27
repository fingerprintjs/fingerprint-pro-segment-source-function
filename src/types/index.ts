import { SegmentSpecIdentify } from './segment/specs/identify'
import { FingerprintIdentifyTraits } from './fingerprint/specs/identify'
import { SegmentSpecTrack } from './segment/specs/track'
import { SegmentSpecGroup } from './segment/specs/group'
import { SegmentSpecScreen } from './segment/specs/screen'
import { SegmentSpecPage } from './segment/specs/page'
import { WebhookVisit } from './fingerprint/webhook'
import { SegmentSpecWithAnonymousId, SegmentSpecWithUserId } from './segment/utils/id'

export type MaybeNullOrUndefined<T> = T | null | undefined
type MaybeNullOrUndefinedValues<T> = { [K in keyof T]: MaybeNullOrUndefined<T[K]> }

interface FPJSSegmentIntegrationPayload {
  skipIntegration: boolean
  identify: SegmentSpecIdentify<
    FingerprintIdentifyTraits,
    MaybeNullOrUndefinedValues<SegmentSpecWithUserId & SegmentSpecWithAnonymousId>
  >
  track?: SegmentSpecTrack
  group?: SegmentSpecGroup
  screen?: SegmentSpecScreen
  page?: SegmentSpecPage
}

interface FPJSTagPayload {
  integrations?: {
    segment?: FPJSSegmentIntegrationPayload
    [key: string]: unknown
  }
}

export type FPJSSegmentIntegrationBody = WebhookVisit & { tag: FPJSTagPayload }
