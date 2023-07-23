import type { AxiosInstance } from "axios";
import { ResponseFailure } from "../api";

export interface SingularDate {
  id: number,
  avatar: string,
  gallery: string[],
  username: string,
  description: string
}

export interface GetDatesSuccess {
  data: {
    users: SingularDate[]
  }
}

export type GetDatesResponse = ResponseFailure | GetDatesSuccess


export interface LikePersonSuccess {
  data: {
    result: 'success'
  }
}

export type LikePersonResponse = ResponseFailure | LikePersonSuccess


export type GetLikesSuccess = GetDatesSuccess

export type GetLikesResponse = ResponseFailure | GetDatesResponse


export type GetMatchesSuccess = GetDatesSuccess

export type GetMatchesResponse = ResponseFailure | GetMatchesSuccess


export default class Dates {
  instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.instance = instance
  }
  async getDates(): Promise<GetDatesResponse> {
    const response = await this.instance.get('/api/dates');

    return response.data

  }

  async likePerson(id: number): Promise<LikePersonResponse> {
    const response = await this.instance.post('/api/dates/like', {
      id
    })

    return response.data
  }

  async getLikes(): Promise<GetLikesResponse> {
    const response = await this.instance.get('/api/dates/like')

    return response
  }

  async getMatches(): Promise<GetMatchesResponse> {
    const response = await this.instance.get('/api/dates/matches')

    return response.data
  }
}