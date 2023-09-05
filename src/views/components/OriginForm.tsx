import areaData from './areaData.json'
import Select from '@/components/Select'
import { Button } from '@/components/ui/button'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface SearchParams {
  year: string
  county: keyof typeof areaData | ''
  town: string
}

function OriginForm() {
  const { year = '110', county = '', town = '' } = useParams()
  const [search, setSearch] = useState<SearchParams>({
    year,
    county: county as keyof typeof areaData | '',
    town,
  })
  const navigate = useNavigate()

  const yearOptions = ['110', '109', '108', '107', '106'].map((year) => ({
    value: year,
    label: year,
  }))
  const countyOptions = Object.keys(areaData).map((county) => ({
    value: county,
    label: county,
  }))
  const townOptions = useMemo(() => {
    if (search.county === '') return []
    return areaData[search.county].map((town) => ({
      value: town,
      label: town,
    }))
  }, [search.county])
  const handleSearch = () => {
    navigate(`/${search.year}/${search.county}/${search.town}`)
  }
  return (
    <div className="flex w-full flex-col items-start gap-4 md:flex-row md:justify-center">
      <Select
        className=" w-40 md:w-24"
        label="年分"
        options={yearOptions}
        onChange={(value) => setSearch((prev) => ({ ...prev, year: value }))}
        placeholder="選擇年分"
        value={search.year}
      />
      <Select
        className=" w-full md:w-40"
        label="縣/市"
        options={countyOptions}
        onChange={(value) =>
          setSearch((prev) => ({
            ...prev,
            county: value as keyof typeof areaData,
            town: '',
          }))
        }
        placeholder="請選擇縣/市"
        value={search.county}
      />
      <Select
        isDisabled={search.county === ''}
        className=" w-full md:w-44"
        label="區"
        options={townOptions}
        onChange={(value) =>
          setSearch((prev) => ({
            ...prev,
            town: value,
          }))
        }
        placeholder="請先選擇縣/市"
        value={search.town}
      />
      <Button onClick={handleSearch} disabled={search.town !== ''}>
        Submit
      </Button>
    </div>
  )
}

export default OriginForm
