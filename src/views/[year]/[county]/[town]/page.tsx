import { getData } from './api'
import Loading from '@/components/Loading'
import { useQuery } from '@tanstack/react-query'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useParams } from 'react-router-dom'

function Page() {
  const { year, county, town } = useParams()
  const url = `https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}?county=${county}&town=${town}`
  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => getData(url),
  })
  const chartData = data?.reduce(
    (acc, cur) => {
      acc.togetherMale +=
        parseInt(cur.household_ordinary_m) + parseInt(cur.household_business_m)
      acc.togetherFeMale +=
        parseInt(cur.household_ordinary_f) + parseInt(cur.household_business_f)
      acc.singleMale += parseInt(cur.household_single_m)
      acc.singleFeMale += parseInt(cur.household_single_f)
      acc.totalTogether +=
        parseInt(cur.household_ordinary_total) +
        parseInt(cur.household_business_total)
      acc.totalSingle += parseInt(cur.household_single_total)
      return acc
    },
    {
      togetherMale: 0,
      togetherFeMale: 0,
      singleMale: 0,
      singleFeMale: 0,
      totalTogether: 0,
      totalSingle: 0,
    },
  )

  const columnsOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: '人口數',
    },
    xAxis: {
      categories: ['共同生活', '獨立生活'],
    },
    series: [
      {
        name: '男性',
        data: [chartData?.togetherMale, chartData?.singleMale],
        color: '#7d5fb2',
        dataLabels: {
          enabled: true,
        },
      },
      {
        name: '女性',
        data: [chartData?.togetherFeMale, chartData?.togetherFeMale],
        color: '#c29fff ',
        dataLabels: {
          enabled: true,
        },
      },
    ],
    yAxis: {
      min: 0,
      title: {
        text: '數量',
      },
    },
  }
  const piChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '戶數統計',
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: ' {point.percentage:.1f} %',
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: '數量',
        colorByPoint: true,
        data: [
          {
            name: '共同生活',
            y: chartData?.totalTogether,
            color: '#a3b1ff ',
          },
          {
            name: '獨立生活',
            y: chartData?.totalSingle,
            color: '#626eb2 ',
          },
        ],
      },
    ],
  }

  if (isLoading) return <Loading />
  if (data === undefined)
    return (
      <div>
        {year}年{county}
        {town}沒有資料
      </div>
    )
  return (
    <div className="my-4 flex w-full flex-col gap-4 px-4">
      <h1 className="mb-4 text-center text-3xl">
        {year}年{county}
        {town}
      </h1>
      <HighchartsReact highcharts={Highcharts} options={columnsOptions} />
      <HighchartsReact highcharts={Highcharts} options={piChartOptions} />
    </div>
  )
}

export default Page
