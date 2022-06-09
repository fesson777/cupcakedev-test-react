export function transformData(data1, data2, data3) {
  const addFields = [data1, data2, data3].reduce((acc, { url, data }) => {
    const { rates } = data
    const shopNum = url.slice(1)
    return [
      ...acc,
      {
        ...{
          name: 'RUB/CUPCAKE',
          [shopNum]: Math.abs(rates.RUB.toFixed(2)),
        },
      },
      { name: 'EUR/CUPCAKE', [shopNum]: Math.abs(rates.EUR.toFixed(2)) },
      { name: 'USD/CUPCAKE', [shopNum]: Math.abs(rates.USD.toFixed(2)) },
      { name: 'RUB/USD', [shopNum]: (rates.RUB / rates.USD).toFixed(2) },
      { name: 'RUB/EUR', [shopNum]: (rates.RUB / rates.EUR).toFixed(2) },
      { name: 'EUR/USD', [shopNum]: (rates.EUR / rates.USD).toFixed(2) },
    ]
  }, [])

  const f1 = unite(addFields, 'RUB/CUPCAKE')
  const f2 = unite(addFields, 'USD/CUPCAKE')
  const f3 = unite(addFields, 'EUR/CUPCAKE')
  const f4 = unite(addFields, 'RUB/USD')
  const f5 = unite(addFields, 'RUB/EUR')
  const f6 = unite(addFields, 'EUR/USD')

  return [f1, f2, f3, f4, f5, f6].map((row, i) => ({
    ...row,
    active: finMax(row),
  }))
}

function unite(arr, field) {
  return arr
    .slice()
    .filter((row) => {
      return row.name === field
    })
    .reduce((result, row) => {
      return { ...result, ...row }
    }, {})
}

function finMax(obj) {
  let active = ''
  const min = Math.min(obj.first, obj.second, obj.third)
  Object.keys(obj).forEach((key) => {
    if (Number(obj[key]) === min) {
      active = key
    }
  })
  return active
}
