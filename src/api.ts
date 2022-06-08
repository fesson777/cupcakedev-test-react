import axios, { AxiosRequestConfig } from 'axios'
import { AxiosResponse } from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

export async function getMarketData(endpoint: string) {
  try {
    const response: AxiosResponse<
      ResponseData,
      AxiosRequestConfig<string>
    > = await request.get(endpoint)
    if (response.status === 200) {
      return { data: response.data, url: response.config.url }
    }
  } catch (error) {
    console.error('api~getMarketData~error', error)
  }
}

export const apiEndpoitns = {
  firstMarket: '/first',
  secondMarket: '/second',
  thirdMarket: '/third',
}

export type ResponseData = {
  rates: {
    RUB: number
    USD: number
    EUR: number
  }
  base: string
  timestamp: number
  date: string
}
