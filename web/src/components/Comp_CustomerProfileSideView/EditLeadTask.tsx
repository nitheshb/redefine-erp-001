import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { useEffect, useState } from 'react'

export default function EditLeadTask({
  editTaskObj,
  setStartDate,
  startDate,
  takTitle,
  setTitleFun,
  cancelResetStatusFun,
  editTaskFun,
  d,
}) {
  const [error, setError] = useState(false)
  useEffect(() => {
    if (takTitle === 'undefined' || takTitle === '') {
      setError(true)
    } else {
      setError(false)
    }
  }, [takTitle])

  return (
    <div className=" form outline-none border  py-4">
      <section className=" px-4">
        <div className="text-xs font-bodyLato text-[#516f90]">
          Edit Title
          {/* <ErrorMessage
                                              component="div"
                                              name="taskTitle"
                                              className="error-message text-red-700 text-xs p-1"
                                            /> */}
          {error && (
            <div className="error-message text-red-700 text-xs p-1">
              {' '}
              Title Required
            </div>
          )}
        </div>
        <input
          name="taskTitle"
          type="text"
          value={takTitle}
          onChange={(e) => {
            setTitleFun(e)
          }}
          placeholder="Enter a short title"
          className="w-full h-full pb-1 outline-none text-sm font-bodyLato focus:border-blue-600 hover:border-blue-600  border-b border-[#cdcdcd] text-[33475b] bg-[#F5F8FA] "
        ></input>
        <div className="flex flex-row mt-3">
          <section>
            <span className="text-xs font-bodyLato text-[#516f90]">
              Edit Due Date
            </span>
            <div className="bg-green   pl-   flex flex-row ">
              <span className="inline">
                <DatePicker
                  className=" mt-[2px] pl- px-   min-w-[151px] inline text-xs text-[#0091ae] bg-[#F5F8FA]"
                  selected={startDate}
                  onChange={(date) => setStartDate(date.getTime())}
                  showTimeSelect
                  timeFormat="HH:mm"
                  injectTimes={[
                    setHours(setMinutes(d, 1), 0),
                    setHours(setMinutes(d, 5), 12),
                    setHours(setMinutes(d, 59), 23),
                  ]}
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </span>
            </div>
          </section>
        </div>
      </section>
      <div className="flex flex-row mt-4 justify-between pr-4 border-t">
        <section>
          <span>{''}</span>
        </section>
        <section className="flex">
          <button
            type="submit"
            onClick={() => {
              if (!error) {
                editTaskFun(editTaskObj)
              }
            }}
            className={`flex mt-2 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-[#054861] bg-[#5cebdf]  hover:bg-[#9ff9e1]  `}
          >
            <span className="ml-1 ">Edit Task</span>
          </button>
          <button
            // onClick={() => fSetLeadsType('Add Lead')}
            onClick={() => cancelResetStatusFun()}
            className={`flex mt-2 ml-4 rounded items-center text-bodyLato pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white `}
          >
            <span className="ml-1 ">Cancel</span>
          </button>
        </section>
      </div>
    </div>
  )
}
