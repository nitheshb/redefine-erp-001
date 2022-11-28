// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { CalendarIcon, EyeIcon, DownloadIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
import ProjectStatsCard from './ProjectStatsCard/ProjectStatsCard'

const projectFeedData = [
  { k: 'Total', v: 125, pic: '' },
  { k: 'Sold', v: 5, pic: '' },
  { k: 'Booked', v: 25, pic: '' },
  { k: 'Available', v: 85, pic: '' },
  { k: 'Hold', v: 10, pic: '' },
]
const unitFeedData = [
  { k: 'Total', v: 137500, pic: '' },
  { k: 'Sold', v: 5500, pic: '' },
  { k: 'Booked', v: 27500, pic: '' },
  { k: 'Available', v: 93500, pic: '' },
  { k: 'Hold', v: 11000, pic: '' },
]
const valueFeedData = [
  { k: 'Jan-2022', v: 4, pic: '' },
  { k: 'Feb-2022', v: 59, pic: '' },
  { k: 'Mar-2022', v: 6, pic: '' },
  { k: 'Apr-2022', v: 12, pic: '' },
]

const MyPayHomeBody = ({ project, onSliderOpen = () => {}, isEdit }) => {
  const {
    area,
    builderName,
    location,
    projectName,
    projectType,
    uid = 0,
  } = project

  const aprtConfig = [
    { k: 'Builder', v: builderName, pic: '/builder2.png' },
    { k: 'Type', v: projectType?.name, pic: '/a1.png' },
    { k: 'Location', v: location, pic: '/map.png' },
    { k: 'Area', v: `${area} sqft`, pic: '/x.png' },
    { k: 'Phases', v: 0, pic: '/p1.png' },
  ]

  // const [unitsView, setUnitsView] = useState(false)
  // const [areaView, setAreaView] = useState(false)
  // const [valueView, setValueView] = useState(false)

  // const [selbg, setSelbg] = useState('')
  // const [seldata, setSeldata] = useState('')
  // const [selkind, setSelkind] = useState('')
  // const [selcurrency, setSelcurrency] = useState('')

  // const [areabg, setAreabg] = useState('')
  // const [areaData, setAreaData] = useState('')
  // const [areakind, setAreakind] = useState('')
  // const [areaCurrency, setareaCurrency] = useState('')

  // const [valuebg, setValuebg] = useState('')
  // const [valuedata, setValuedata] = useState('')
  // const [valueKind, setValueKind] = useState('')
  // const [valueCurrency, setValueCurrency] = useState('')
  // const displayDetailView = (state, bgColor, data, kind, currency) => {
  //   // console.log('am i clicked')
  //   console.log('check')
  //   setUnitsView(!unitsView)
  //   setSelbg(bgColor)
  //   setSeldata(data)
  //   setSelkind(kind)
  //   setSelcurrency(currency)
  // }
  // const areaDetailView = (state, bgColor, data, kind, currency) => {
  //   // console.log('am i clicked')
  //   console.log('check')
  //   setAreaView(state)
  //   setAreabg(bgColor)
  //   setAreaData(data)
  //   setAreakind(kind)
  //   setareaCurrency(currency)
  // }
  // const valueDetailView = (state, bgColor, data, kind, currency) => {
  //   // console.log('am i clicked')
  //   console.log('check')
  //   setValueView(state)
  //   setValuebg(bgColor)
  //   setValuedata(data)
  //   setValueKind(kind)
  //   setValueCurrency(currency)
  // }
  const bgColors = [
    'bg-blue-100 border-blue-200',
    'bg-purple-100 border-purple-200',
    'bg-green-100 border-green-200',
    'bg-red-100 border-red-200',
    'bg-yellow-100 border-yellow-200',
    'bg-indigo-100 border-indigo-200',
    'bg-gray-50 border-gray-200',
  ]
  return (
    <div>
      <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
              <Link
                className="flex items-center"
                to={routes.projectEdit({ uid })}
              >
                <img className="w-16 h-16" alt="" src="/apart.svg"></img>
                <span className="relative z-10 flex items-center w-auto text-3xl font-bold leading-none pl-0 mt-[18px]">
                  {projectName}
                </span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7 mt-10">
            <span
            // onClick={() =>
            //   displayDetailView(
            //     !unitsView,
            //     '#ebf9f9',
            //     projectFeedData,
            //     'Units',
            //     false
            //   )
            // }
            >
              {/* sec 1 */}
              <span>
                <div
                  className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                  style={{ backgroundColor: '#f3f5ff' }}
                >
                  <div className="flex items-center flex-shrink-0  px-0  pl-0 mb-2 ">
                    {/* <h1 className="text-lg font-medium">redefine.</h1> */}
                    <img className="w-8 h-8" alt="" src={'/m4.png'}></img>
                    <span className="relative z-10 flex items-center w-auto text-xl font-bold leading-none pl-0 ml-1 ">
                      {'Downloads'}
                    </span>
                  </div>

                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <DownloadIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Pay Slips
                  </span>
                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <DownloadIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    My Tax Documents
                  </span>
                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <DownloadIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Form 16
                  </span>
                </div>
              </span>
            </span>

            <span
            // onClick={() =>
            //   areaDetailView(
            //     !areaView,
            //     '#fef7f7',
            //     unitFeedData,
            //     'Area',
            //     false
            //   )
            // }
            >
              {/* <ProjectStatsCard
                kind="Area"
                iconP="/l2.png"
                feedData={unitFeedData}
                bg="#fef7f7"
                currency={false}
              /> */}

              <span>
                <div
                  className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                  style={{ backgroundColor: '#f3f5ff' }}
                >
                  <div className="flex items-center flex-shrink-0  px-0  pl-0 mb-2 ">
                    {/* <h1 className="text-lg font-medium">redefine.</h1> */}
                    <img className="w-8 h-8" alt="" src={'/m4.png'}></img>
                    <span className="relative z-10 flex items-center w-auto text-xl font-bold leading-none pl-0 ml-1 ">
                      {'View'}
                    </span>
                  </div>

                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Incentives
                  </span>
                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    My Pay
                  </span>
                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Salary Account Details
                  </span>
                </div>
              </span>
            </span>
          </div>
          <div className="grid grid-cols-1 gap-7 mt-10">
            <span>
              <div
                className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                style={{ backgroundColor: '#f3f5ff' }}
              >
                <div className="flex items-center flex-row px-0  pl-0 mb-2 ">
                  {/* <h1 className="text-lg font-medium">redefine.</h1> */}
                  {/* <img className="w-8 h-8" alt="" src={'/m4.png'}></img> */}
                  <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 ">
                    {'Payslips'}
                  </div>
                </div>

                <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                  {'This gets generated after 10 days of salary credit'}
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

                        <div
                          className="relative flex flex-col items-center group"
                          style={{ alignItems: 'end' }}
                        >
                          <div
                            className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex"
                            style={{ alignItems: 'end', width: '300px' }}
                          >
                            <span
                              className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                              style={{
                                color: 'black',
                                background: '#e2c062',
                                maxWidth: '300px',
                              }}
                            ></span>
                            <div
                              className="w-3 h-3  -mt-2 rotate-45 bg-black"
                              style={{
                                background: '#e2c062',
                                marginRight: '12px',
                              }}
                            ></div>
                          </div>
                          <span className="text-[16px] font-medium text-gray-900">
                            <DownloadIcon
                              className="h-5 w-5 mr-1 mt-1"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </span>
          </div>
          {/* {unitsView && (
            <div className="grid grid-cols-1 gap-7 mt-10">
              <PhaseDetailsCard
                kind={selkind}
                feedData={seldata}
                bg={selbg}
                currency={selcurrency}
              />
            </div>
          )}
          {areaView && (
            <div className="grid grid-cols-1 gap-7 mt-10">
              <PhaseDetailsCard
                kind={areakind}
                feedData={areaData}
                bg={areabg}
                currency={areaCurrency}
              />
            </div>
          )}
          {valueView && (
            <div className="grid grid-cols-1 gap-7 mt-10">
              <PhaseDetailsCard
                kind={valueKind}
                feedData={valuedata}
                bg={valuebg}
                currency={valueCurrency}
              />
            </div>
          )} */}
        </div>
      </section>
    </div>
  )
}

export default MyPayHomeBody
