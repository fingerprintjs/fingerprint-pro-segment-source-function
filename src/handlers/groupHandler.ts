import { FPJSSegmentIntegrationBody, MaybeNullOrUndefined as NullOrUn } from '../types'
import { SegmentSpecGroup } from '../types/segment/specs/group'
import '../types/segment'
import { SegmentSpecWithUserId } from '../types/segment/utils/id'

export function handleGroup(
  group: NullOrUn<SegmentSpecGroup>,
  userId: NullOrUn<SegmentSpecWithUserId['userId']>,
  body: FPJSSegmentIntegrationBody
) {
  if (!group) {
    return
  }

  try {
    Segment.group({
      ...group,
      userId,
      anonymousId: body.visitorId,
    })
  } catch (e) {
    console.log('error:groupHandler', e)
  }
}
