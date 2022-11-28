import { ErrorMessage } from 'formik'
import React from 'react'
import NumberFormat from 'react-number-format'
import Select from 'react-select'

export const IndNoField = ({
  onChange,
  options,
  value,
  name,
  label,
  className,
}) => {
  return (
    <div className={className}>
      <label className="label font-regular text-sm mb-2">{label}</label>
      <NumberFormat
        // label="Mobile No*"
        className=" w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-4 mt-1"
        name="mobileNo"
        value={value}
        onValueChange={(value) => {
          onChange(value)
        }}
        thousandSeparator={true}
        thousandsGroupStyle="lakh"
        prefix=""
      />
      {/* <ErrorMessage
        component="div"
        name={name}
        className="error-message text-red-700 text-xs px-2"
      /> */}
    </div>
  )
}
