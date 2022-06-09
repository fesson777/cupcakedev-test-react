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

type dataNames =
  | 'RUB/CUPCAKE'
  | 'USD/CUPCAKE'
  | 'EUR/CUPCAKE'
  | 'RUB/USD'
  | 'RUB/EUR'
  | 'EUR/USD'

export type currencyObj = {
  name: dataNames
  first: string
  second: string
  third: string
  active: string
}
