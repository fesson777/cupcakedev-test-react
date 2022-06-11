import { CurrencyPair, Market, ResponseData, CurrencyData } from "../type";

type MarketData = {
  market: Market;
  data: ResponseData;
};

type EnrichedMarketData = {
  market: Market;
  data: Record<CurrencyPair, number>;
};

type MarketsDataMap = Record<Market, EnrichedMarketData["data"]>;

const markets: Market[] = ["first", "second", "third"];
const currencies: CurrencyPair[] = [
  "RUB/CUPCAKE",
  "USD/CUPCAKE",
  "EUR/CUPCAKE",
  "RUB/USD",
  "RUB/EUR",
  "EUR/USD",
];

function enrichMarketData({ market, data }: MarketData): EnrichedMarketData {
  const { rates } = data;
  return {
    market,
    data: {
      "RUB/CUPCAKE": formatCurValue(rates.RUB),
      "EUR/CUPCAKE": formatCurValue(rates.EUR),
      "USD/CUPCAKE": formatCurValue(rates.USD),
      "RUB/USD": formatCurPairValue(rates.RUB, rates.USD),
      "RUB/EUR": formatCurPairValue(rates.RUB, rates.EUR),
      "EUR/USD": formatCurPairValue(rates.EUR, rates.USD),
    },
  };
}

function combine(arr: MarketData[]) {
  return arr
    .map(data => enrichMarketData(data))
    .reduce((acc, { market, data }) => {
      acc[market] = data;
      return acc;
    }, {} as MarketsDataMap);
}

export function transform(data: MarketsDataMap): CurrencyData[] {
  return currencies.map(currency =>
    markets.reduce(
      (acc, market) => {
        const value = data[market][currency];
        if (acc.minValue && value < acc.minValue) {
          acc.minValue = value;
        } else {
          acc.minValue = value;
        }
        return acc;
      },
      {
        currency,
      } as CurrencyData
    )
  );
}

function formatCurValue(value: number) {
  return Number(Math.abs(value).toFixed(2));
}
function formatCurPairValue(v1: number, v2: number) {
  return Number((v1 / v2).toFixed(2));
}

export function normalizeData(arr: MarketData[]) {
  const marketsData = combine(arr);
  return transform(marketsData);
}
