import type { AxiosInstance } from 'axios'
import axios from 'axios'
import Auth from './api/auth'
import Dates from './api/date'
import Interests from './api/interest'
import User from './api/user'
import Overpass from './api/overpass'

export interface ResponseFailure {
  error: string,
  errMessage: string
}

class API {
  private instance: AxiosInstance
  public auth: Auth
  public dates: Dates
  public interests: Interests
  public user: User
  public overpass: Overpass
  constructor (url: string) {
    this.instance = axios.create({
      baseURL: url,
      withCredentials: true
    })
    // eslint-disable-next-line no-console
    this.auth = new Auth(this.instance)
    this.dates = new Dates(this.instance)
    this.interests = new Interests(this.instance)
    this.user = new User(this.instance)
    this.overpass = new Overpass(this.instance)
  }
}

declare module '#app' {
  interface NuxtApp {
    $api: API;
  }
}

export default defineNuxtPlugin(() => {
  const conf = useRuntimeConfig()
  // eslint-disable-next-line no-console
  console.log(conf.public.API_DOMAIN)
  const modules = new API(conf.public.API_DOMAIN)
  return {
    provide: {
      api: modules
    }
  }
})
