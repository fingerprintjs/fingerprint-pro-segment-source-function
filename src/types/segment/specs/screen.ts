declare type ScreenProperties = {
  name?: string
}
export declare type SegmentSpecScreen<
  CustomProperties extends object = {},
  CustomObjectBodyProperties extends object = {},
> = {
  properties?: ScreenProperties & CustomProperties
} & CustomObjectBodyProperties
