// import { useState } from 'react'
import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { PencilIcon, EyeIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
import PieChartProject from '../comps/pieChartProject'

const ProjectsMHomeBody = ({ project, onSliderOpen = () => {}, isEdit }) => {
  const {
    totalValue,
    soldValue,
    availValue,
    bookValue,
    blockValue,
    holdValue,
    totalArea,
    soldArea,
    availArea,
    bookArea,
    blockArea,
    holdArea,
    totalUnitCount,
    soldUnitCount,
    availableCount,
    bookUnitCount,
    blockUnitCount,
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
    { k: 'Area', v: `${totalArea} sqft`, pic: '/x.png' },
    { k: 'Phases', v: 0, pic: '/p1.png' },
  ]

  const areaFeedData = [
    { k: 'Total', totalArea: 125, pic: '' },
    { k: 'Sold', v: soldArea, pic: '' },
    { k: 'Booked', v: bookArea || 0, pic: '' },
    { k: 'Available', v: availArea || 0, pic: '' },
    { k: 'Hold', v: blockArea || 0, pic: '' },
  ]
  const unitFeedData = [
    { k: 'Total', v: totalUnitCount || 0, pic: '' },
    { k: 'Sold', v: soldUnitCount || 0, pic: '' },
    { k: 'Booked', v: bookUnitCount || 0, pic: '' },
    { k: 'Available', v: availableCount || 0, pic: '' },
    { k: 'Hold', v: blockUnitCount || 0, pic: '' },
  ]
  const valueFeedData = [
    { k: 'Total', v: totalValue || 0, pic: '' },
    { k: 'Sold', v: soldValue || 0, pic: '' },
    { k: 'Booked', v: bookValue || 0, pic: '' },
    { k: 'Collected', v: availValue || 0, pic: '' },
    { k: 'Blocked', v: blockValue || 0, pic: '' },
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

  return (
    <div>
      <Link to={routes.projectEdit({ uid })}>
        <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg  hover:text-blue-600 hover:bg-[#fcf8f2] transition duration-300 ease-in-out cursor-pointer">
          <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
            <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
              <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
                <Link
                  className="flex items-center"
                  to={routes.projectEdit({ uid })}
                >
                  <img className="w-16 h-16" alt="" src="/apart.svg"></img>
                  <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                    {projectName}
                  </span>
                </Link>
                <section className="flex ml-auto mt-[18px]">
                  {!isEdit && (
                    <>
                      <Link to={routes.projectEdit({ uid })}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                          <EyeIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Detail View
                        </span>
                      </Link>
                    </>
                  )}
                  {isEdit && (
                    <>
                      <Link to={routes.projectEdit({ uid })}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                          <EyeIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Approval Details
                        </span>
                      </Link>
                      <Link to={routes.projectEdit({ uid })}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                          <EyeIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Bank Details
                        </span>
                      </Link>
                      <Link to={routes.projectEdit({ uid })}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                          <EyeIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Broucher
                        </span>
                      </Link>
                      <Link to={routes.projectEdit({ uid })}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                          <EyeIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Plan Diagram
                        </span>
                      </Link>
                    </>
                  )}
                  <button onClick={onSliderOpen}>
                    <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                      <PencilIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      Edit
                    </span>
                  </button>
                </section>
              </div>
              <div className="flex  w-full">
                {aprtConfig.map((data, i) => {
                  return (
                    <span key={i} className="inline-flex mr-4">
                      <span className="text-sm  font-light  font text-gray-700 ">
                        {' '}
                        {data.k}:{'  '}
                      </span>
                      <span className="text-sm ml-1 font-semibold">
                        {' '}
                        {data.v}
                      </span>
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-7 mt-10">
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
                <ProjectStatsCard
                  kind="Units"
                  iconP="/m2.png"
                  feedData={unitFeedData}
                  bg="#ebf9f9"
                  currency={false}
                  projectData={project}
                />
              </span>

              <span>
                <ProjectStatsCard
                  kind="Values"
                  iconP="/m4.png"
                  feedData={valueFeedData}
                  bg="#f3f5ff"
                  currency={true}
                  projectData={project}
                />
              </span>
              <span>
                <ProjectStatsCard
                  kind="Area"
                  iconP="/m4.png"
                  feedData={areaFeedData}
                  bg="#f3f5ff"
                  currency={true}
                />
              </span>

              {/* <span>
              <section className="flex " style={{ height: '270px' }}>
                <PieChartProject />
              </section>
            </span> */}
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
      </Link>
    </div>
  )
}

export default ProjectsMHomeBody
