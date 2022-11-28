import React from 'react'
import { ErrorMessage, useField } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getYear, getMonth } from 'date-fns'
import range from 'lodash/range'

export const DateField = ({ label, ...props }) => {
  const years = range(getYear(new Date()) - 10, getYear(new Date()) + 10, 1)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const [field] = useField(props)
  const {
    dateFormat = 'dd/MM/yyyy',
    showTimeInput = false,
    placeHolder = 'dd/mm/yyyy',
  } = props
  return (
    <div className="mb-2 w-full flex flex-col">
      <label htmlFor={field.name} className="label font-regular text-sm">
        {label}
      </label>
      <DatePicker
        {...field}
        {...props}
        autoComplete="off"
        className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-4"
        dateFormat={dateFormat}
        showTimeInput={showTimeInput}
        placeholderText={placeHolder}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between m-4">
            <button
              className="font-semibold"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              {'<'}
            </button>
            <select
              className="p-1"
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              className="p-1"
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              className="font-semibold"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              {'>'}
            </button>
          </div>
        )}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error-message text-red-700 text-xs p-2"
      />
    </div>
  )
}
