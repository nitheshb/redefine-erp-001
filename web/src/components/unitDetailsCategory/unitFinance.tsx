// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { EyeIcon, DownloadIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'

const valueFeedData = [
  {
    k: 'Jan-2022',
    type: 'Demand',
    reason: 'Booking Advance',
    amount: '100000',
    balance: '100000',
    v: 4,
    pic: '',
  },
  {
    k: 'Feb-2022',
    reason: 'Booking Advance',
    type: 'Cheque',
    amount: '100000',
    balance: '0',
    v: 59,
    pic: '',
  },
  {
    reason: 'Aggrement fee',
    k: 'Feb-2022',
    type: 'Demand',
    amount: '300000',
    balance: '300000',
    v: 59,
    pic: '',
  },
  {
    reason: 'Aggrement fee',
    k: 'Feb-2022',
    type: 'Cheque',
    amount: '300000',
    balance: '0',
    v: 59,
    pic: '',
  },
]

const UnitFinanceBody = () => {
  return (
    <div>
      <section className="py-2 mb-8 leading-7 text-gray-900 bg-white rounded-lg">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          <div className="grid grid-cols-1 gap-7 mt-10">
            <span>
              <div
                className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                style={{ backgroundColor: '#f3f5ff' }}
              >
                <div className="flex items-center flex-row px-0  pl-0 mb-2 ">
                  <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 ">
                    {''}
                  </div>
                </div>

                <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                  {'This gets generated after 2-3 days of Amount Clerance'}
                </div>
                <ul className="flex-1 p-0 mt-8 ml-2 mr-2  border   rounded-md leading-7 text-gray-900  border-gray-200">
                  {valueFeedData.map((data, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-between px-4 py-1 w-full mb-2  font-semibold text-left border-dotted border-b border-gray-300 "
                      >
                        <span className="inline-flex">
                          <span className="text-[16px]    text-blue-900">
                            {' '}
                            {data.k}
                          </span>
                        </span>
                        <span className="inline-flex">
                          <span className="text-[16px]    text-blue-900">
                            {' '}
                            {data.reason}
                          </span>
                        </span>
                        <span className="inline-flex">
                          <span className="text-[16px]    text-blue-900">
                            {' '}
                            {data.type}
                          </span>
                        </span>

                        <div
                          className="relative flex flex-col items-center group"
                          style={{ alignItems: 'end' }}
                        >
                          <span className="text-[16px]    text-blue-900">
                            {' '}
                            {data.amount}
                          </span>
                        </div>
                        <div
                          className="relative flex flex-col items-center group min-w-[100px]"
                          style={{ alignItems: 'end' }}
                        >
                          <span className="text-[16px]    text-blue-900">
                            {' '}
                            {data.balance}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UnitFinanceBody
