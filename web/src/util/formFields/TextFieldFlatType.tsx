import React from 'react'

import { ErrorMessage, useField } from 'formik'
// import { InputField, Label } from '@redwoodjs/forms'

export const TextFieldFlat = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="">
      <div className="flex flex-row">
        <ErrorMessage
          component="div"
          name={field.name}
          className="error-message text-red-700 text-xs p-1 mx-auto"
        />
      </div>

      <input
        className={` ${meta.touched && meta.error && 'is-invalid'} ${
          field.name === 'blockName' ? '' : '   '
        }

          text-right text-sm  bg-grey-lighter text-gray-darker font-medium border-bottom border-[#cccccc]`}
        style={{ textAlign: 'right' }}
        {...field}
        {...props}
        autoComplete="off"
      />
    </div>
  )
}
