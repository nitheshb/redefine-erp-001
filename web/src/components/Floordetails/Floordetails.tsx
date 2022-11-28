/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  PuzzleIcon,
  ArrowsExpandIcon,
  PencilIcon,
  CalendarIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'

import FloorStatsCard from 'src/components/FloorStatsCard/FloorStatsCard'
import UnitsStatsCard from 'src/components/UnitsStatsCard/UnitsStatsCard'
import { getUnits, updateBlock_AddFloor } from 'src/context/dbQueryFirebase'
import SiderForm from '../SiderForm/SiderForm'
import UnitsSmallViewCard from '../unitsSmallView'
import { useSnackbar } from 'notistack'
import { Link, routes } from '@redwoodjs/router'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from 'recharts'
import PieChartProject from '../comps/pieChartProject'
import DropCompUnitStatus from '../dropDownUnitStatus'
import { DriveEtaSharp } from '@mui/icons-material'
import { useAuth } from 'src/context/firebase-auth-context'

const Floordetails = ({
  block = 'A',
  pId,
  phaseDetails,
  projectDetails,
  phaseFeed,
  BlockFeed,
  selBlock,
  source,
  setSelUnitDetails,
  setShowCostSheetWindow,
  setSelMode,
  leadDetailsObj,
}) => {
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
  } = selBlock

  const { user } = useAuth()

  const { orgId } = user
  const unitStatsData = [
    {
      id: 'Total',
      label: 'Total',
      value: totalUnitCount || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Available',
      label: 'Available',
      value: availableCount || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Sold',
      label: 'Sold',
      value: soldUnitCount || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Booked',
      label: 'Booked',
      value: bookUnitCount || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Blocked',
      label: 'Blocked',
      value: blockUnitCount || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
  ]
  const { enqueueSnackbar } = useSnackbar()
  const unitFeedData = {}
  const [unitsFeed, setUnitsFeed] = useState([])
  const [reportFeed, setReportFeed] = useState(unitStatsData)
  const [blocksViewFeature, setBlocksViewFeature] = useState('Units')
  const [unitShrink, setUnitShrink] = useState(true)
  const [filteredUnits, setFilteredUnits] = useState([])
  const [filStatus, setFilStatus] = useState(['available', 'booked', 'blocked'])
  const [filBedRooms, setFilBedRooms] = useState([1, 2, 3, 4])
  const [filBathrooms, setFilBathrooms] = useState([1, 2, 3, 4])

  const [filSuperBuildUpArea, setFilSuperBuiltUpArea] = useState([35397, 59895])

  const [filRatePerSqft, setFilRatePerSqft] = useState(12000000000000)
  const [filFacing, setFilFacing] = useState([
    'east',
    'west',
    'south',
    'north',
    'south-east',
    'south-west',
    'north-east',
    'north-west',
  ])

  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: '',
    sliderData: {},
    widthClass: 'max-w-2xl',
  })
  const handleSliderClose = () => {
    setSliderInfo({
      open: false,
      title: '',
      sliderData: {},
      widthClass: 'max-w-2xl',
    })
  }
  useEffect(() => {
    getUnitsFun()
  }, [])
  useEffect(() => {
    setReportFeed(unitStatsData)
    getUnitsFun()
  }, [selBlock])

  useEffect(() => {
    setFilteredUnits(unitsFeed)
  }, [unitsFeed])

  const valueFeedData = [
    {
      id: 'Total',
      label: 'Total',
      value: totalValue || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Available',
      label: 'Available',
      value: availValue || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Booked',
      label: 'Booked',
      value: bookValue || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Blocked',
      label: 'Blocked',
      value: blockValue || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
    {
      id: 'Hold',
      label: 'Hold',
      value: holdValue || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
  ]
  const areaFeedData = [
    {
      id: 'Total',
      label: 'Total',
      value: totalArea || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Available',
      label: 'Available',
      value: availArea || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Booked',
      label: 'Booked',
      value: bookArea || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Blocked',
      label: 'Blocked',
      value: blockArea || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
    {
      id: 'Hold',
      label: 'Hold',
      value: holdArea || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
  ]
  const handleDetailView_Close = async (kind) => {
    console.log('inside close it ')
    setShowCostSheetWindow(true)
    setSelUnitDetails(kind)
    console.log('inside close it ')
  }
  const makeFilterFun = async (id, value) => {
    // unitsFeed, setUnitsFeed

    if (id === 'Status') {
      let x = []
      if (value === 'Any') {
        x = ['available', 'booked', 'blocked']
      } else {
        await x.push(value?.toLocaleLowerCase())
      }
      await setFilStatus(x)
      await allmakeOverFun(
        x,
        filBedRooms,
        filBathrooms,
        filSuperBuildUpArea,
        filRatePerSqft,
        filFacing
      )
      // const y = await unitsFeed?.filter((da) => x.includes(da?.Status))
      // await setFilteredUnits(y)
    }
    if (id === 'facing') {
      let x = []
      if (value === 'Any') {
        x = [
          'east',
          'west',
          'south',
          'north',
          'south-east',
          'south-west',
          'north-east',
          'north-west',
        ]
      } else {
        await x.push(value?.toLocaleLowerCase())
      }
      await setFilFacing(x)
      await allmakeOverFun(
        filStatus,
        filBedRooms,
        filBathrooms,
        filSuperBuildUpArea,
        filRatePerSqft,
        x
      )
    }
    if (id === 'bed_rooms') {
      let x = []
      if (value === 'Any') {
        x = [1, 2, 3, 4]
      } else {
        await x.push(value)
      }
      await setFilBedRooms(x)
      await allmakeOverFun(
        filStatus,
        x,
        filBathrooms,
        filSuperBuildUpArea,
        filRatePerSqft,
        filFacing
      )
    }
    if (id === 'bath_rooms') {
      let x = []
      if (value === 'Any') {
        x = [1, 2, 3, 4]
      } else {
        await x.push(value)
      }
      await setFilBathrooms(x)
      await allmakeOverFun(
        filStatus,
        filBedRooms,
        x,
        filSuperBuildUpArea,
        filRatePerSqft,
        filFacing
      )
    }
    if (id === 'super_built_up_area') {
      let x = []
      if (value === 'Any') {
        x = [35397, 59895]
      } else {
        await x.push(value)
      }
      setFilSuperBuiltUpArea(x)
      await allmakeOverFun(
        filStatus,
        filBedRooms,
        filBathrooms,
        x,
        filRatePerSqft,
        filFacing
      )
    }
    if (id === 'rate_per_sqft') {
      let x = 0
      if (value === 'Any') {
        x = 12000000000000
      } else {
        x = value
      }
      setFilRatePerSqft(x)
      await allmakeOverFun(
        filStatus,
        filBedRooms,
        filBathrooms,
        filSuperBuildUpArea,
        value,
        filFacing
      )
    }

    // console.log(
    //   'filtered stuff is ',
    //   x,
    //   filBedRooms,
    //   unitsFeed[0]['bed_rooms'],
    //   filFacing,
    //   filStatus,
    //   unitsFeed[0]['Status'],
    //   filStatus.includes(unitsFeed[0]['Status']),
    //   value,
    //   unitsFeed[0][id] == value
    // )
    // console.log('id==>', id, value)
  }
  const allmakeOverFun = async (
    Status,
    bed_rooms,
    bath_rooms,
    super_built_up_area,
    rate_per_sqft,
    facing
  ) => {
    const y = await unitsFeed?.filter((da) => {
      console.log(
        'what is this',
        Status,
        Status.includes(da?.Status),
        bed_rooms.includes(da?.bed_rooms),
        bed_rooms,
        da?.bed_rooms
      )
      return (
        facing.includes(da?.facing.toLocaleLowerCase()) &&
        Status.includes(da?.Status) &&
        bed_rooms.includes(da?.bed_rooms) &&
        // bath_rooms.includes(da?.bath_rooms) &&
        // super_built_up_area.includes(da?.super_built_up_area) &&
        da?.rate_per_sqft < rate_per_sqft
      )
    })
    await setFilteredUnits(y)
  }
  const selReportFun = async (data) => {
    setReportFeed(data)
  }
  const getUnitsFun = async () => {
    console.log('get dataf un is ', selBlock, selBlock?.uid)
    const todoData = await getUnits(
      orgId,
      (querySnapshot) => {
        let pro
        const y = []
        setUnitsFeed([])
        const projects = querySnapshot.docs.map(async (docSnapshot) => {
          const x = docSnapshot.data()
          x.uid = docSnapshot.id
          const { staDA } = x
          y.push(x)
          console.log('fetched units are', x)
        })
        y.sort((a, b) => a.unit_no - b.unit_no)
        setUnitsFeed(y)
      },
      { pId: pId, blockId: selBlock?.uid || 0, type: 'today' },
      (error) => {
        console.log('error', error)
      }
    )
    await console.log('what are we', todoData)
  }

  return (
    <div className="lg:col-span-10 border ">
      <div className=" border-gray-800 bg-[#203129]  text-white">
        <ul
          className="flex justify-  rounded-t-lg border-b  "
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          {[
            { lab: 'Report', val: 'Report' },
            { lab: 'Units', val: 'Units' },
          ].map((d, i) => {
            return (
              <li key={i} className="mr-2" role="presentation">
                <button
                  className={`inline-block py-3 px-4 text-sm font-medium text-center rounded-t-lg border-b-2  hover:text-blue hover:border-gray-300   ${
                    blocksViewFeature === d.val
                      ? 'border-red border-b-10 rounded-xs'
                      : 'border-transparent'
                  }`}
                  type="button"
                  role="tab"
                  onClick={() => setBlocksViewFeature(d.val)}
                >
                  {`${d.lab} `}
                  {/* <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {blocksViewFeature === 'Report' && (
        <>
          {' '}
          <div className=" mt-10 grid grid-cols-1 gap-7">
            <span className="min-w-100 ">
              <span>
                <div
                  className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                  style={{ backgroundColor: '#EBF9F9' }}
                >
                  <div className="flex items-center flex-row px-0  pl-0 mb-2 ">
                    {/* <h1 className="text-lg font-medium">redefine.</h1> */}
                    {/* <img className="w-8 h-8" alt="" src={'/m4.png'}></img> */}
                    <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 mt-4 ">
                      {selBlock?.blockName} Report
                    </div>
                  </div>

                  {/* <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                      {'Does not include future absense requests'}
                    </div> */}
                  <section className="flex ml-auto mt-[18px]">
                    {true && (
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                        <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        Current Week
                      </span>
                    )}

                    <button>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                        <CalendarIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        This Month
                      </span>
                    </button>
                    <button>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                        <CalendarIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        Last 6 Months
                      </span>
                    </button>
                  </section>

                  <div className="grid grid-cols-2 gap-0 ">
                    <div className="mt-6">
                      {/* 1 */}
                      <div
                        className="p-2 mb-1  mx-1 inline-block"
                        style={{ minWidth: '30%' }}
                        onClick={() => selReportFun(unitStatsData)}
                      >
                        {/* <UnitsStatsCard
                            kind={data}
                            feedData={unitFeedData}
                            bg="#fef7f7"
                          /> */}

                        <div
                          className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                          style={{ backgroundColor: '#fef7f7' }}
                        >
                          <div className="flex flex-row items-center justify-between">
                            <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                              Units
                            </h3>
                          </div>
                          <div className="flex flex-col justify-between px-2">
                            {unitStatsData.map((data1, i) => (
                              <span
                                className="flex flex-row items-center justify-between mt-2"
                                key={i}
                              >
                                <span className="text-sm text-gray-700 ">
                                  {data1?.label}
                                </span>
                                <span className="text-sm font-semibold">
                                  {data1?.value}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* 2 */}
                      <div
                        className="p-2 mb-1  mx-1 inline-block"
                        style={{ minWidth: '30%' }}
                        onClick={() => selReportFun(valueFeedData)}
                      >
                        <div
                          className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                          style={{ backgroundColor: '#fef7f7' }}
                        >
                          <div className="flex flex-row items-center justify-between">
                            <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                              Values
                            </h3>
                          </div>
                          <div className="flex flex-col justify-between px-2">
                            {valueFeedData.map((data1, i) => (
                              <span
                                className="flex flex-row items-center justify-between mt-2"
                                key={i}
                              >
                                <span className="text-sm text-gray-700 ">
                                  {data1?.label}
                                </span>
                                <span className="text-sm font-semibold">
                                  {data1?.value}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 3 */}
                      <div
                        className="p-2 mb-1  mx-1 inline-block"
                        style={{ minWidth: '30%' }}
                        onClick={() => selReportFun(areaFeedData)}
                      >
                        <div
                          className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                          style={{ backgroundColor: '#fef7f7' }}
                        >
                          <div className="flex flex-row items-center justify-between">
                            <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                              Areas
                            </h3>
                          </div>
                          <div className="flex flex-col justify-between px-2">
                            {areaFeedData.map((data1, i) => (
                              <span
                                className="flex flex-row items-center justify-between mt-2"
                                key={i}
                              >
                                <span className="text-sm text-gray-700 ">
                                  {data1?.label}
                                </span>
                                <span className="text-sm font-semibold">
                                  {data1?.value}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {' '}
                      <PieChartProject reportPayload={reportFeed} />
                    </div>
                  </div>
                </div>
              </span>
            </span>
          </div>
        </>
      )}
      {blocksViewFeature === 'Units' && (
        <>
          <section className="bg-white">
            <div className="flex justify-between items-center mt-6 px-4 bg-white border-y py-2">
              <div className="flex flex-row max-w-full">
                <p className="text-sm font-semibold text-[#0091ae]">
                  <span className="text-gray-700">
                    {selBlock?.blockName}-Units
                  </span>
                </p>
              </div>
              <div>
                <DropCompUnitStatus
                  type={'Status'}
                  id={'Status'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filStatus}
                />

                <DropCompUnitStatus
                  type={'bedrooms'}
                  id={'bed_rooms'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filBedRooms}
                />
                <DropCompUnitStatus
                  type={'bathrooms'}
                  id={'bath_rooms'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filBathrooms}
                />
                <DropCompUnitStatus
                  type={'Size'}
                  id={'super_built_up_area'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filSuperBuildUpArea}
                />
                <DropCompUnitStatus
                  type={'Price'}
                  id={'rate_per_sqft'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filRatePerSqft}
                />
                <DropCompUnitStatus
                  type={'Facing'}
                  id={'facing'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filFacing}
                />
              </div>
            </div>

            <section className="flex flex-row px-6 py-4 justify-between">
              <span> </span>
              <section className="flex flex-row">
                <section className="text-sm mt-[2px] pr-2 font-blue text-[13px] italic">
                  <span className="font-blue text-[13px] italic">showing</span>{' '}
                  <span className="font-semibold font-blue">
                    {filteredUnits.length}
                  </span>{' '}
                  in{' '}
                  <span className="font-semibold font-blue">
                    {unitsFeed.length}
                  </span>{' '}
                  units
                </section>
                <section className="text-sm mt-[2px] px-2 rounded flex flex-row border">
                  <span className="w-3 h-3 mt-[4px] mr-1 bg-[#E8A190]"></span>{' '}
                  <span>Available</span>
                  <span className="w-3 h-3 ml-2 mt-[4px] mr-1 bg-[#D3F6E3]"></span>{' '}
                  <span>Booked</span>
                  <span className="w-3 h-3 ml-2 mt-[4px] mr-1 bg-[#E9E9E9]"></span>{' '}
                  <span>Blocked</span>
                </section>
                <section className="flex">
                  <button
                    onClick={() => {
                      setUnitShrink(!unitShrink)
                    }}
                    className={
                      'flex cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-md hover:bg-pink-200 hover:text-pink-800 text-green-800 '
                    }
                  >
                    {unitShrink && (
                      <>
                        <ArrowsExpandIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        Expand
                      </>
                    )}

                    {!unitShrink && (
                      <>
                        <PuzzleIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        Sleek
                      </>
                    )}
                  </button>
                </section>
              </section>
            </section>
            {['Apartments'].includes(projectDetails?.projectType?.name) && (
              <ul className="">
                {selBlock?.floorA?.map((floorDat, i) => {
                  return (
                    <li className="py-4" key={i}>
                      <section>
                        <section className="px-8 bg-red-100 w-[130px] rounded-r-2xl">
                          Fl-{floorDat}
                        </section>
                        <div className=" px-8 mt-6">
                          {filteredUnits
                            ?.filter((da) => da?.floor == i)
                            .map((data, index) => {
                              return unitShrink ? (
                                <div
                                  className="p-2 mb-1  mx-1 inline-block"
                                  key={index}
                                  onClick={() => handleDetailView_Close(data)}
                                >
                                  <UnitsSmallViewCard
                                    kind={data}
                                    feedData={unitFeedData}
                                    bg="#CCFBF1"
                                    setShowCostSheetWindow={
                                      setShowCostSheetWindow
                                    }
                                    setSelUnitDetails={setSelUnitDetails}
                                    setSelMode={setSelMode}
                                  />
                                </div>
                              ) : (
                                <div
                                  className="p-2 mb-1  mx-1 inline-block cursor-pointer"
                                  key={index}
                                  onClick={() => handleDetailView_Close(data)}
                                >
                                  <UnitsStatsCard
                                    kind={data}
                                    feedData={unitFeedData}
                                    bg="#fef7f7"
                                  />
                                </div>
                              )
                            })}
                        </div>
                      </section>
                    </li>
                  )
                })}
              </ul>
            )}
            {!['Apartments'].includes(projectDetails?.projectType?.name) && (
              <ul className="">
                <li className="py-2">
                  <section>
                    {/* <section className="px-8 bg-red-100 w-[130px] rounded-r-2xl">
                      Fl-{floorDat}
                    </section> */}
                    <div className=" px-4 mt-">
                      {filteredUnits
                        // ?.filter((da) => da?.floor == i)
                        .map((data, index) => {
                          return unitShrink ? (
                            <div
                              className=" mb-1  mx-1 inline-block"
                              key={index}
                              // onClick={() => handleDetailView_Close(data)}
                              onClick={() => {
                                console.log('check is ', leadDetailsObj)
                                setSliderInfo({
                                  open: true,
                                  title: 'View Unit',
                                  sliderData: {
                                    unitDetail: data,
                                    phaseDetail: phaseFeed,
                                    leadDetailsObj: leadDetailsObj,
                                  },
                                  widthClass: 'max-w-4xl',
                                })
                              }}
                            >
                              <UnitsSmallViewCard
                                kind={data}
                                feedData={unitFeedData}
                                bg="#CCFBF1"
                                setShowCostSheetWindow={setShowCostSheetWindow}
                                setSelUnitDetails={setSelUnitDetails}
                                setSelMode={setSelMode}
                              />
                            </div>
                          ) : (
                            <div
                              className="p-2 mb-1  mx-1 inline-block cursor-pointer"
                              key={index}
                              onClick={() => handleDetailView_Close(data)}
                            >
                              <UnitsStatsCard
                                kind={data}
                                feedData={unitFeedData}
                                bg="#fef7f7"
                              />
                            </div>
                          )
                        })}
                    </div>
                  </section>
                </li>
              </ul>
            )}
            {/* 1 */}
            {source === 'projectManagement' && (
              <div className=" z-10 flex flex-row my-[30px]">
                {['Apartments'].includes(projectDetails?.projectType?.name) && (
                  <div
                    className=" cursor-pointer  z-10 flex flex-col  max-w-md p-2 my-0 mx-3 rounded-sm inline-block min-h-[50px]  min-w-[100px] border border-dotted border-black"
                    // style={{ backgroundColor: '#fef7f7' }}
                    onClick={() => {
                      // setSliderInfo({
                      //   open: true,
                      //   title: 'Add Unit',
                      //   sliderData: {
                      //     phase: {},
                      //     block: {},
                      //   },
                      //   widthClass: 'max-w-2xl',
                      // })
                      const { uid, floorA } = selBlock
                      updateBlock_AddFloor(
                        uid,
                        floorA?.length || 0,
                        enqueueSnackbar
                      )
                      console.log('chiru is', selBlock)
                    }}
                  >
                    <div className="flex flex-col items-center justify-between">
                      <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      <h3 className="m-0 mt-1 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                        Add Floor
                      </h3>
                      {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                    </div>
                    <div className="flex flex-row justify-between px-2">
                      <span className="flex flex-row items-center justify-between mr-2">
                        <span className="text-sm font-"></span>
                      </span>
                    </div>
                  </div>
                )}
                <div
                  className=" cursor-pointer z-10 flex flex-col  max-w-md p-2 my-0 mx-3 rounded-sm inline-block min-h-[50px]  min-w-[100px] border border-dotted border-black"
                  // style={{ backgroundColor: '#fef7f7' }}
                  onClick={() => {
                    setSliderInfo({
                      open: true,
                      title: 'Add Unit',
                      sliderData: {
                        phase: {},
                        block: {},
                      },
                      widthClass: 'max-w-2xl',
                    })
                  }}
                >
                  <div className="flex flex-col items-center justify-between">
                    <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    <h3 className="m-0 mt-1 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                      Add Unit
                    </h3>
                    {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                  </div>
                  <div className="flex flex-row justify-between px-2">
                    <span className="flex flex-row items-center justify-between mr-2">
                      <span className="text-sm font-"></span>
                    </span>
                  </div>
                </div>
                {/* 2 */}
                <div
                  className="cursor-pointer  z-10 flex flex-col  max-w-md p-2 my-0  mx-4 rounded-sm inline-block  min-h-[50px]  min-w-[100px] border border-dotted border-black rounded-md"
                  onClick={() => {
                    setSliderInfo({
                      open: true,
                      title: ['Apartments'].includes(
                        projectDetails?.projectType?.name
                      )
                        ? 'Import Units'
                        : 'Import Project Units',
                      sliderData: {
                        phase: {},
                        block: {},
                      },
                      widthClass: 'max-w-6xl',
                    })
                  }}
                >
                  <div className="flex flex-col items-center justify-between">
                    <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    <h3 className="m-0  text-sm  mt-1 font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                      Import Units
                    </h3>
                    {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                  </div>
                  <div className="flex flex-row justify-between px-2">
                    <span className="flex flex-row items-center justify-between mr-2">
                      <span className="text-sm font-"></span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </section>
        </>
      )}

      {/* <div className="bg-white rounded mt-4 shadow-lg">
        {[1, 2].map((data, i) => {
          return (
            <div key={i} className="grid grid-cols-12 gap-0">
              <div className="h-42 col-span-2 border border-gray-300 content-center">
                <FloorStatsCard
                  kind={`Floor - ${data}`}
                  feedData={unitFeedData}
                  bg="#fef7f7"
                />
              </div>
              <div className="h-42 col-span-10 bg-white border border-gray-300 border-l-0">
                <div
                  id="scrolling-content"
                  className="flex overflow-x-scroll h-full"
                >
                  {[1, 2, 3, 4, 5, 6].map((data) => (
                    <div className="p-2 mb-2.5 flex-shrink-0 " key={data}>
                      <UnitsStatsCard
                        kind={data}
                        feedData={unitFeedData}
                        bg="#fef7f7"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div> */}

      <SiderForm
        open={sliderInfo.open}
        setOpen={handleSliderClose}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
        widthClass={sliderInfo.widthClass}
        myBlock={selBlock}
        pId={pId}
        phaseFeed={phaseFeed}
        BlockFeed={BlockFeed}
        projectDetails={projectDetails}
        phaseDetails={phaseDetails}
        blockDetails={selBlock}
      />
    </div>
  )
}

export default Floordetails
