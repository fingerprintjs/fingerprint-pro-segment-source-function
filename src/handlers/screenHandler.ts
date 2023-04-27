import { FPJSSegmentIntegrationBody, MaybeNullOrUndefined as NullOrUn } from '../types'
import { SegmentSpecScreen } from '../types/segment/specs/screen'
import '../types/segment'
import { SegmentSpecWithUserId } from '../types/segment/utils/id'

export function handleScreen(
  screen: NullOrUn<SegmentSpecScreen>,
  userId: NullOrUn<SegmentSpecWithUserId['userId']>,
  body: FPJSSegmentIntegrationBody
) {
  if (!screen) {
    return
  }

  Segment.screen({
    ...screen,
    userId,
    anonymousId: body.visitorId,
  })
}
