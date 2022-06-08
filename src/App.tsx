import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Container } from '@mui/system'
import { Button } from '@mui/material'
import { apiEndpoitns, getMarketData, ResponseData } from './api'

const ratesTemp = [
  { name: 'RUB/CUPCAKE', RUB1: 1.22, RUB2: 1.22, RUB3: 1.22 },
  { name: 'USD/CUPCAKE', USD1: 1.22, USD2: 1.22, USD3: 1.22 },
  { name: 'EUR/CUPCAKE', EUR1: 1.22, EUR2: 1.22, EUR3: 1.22 },
  { name: 'RUB/USD', RU_US1: 1.22, RU_US2: 1.22, RU_US3: 1.22 },
  { name: 'RUB/EUR', RU_EU1: 1.22, RU_EU2: 1.22, RU_EU3: 1.22 },
  { name: 'EUR/USD', EU_US1: 1.22, EU_US2: 1.22, EU_US3: 1.22 },
]

function App() {
  const [data, setData] = useState<ResponseData[]>([])

  async function getMarketsData() {
    const resp1 = await getMarketData(apiEndpoitns.firstMarket)
    const resp2 = await getMarketData(apiEndpoitns.secondMarket)
    const resp3 = await getMarketData(apiEndpoitns.thirdMarket)
    if (resp1 && resp2 && resp3) {
      console.log('resp1', resp1, 'resp2', resp2, 'resp3', resp3)

      const formatedData = transformData(resp1, resp2, resp3)
      console.log(formatedData)

      // setData([resp1.data, resp2.data, resp3.data])
    }
  }

  useEffect(() => {
    getMarketsData()
    // setData([m1, m2, m3])
  }, [])

  // useEffect(() => {
  //   setInterval(() => {
  //     getMarketData(apiEndpoitns.firstMarket)
  //   }, 10000)
  // }, [setInterval])

  return (
    <div className="App" style={{ minHeight: '100vh', minWidth: '100%' }}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper} sx={{ maxWidth: 450 }}>
          <Table sx={{ maxWidth: 450 }} aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>Pair Name/market</TableCell>
                <TableCell align="right">first</TableCell>
                <TableCell align="right">second</TableCell>
                <TableCell align="right">third</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ratesTemp.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">2</TableCell>
                  <TableCell align="center">3</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export default App

function transformData(data1: any, data2: any, data3: any) {
  const addFields = [data1, data2, data3].reduce((acc, { url, data }) => {
    const { rates } = data

    return [
      ...acc,
      {
        name: url.slice(1),
        'RUB/CUPCAKE': rates.RUB.toFixed(2),
        'EUR/CUPCAKE': rates.EUR.toFixed(2),
        'USD/CUPCAKE': rates.USD.toFixed(2),
        'RUB/USD': (rates.RUB / rates.USD).toFixed(2),
        'RUB/EUR': (rates.RUB / rates.EUR).toFixed(2),
        'EUR/USD': (rates.EUR / rates.USD).toFixed(2),
      },
    ]
  }, [])

  const finalData = addFields.reduce((arr: any, obj: any) => {
    const objRow = Object.keys(obj).reduce((acc, key) => {
      if (key === 'name') {
        return {}
      }

      return { ...acc, name: key, [obj.name]: obj[key] }
    }, {})

    return arr
  }, [])

  return finalData
}
