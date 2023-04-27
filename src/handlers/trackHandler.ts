import { FPJSSegmentIntegrationBody, MaybeNullOrUndefined, MaybeNullOrUndefined as NullOrUn } from '../types'
import { SegmentSpecTrack } from '../types/segment/specs/track'
import '../types/segment'
import { SegmentSpecWithUserId } from '../types/segment/utils/id'

export function handleTrack(
  track: MaybeNullOrUndefined<SegmentSpecTrack>,
  userId: NullOrUn<SegmentSpecWithUserId['userId']>,
  body: FPJSSegmentIntegrationBody
) {
  if (!track) {
    return
  }

  try {
    Segment.track({
      ...track,
      userId,
      anonymousId: body.visitorId,
    })
  } catch (e) {
    // do nothing
  }
}
