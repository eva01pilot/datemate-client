import type { AxiosInstance } from "axios";
import { ResponseFailure } from "../api";

export interface Interest {
  id: number,
  name: string,
  categoryId: number
}

export interface Category {
  id: number,
  name: string,
  interests: Interest[]
}

export interface GetAllInterestsSuccess {
  data: {
    categories: Category[] | []
  }
}

export type GetAllInterestsResponse = GetAllInterestsSuccess | ResponseFailure

export default class Interests {
  instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  async getAll(): Promise<GetAllInterestsResponse>{
    const response = await this.instance.get('/api/interests/')

    return response.data
  }
}