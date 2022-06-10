import axios, { AxiosResponse } from "axios";
import { transformData } from "./utils/utils";
import type { Market, ResponseData } from "./type";

const request = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const marketEndpoints: Record<Market, string> = {
  first: "/first",
  second: "/second",
  third: "/third",
};

async function getMarketData(market: Market) {
  try {
    const response: AxiosResponse<ResponseData> = await request.get(marketEndpoints[market]);
    return { data: response.data, market };
  } catch (error) {
    console.error("API ~ getMarketData ~", error);
  }
}

export async function getMarketsData() {
  const resp1 = await getMarketData("first");
  const resp2 = await getMarketData("second");
  const resp3 = await getMarketData("third");
  if (resp1 && resp2 && resp3) {
    const data = transformData([resp1, resp2, resp3]);
    return data;
  }
}
