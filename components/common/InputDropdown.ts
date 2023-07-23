export type Item<T> = {
  id: string,
  visible: boolean,
  value: T & {
    selected: boolean,
    name: string,
    nameLocale: string,
  }
}