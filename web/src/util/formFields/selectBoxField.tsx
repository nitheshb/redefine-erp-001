import React from 'react'
import Select from 'react-select'

const customStyles = {
  control: (base) => ({
    ...base,
    height: 37,
    minHeight: 40,
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
}


export const CustomSelect = ({
  onChange,
  options,
  value,
  name,
  label,
  className,
}) => {
  const defaultValue = (options, value) => {
    return (
      (options ? options.find((option) => option.value === value) : '') || ''
    )
  }

  return (
    <label>
      <div className={className}>
        {(label != '' || label != 'Assigned To') && (
          <label className="label font-regular text-sm mb-2">{label}</label>
        )}
        <label>
          <Select
            maxMenuHeight={150}
            name={name}
            value={defaultValue(options, value)}
            placeholder={label || 'All Projects'}
            onChange={(value) => {
              onChange(value)
            }}
            options={options}
            className={`text-sm  ${
              label != '' ? 'mt-1' : ''
            } border-transparent`}
            styles={customStyles}
          />
        </label>
        {/* <ErrorMessage
        component="div"
        name={name}
        className="error-message text-red-700 text-xs px-2"
      /> */}
      </div>
    </label>
  )
}
