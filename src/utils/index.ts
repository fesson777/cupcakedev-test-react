import { markets, currencies } from 'utils/config';
import type {
  Market,
  MarketData,
  CurrencyData,
  EnrichedMarketData,
  EnrichedMarketDataMap,
} from 'types';

function formatCurValue(value: number) {
  return Number(Math.abs(value).toFixed(2));
}
function formatCurPairValue(v1: number, v2: number) {
  return Number((v1 / v2).toFixed(2));
}

export function enrichMarketData({ market, data }: MarketData): EnrichedMarketDataMap {
  const { rates } = data;
  return {
    market,
    data: {
      'RUB/CUPCAKE': formatCurValue(rates.RUB),
      'EUR/CUPCAKE': formatCurValue(rates.EUR),
      'USD/CUPCAKE': formatCurValue(rates.USD),
      'RUB/USD': formatCurPairValue(rates.RUB, rates.USD),
      'RUB/EUR': formatCurPairValue(rates.RUB, rates.EUR),
      'EUR/USD': formatCurPairValue(rates.EUR, rates.USD),
    },
  };
}

export function transform(data: Record<Market, EnrichedMarketData>): CurrencyData[] {
  return currencies.map(currency =>
    markets.reduce(
      (acc, market) => {
        const value = data[market][currency];
        acc[market] = value;
        if (acc.minValue) {
          if (value < acc.minValue) {
            acc.minValue = value;
          }
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
