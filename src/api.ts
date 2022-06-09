import axios, { AxiosRequestConfig } from 'axios'
import { AxiosResponse } from 'axios'
import { ResponseData } from './type'
import { transformData } from './utils/utils'

const request = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

async function getMarketData(endpoint: string) {
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

export async function getMarketsData() {
  const resp1 = await getMarketData(apiEndpoitns.firstMarket)
  const resp2 = await getMarketData(apiEndpoitns.secondMarket)
  const resp3 = await getMarketData(apiEndpoitns.thirdMarket)
  if (resp1 && resp2 && resp3) {
    const data = transformData(resp1, resp2, resp3)
    return data
  }
}
