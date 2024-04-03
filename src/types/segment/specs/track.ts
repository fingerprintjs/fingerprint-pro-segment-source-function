import { MaybeNullOrUndefined } from '../../index'

declare type TrackProperties = {
  revenue?: string | number
  currency?: string
  value?: string | number
}
export declare type SegmentSpecTrack<
  CustomProperties extends object = {},
  CustomObjectBodyProperties extends object = {},
> = {
  event: MaybeNullOrUndefined<string>
  properties?: TrackProperties & CustomProperties
} & CustomObjectBodyProperties
