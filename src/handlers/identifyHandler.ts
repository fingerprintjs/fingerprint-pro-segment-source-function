import { FPJSSegmentIntegrationBody, MaybeNullOrUndefined as NullOrUn } from '../types'
import { SegmentSpecIdentify } from '../types/segment/specs/identify'
import '../types/segment'
import { SegmentSpecWithUserId } from '../types/segment/utils/id'

export function handleIdentify(
  identify: SegmentSpecIdentify,
  userId: NullOrUn<SegmentSpecWithUserId['userId']>,
  body: FPJSSegmentIntegrationBody
) {
  try {
    Segment.identify({
      ...identify,
      anonymousId: body.visitorId,
      userId,
      traits: {
        ...identify?.traits,
        visitorId: body.visitorId,
        createdAt: body.firstSeenAt.subscription,
      },
    })
  } catch (e) {
    // do nothing
  }
}
