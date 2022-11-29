// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import { useEffect, useState } from 'react'

import { CalendarIcon, EyeIcon } from '@heroicons/react/outline'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'
import { yearPickerClasses } from '@mui/lab'
import { startOfWeek, startOfDay, startOfMonth, subMonths } from 'date-fns'
import { Line } from 'react-chartjs-2'
import DatePicker from 'react-datepicker'
import { Chart } from 'react-google-charts'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import { Link, routes } from '@redwoodjs/router'

import { sourceList, sourceListItems } from 'src/constants/projects'
import { USER_ROLES } from 'src/constants/userRoles'
import {
  getAllProjects,
  getMyLeadsByDate,
  getTodayTodoLeadsDataByUser,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import ProjectStatsCard from './ProjectStatsCard/ProjectStatsCard'

import CSVDownloader from 'src/util/csvDownload'
import { SlimSelectBox } from 'src/util/formFields/slimSelectBoxField'

import { serialMyData } from './LeadsTeamReport/SourceLeads'
import { serialEmployeeLeadData } from './LeadsTeamReport/serialEmployeeLeadData'

import { prettyDate } from 'src/util/dateConverter'

const valueFeedData = [
  { k: 'Due', v: 300, pic: '' },
  { k: 'Pending', v: 100, pic: '' },
  { k: 'Completed', v: 25, pic: '' },
  { k: 'Total', v: 50, pic: '' },
]

const MyLeadsReportHome = ({ project, onSliderOpen = () => {}, isEdit }) => {
  const { area, builderName, location, projectName, projectType } = project
  const d = new window.Date()
  const torrowDate = new Date(
    +new Date().setHours(0, 0, 0, 0) + 86400000
  ).getTime()
  const todayDate = new Date(+new Date().setHours(0, 0, 0, 0)).getTime()
  const { user } = useAuth()
  const { orgId, access, uid } = user
  const [showInproFSource, setShowInproFSource] = useState(false)
  const [dateRange, setDateRange] = React.useState([null, null])
  const [isOpened, setIsOpened] = React.useState(false)
  const [startDate, endDate] = dateRange
  const [showArchiFSource, setShowArchiFSource] = useState(false)
  const [sourceDateRange, setSourceDateRange] = React.useState(
    startOfDay(d).getTime()
  )
  const [schFetCleanData, setSchFetCleanData] = useState([])
  const [searchKey, setSearchKey] = useState(['pending'])
  const [schFetData, setSchFetData] = React.useState([])
  const [selLeadsOf, setSelLeadsOf] = useState({
    label: 'My Tasks Leads',
    value: 'mytasks',
  })
  const [selProjectIs, setSelProject] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })
  const [todaySch, setTodaySchL] = useState([])
  const [dueTasksList, setDueTasksList] = useState([])
  const [pendTasksList, setPendTasksList] = useState([])

  const [compTasksList, setCompTasksList] = useState([])

  const [totalTasksList, setTotalTasksList] = useState([])

  const [empListTuned, setEmployeeListTuned] = useState([])
  const [empFiltListTuned, setFiltEmployeeListTuned] = useState([])
  const [projectList, setprojectList] = useState([])
  const [projectFilList, setFiltProjectListTuned] = useState([])
  const [EmpDownloadRows, setEmpDownloadRows] = React.useState([])
  const [leadsFetchedRawData, setLeadsFetchedRawData] = useState([])
  const [sourceListTuned, setSourceListTuned] = useState([])
  const [viewProjs, selProjs] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })

  const [viewSourceStats1A, SetViewSourceStats1A] = useState([
    'label',
    'total',
    'inprogress',
    'booked',
    'archieve',
    'others',
  ])

  function demoOnClick(e) {
    console.log(e.name)
  }
  useEffect(() => {
    fetchTasksCount()
    getProjectsListFun()
    getLeadsDataFun()
  }, [])
  React.useEffect(() => {
    if (todaySch) {
      // const z = todaySch?.filter((item) => {
      //   if (selLeadsOf?.value == 'mytasks') {
      //     if (selProjectIs?.value === 'allprojects') {
      //       return item?.leadUser?.assignedTo === user?.uid
      //     } else {
      //       return (
      //         item?.leadUser?.assignedTo === user?.uid &&
      //         item?.leadUser.ProjectId === selProjectIs?.value
      //       )
      //     }
      //   } else if (selLeadsOf?.value === 'teamtasks') {
      //     return selProjectIs?.value === 'allprojects'
      //       ? item
      //       : item?.leadUser.ProjectId === selProjectIs?.value
      //   } else {
      //     if (selProjectIs?.value === 'allprojects') {
      //       return item?.leadUser?.assignedTo === selLeadsOf?.value
      //     } else {
      //       return (
      //         item?.assignedTo === selLeadsOf?.value &&
      //         item?.leadUser?.ProjectId === selProjectIs?.value
      //       )
      //     }
      //   }
      // })
      console.log('zoro i s', todaySch)
      sorterFilterFun(todaySch)
    } else {
      console.log('my value is ', todaySch)
    }
  }, [todaySch, searchKey, selLeadsOf, selProjectIs])

  useEffect(() => {
    getLeadsDataFun()
  }, [sourceDateRange])

  useEffect(() => {
    setFiltEmployeeListTuned(empListTuned)
  }, [empListTuned])

  useEffect(() => {
    if (viewProjs?.value == 'allprojects') {
      setFiltProjectListTuned(projectList)
    } else {
      const z = projectList.filter((da) => {
        return da.value == viewProjs?.value
      })
      setFiltProjectListTuned(z)
      // viewSource
    }
  }, [projectList, viewProjs])
  const fetchTasksCount = async () => {
    {
      const todoData = await getTodayTodoLeadsDataByUser(
        orgId,
        (querySnapshot) => {
          let pro
          let y = []
          setTodaySchL([])
          console.log('git values is 2', querySnapshot.docs)
          const projects = querySnapshot.docs.map(async (docSnapshot) => {
            const x = docSnapshot.data()
            const { staDA } = x

            // if ('Today' == 'Today1') {

            //   y = staDA
            // } else {
            //   y = staDA.filter((da) => x[da]['schTime'] > torrowDate)
            // }
            // y = staDA.filter((da) => x[da]['schTime'] > torrowDate)
            y = staDA

            if (y.length > 0) {
              x.uid = docSnapshot.id

              return x
            } else {
              return 'remove'
            }
          })
          //  get the task details from docid
          if (projects.length > 0) {
            projects.filter((data) => data != undefined)
            Promise.all(projects).then(function (results) {
              console.log(
                'my values are ',
                results.filter((data) => data != 'remove')
              )
              results.filter((data) => data != 'remove')
              setTodaySchL(results.filter((data) => data != 'remove'))
            })
          } else {
            console.log('my values are 1 ', projects)
          }
        },
        { uid: uid, type: 'today' },
        () => {
          console.log('error')
        }
      )
      await console.log('what are we', todoData)
    }
  }
  const getLeadsDataFun = async () => {
    startOfWeek(d)
    console.log('date is ==>', d, subMonths(startOfMonth(d), 6).getTime())
    const { uid, displayName, orgId } = user

    const unsubscribe = getMyLeadsByDate(orgId, {
      cutoffDate: sourceDateRange,
      uid: uid,
      isCp: user?.role?.includes(USER_ROLES.CP_AGENT),
    })
    console.log('my Array data is delayer 1 ', unsubscribe)
    await setLeadsFetchedRawData(await unsubscribe)
    await getProjectsListFun()

    const y = await serialMyData(
      sourceListItems,
      await unsubscribe,
      'by_source'
    )
    const z = await setEmployeeListTuned(
      serialEmployeeLeadData(
        [{ label: displayName, name: displayName, value: uid }],
        await unsubscribe
      )
    )

    await setSourceListTuned(y)
    await console.log('whati is the data ', y, z)
    return unsubscribe
  }
  const getProjectsListFun = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        // setprojectList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.uid
        })
        console.log('fetched users list is', projectsListA)

        setprojectList([
          ...projectsListA,
          ...[{ label: 'others', value: 'others' }],
        ])
      },
      (error) => setprojectList([])
    )

    return unsubscribe
  }

  const sorterFilterFun = async (todaySch) => {
    console.log('max check it my value is ', todaySch)
    const streamedTodo = []
    const dueTodo = []

    const pendTodo = []

    const compTodo = []

    let y = []

    //  updaing the lookup array to look for pending status when ever user selects upcoming as there is no sta

    // let TaskStatusReq = []
    // if (searchKey.includes('upcoming')) {
    //   TaskStatusReq = ['pending']
    // } else {
    //   TaskStatusReq = searchKey
    // }

    // y = await todaySch?.filter((item) => {
    //   console.log('yo you', item?.staA, searchKey, TaskStatusReq)
    //   if (selLeadsOf?.value == 'mytasks') {
    //     return (
    //       item?.staA.some((r) => TaskStatusReq.includes(r)) &&
    //       item?.assignedTo === user?.uid
    //     )
    //   } else if (selLeadsOf?.value === 'teamtasks') {
    //     return item?.staA.some((r) => TaskStatusReq.includes(r))
    //   } else {
    //     return (
    //       item?.staA.some((r) => TaskStatusReq.includes(r)) &&
    //       item?.assignedTo === selLeadsOf?.value
    //     )
    //   }
    // })

    // await setSchFetData(todaySch)
    const z = todaySch.map((data1) => {
      console.log('master log ===>')
      data1['staDA'].map((data2) => {
        const y = data1[data2]

        if (
          y['sts'] === 'pending' &&
          y['assTo'] != undefined &&
          y['schTime'] < torrowDate &&
          y['schTime'] >= todayDate
        ) {
          // make sure if date less than tomorrow is added
          y.uid = data1.uid
          y.id = data1.uid
          y.leadUser = data1.leadUser
          streamedTodo.push(y)
          pendTodo.push(y)
          return y
        }

        if (
          y['sts'] === 'pending' &&
          y['assTo'] != undefined &&
          y['schTime'] < todayDate
        ) {
          // make sure if date less than tomorrow is added
          y.uid = data1.uid
          y.id = data1.uid
          y.leadUser = data1.leadUser
          streamedTodo.push(y)
          // pendTodo.push(y)
          dueTodo.push(y)
          return y
        }
        // if (
        //   y['sts'] === 'pending' &&
        //   y['schTime'] >= torrowDate

        // ) {
        //   // make sure if date less than tomorrow is added
        //   y.uid = data1.uid
        //   y.id = data1.uid
        //   y.leadUser = data1.leadUser
        //   streamedTodo.push(y)
        //   console.log('my value is 1 yo i', y)
        //   return y
        // }
        if (
          y['sts'] === 'completed' &&
          y['comT'] > todayDate &&
          y['comT'] < torrowDate
        ) {
          // make sure if date less than tomorrow is added
          y.uid = data1.uid
          y.id = data1.uid
          y.leadUser = data1.leadUser
          streamedTodo.push(y)
          compTodo.push(y)
          console.log('my value is 1 yo i comp', y)
          return y
        }

        // if (searchKey.length == 1 && searchKey.includes('upcoming')) {
        //   // make sure if date greater than tomorrow is added
        //   if (y['schTime'] > torrowDate) {
        //     y.uid = data1.uid
        //     y.leadUser = data1.leadUser
        //     streamedTodo.push(y)
        //     console.log('my value is 1', y)
        //     return y
        //   } else {
        //     return
        //   }
        // }

        // y.uid = data1.uid
        // y.id = data1.uid
        // y.leadUser = data1.leadUser
        // streamedTodo.push(y)
        console.log('my value is 1 ', y)
        return y
      })
    })
    // this is for list view

    setSchFetCleanData(streamedTodo)
    setDueTasksList(dueTodo)
    setPendTasksList(pendTodo)
    setCompTasksList(compTodo)
    setTotalTasksList(streamedTodo)

    console.log(
      'my value is 1 ===',
      streamedTodo,
      dueTasksList,
      setPendTasksList
    )
  }

  // useEffect(() => {
  //   if (selProjectEmpIs?.value === 'allprojects') {
  //     setEmployeeListTuned(
  //       serialEmployeeLeadData(usersList, leadsFetchedRawData)
  //     )
  //     setEmpRawFilData(leadsFetchedRawData)
  //   } else if (selProjectEmpIs?.value === 'others') {
  //     const projectWideA = leadsFetchedRawData.filter(
  //       (d) => d?.ProjectId === '' || d?.ProjectId === undefined
  //     )

  //     setEmployeeListTuned(serialEmployeeLeadData(usersList, projectWideA))

  //     setEmpRawFilData(projectWideA)
  //   } else {
  //     const projectWideA = leadsFetchedRawData.filter(
  //       (d) => d?.ProjectId === selProjectEmpIs?.value
  //     )

  //     setEmployeeListTuned(serialEmployeeLeadData(usersList, projectWideA))

  //     setEmpRawFilData(projectWideA)
  //   }
  // }, [leadsFetchedRawData, selProjectEmpIs])
  const showColumnsSourceFun = async (id) => {
    const y = ['new', 'followup', 'visitfixed', 'visitdone', 'neogotiation']
    const y1 = ['notinterested', 'dead', 'blocked', 'junk']
    if (id === 'inprogress') {
      const check = !showInproFSource
      await setShowInproFSource(check)
      const x = viewSourceStats1A
      if (check) {
        SetViewSourceStats1A([...x, ...y])
      } else {
        const z = viewSourceStats1A.filter((d1) => {
          return !y.includes(d1)
        })
        await SetViewSourceStats1A(z)
      }
    } else if (id === 'archieve') {
      const check = !showArchiFSource
      await setShowArchiFSource(check)
      const x = await viewSourceStats1A
      if (check) {
        await SetViewSourceStats1A([...x, ...y1])
      } else {
        const z = viewSourceStats1A.filter((d1) => {
          return !y1.includes(d1)
        })
        await SetViewSourceStats1A(z)
      }
    }
  }

  return (
    <div>
      <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
              {/* <Link
                className="flex items-center"
                to={routes.projectEdit({ uid })}
              > */}
              <img className="w-16 h-16" alt="" src="/apart.svg"></img>
              <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                {projectName}
              </span>
              {/* </Link> */}
            </div>
            <div className=" mt-10 grid grid-cols-1 gap-7">
              <span className="min-w-100 ">
                <span>
                  <div
                    className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                    style={{ backgroundColor: '#fef7f7' }}
                  >
                    <div className="flex items-center flex-row px-0  pl-0 mb-2 ">
                      {/* <h1 className="text-lg font-medium">redefine.</h1> */}
                      {/* <img className="w-8 h-8" alt="" src={'/m4.png'}></img> */}
                      <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 mt-4 ">
                        {`Task Stats of ${user.displayName} for Today`}
                      </div>
                    </div>

                    {/* <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                      {'Does not include future absense requests'}
                    </div> */}
                    {/* <section className="flex ml-auto mt-[18px]">
                      {!isEdit && (
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                          <EyeIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Today
                        </span>
                      )}

                      <button onClick={onSliderOpen}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Current Week
                        </span>
                      </button>
                      <button onClick={onSliderOpen}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Last 6 Months
                        </span>
                      </button>
                    </section> */}

                    <div className="grid grid-cols-2 gap-0">
                      <ul className="flex-1 p-0 mt-8 ml-2 mr-2 max-w-[300px] border-r pr-10  border-slate-400 leading-7 text-gray-900  border-gray-200">
                        {[
                          { k: 'Due', v: dueTasksList.length, pic: '' },
                          { k: 'Pending', v: pendTasksList.length, pic: '' },
                          { k: 'Completed', v: compTasksList.length, pic: '' },
                          { k: 'Total', v: totalTasksList.length, pic: '' },
                        ].map((data, i) => {
                          return (
                            <li
                              key={i}
                              className="flex justify-between px-4 py-1 w-full mb-2  font-semibold text-left border-dotted border-b border-gray-300 "
                            >
                              <span className="inline-flex">
                                <span className="text-[16px] text-gray-900 font-light  text-gray-900">
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
                                  {data.v.toLocaleString('en-IN')}
                                </span>
                              </div>
                            </li>
                          )
                        })}
                      </ul>

                      <section
                        className=" mt-[40px]"
                        style={{ marginLeft: '-220px' }}
                      >
                        <BarChart
                          width={600}
                          height={300}
                          data={[
                            {
                              name: 'Due',
                              count: dueTasksList.length,
                              pv: 9800,
                              amt: 2290,
                            },
                            {
                              name: 'Pending',
                              count: pendTasksList.length,
                              pv: 1398,
                              amt: 2210,
                            },
                            {
                              name: 'Completed',
                              count: compTasksList.length,
                              pv: 9800,
                              amt: 2290,
                            },
                          ]}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="count"
                            barSize={40}
                            fill="#97E3D5"
                            onClick={demoOnClick}
                          />
                        </BarChart>
                      </section>
                    </div>
                  </div>
                </span>
              </span>
            </div>
            <div
              className="flex flex-col  mt-14 drop-shadow-md rounded-lg  px-4"
              style={{ backgroundColor: '#ebfafa' }}
            >
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <div className=" text-md font-bold leading-none pl-0 mt-4 border-b pb-4 mb-4 ">
                      {`My Leads Stats`}
                    </div>
                    {/*
                    <section className="flex flex-row justify-between mt-[18px]">
                      <section className="flex">
                        {!isEdit && (
                          // <Link to={routes.projectEdit({ uid })}>
                          <button
                            onClick={() => {
                              setDateRange([null, null])

                              setSourceDateRange(startOfDay(d).getTime())
                            }}
                          >
                            <span
                              className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                                sourceDateRange === startOfDay(d).getTime()
                                  ? 'font-semibold text-pink-800 bg-pink-200 '
                                  : 'text-green-800 bg-green-200 '
                              }rounded-full`}
                            >
                              <EyeIcon
                                className="h-3 w-3 mr-1"
                                aria-hidden="true"
                              />
                              Now
                            </span>
                          </button>
                          // </Link>
                        )}

                        <button
                          onClick={() => {
                            setDateRange([null, null])

                            setSourceDateRange(startOfWeek(d).getTime())
                          }}
                        >
                          <span
                            className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                              sourceDateRange === startOfWeek(d).getTime()
                                ? 'font-semibold text-pink-800 bg-pink-200 '
                                : 'text-green-800 bg-green-200 '
                            }rounded-full`}
                          >
                            <CalendarIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            This Week
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setDateRange([null, null])

                            setSourceDateRange(startOfMonth(d).getTime())
                          }}
                        >
                          <span
                            className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                              sourceDateRange === startOfMonth(d).getTime()
                                ? 'font-semibold text-pink-800 bg-pink-200 '
                                : 'text-green-800 bg-green-200 '
                            }rounded-full`}
                          >
                            <CalendarIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            This Month
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setDateRange([null, null])

                            setSourceDateRange(
                              subMonths(startOfMonth(d), 6).getTime()
                            )
                          }}
                        >
                          <span
                            className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                              sourceDateRange ===
                              subMonths(startOfMonth(d), 6).getTime()
                                ? 'font-semibold text-pink-800 bg-pink-200 '
                                : 'text-green-800 bg-green-200 '
                            } rounded-full`}
                          >
                            <CalendarIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            Last 6 Months
                          </span>
                        </button>
                        <span className="max-h-[42px] mt-[2px] ml-3">
                          <label className="bg-green   pl-   flex flex-row cursor-pointer">
                            {!isOpened && (
                              // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                              <span
                                className={`flex ml-1 mt-[6px] items-center h-6 px-3 text-xs ${
                                  sourceDateRange === startDate?.getTime()
                                    ? 'font-semibold text-pink-800 bg-pink-200 '
                                    : 'text-green-800 bg-green-200 '
                                } rounded-full`}
                                onClick={() => {
                                  setIsOpened(true)
                                }}
                              >
                                <CalendarIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                {startDate == null ? 'Custom' : ''}
                                {startDate != null
                                  ? prettyDate(startDate?.getTime() + 21600000)
                                  : ''}
                                {endDate != null ? '-' : ''}
                                {endDate != null
                                  ? prettyDate(endDate?.getTime() + 21600000)
                                  : ''}
                              </span>
                            )}
                            {
                              <span
                                className="inline"
                                style={{
                                  visibility: isOpened ? 'visible' : 'hidden',
                                }}
                              >
                                <DatePicker
                                  className={`z-10 pl- py-1 px-3 mt-[7px] inline text-xs text-[#0091ae] placeholder-green-800 cursor-pointer  max-w-fit   ${
                                    sourceDateRange === startDate?.getTime()
                                      ? 'font-semibold text-pink-800 bg-pink-200 '
                                      : 'text-green-800 bg-green-200 '
                                  } rounded-full`}
                                  onCalendarClose={() => setIsOpened(false)}
                                  placeholderText="&#128467;	 Custom"
                                  onChange={(update) => {
                                    setDateRange(update)
                                  }}
                                  selectsRange={true}
                                  startDate={startDate}
                                  endDate={endDate}
                                  isClearable={true}
                                  onClear={() => {
                                    console.log('am i cleared')
                                  }}
                                  dateFormat="MMM d, yyyy "
                                />
                              </span>
                            }
                          </label>
                        </span>
                      </section>
                      <div className=" flex   "></div>
                    </section> */}
                    <table className="min-w-full text-center mt-6">
                      <thead className="border-b">
                        <tr>
                          {[
                            { label: 'Name', id: 'label' },
                            { label: 'Total', id: 'total' },
                            { label: 'InProgress', id: 'inprogress' },
                            { label: 'New', id: 'new' },
                            { label: 'Followup', id: 'followup' },
                            { label: 'VisitFixed', id: 'visitfixed' },
                            { label: 'VisitDone', id: 'visitdone' },
                            { label: 'Neogotiation', id: 'neogotiation' },
                            { label: 'Booked', id: 'booked' },
                            { label: 'NotInterested', id: 'notinterested' },
                            { label: 'Dead', id: 'dead' },
                            { label: 'Blocked', id: 'blocked' },
                            { label: 'Junk', id: 'junk' },
                            { label: 'Archieve', id: 'archieve' },
                            { label: 'Others', id: 'others' },
                          ].map((d, i) => (
                            <th
                              key={i}
                              scope="col"
                              className={`text-sm font-medium text-gray-900 px-6 py-4 ${
                                ['Name'].includes(d.label) ? 'text-left' : ''
                              }`}
                              style={{
                                display: viewSourceStats1A.includes(d.id)
                                  ? ''
                                  : 'none',
                                color:
                                  ['inprogress'].includes(d.id) &&
                                  showInproFSource
                                    ? 'blue'
                                    : ['archieve'].includes(d.id) &&
                                      showArchiFSource
                                    ? 'blue'
                                    : 'black',
                              }}
                              onClick={() => {
                                if (['inprogress', 'archieve'].includes(d.id))
                                  showColumnsSourceFun(d.id)
                              }}
                            >
                              {d.label}
                              {d.id === 'inprogress' && !showInproFSource && (
                                <ChevronDoubleRightIcon
                                  className="w-4 h-4 inline"
                                  aria-hidden="true"
                                />
                              )}
                              {d.id === 'inprogress' && showInproFSource && (
                                <ChevronDoubleLeftIcon
                                  className="w-4 h-4 inline"
                                  aria-hidden="true"
                                />
                              )}
                              {d.id === 'archieve' && !showArchiFSource && (
                                <ChevronDoubleRightIcon
                                  className="w-4 h-4 inline"
                                  aria-hidden="true"
                                />
                              )}
                              {d.id === 'archieve' && showArchiFSource && (
                                <ChevronDoubleLeftIcon
                                  className="w-4 h-4 inline"
                                  aria-hidden="true"
                                />
                              )}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {empListTuned.map((data, i) => {
                          return (
                            <tr
                              className={`  ${
                                i % 2 === 0
                                  ? 'bg-white border-blue-200'
                                  : 'bg-gray-100'
                              }`}
                              key={i}
                            >
                              <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                                {data?.label}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {data?.Total?.length}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {data?.inprogress?.length}
                              </td>
                              {showInproFSource && (
                                <>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.new?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.followup?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.visitfixed?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.visitdone?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.negotiation?.length}
                                  </td>
                                </>
                              )}
                              <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {data?.booked?.length}
                              </td>
                              {showArchiFSource && (
                                <>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.notinterested?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.dead?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.blocked?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.junk?.length}
                                  </td>
                                </>
                              )}
                              <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {data?.archieve?.length}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {data?.others?.length}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col  mt-14 drop-shadow-md rounded-lg  px-4"
              style={{ backgroundColor: '#ebfafa' }}
            >
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <div className=" text-md font-bold leading-none pl-0 mt-4 border-b pb-4 mb-4 ">
                      {`Source vs My Status `}
                    </div>

                    {/* <section className="flex flex-row justify-between mt-[18px]">
                      <section className="flex">
                        {!isEdit && (
                          // <Link to={routes.projectEdit({ uid })}>
                          <button
                            onClick={() => {
                              setDateRange([null, null])

                              setSourceDateRange(startOfDay(d).getTime())
                            }}
                          >
                            <span
                              className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                                sourceDateRange === startOfDay(d).getTime()
                                  ? 'font-semibold text-pink-800 bg-pink-200 '
                                  : 'text-green-800 bg-green-200 '
                              }rounded-full`}
                            >
                              <EyeIcon
                                className="h-3 w-3 mr-1"
                                aria-hidden="true"
                              />
                              Now
                            </span>
                          </button>
                          // </Link>
                        )}

                        <button
                          onClick={() => {
                            setDateRange([null, null])

                            setSourceDateRange(startOfWeek(d).getTime())
                          }}
                        >
                          <span
                            className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                              sourceDateRange === startOfWeek(d).getTime()
                                ? 'font-semibold text-pink-800 bg-pink-200 '
                                : 'text-green-800 bg-green-200 '
                            }rounded-full`}
                          >
                            <CalendarIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            This Week
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setDateRange([null, null])

                            setSourceDateRange(startOfMonth(d).getTime())
                          }}
                        >
                          <span
                            className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                              sourceDateRange === startOfMonth(d).getTime()
                                ? 'font-semibold text-pink-800 bg-pink-200 '
                                : 'text-green-800 bg-green-200 '
                            }rounded-full`}
                          >
                            <CalendarIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            This Month
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setDateRange([null, null])

                            setSourceDateRange(
                              subMonths(startOfMonth(d), 6).getTime()
                            )
                          }}
                        >
                          <span
                            className={`flex ml-2 mt-[5px] items-center h-6 px-3 text-xs ${
                              sourceDateRange ===
                              subMonths(startOfMonth(d), 6).getTime()
                                ? 'font-semibold text-pink-800 bg-pink-200 '
                                : 'text-green-800 bg-green-200 '
                            } rounded-full`}
                          >
                            <CalendarIcon
                              className="h-3 w-3 mr-1"
                              aria-hidden="true"
                            />
                            Last 6 Months
                          </span>
                        </button>
                        <span className="max-h-[42px] mt-[2px] ml-3">
                          <label className="bg-green   pl-   flex flex-row cursor-pointer">
                            {!isOpened && (
                              // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                              <span
                                className={`flex ml-1 mt-[6px] items-center h-6 px-3 text-xs ${
                                  sourceDateRange === startDate?.getTime()
                                    ? 'font-semibold text-pink-800 bg-pink-200 '
                                    : 'text-green-800 bg-green-200 '
                                } rounded-full`}
                                onClick={() => {
                                  setIsOpened(true)
                                }}
                              >
                                <CalendarIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                {startDate == null ? 'Custom' : ''}
                                {startDate != null
                                  ? prettyDate(startDate?.getTime() + 21600000)
                                  : ''}
                                {endDate != null ? '-' : ''}
                                {endDate != null
                                  ? prettyDate(endDate?.getTime() + 21600000)
                                  : ''}
                              </span>
                            )}
                            {
                              <span
                                className="inline"
                                style={{
                                  visibility: isOpened ? 'visible' : 'hidden',
                                }}
                              >
                                <DatePicker
                                  className={`z-10 pl- py-1 px-3 mt-[7px] inline text-xs text-[#0091ae] placeholder-green-800 cursor-pointer  max-w-fit   ${
                                    sourceDateRange === startDate?.getTime()
                                      ? 'font-semibold text-pink-800 bg-pink-200 '
                                      : 'text-green-800 bg-green-200 '
                                  } rounded-full`}
                                  onCalendarClose={() => setIsOpened(false)}
                                  placeholderText="&#128467;	 Custom"
                                  onChange={(update) => {
                                    setDateRange(update)
                                  }}
                                  selectsRange={true}
                                  startDate={startDate}
                                  endDate={endDate}
                                  isClearable={true}
                                  onClear={() => {
                                    console.log('am i cleared')
                                  }}
                                  dateFormat="MMM d, yyyy "
                                />
                              </span>
                            }
                          </label>
                        </span>
                      </section>
                      <div className=" flex   "></div>
                    </section> */}
                    <table className="min-w-full text-center mt-6">
                      <thead className="border-b">
                        <tr>
                          {[
                            { label: 'Source', id: 'label' },
                            { label: 'Total', id: 'total' },
                            { label: 'InProgress', id: 'inprogress' },
                            { label: 'New', id: 'new' },
                            { label: 'Followup', id: 'followup' },
                            { label: 'VisitFixed', id: 'visitfixed' },
                            { label: 'VisitDone', id: 'visitdone' },
                            { label: 'Neogotiation', id: 'neogotiation' },
                            { label: 'Booked', id: 'booked' },
                            { label: 'NotInterested', id: 'notinterested' },
                            { label: 'Dead', id: 'dead' },
                            { label: 'Blocked', id: 'blocked' },
                            { label: 'Junk', id: 'junk' },
                            { label: 'Archieve', id: 'archieve' },
                            { label: 'Others', id: 'others' },
                          ].map((d, i) => (
                            <th
                              key={i}
                              scope="col"
                              className={`text-sm font-medium text-gray-900 px-6 py-4 ${
                                ['Source'].includes(d.label) ? 'text-left' : ''
                              }`}
                              style={{
                                display: viewSourceStats1A.includes(d.id)
                                  ? ''
                                  : 'none',
                                color:
                                  ['inprogress'].includes(d.id) &&
                                  showInproFSource
                                    ? 'blue'
                                    : ['archieve'].includes(d.id) &&
                                      showArchiFSource
                                    ? 'blue'
                                    : 'black',
                              }}
                              onClick={() => {
                                if (['inprogress', 'archieve'].includes(d.id))
                                  showColumnsSourceFun(d.id)
                              }}
                            >
                              {d.label}
                              {d.id === 'inprogress' && !showInproFSource && (
                                <ChevronDoubleRightIcon
                                  className="w-4 h-4 inline"
                                  aria-hidden="true"
                                />
                              )}
                              {d.id === 'inprogress' && showInproFSource && (
                                <ChevronDoubleLeftIcon
                                  className="w-4 h-4 inline"
                                  aria-hidden="true"
                                />
                              )}
                              {d.id === 'archieve' && !showArchiFSource && (
                                <ChevronDoubleRightIcon
                                  className="w-4 h-4 inline"
                                  aria-hidden="true"
                                />
                              )}
                              {d.id === 'archieve' && showArchiFSource && (
                                <ChevronDoubleLeftIcon
                                  className="w-4 h-4 inline"
                                  aria-hidden="true"
                                />
                              )}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sourceListTuned.map((data, i) => {
                          return (
                            <tr
                              className={`  ${
                                i % 2 === 0
                                  ? 'bg-white border-blue-200'
                                  : 'bg-gray-100'
                              }`}
                              key={i}
                            >
                              <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                                {data?.label}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {data?.Total?.length}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {data?.inprogress?.length}
                              </td>
                              {showInproFSource && (
                                <>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.new?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.followup?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.visitfixed?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.visitdone?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.negotiation?.length}
                                  </td>
                                </>
                              )}
                              <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {data?.booked?.length}
                              </td>
                              {showArchiFSource && (
                                <>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.notinterested?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.dead?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.blocked?.length}
                                  </td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                    {data?.junk?.length}
                                  </td>
                                </>
                              )}
                              <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {data?.archieve?.length}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                {data?.others?.length}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MyLeadsReportHome
