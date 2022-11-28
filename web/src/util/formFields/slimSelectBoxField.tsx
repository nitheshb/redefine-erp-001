import React from 'react'
import Select from 'react-select'

const customStyles = {
  control: (base) => ({
    ...base,
    height: 34,
    minHeight: 34,
    padding: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    alignItems: 'initial',
    paddingTop: 5,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 5,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    marginTop: 6,
    marginBottom: 10,
  }),
  menu: (provided) => ({ ...provided, marginTop: 0, zIndex: 9999 }),
}

export const SlimSelectBox = ({
  onChange,
  options,
  value,
  name,
  label,
  placeholder,
  className,
}) => {
  const defaultValue = (options, value) => {
    return (
      (options ? options.find((option) => option.value === value) : '') || ''
    )
  }

  return (
    <div className="">
      {label != '' && label != 'Assign To' && (
        <label className="label font-regular text-sm ">{label}</label>
      )}
      <Select
        maxMenuHeight={150}
        name={name}
        value={defaultValue(options, value)}
        placeholder={placeholder || label || 'All Projects'}
        onChange={(value) => {
          onChange(value)
        }}
        options={options}
        className={`text-sm  ${
          label != '' ? 'mt-1' : ''
        } border-transparent p-0`}
        classNamePrefix="react-select"
        styles={customStyles}
      />
      {/* <ErrorMessage
        component="div"
        name={name}
        className="error-message text-red-700 text-xs px-2"
      /> */}
    </div>
  )
}
