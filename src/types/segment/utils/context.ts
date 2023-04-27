export declare type SegmentContext<CustomContext extends object = {}> = {
  active?: boolean
  app?: {
    name?: string
    version?: string | number
    build?: string | number
  }
  campaign?: {
    name?: string
    source?: string
    medium?: string
    term?: string
    content?: string
  }
  device?: {
    id?: string | number
    advertisingId?: string | number
    manufacturer?: string
    model?: string | number
    name?: string
    type?: string
    version?: string | number
  }
  ip?: string
  library?: {
    name?: string
    version?: string | number
  }
  locale?: string
  os?: {
    name?: string
    version?: string | number
  }
  referrer?: {
    type?: string
    name?: string
    url?: string
    link?: string
  }
  timezone?: string
  userAgent?: string
  channel?: 'server' | 'browser' | 'mobile' | string
} & CustomContext
