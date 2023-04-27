import { FPJSSegmentIntegrationBody, MaybeNullOrUndefined as NullOrUn } from '../types'
import { SegmentSpecPage } from '../types/segment/specs/page'
import '../types/segment'
import { SegmentSpecWithUserId } from '../types/segment/utils/id'

export function handlePage(
  page: NullOrUn<SegmentSpecPage<{}, { context?: object }>>,
  userId: NullOrUn<SegmentSpecWithUserId['userId']>,
  body: FPJSSegmentIntegrationBody
) {
  if (!page) {
    return
  }
  try {
    Segment.page({
      ...page,
      anonymousId: body.visitorId,
      userId,
      context: {
        ip: body.ip,
        browserDetails: body.browserDetails,
        incognito: body.incognito,
        confidenceScore: body.confidence?.score,
        requestId: body.requestId,
        ...page?.context,
      },
      properties: {
        url: body.url,
        ...page?.properties,
      },
    })
  } catch (e) {
    // do nothing
  }
}
