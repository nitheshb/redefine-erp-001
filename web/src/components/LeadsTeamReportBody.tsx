/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { CalendarIcon, EyeIcon } from '@heroicons/react/outline'

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { sourceList, sourceListItems } from 'src/constants/projects'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/firebase-auth-context'
import DatePicker from 'react-datepicker'

import {
  getAllProjects,
  getLeadsByDate,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'
import { serialMyData } from './LeadsTeamReport/SourceLeads'
import { serialEmployeeLeadData } from './LeadsTeamReport/serialEmployeeLeadData'
import { serialProjectLeadData } from './LeadsTeamReport/serialProjectLeadData'
import { SlimSelectBox } from 'src/util/formFields/slimSelectBoxField'
import CSVDownloader from 'src/util/csvDownload'
import { prettyDate } from 'src/util/dateConverter'
import { startOfWeek, startOfDay, startOfMonth, subMonths } from 'date-fns'
import { sendWhatAppTextSms1 } from 'src/util/axiosWhatAppApi'
import { serialEmployeeTaskLeadData } from './LeadsTeamReport/serialEmployeeTaskLeadData'

const valueFeedData = [
  { k: 'Total', v: 300, pic: '' },
  { k: 'Progress', v: 100, pic: '' },
  { k: 'Booked', v: 25, pic: '' },
  { k: 'RNR', v: 50, pic: '' },
  { k: 'Dead', v: 75, pic: '' },
  { k: 'Not Interested', v: 50, pic: '' },
]

const LeadsTeamReportBody = ({ project, onSliderOpen = () => {}, isEdit }) => {
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
  const d = new window.Date()
  const { user } = useAuth()
  const { orgId, access } = user
  const [leadsFetchedRawData, setLeadsFetchedRawData] = useState([])
  const [sourceListTuned, setSourceListTuned] = useState([])
  const [sourceFiltListTuned, setFiltSourceListTuned] = useState([])
  const [viewSource, selViewSource] = useState({
    label: 'All Sources',
    value: 'allsources',
  })

  const [showInproFSource, setShowInproFSource] = useState(false)
  const [showArchiFSource, setShowArchiFSource] = useState(false)
  const [usersList, setusersList] = useState([])
  const [usersCleanList, setusersCleanList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [projectFilList, setFiltProjectListTuned] = useState([])
  const [viewProjs, selProjs] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })
  const [empListTuned, setEmployeeListTuned] = useState([])
  const [empFiltListTuned, setFiltEmployeeListTuned] = useState([])
  const [viewEmp1, selEmp1] = useState({
    label: 'All Employee',
    value: 'allemployees',
  })
  const [empTaskListTuned, setTaskEmployeeListTuned] = useState([])
  const [empTaskListTunedTotal, setTaskEmployeeListTunedTotal] = useState({})

  const [projectListTuned, setProjectListTuned] = useState([])
  const [selProjectEmpIs, setSelProjectEmp] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })
  const [EmpRawFilData, setEmpRawFilData] = useState([])
  const [EmpDownloadRows, setEmpDownloadRows] = React.useState([])

  const [selProjectIs, setSelProject] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })
  const [sourceRawFilData, setSourceRawFilData] = useState([])
  const [sourceDownloadRows, setSourceDownloadRows] = React.useState([])

  const [projDownloadRows, setProjDownloadRows] = React.useState([])

  const [sourceDateRange, setSourceDateRange] = React.useState(
    startOfDay(d).getTime()
  )
  const [empDateRange, setEmpDateRange] = React.useState(
    startOfWeek(d).getTime()
  )
  const [dateRange, setDateRange] = React.useState([null, null])
  const [isOpened, setIsOpened] = React.useState(false)
  const [startDate, endDate] = dateRange
  const [viewSourceStats1A, SetViewSourceStats1A] = useState([
    'label',
    'total',
    'inprogress',
    'booked',
    'archieve',
    'others',
  ])

  useEffect(() => {
    if (dateRange[0] != null) {
      const [startDate, endDate] = dateRange
      setSourceDateRange(startDate?.getTime())
    }
  }, [dateRange])
  useEffect(() => {
    getLeadsDataFun()
  }, [])
  useEffect(() => {
    getLeadsDataFun()
  }, [sourceDateRange])

  // useEffect(() => {
  //   console.log('emp task list is ', empTaskListTuned)
  // }, [empTaskListTuned])

  useEffect(() => {
    if (selProjectIs?.value === 'allprojects') {
      setSourceListTuned(
        serialMyData(sourceListItems, leadsFetchedRawData, 'by_source')
      )
      setSourceRawFilData(leadsFetchedRawData)
    } else if (selProjectIs?.value === 'others') {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === '' || d?.ProjectId === undefined
      )
      setSourceListTuned(
        serialMyData(sourceListItems, projectWideA, 'by_source')
      )
      setSourceRawFilData(projectWideA)
    } else {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === selProjectIs?.value
      )
      setSourceListTuned(
        serialMyData(sourceListItems, projectWideA, 'by_source')
      )
      setSourceRawFilData(projectWideA)
    }
  }, [leadsFetchedRawData, selProjectIs])

  useEffect(() => {
    if (viewSource?.value == 'allsources') {
      setFiltSourceListTuned(sourceListTuned)
    } else {
      const z = sourceListTuned.filter((da) => {
        return da.value == viewSource?.value
      })
      setFiltSourceListTuned(z)
      // viewSource
    }
  }, [sourceListTuned, viewSource])

  useEffect(() => {
    if (viewEmp1?.value == 'allemployees') {
      setFiltEmployeeListTuned(empListTuned)
    } else {
      const z = empListTuned.filter((da) => {
        return da.value == viewEmp1?.value
      })
      setFiltEmployeeListTuned(z)
      // viewSource
    }
  }, [empListTuned, viewEmp1])

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

  // const [projectFilList, setFiltProjectListTuned] = useState([])
  // const [viewProjs, selProjs] = useState({
  //   label: 'All Projects',
  //   value: 'allprojects',
  // })

  useEffect(() => {
    setProjectListTuned(serialProjectLeadData(projectList, leadsFetchedRawData))
  }, [projectList, leadsFetchedRawData])
  useEffect(() => {
    if (selProjectEmpIs?.value === 'allprojects') {
      setEmployeeListTuned(
        serialEmployeeLeadData(usersList, leadsFetchedRawData)
      )
      setEmpRawFilData(leadsFetchedRawData)
    } else if (selProjectEmpIs?.value === 'others') {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === '' || d?.ProjectId === undefined
      )

      setEmployeeListTuned(serialEmployeeLeadData(usersList, projectWideA))

      setEmpRawFilData(projectWideA)
    } else {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === selProjectEmpIs?.value
      )

      setEmployeeListTuned(serialEmployeeLeadData(usersList, projectWideA))

      setEmpRawFilData(projectWideA)
    }
  }, [usersList, leadsFetchedRawData, selProjectEmpIs])
  const setEmpTaskFun = async () => {
    const x = await serialEmployeeTaskLeadData(usersCleanList)
    // await console.log('master one', x)
    // await setTaskEmployeeListTuned(x)
    const z = Promise.all(x).then(function (results) {
      console.log('master one', results)
      setTaskEmployeeListTuned(results)
      let sum1,
        now1,
        Sum7,
        Sum30,
        Sum20,
        Sum40,
        Sum50,
        Sum50M = 0

      const Total = {}
      empTaskListTuned.map((dat) => {
        sum1 = sum1 + dat.Total.length || 0
        now1 = now1 + dat.now.length || 0
        Sum7 = Sum7 + dat.sevenDays.length || 0
        Sum30 = Sum30 + dat.thirtyDays.length || 0
        Sum20 = Sum20 + dat.twentyDays.length || 0
        Sum40 = Sum40 + dat.fourtyDays.length || 0
        Sum50 = Sum50 + dat.fiftyDays.length || 0
        Sum50M = dat.fiftyDaysMore.length || 0 + Sum50M
      })
      Total.TotalSum = sum1
      Total.now = now1
      Total.Sum7 = Sum7
      Total.Sum30 = Sum30
      Total.Sum20 = Sum20
      Total.Sum40 = Sum40
      Total.Sum50 = Sum50
      Total.Sum50M = Sum50M
      setTaskEmployeeListTunedTotal(Total)
      console.log('sum1 is ', Total)

      // results.filter((data) => data != 'remove')
      return results
    })
    await console.log('setted value is 0', z)

    const a1 = await x.map((dat) => {
      const { label, fiftyDays, value } = dat
      console.log(
        'setted value is 1 ',
        label,
        value,
        fiftyDays,
        dat?.fiftyDays,
        dat
      )
      const z = {}

      z.label = dat.label
      z.sevenDays = fiftyDays?.length
      z.twentyDays = dat.twentyDays
      z.thirtyDays = dat.thirtyDays
      z.fourtyDays = dat.fourtyDays
      z.sevenDays = dat.sevenDays
      z.fiftyDays = dat.fiftyDays
      z.Total = 0

      return z
    })
    // await setTaskEmployeeListTuned(a1)
    await console.log('setted value is ', a1, a1.length)
  }
  useEffect(() => {
    getUsersDataFun1()
  }, [])
  useEffect(() => {
    setEmpTaskFun()
  }, [usersCleanList])

  const getUsersDataFun = async () => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      async (querySnapshot) => {
        const usersListA1 = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        // setusersList(usersListA)
        usersListA1.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA1)

        await setusersList([
          ...usersListA1,
          ...[{ label: 'others', value: 'others' }],
        ])
      },
      (error) => setusersList([])
    )

    return unsubscribe
  }

  const getUsersDataFun1 = async () => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      async (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        // setusersList(usersListA)
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is clean', usersListA)

        await setusersCleanList(usersListA)
      },
      (error) => setusersCleanList([])
    )

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

  const getLeadsDataFun = async () => {
    startOfWeek(d)
    console.log('date is', d, subMonths(startOfMonth(d), 6).getTime())
    const { access, uid, orgId } = user

    if (access?.includes('manage_leads')) {
      const unsubscribe = getLeadsByDate(orgId, {
        cutoffDate: sourceDateRange,
      })
      console.log('my Array data is delayer 1 ', unsubscribe)
      await setLeadsFetchedRawData(await unsubscribe)
      await getProjectsListFun()
      await getUsersDataFun()

      const y = await serialMyData(
        sourceListItems,
        await unsubscribe,
        'by_source'
      )
      await setSourceListTuned(y)
      return unsubscribe
    }
  }

  React.useEffect(() => {
    const downRows = []
    sourceRawFilData.map((data) => {
      const row = {}
      row.Date = prettyDate(data?.Date).toLocaleString()
      row.Name = data?.Name
      row.CountryCode = data['Country Code']
      row.Mobile = data?.Mobile
      row.Email = data?.Email
      row.AssignedTo = data?.assignedToObj?.name
      row.Source = data?.Source
      row.Status = data?.Status
      row.Project = data?.Project

      downRows.push(row)
    })

    setSourceDownloadRows(downRows)
  }, [sourceRawFilData])

  React.useEffect(() => {
    const downRows = []
    EmpRawFilData.map((data) => {
      const row = {}
      row.Date = prettyDate(data?.Date).toLocaleString()
      row.Name = data?.Name
      row.CountryCode = data['Country Code']
      row.Mobile = data?.Mobile
      row.Email = data?.Email
      row.AssignedTo = data?.assignedToObj?.name
      row.Source = data?.Source
      row.Status = data?.Status
      row.Project = data?.Project

      downRows.push(row)
    })

    setEmpDownloadRows(downRows)
  }, [EmpRawFilData])
  React.useEffect(() => {
    const downRows = []
    leadsFetchedRawData.map((data) => {
      const row = {}
      row.Date = prettyDate(data?.Date).toLocaleString()
      row.Name = data?.Name
      row.CountryCode = data['Country Code']
      row.Mobile = data?.Mobile
      row.Email = data?.Email
      row.AssignedTo = data?.assignedToObj?.name
      row.Source = data?.Source
      row.Status = data?.Status
      row.Project = data?.Project

      downRows.push(row)
    })

    setProjDownloadRows(downRows)
  }, [leadsFetchedRawData])
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

  const bgColors = [
    'bg-white border-blue-200',
    'bg-[#baf6d0] border-purple-200',
    'bg-white border-blue-200',
    'bg-[#baf6d0] border-purple-200',
    'bg-white border-blue-200',
    'bg-[#baf6d0] border-purple-200',
    'bg-white border-blue-200',
    'bg-[#baf6d0] border-purple-200',
  ]
  const triggerWhatsAppAlert = async () => {
    empListTuned.map((empData, i) => {
      const { label, offPh, followup, visitfixed, negotiation, booked } =
        empData
      sendWhatAppTextSms1(
        '9849000525',
        `🔥  ${label} Leads Stats As Per Today \n
      Followup -  ${followup?.length || 0}
      Visits Fixed -${visitfixed?.length || 0}
      Negotiation -${negotiation?.length || 0}
      Booked -${booked?.length || 0}`
      )
    })
  }
  const triggerWhatsAppTasksCountAlert = async () => {
    empTaskListTuned.map((empData, i) => {
      const { label, offPh, now, sevenDays, Total } = empData
      sendWhatAppTextSms1(
        offPh,
      `Good Morning..! ${label} 🏆\n
      Here is your Today's task overview  \n
      Due Tasks   -${(Total?.length || 0) - (now?.length || 0)}
      Today Tasks -  ${now?.length || 0}\n \n

      This is an automated notification generated by www.redefineerp.in. Please do not reply.
      `
      )
    })
  }
  return (
    <div>
      <section className="pb-8 pt-1 mb-8 leading-7 text-gray-900 bg-white ">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
              {/* <Link
                className="flex items-center"
               // to={routes.projectEdit({ uid })}
              > */}
              <img className="w-12 h-12" alt="" src="/apart.svg"></img>
              <span className="relative z-10 flex items-center w-auto text-xl font-bold leading-none pl-0 mt-[18px]">
                {orgId?.toLocaleUpperCase()} Report
              </span>
              {/* </Link> */}
            </div>

            {/* <div className=" mt-10 grid grid-cols-1 gap-7">
              <span className="min-w-100 ">
                <span>
                  <div
                    className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                    style={{ backgroundColor: '#EBF9F9' }}
                  >
                    <div className="flex items-center flex-row px-0  pl-0 mb-2 ">

                      <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 mt-4 ">
                        {`Lead Stastics of Team for this Week `}
                      </div>
                    </div>

                    <section className="flex ml-auto mt-[18px]">
                      {!isEdit && (

                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                          <EyeIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Current Week
                        </span>

                      )}

                      <button onClick={onSliderOpen}>
                        <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          This Month
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
                    </section>

                    <div className="grid grid-cols-2 gap-0">
                      <ul className="flex-1 p-0 mt-8 ml-2 mr-2 max-w-[300px] border-r pr-10  border-slate-400 leading-7 text-gray-900  border-gray-200">
                        {valueFeedData.map((data, i) => {
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
                              name: 'Total',
                              count: 1050,
                              pv: 2400,
                              amt: 2400,
                            },
                            {
                              name: 'Progress',
                              count: 420,
                              pv: 1398,
                              amt: 2210,
                            },
                            {
                              name: 'Booked',
                              count: 120,
                              pv: 9800,
                              amt: 2290,
                            },
                            {
                              name: 'RNR',
                              count: 105,
                              pv: 9800,
                              amt: 2290,
                            },
                            {
                              name: 'Dead',
                              count: 90,
                              pv: 9800,
                              amt: 2290,
                            },
                            {
                              name: 'Non Interested',
                              count: 750,
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
                          <Bar dataKey="count" barSize={40} fill="#1EB968" />
                        </BarChart>
                      </section>
                    </div>
                  </div>
                </span>
              </span>
            </div> */}
          </div>

          <div
            className="flex flex-col  mt-4 drop-shadow-md rounded-lg  px-4"
            style={{ backgroundColor: '#ebfafa' }}
          >
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <div className=" text-md font-bold leading-none pl-0 mt-4 border-b pb-4 mb-4 ">
                    {`Source vs Status `}
                  </div>

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
                          }rounded-full`}
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
                    <div className=" flex flex-row   ">
                      <span className="mr-4">
                        <SlimSelectBox
                          name="project"
                          label=""
                          className="input min-w-[164px]"
                          onChange={(value) => {
                            console.log('zoro condition changed one  is', value)
                            selViewSource(value)
                            // formik.setFieldValue('project', value.value)
                          }}
                          value={viewSource?.value}
                          // options={aquaticCreatures}
                          options={[
                            ...[{ label: 'All Sources', value: 'allsources' }],
                            ...sourceListTuned,
                          ]}
                        />
                      </span>
                      <SlimSelectBox
                        name="project"
                        label=""
                        className="input min-w-[164px] ml-4"
                        onChange={(value) => {
                          console.log('zoro condition changed one  is', value)
                          setSelProject(value)
                          // formik.setFieldValue('project', value.value)
                        }}
                        value={selProjectIs?.value}
                        // options={aquaticCreatures}
                        options={[
                          ...[{ label: 'All Projects', value: 'allprojects' }],
                          ...projectList,
                        ]}
                      />
                      <span style={{ display: '' }}>
                        <CSVDownloader
                          className="mr-6 h-[20px] w-[20px]"
                          downloadRows={sourceDownloadRows}
                          style={{ height: '20px', width: '20px' }}
                        />
                      </span>
                    </div>
                  </section>
                  <table className="min-w-full text-center mt-6">
                    <thead className="border-b">
                      <tr>
                        {[
                          { label: 'Source', id: 'label' },
                          { label: 'Total', id: 'total' },
                          { label: 'Unassigned', id: 'unassigned' },
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
                      {sourceFiltListTuned.map((data, i) => {
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
                            <td
                              className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
                              onClick={() => {
                                console.log('total stuff is ', data?.Total)
                              }}
                            >
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
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                  {data?.unassigned?.length}
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

                      {viewSource?.value === 'allsources' && (
                        <tr className="border-b bg-gray-800 boder-gray-900">
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap text-left">
                            Total
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                            {sourceRawFilData.length}
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              sourceRawFilData.filter((datObj) =>
                                [
                                  'new',
                                  'unassigned',
                                  'followup',
                                  'visitfixed',
                                  'visitdone',
                                  'negotiation',
                                ].includes(datObj?.Status)
                              ).length
                            }
                          </td>
                          {showInproFSource && (
                            <>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  sourceRawFilData.filter(
                                    (datObj) => datObj?.Status == 'new'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                                {
                                  sourceRawFilData.filter(
                                    (datObj) => datObj?.Status == 'followup'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                                {
                                  sourceRawFilData.filter(
                                    (datObj) => datObj?.Status == 'visitfixed'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                                {
                                  sourceRawFilData.filter(
                                    (datObj) => datObj?.Status == 'visitdone'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                                {
                                  sourceRawFilData.filter(
                                    (datObj) => datObj?.Status == 'negotiation'
                                  ).length
                                }
                              </td>
                            </>
                          )}
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                            {
                              sourceRawFilData.filter(
                                (datObj) => datObj?.Status == 'booked'
                              ).length
                            }
                          </td>
                          {showArchiFSource && (
                            <>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap ">
                                {
                                  sourceRawFilData.filter(
                                    (datObj) =>
                                      datObj?.Status == 'notinterested'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  sourceRawFilData.filter(
                                    (datObj) => datObj?.Status == 'dead'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  sourceRawFilData.filter(
                                    (datObj) => datObj?.Status == 'blocked'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  sourceRawFilData.filter(
                                    (datObj) => datObj?.Status == 'junk'
                                  ).length
                                }
                              </td>
                            </>
                          )}
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              sourceRawFilData.filter((datObj) =>
                                [
                                  'blocked',
                                  'dead',
                                  'notinterested',
                                  'junk',
                                ].includes(datObj?.Status)
                              ).length
                            }
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              sourceRawFilData.filter(
                                (datObj) => datObj?.Status == ''
                              ).length
                            }
                          </td>
                        </tr>
                      )}
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
                    {`Employee vs Status `}
                  </div>

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
                    <div className=" flex   ">
                      <button
                        onClick={() => {
                          triggerWhatsAppAlert(startOfWeek(d).getTime())
                        }}
                      >
                        <span
                          className={`flex ml-2 mr-4  items-center h-6 px-3 text-xs
                            text-green-800 bg-green-200
                          rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Alert Status Count
                        </span>
                      </button>
                      <span className="mr-4">
                        <SlimSelectBox
                          name="project"
                          label=""
                          className="input min-w-[164px]"
                          onChange={(value) => {
                            console.log('zoro condition changed one  is', value)
                            selEmp1(value)
                            // formik.setFieldValue('project', value.value)
                          }}
                          value={viewEmp1?.value}
                          // options={aquaticCreatures}
                          options={[
                            ...[
                              { label: 'All Employees', value: 'allemployees' },
                            ],
                            ...empListTuned,
                          ]}
                        />
                      </span>
                      <SlimSelectBox
                        name="project"
                        label=""
                        className="input min-w-[164px] "
                        onChange={(value) => {
                          setSelProjectEmp(value)
                        }}
                        value={selProjectEmpIs?.value}
                        options={[
                          ...[{ label: 'All Projects', value: 'allprojects' }],
                          ...projectList,
                        ]}
                      />
                      <span style={{ display: '' }}>
                        <CSVDownloader
                          className="mr-6 h-[20px] w-[20px]"
                          downloadRows={EmpDownloadRows}
                          style={{ height: '20px', width: '20px' }}
                        />
                      </span>
                    </div>
                  </section>
                  <table className="min-w-full text-center mt-6">
                    <thead className="border-b">
                      <tr>
                        {[
                          { label: 'Employee', id: 'label' },
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
                              ['Employee'].includes(d.label) ? 'text-left' : ''
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
                      {empFiltListTuned.map((data, i) => {
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

                      {viewEmp1?.value == 'allemployees' && (
                        <tr className="border-b bg-gray-800 boder-gray-900">
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap text-left">
                            Total
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {EmpRawFilData.length}
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              EmpRawFilData.filter((datObj) =>
                                [
                                  'new',
                                  'unassigned',
                                  'followup',
                                  'visitfixed',
                                  'visitdone',
                                  'negotiation',
                                ].includes(datObj?.Status)
                              ).length
                            }
                          </td>
                          {showInproFSource && (
                            <>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  EmpRawFilData.filter(
                                    (datObj) => datObj?.Status == 'new'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  EmpRawFilData.filter(
                                    (datObj) => datObj?.Status == 'followup'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  EmpRawFilData.filter(
                                    (datObj) => datObj?.Status == 'visitfixed'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  EmpRawFilData.filter(
                                    (datObj) => datObj?.Status == 'visitdone'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  EmpRawFilData.filter(
                                    (datObj) => datObj?.Status == 'negotiation'
                                  ).length
                                }
                              </td>
                            </>
                          )}
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              EmpRawFilData.filter(
                                (datObj) => datObj?.Status == 'booked'
                              ).length
                            }
                          </td>
                          {showArchiFSource && (
                            <>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  EmpRawFilData.filter(
                                    (datObj) =>
                                      datObj?.Status == 'notinterested'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  EmpRawFilData.filter(
                                    (datObj) => datObj?.Status == 'dead'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  EmpRawFilData.filter(
                                    (datObj) => datObj?.Status == 'blocked'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  EmpRawFilData.filter(
                                    (datObj) => datObj?.Status == 'junk'
                                  ).length
                                }
                              </td>
                            </>
                          )}
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              EmpRawFilData.filter((datObj) =>
                                [
                                  'blocked',
                                  'dead',
                                  'notinterested',
                                  'junk',
                                ].includes(datObj?.Status)
                              ).length
                            }
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              EmpRawFilData.filter(
                                (datObj) => datObj?.Status == ''
                              ).length
                            }
                          </td>
                        </tr>
                      )}
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
                    {`Project vs Status `}
                  </div>

                  <section className="flex flex-row justify-between mt-[18px]">
                    <section className="flex">
                      {!isEdit && (
                        // <Link to={routes.projectEdit({ uid })}>
                        <button
                          onClick={() => {
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
                          }rounded-full`}
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
                              {/* {sourceDateRange} -- {startDate?.getTime()} */}
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

                                  console.log(
                                    'was this updated',
                                    update,
                                    startDate
                                  )
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
                    <div className=" flex flex-row   ">
                      <SlimSelectBox
                        name="project"
                        label=""
                        className="input min-w-[164px] "
                        onChange={(value) => {
                          selProjs(value)
                        }}
                        value={viewProjs?.value}
                        options={[
                          ...[{ label: 'All Projects', value: 'allprojects' }],
                          ...projectList,
                        ]}
                      />
                      <span style={{ display: '' }}>
                        <CSVDownloader
                          className="mr-6 h-[20px] w-[20px]"
                          downloadRows={projDownloadRows}
                          style={{ height: '20px', width: '20px' }}
                        />
                      </span>
                    </div>
                  </section>
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
                      {projectFilList.map((data, i) => {
                        return (
                          <tr
                            className={` ${
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

                      {viewProjs?.value == 'allprojects' && (
                        <tr className="border-b bg-gray-800 boder-gray-900">
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap text-left">
                            Total
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {leadsFetchedRawData.length}
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter((datObj) =>
                                [
                                  'new',
                                  'unassigned',
                                  'followup',
                                  'visitfixed',
                                  'visitdone',
                                  'negotiation',
                                ].includes(datObj?.Status)
                              ).length
                            }
                          </td>
                          {showInproFSource && (
                            <>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  leadsFetchedRawData.filter(
                                    (datObj) => datObj?.Status == 'new'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  leadsFetchedRawData.filter(
                                    (datObj) => datObj?.Status == 'followup'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  leadsFetchedRawData.filter(
                                    (datObj) => datObj?.Status == 'visitfixed'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  leadsFetchedRawData.filter(
                                    (datObj) => datObj?.Status == 'visitdone'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  leadsFetchedRawData.filter(
                                    (datObj) => datObj?.Status == 'negotiation'
                                  ).length
                                }
                              </td>
                            </>
                          )}
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == 'booked'
                              ).length
                            }
                          </td>
                          {showArchiFSource && (
                            <>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  leadsFetchedRawData.filter(
                                    (datObj) =>
                                      datObj?.Status == 'notinterested'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  leadsFetchedRawData.filter(
                                    (datObj) => datObj?.Status == 'dead'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  leadsFetchedRawData.filter(
                                    (datObj) => datObj?.Status == 'blocked'
                                  ).length
                                }
                              </td>
                              <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                                {
                                  leadsFetchedRawData.filter(
                                    (datObj) => datObj?.Status == 'junk'
                                  ).length
                                }
                              </td>
                            </>
                          )}
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter((datObj) =>
                                [
                                  'blocked',
                                  'dead',
                                  'notinterested',
                                  'junk',
                                ].includes(datObj?.Status)
                              ).length
                            }
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == ''
                              ).length
                            }
                          </td>
                        </tr>
                      )}
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
                    {`Employee vs Tasks `}
                  </div>

                  <section className="flex flex-row justify-between mt-[18px]">
                    <section></section>
                    <div className=" flex   ">
                      {/* <button
                        onClick={() => {
                          triggerWhatsAppTasksCountAlert()
                        }}
                      >
                        <span
                          className={`flex ml-2 mr-4  items-center h-6 px-3 text-xs
                            text-green-800 bg-green-200
                          rounded-full`}
                        >
                          <CalendarIcon
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          Alert Tasks Counts
                        </span>
                      </button> */}
                      {/* <SlimSelectBox
                        name="project"
                        label=""
                        className="input min-w-[164px] "
                        onChange={(value) => {
                          setSelProjectEmp(value)
                        }}
                        value={selProjectEmpIs?.value}
                        options={[
                          ...[{ label: 'All Projects', value: 'allprojects' }],
                          ...projectList,
                        ]}
                      /> */}
                      {/* <span style={{ display: '' }}>
                        <CSVDownloader
                          className="mr-6 h-[20px] w-[20px]"
                          downloadRows={EmpDownloadRows}
                          style={{ height: '20px', width: '20px' }}
                        />
                      </span> */}
                    </div>
                  </section>
                  <table className="min-w-full text-center mt-6">
                    <thead className="border-b">
                      <tr>
                        {[
                          { label: 'Name', id: 'label' },
                          { label: 'Total', id: 'total' },
                          { label: 'Today', id: '1' },
                          { label: '1-7 days', id: '7' },
                          { label: '8-20 days', id: '20' },
                          { label: '21-30', id: '30' },
                          { label: '31-40', id: '40' },
                          { label: '41-50', id: '50' },
                          { label: '50+', id: 'oldest' },
                        ].map((d, i) => (
                          <th
                            key={i}
                            scope="col"
                            className={`text-sm font-medium text-gray-900 px-6 py-4 ${
                              ['Name'].includes(d.label) ? 'text-left' : ''
                            }`}
                            onClick={() => {
                              if (['inprogress', 'archieve'].includes(d.id))
                                showColumnsSourceFun(d.id)
                            }}
                          >
                            {d.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {empTaskListTuned?.map((data, i) => {
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
                              {data?.Total?.length || 0}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.now?.length || 0}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.sevenDays?.length || 0}
                            </td>

                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.twentyDays?.length || 0}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.thirtyDays?.length || 0}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.fourtyDays?.length || 0}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.fiftyDays?.length || 0}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.fiftyDaysMore?.length || 0}
                            </td>
                          </tr>
                        )
                      })}

                      <tr className="border-b bg-gray-800 boder-gray-900">
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap text-left">
                          Total
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {/* {Object.keys(empTaskListTuned.Total).length
                            empTaskListTuned.reduce((a, b) => {
                              return a.Total + b.Total
                            }).length
                          } */}
                          {/* {empTaskListTuned.reduce(
                            (previousValue, currentValue) =>
                              previousValue.Total + currentValue.Total,
                            0
                          )} */}
                          {empTaskListTunedTotal?.TotalSum}
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {empTaskListTunedTotal?.now}
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {empTaskListTunedTotal?.Sum7}
                        </td>

                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {empTaskListTunedTotal?.Sum20}
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {empTaskListTunedTotal?.Sum30}
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {empTaskListTunedTotal?.Sum40}
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {empTaskListTunedTotal?.Sum50}
                        </td>
                        <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                          {empTaskListTunedTotal?.Sum50M}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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

export default LeadsTeamReportBody
