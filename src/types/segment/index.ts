import { SegmentSpecIdentify } from './specs/identify'
import { SegmentSpecPage } from './specs/page'
import { SegmentSpecScreen } from './specs/screen'
import { SegmentSpecTrack } from './specs/track'
import { SegmentSpecGroup } from './specs/group'
import { SegmentContext } from './utils/context'
import { MaybeNullOrUndefined } from '../index'

declare global {
  type SegmentIntegrations = {
    [key: string]: boolean
  }

  type SegmentWithCredentials = {
    userId: MaybeNullOrUndefined<string | number>
    anonymousId: MaybeNullOrUndefined<string | number>
  }

  type SegmentSpec<Spec, CustomContext extends object = {}> = SegmentWithCredentials &
    Spec & {
      context?: SegmentContext & CustomContext
      timestamp?: string | Date | number
      sentAt?: string | Date | number
      integrations?: SegmentIntegrations
    }

  const Segment: {
    identify<CustomTraits extends object = {}, CustomObjectBodyProperties extends object = {}>(
      payload: SegmentSpec<SegmentSpecIdentify<CustomTraits, CustomObjectBodyProperties>>
    ): void
    page<CustomProperties extends object = {}, CustomObjectBodyProperties extends object = {}>(
      payload: SegmentSpec<SegmentSpecPage<CustomProperties, CustomObjectBodyProperties>>
    ): void
    screen<CustomProperties extends object = {}, CustomObjectBodyProperties extends object = {}>(
      payload: SegmentSpec<SegmentSpecScreen<CustomProperties, CustomObjectBodyProperties>>
    ): void
    track<CustomProperties extends object = {}, CustomObjectBodyProperties extends object = {}>(
      payload: SegmentSpec<SegmentSpecTrack<CustomProperties, CustomObjectBodyProperties>>
    ): void
    group<CustomTraits extends object = {}, CustomObjectBodyProperties extends object = {}>(
      payload: SegmentSpec<SegmentSpecGroup<CustomTraits, CustomObjectBodyProperties>>
    ): void
  }

  class RetryError {
    constructor(message: string)
  }
}
