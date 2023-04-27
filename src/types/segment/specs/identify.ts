import { Address } from '../utils/address'

declare type SegmentIdentifyTraits = {
  address?: Address | null
  age?: number | string | null
  avatar?: string | null
  birthday?: string | number | null
  company?: string | null
  createdAt?: string | Date | number | null
  description?: string | null
  email?: string | null
  firstName?: string | null
  gender?: string | boolean | number | null
  id?: string | number | null
  lastName?: string | null
  name?: string | null
  phone?: string | number | null
  title?: string | null
  username?: string | null
  website?: string | null
}

export declare type SegmentSpecIdentify<CustomTraits = {}, CustomObjectBodyProperties extends object = {}> = {
  traits?: SegmentIdentifyTraits & CustomTraits
} & CustomObjectBodyProperties
