import areaData from './areaData.json'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as z from 'zod'

const FormSchema = z.object({
  year: z.string(),
  county: z.string(),
  town: z.string(),
})

export function SelectForm() {
  const navigate = useNavigate()
  const params = useParams()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      year: params.year || '110',
      county: params.county || '',
      town: params.town || '',
    },
  })
  const { watch, setValue } = form

  function onSubmit({ year, county, town }: z.infer<typeof FormSchema>) {
    navigate(`/${year}/${county}/${town}`)
  }
  const yearOptions = ['110', '109', '108', '107', '106']
  const countyOptions = Object.keys(areaData)
  const [county, town] = watch(['county', 'town'])
  const townOptions = useMemo(() => {
    if (!county) return []
    return areaData[county as keyof typeof areaData]
  }, [county])
  useEffect(() => {
    setValue('town', '')
  }, [county])
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-center"
      >
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem className=" w-40   md:w-28">
              <FormLabel>年分</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="選擇年分" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {yearOptions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="county"
          render={({ field }) => (
            <FormItem className="w-full md:w-40">
              <FormLabel>縣/市</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="請選擇縣/市" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-40 overflow-auto">
                  {countyOptions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="town"
          render={({ field }) => (
            <FormItem className="w-full md:w-40">
              <FormLabel>區</FormLabel>
              <Select
                disabled={!county}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="請先選擇縣/市" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-40 overflow-auto">
                  {townOptions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button
          className="w-full md:w-auto"
          disabled={town.length === 0}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
