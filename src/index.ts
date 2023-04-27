import { handleRequest } from './handlers/requestHandler'
import { SegmentSourceRequest } from './types/segment/request'

export default async function onRequest(request: SegmentSourceRequest) {
  handleRequest(request)
}
