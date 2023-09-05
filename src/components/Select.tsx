import { cn } from '@/lib/utils'
import ReactSelect, { SingleValue } from 'react-select'

interface SelectProps {
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  label: string
  className?: string
  placeholder: string
  value: string
  isDisabled?: boolean
}

const Select: React.FC<SelectProps> = ({
  className,
  onChange,
  options,
  label,
  placeholder,
  value,
  isDisabled = false,
}) => {
  const selectOptions = options.map((option) => ({
    value: option.value,
    label: option.label,
  }))

  const handleTypeSelect = (
    e: SingleValue<{
      value: string
      label: string
    }>,
  ) => {
    if (e === null) return
    onChange(e.value)
  }
  return (
    <div className={cn('relative box-border', className)}>
      <ReactSelect
        // components={{ Control }}
        isDisabled={isDisabled}
        placeholder={placeholder || 'Select'}
        options={selectOptions}
        onChange={handleTypeSelect}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#651FFF',
          },
        })}
        value={!!value ? { label: value, value: value } : null}
      />
      <div className="absolute -top-[11px] left-[20px] ">
        <label>{label}</label>
      </div>
    </div>
  )
}

export default Select
