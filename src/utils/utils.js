export function transformData(arr) {
  const addFields = arr.reduce((acc, { market, data }) => {
    const { rates } = data;
    return [
      ...acc,
      { currency: "RUB/CUPCAKE", [market]: formatCurValue(rates.RUB) },
      { currency: "EUR/CUPCAKE", [market]: formatCurValue(rates.EUR) },
      { currency: "USD/CUPCAKE", [market]: formatCurValue(rates.USD) },
      { currency: "RUB/USD", [market]: formatCurPairValue(rates.RUB, rates.USD) },
      { currency: "RUB/EUR", [market]: formatCurPairValue(rates.RUB, rates.EUR) },
      { currency: "EUR/USD", [market]: formatCurPairValue(rates.EUR, rates.USD) },
    ];
  }, []);

  const f1 = unite(addFields, 'RUB/CUPCAKE')
  const f2 = unite(addFields, 'USD/CUPCAKE')
  const f3 = unite(addFields, 'EUR/CUPCAKE')
  const f4 = unite(addFields, 'RUB/USD')
  const f5 = unite(addFields, 'RUB/EUR')
  const f6 = unite(addFields, 'EUR/USD')

  return [f1, f2, f3, f4, f5, f6].map(row => ({
    ...row,
    minValue: getMinValue(row),
  }))
}

function formatCurValue(value) {
  return Math.abs(value.toFixed(2));
}
function formatCurPairValue(v1, v2) {
  return (v1 / v2).toFixed(2);
}

function unite(arr, currency) {
  return arr
    .filter(row => row.currency === currency)
    .reduce((acc, row) => {
      return { ...acc, ...row }
    }, {})
}

function getMinValue(data) {
  return Math.min(data.first, data.second, data.third);
}
