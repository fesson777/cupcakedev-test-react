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

export type Market = 'first' | 'second' | 'third';

export type CurrencyPair =
  | 'RUB/CUPCAKE'
  | 'USD/CUPCAKE'
  | 'EUR/CUPCAKE'
  | 'RUB/USD'
  | 'RUB/EUR'
  | 'EUR/USD';
