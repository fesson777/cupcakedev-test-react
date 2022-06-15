import axios from 'axios';
import type { Market, ResponseData } from 'types';

const request = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const marketEndpoints: Record<Market, string> = {
  first: '/first',
  second: '/second',
  third: '/third',
};

export async function getMarketData(market: Market) {
  try {
    const response = await request.get<ResponseData>(marketEndpoints[market]);
    return { data: response.data, market };
  } catch (error) {
    console.error('API ~ getMarketData ~', error);
  }
}
