import { currentYear } from 'src/app/states/constants'

// Chart data
export type ChartType = {
  labels?: any
  datasets?: any
  options?: any
}

export type StatesType = {
  title: string
  amount: string
  description: string
}

export type CountryType = {
  name: string
  image: string
  value: string
  progress: number
}

export const lineAreaChart: ChartType = {
  //   type: 'line',
  labels: [
    '22 Jul',
    '',
    '24 Jul',
    '',
    '26 Jul',
    '',
    '28 Jul',
    '',
    '30 Jul',
    '',
    '01 Aug',
    '',
    '03 Aug',
    '',
    '05 Aug',
  ],
  datasets: [
    {
      label: 'Sales, USD',
      fill: true,
      data: [0, 100, 200, 175, 100, 50, 75, 0, 0, 50, 50, 50, 0, 100, 0],
      backgroundColor: 'rgba(68,140,116,.1)',
      borderWidth: 2,
      borderColor: 'rgba(68,140,116,.6)',
      pointBackgroundColor: '#448c74',
      pointBorderWidth: 3,
      pointBorderColor: '#448c74',
      pointHoverBorderColor: '#448c74',
      pointHoverBorderWidth: 6,
    },
  ],
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        border: {
          color: 'rgba(133,140,151,.18)',
        },
        grid: {
          color: 'rgba(133,140,151,.18)',
        },
      },
      x: {
        border: {
          color: 'rgba(133,140,151,.18)',
        },
        grid: {
          color: 'rgba(133,140,151,.18)',
        },
      },
    },
  },
}

export const pieChart: ChartType = {
  labels: ['Mobile - 64%', 'Desktop - 19%', 'Tablet - 10%', 'Other - 7%'],
  datasets: [
    {
      label: 'Device share, %',
      data: [64, 19, 10, 7],
      borderWidth: 0,
      backgroundColor: [
        '#448c74',
        'rgba(68,140,116,.64)',
        'rgba(68,140,116,.4)',
        'rgba(68,140,116,.2)',
      ],
    },
  ],
  options: {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          boxWidth: 12,
          boxHeight: 12,
          useBorderRadius: true,
          borderRadius: 8,
          padding: 20,
          font: {
            size: 15,
          },
        },
      },
    },
  },
}

export const statesData: StatesType[] = [
  {
    title: 'Earnings (before taxes)',
    amount: '842.00',
    description: 'Sales 8/1/2023 - 8/15/' + currentYear,
  },
  {
    title: 'Your balance',
    amount: '735.00',
    description: 'To be paid on 8/15/' + currentYear,
  },
  {
    title: 'Lifetime earnings',
    amount: '9,156.74',
    description: 'Based on list price',
  },
]

export const countriesData: CountryType[] = [
  {
    name: 'United States',
    image: 'assets/img/account/flags/usa.png',
    value: '352',
    progress: 48,
  },
  {
    name: 'Sweden',
    image: 'assets/img/account/flags/sweden.png',
    value: '218',
    progress: 30,
  },
  {
    name: 'India',
    image: 'assets/img/account/flags/india.png',
    value: '97',
    progress: 14,
  },
  {
    name: 'France',
    image: 'assets/img/account/flags/france.png',
    value: '40',
    progress: 6,
  },
  {
    name: 'South Africa',
    image: 'assets/img/account/flags/south-africa.png',
    value: '16',
    progress: 3,
  },
]
