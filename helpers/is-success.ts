import { ResponseFailure } from '~/plugins/api'

export default function isSuccess<T extends object> (data: T|ResponseFailure): data is T {
  if (Object.hasOwn(data, 'error')) {
    return false
  }
  return true
}
