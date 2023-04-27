import { Address } from '../utils/address'
import { MaybeNullOrUndefined } from '../../index'

declare type GroupTraits = {
  address?: Address
  avatar?: string
  createdAt?: string | Date | number
  description?: string
  email?: string
  employees?: string | number
  id?: string | number
  industry?: string
  name?: string
  phone?: string | number
  website?: string
  plan?: string
}

export declare type SegmentSpecGroup<
  CustomTraits extends object = {},
  CustomObjectBodyProperties extends object = {}
> = {
  groupId: MaybeNullOrUndefined<string>
  traits?: GroupTraits & CustomTraits
} & CustomObjectBodyProperties
