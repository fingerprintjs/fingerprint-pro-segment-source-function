declare type SegmentPageProperties = {
  name?: string
  path?: string
  referrer?: string
  search?: string
  title?: string
  url?: string
  keywords?: string | string[]
}

export declare type SegmentSpecPage<
  CustomProperties extends object = {},
  CustomObjectBodyProperties extends object = {}
> = {
  category?: string
  name?: string
  properties?: SegmentPageProperties & CustomProperties
} & CustomObjectBodyProperties
