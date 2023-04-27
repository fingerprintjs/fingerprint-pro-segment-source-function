import { handleIdentify } from './identifyHandler'
import { handlePage } from './pageHandler'
import { handleTrack } from './trackHandler'
import { handleGroup } from './groupHandler'
import { FPJSSegmentIntegrationBody } from '../types'
import { SegmentSourceRequest } from '../types/segment/request'

export function handleRequest(request: SegmentSourceRequest) {
  const body = request.json()
  const { tag } = body as FPJSSegmentIntegrationBody
  const payload = tag?.integrations?.segment
  if (!payload) {
    return
  }

  if (payload.skipIntegration) {
    return
  }

  const { identify, page, track, group } = payload
  const userId = identify?.userId

  handleIdentify(identify, userId, body)
  handlePage(page, userId, body)
  handleTrack(track, userId, body)
  handleGroup(group, userId, body)
  // uncomment below when mobile is supported
  // handleScreen(screen, userId, body)
}
