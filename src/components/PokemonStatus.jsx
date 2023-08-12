import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'

function PokemonStatus({ stats }) {
  const [selectedChart, setSelectedChart] = useState('radar')
  const [chartKey, setChartKey] = useState(0)
  const [height, setHeight] = useState('300')
  const [isHorizontalBar, setIsHorizontalBar] = useState(true)

  const chartOptions = {
    dataLabels: {
      enabled: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['#2563eb'],
      },
      background: {
        enabled: true,
        foreColor: '#FFF',
        borderColor: null,
        borderRadius: 2,
        padding: 5,
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: stats.map((stat) => stat.stat.name.toUpperCase()),
      labels: {
        show: true,
        style: {
          colors: stats.map(() => '#2563eb'),
          fontSize: '11px',
          fontWeight: 500,
        },
        rotate: -45,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: isHorizontalBar,
      },
      radar: {
        polygons: {
          fill: {
            colors: ['#eff6ff', '#fff'],
          },
        },
      },
    },
  }

  const dataSeries = [
    {
      name: 'Base value',
      data: stats.map((stat) => stat.base_stat),
    },
  ]

  useEffect(() => {
    const handleViewportChanged = () => {
      setHeight(window.screen.width < 500 ? '300' : '500')
      setIsHorizontalBar(window.screen.width < 500)
      incrementChartKey()
    }
    // Run on first mount
    handleViewportChanged()
    // Listen to resize event
    window.addEventListener('resize', handleViewportChanged)
    // Remove event listener when unmounts
    return () => {
      window.removeEventListener('resize', handleViewportChanged)
    }
  }, [])

  const isSelected = (value) => {
    return selectedChart === value
  }

  const incrementChartKey = () => {
    setChartKey((current) => current + 1)
  }

  const handleSelectedChart = (value) => {
    setSelectedChart(value)
    incrementChartKey()
  }

  return (
    <div className='bg-white bg-opacity-30 rounded-xl'>
      <div className='flex justify-start pt-4 pl-4'>
        <button
          className={`px-4 py-2 text-sm font-semibold transition duration-200 ease-in delay-100 rounded-l-lg ${
            isSelected('radar') ? 'text-white bg-blue-600' : 'text-blue-500 ring-1 ring-inset ring-blue-300'
          }`}
          disabled={isSelected('radar')}
          onClick={() => handleSelectedChart('radar')}
        >
          Radar
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold transition duration-200 ease-in delay-100 rounded-r-lg ${
            isSelected('bar') ? 'text-white bg-blue-600' : 'text-blue-500 ring-1 ring-inset ring-blue-300'
          }`}
          disabled={isSelected('bar')}
          onClick={() => handleSelectedChart('bar')}
        >
          Bar
        </button>
      </div>
      <Chart key={chartKey} options={chartOptions} series={dataSeries} type={selectedChart} height={height} />
    </div>
  )
}

PokemonStatus.propTypes = {
  stats: PropTypes.array,
}

PokemonStatus.defaultProps = {
  stats: [],
}

export default PokemonStatus
