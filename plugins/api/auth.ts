import type { AxiosError, AxiosInstance } from 'axios'
import { ResponseFailure } from '../api'
import { Interest } from './interest'

export interface LoginSuccess {
  data: {
    user: {
      username: string,
      avatar: string,
    }
  }
}

export type LoginResponse = ResponseFailure | LoginSuccess

export interface SignupSuccess {
  data: {
    user: {
      id: number,
      username: string,
    }
  }
}

export type SignupResponse = ResponseFailure | LoginResponse




export interface Gallery {
  id: number,
  userId: number,
  images: string[]
}




export interface Location {
  id: number;
  name: string
  nameRUS: string
}


export interface VerifyLoginSuccess {
  data: {
    user: {
      username: string,
      avatar: string,
      id: number,
      description: string,
      gallery: Gallery,
      interests: Interest[],
      gender: number | null,
      targetGender: number[] | null,
      city: Location,
      country: Location,
      region: Location
    }
  }
}

export type VerifyLoginResponse = ResponseFailure | VerifyLoginSuccess

export default class Auth {
  instance: AxiosInstance
  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await this.instance.post('/api/user/login', {
      username,
      password
    })

    return response.data
  }

  async signUp(username: string, password: string): Promise<SignupResponse> {
    const response = await this.instance.post('/api/user/signup', {
      username,
      password
    })

    return response.data
  }

  async verifyLogin(): Promise<VerifyLoginResponse> {
    try {
      const response = await this.instance.post('/api/user/me')
      return response.data
    } catch (e) {
      return (e as AxiosError).response?.data as ResponseFailure
    }
  }
}
