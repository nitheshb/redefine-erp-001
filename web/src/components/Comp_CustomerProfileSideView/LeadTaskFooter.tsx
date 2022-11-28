/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'
import {
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
  prettyDateTime,
} from 'src/util/dateConverter'
import { CheckIcon } from '@heroicons/react/solid'

export default function LeadTaskFooter({
  data,
  hoverTasId,
  EditTaskOpenWindowFun,
  delFun,
}) {
  return (
    <section className="flex flex-row justify-between mt-[2px]">
      <section className="flex flex-row">
        <span className="text-xs font-bodyLato  font-normal text-[#b03d32] text-gray-500 ml-6 ">
          {data?.sts === 'completed' && (
            <span className="text-[#4c1d95] flex flex-row">
              <div className="relative flex flex-col  group">
                <div
                  className="absolute bottom-0 right-0 flex-col items-center hidden mb-6 group-hover:flex"
                  style={{ zIndex: '9999' }}
                >
                  <span
                    className="rounded  relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                    style={{
                      color: 'black',
                      background: '#e2c062',
                      maxWidth: '100%',
                    }}
                  >
                    <div className="italic flex flex-col">
                      <div className="font-bodyLato">
                        Due on: {prettyDateTime(data?.schTime)}{' '}
                      </div>
                    </div>
                  </span>
                  <div
                    className="w-3 h-3  -mt-2 rotate-45 bg-black"
                    style={{
                      background: '#e2c062',
                      marginRight: '12px',
                    }}
                  ></div>
                </div>
                <span className="font-bodyLato">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="calendar_icon inline mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"
                      fill="currentColor"
                    ></path>
                  </svg>{' '}
                  {prettyDateTime(data?.schTime)}{' '}
                </span>
              </div>
              <div className="relative flex flex-col  group">
                <div
                  className="absolute bottom-0 right-0 flex-col items-center hidden mb-6 group-hover:flex"
                  style={{ zIndex: '9999' }}
                >
                  <span
                    className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                    style={{
                      color: 'black',
                      background: '#e2c062',
                      maxWidth: '100%',
                    }}
                  >
                    <div className="italic flex flex-col">
                      <div className="font-bodyLato">
                        Completed on {prettyDateTime(data?.comT)}
                      </div>
                    </div>
                  </span>
                  <div
                    className="w-3 h-3  -mt-2 rotate-45 bg-black"
                    style={{
                      background: '#e2c062',
                      marginRight: '12px',
                    }}
                  ></div>
                </div>
                <span className="font-bodyLato">
                  {/* <HighlighterStyle
          searchKey={searchKey}
          source={row.Source.toString()}
                    /> */}

                  <span className="text-green-900 ml-2">
                    <CheckIcon className="w-4 h-4 inline text-[#058527]" />{' '}
                    {'   '}
                    {prettyDateTime(data?.comT)}{' '}
                  </span>
                </span>
              </div>
            </span>
          )}

          {data?.sts != 'completed' && (
            <div className="flex flex-row">
              <div
                className="relative flex flex-col  group"
                // style={{ alignItems: 'end' }}
              >
                <div
                  className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex z-100000"
                  // style={{  width: '300px' }}
                  // style={{
                  //   zIndex: '1',
                  // }}
                >
                  <span
                    className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                    style={{
                      color: 'black',
                      background: '#e2c062',
                      width: '100%',
                    }}
                  >
                    <div className="italic flex flex-col">
                      <div className="font-bodyLato">
                        {prettyDateTime(data?.schTime)}
                      </div>
                    </div>
                  </span>
                  <div
                    className="w-3 h-3  -mt-2 rotate-45 bg-black"
                    style={{
                      background: '#e2c062',
                      marginRight: '12px',
                    }}
                  ></div>
                </div>
                <span
                  className={`font-bodyLato flex flex-row ${
                    getDifferenceInMinutes(data?.schTime, '') >= 0
                      ? 'text-violet-900'
                      : 'text-[#b03d32]'
                  }`}
                >
                  {/* <HighlighterStyle
searchKey={searchKey}
source={row.Source.toString()}
/> */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="calendar_icon inline mr-1 mt-[2px]"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <div className=" mr-2 inline">
                    <div className="font-bodyLato">
                      {prettyDateTime(data?.schTime)}
                    </div>
                  </div>
                  <span className="italic">
                    {getDifferenceInMinutes(data?.schTime, '') >= 0
                      ? 'Complete in'
                      : 'Delayed by'}{' '}
                    {'  '}
                    {Math.abs(getDifferenceInMinutes(data?.schTime, '')) > 60
                      ? Math.abs(getDifferenceInMinutes(data?.schTime, '')) >
                        8640
                        ? `${Math.abs(
                            getDifferenceInDays(data?.schTime, '')
                          )} Days `
                        : `${Math.abs(
                            getDifferenceInHours(data?.schTime, '')
                          )} Hours `
                      : `${Math.abs(
                          getDifferenceInMinutes(data?.schTime, '')
                        )} Min`}{' '}
                  </span>
                </span>
              </div>
            </div>
          )}
        </span>
        <div className="relative flex flex-col  group">
          <div
            className="absolute bottom-0 right-0 flex-col items-center hidden mb-6 group-hover:flex"
            style={{ zIndex: '9999' }}
          >
            <span
              className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
              style={{
                color: 'black',
                background: '#e2c062',
                maxWidth: '100%',
              }}
            >
              <div className="italic flex flex-col">
                <div className="font-bodyLato">Assigned To {data?.by}</div>
              </div>
            </span>
            <div
              className="w-3 h-3  -mt-2 rotate-45 bg-black"
              style={{
                background: '#e2c062',
                marginRight: '12px',
              }}
            ></div>
          </div>

          <span className="font-thin text-[#867777]   font-bodyLato text-[12px]  ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className="inline mr-1"
            >
              <path
                d="M9.357 1C10.264 1 11 1.736 11 2.643V6.07c0 .436-.173.854-.481 1.162L7.232 10.52a1.643 1.643 0 01-2.323 0L1.48 7.09c-.64-.64-.64-1.68.001-2.322L4.768 1.48C5.076 1.173 5.494 1 5.93 1h3.427zm-.07.91H5.93a.805.805 0 00-.569.235L2.145 5.362a.805.805 0 000 1.138L5.5 9.855a.805.805 0 001.138 0l3.217-3.217a.805.805 0 00.236-.569V2.713a.804.804 0 00-.804-.804zM7.364 3.726a.91.91 0 110 1.818.91.91 0 010-1.818z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
            {data?.by}
          </span>
        </div>
      </section>
      {data?.sts != 'completed' && hoverTasId === data?.ct && (
        <section className="flex flex-row">
          <span
            className="inline-flex  font-thin text-[#0091ae]   font-bodyLato text-[12px] ml-2  text-[#867777] hover:text-green-900"
            onClick={() => EditTaskOpenWindowFun(data)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </span>
          <span
            onClick={() => delFun(data)}
            className="inline-flex  placeholder:font-thin text-[#0091ae]  cursor-pointer font-bodyLato text-[12px] ml-2  text-[#867777] hover:text-green-900"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 21 21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(3 2)"
              >
                <path d="m2.5 2.5h10v12c0 1.1045695-.8954305 2-2 2h-6c-1.1045695 0-2-.8954305-2-2zm5-2c1.0543618 0 1.91816512.81587779 1.99451426 1.85073766l.00548574.14926234h-4c0-1.1045695.8954305-2 2-2z" />
                <path d="m.5 2.5h14" />
                <path d="m5.5 5.5v8" />
                <path d="m9.5 5.5v8" />
              </g>
            </svg>
          </span>
        </section>
      )}
      {/* <span>
          <span
            className=" text-[12px]  text-[#FF8C02] "
            onClick={() => fUpdateSchedule(data)}
          >
            Busy
          </span>
          <span
            className=" text-[12px] ml-4  text-[#FF8C02] "
            onClick={() => fUpdateSchedule(data)}
          >
            RNR
          </span>
        </span> */}
    </section>
  )
}
