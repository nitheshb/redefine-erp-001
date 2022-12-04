/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react'

import { Menu } from '@headlessui/react'
import { Listbox, Transition } from '@headlessui/react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'
import {
  BadgeCheckIcon,
  DocumentIcon,
  EyeIcon,
  ViewBoardsIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/solid'
import { CheckIcon, SelectorIcon, DownloadIcon } from '@heroicons/react/solid'
import ClockIcon from '@heroicons/react/solid/ClockIcon'
import PlusCircleIcon from '@heroicons/react/solid/PlusCircleIcon'
import { VerticalAlignBottom } from '@mui/icons-material'
import { DateTimePicker } from '@mui/lab'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import TimePicker from '@mui/lab/TimePicker'
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import DatePicker from 'react-datepicker'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import {
  addLeadScheduler,
  addSchedulerLog,
  deleteSchLog,
  steamLeadActivityLog,
  steamLeadPhoneLog,
  steamLeadScheduleLog,
  steamUsersList,
  steamUsersListByRole,
  updateLeadAssigTo,
  updateLeadStatus,
  updateSchLog,
  addLeadNotes,
  steamLeadNotes,
  createAttach,
  getCustomerDocs,
  getAllProjects,
  updateLeadProject,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { storage } from 'src/context/firebaseConfig'
import {
  getDifferenceInHours,
  getDifferenceInMinutes,
  prettyDate,
  prettyDateTime,
  timeConv,
} from 'src/util/dateConverter'
import { CustomSelect } from 'src/util/formFields/selectBoxField'

import SortComp from './sortComp'

import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

import Loader from './Loader/Loader'
import AddBookingForm from './bookingForm'

import { useSnackbar } from 'notistack'

// interface iToastInfo {
//   open: boolean
//   message: string
//   severity: AlertColor
// }
const people = [
  { name: 'Priority 1' },
  { name: 'Priority 2' },
  { name: 'Priority 3' },
  { name: 'Priority 4' },
]
const statuslist = [
  { label: 'Select the Status', value: '' },
  { label: 'New', value: 'new' },
  // { label: 'Follow Up', value: 'followup' },
  { label: 'Visit Fixed', value: 'visitfixed' },
  { label: 'Visit Done', value: 'visitdone' },
  { label: 'Negotiation', value: 'Negotiation' },
  // { label: 'RNR', value: 'rnr' },
  { label: 'Booked', value: 'booked' },
  { label: 'Not Interested', value: 'notinterested' },
  // { label: 'Dead', value: 'Dead' },
]

const attachTypes = [
  { label: 'Select Document', value: '' },
  { label: 'Bank Cheque', value: 'bank_cheque' },
  { label: 'Booking Form', value: 'booking_form' },
  { label: 'Customer Aadhar', value: 'customer_aadhar' },
  { label: 'Co-Applicant Aadhar', value: 'co-applicant_Aadhar' },
  { label: 'Cancellation Form', value: 'cancellation_form' },
  { label: 'Cost Sheet', value: 'cost_sheet' },
  // { label: 'Follow Up', value: 'followup' },
  { label: 'Estimation Sheet', value: 'estimation_sheet' },
  { label: 'Payment Screenshot (IMPS/RTGS/NEFT)', value: 'payment_screenshot' },
  { label: 'Payment Receipt', value: 'payment_receipt' },
  { label: 'Others', value: 'others' },

  // { label: 'RNR', value: 'rnr' },
  // { label: 'Dead', value: 'Dead' },
]

const notInterestOptions = [
  { label: 'Select Document', value: '' },
  { label: 'Budget Issue', value: 'budget_issue' },
  { label: 'Looking for Different Property', value: 'differeent_options' },

  { label: 'Others', value: 'others' },

  // { label: 'Follow Up', value: 'followup' },
  // { label: 'RNR', value: 'rnr' },
  // { label: 'Dead', value: 'Dead' },
]
export default function UnitSideViewCRM({
  openUserProfile,
  rustomerDetails,
  unitViewerrr,
  unitsViewMode,
  setUnitsViewMode,
  transactionData,
  customerDetails,
}) {
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const { orgId } = user
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])

  // const [leadStatus, setLeadStatus] = useState([])
  const [selFeature, setFeature] = useState('notes')
  const [tempLeadStatus, setLeadStatus] = useState('')
  const [assignerName, setAssignerName] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [leadsActivityFetchedData, setLeadsFetchedActivityData] = useState([])

  const [leadSchFetchedData, setLeadsFetchedSchData] = useState([])
  const [leadNotesFetchedData, setLeadsFetchedNotesData] = useState([])
  const [leadAttachFetchedData, setLeadsFetchedAttachData] = useState([])
  const [leadSchFilteredData, setLeadsFilteredSchData] = useState([])
  const [takTitle, setTakTitle] = useState('')
  const [takNotes, setNotesTitle] = useState('')
  const [attachType, setAttachType] = useState('')
  const [notInterestType, setNotInterestType] = useState('')
  const [attachTitle, setAttachTitle] = useState('')
  const [filterData, setFilterData] = useState([])
  const [docsList, setDocsList] = useState([])
  const [progress, setProgress] = useState(0)

  const d = new window.Date()
  const [value, setValue] = useState(d)

  // const [startDate, setStartDate] = useState(d)
  const [startDate, setStartDate] = useState(setHours(setMinutes(d, 30), 16))
  const [selected, setSelected] = useState(people[0])
  const [taskDetails, setTaskDetails] = useState('')
  const [schPri, setSchPri] = useState(1)
  const [schTime, setSchTime] = useState()
  const [schStsA, setschStsA] = useState([])
  const [schStsMA, setschStsMA] = useState([])
  const [selFilterVal, setSelFilterVal] = useState('pending')
  const [addNote, setAddNote] = useState(false)
  const [addSch, setAddSch] = useState(false)
  const [attach, setAttach] = useState(false)
  const [loader, setLoader] = useState(false)
  const [projectList, setprojectList] = useState([])
  const [financeMode, setFinanceMode] = useState('payments')

  const [selProjectIs, setSelProjectIs] = useState({
    projectName: '',
    uid: '',
  })

  const [leadDetailsObj, setLeadDetailsObj] = useState({})
  const {
    id,
    Name,
    Project,
    ProjectId,
    Source,
    Status,
    by,
    Mobile,
    Date,
    Email,
    Assigned,
    AssignedBy,
    Notes,
    Timeline,
    attachments,
    mode,
    chequeno,
    dated,
    amount,
    fromObj,
    toAccount,
  } = customerDetails

  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(usersListA)
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA)
        setusersList(usersListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    let x = []
    if (selFilterVal === 'all') {
      x = leadSchFetchedData.filter((d) => d?.schTime != undefined)
    } else {
      x = leadSchFetchedData.filter(
        (d) => d?.schTime != undefined && d?.sts === selFilterVal
      )
    }
    setLeadsFilteredSchData(x)
  }, [leadSchFetchedData, selFilterVal])
  useEffect(() => {
    setAssignedTo(customerDetails?.assignedTo)
    setAssignerName(customerDetails?.assignedToObj?.label)
    setSelProjectIs({ projectName: Project, uid: ProjectId })

    setLeadStatus(Status)
    console.log('assinger to yo yo', customerDetails)
  }, [customerDetails])
  // adopt this
  useEffect(() => {
    // setFilterData
    let fet = 'notes'
    if (selFeature === 'notes') {
      getLeadNotesFun()
      fet = 'notes'
    } else if (selFeature === 'phone') {
      fet = 'ph'
    } else if (selFeature === 'attachments') {
      fet = 'attach'
    } else if (selFeature === 'appointments') {
      fet = 'appoint'
    } else if (selFeature === 'timeline') {
      fet = 'status'
    }

    if (fet === 'appoint') {
      return
    }
    //  else if (fet === 'ph') {
    //   const unsubscribe = steamLeadPhoneLog(orgId,
    //     (doc) => {
    //       console.log('my total fetched list is yo yo 1', doc.data())
    //       const usersList = doc.data()
    //       const usersListA = []

    //       Object.entries(usersList).forEach((entry) => {
    //         const [key, value] = entry
    //         usersListA.push(value)
    //         console.log('my total fetched list is 3', `${key}: ${value}`)
    //       })
    //       console.log('my total fetched list is', usersListA.length)
    //       // setLeadsFetchedActivityData(usersListA)
    //     },
    //     {
    //       uid: id,
    //     },
    //     (error) => setLeadsFetchedActivityData([])
    //   )
    // }
    else {
      leadsActivityFetchedData.map((data) => {
        console.log('value of filtered feature count before', data)
      })
      let x = []
      if (selFeature != 'timeline') {
        x = leadsActivityFetchedData.filter((data) => data.type === fet)
      } else {
        x = leadsActivityFetchedData
      }
      console.log(
        'value of filtered feature count is wow it ',
        leadsActivityFetchedData,
        x.length
      )
      setFilterData(x)
    }
  }, [leadsActivityFetchedData, selFeature])

  useEffect(() => {
    getLeadsDataFun()
  }, [])

  useEffect(() => {
    getCustomerDocsFun()
    getProjectsListFun()
  }, [])

  const getCustomerDocsFun = () => {
    const unsubscribe = getCustomerDocs(
      orgId,
      id,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        console.log('user docs list fetched are', projects)
        setDocsList(projects)
      },
      () => setDocsList([])
    )
    return unsubscribe
  }

  const getProjectsListFun = () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        console.log('fetched proejcts list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }
  useEffect(() => {
    setLeadStatus(Status?.toLowerCase())
  }, [customerDetails])

  const setAssigner = (leadDocId, value) => {
    setAssignerName(value.name)
    setAssignedTo(value.value)
    // save assigner Details in db

    // updateLeadAssigTo(orgId, leadDocId, value, '', by)
  }
  const setNewProject = (leadDocId, value) => {
    console.log('sel pROJECT DETAILS ', value)

    // setProjectName(value.projectName)
    // setProjectId(value.uid)
    // save assigner Details in db
    // projectName
    const x = {
      Project: value.projectName,
      ProjectId: value.uid,
    }
    setSelProjectIs(value)
    updateLeadProject(orgId, leadDocId, x)
    // updateLeadAssigTo(leadDocId, value, by)
  }

  const setStatusFun = async (leadDocId, newStatus) => {
    setLoader(true)
    setLeadStatus(newStatus)

    const arr = ['notinterested', 'visitdone', 'visitcancel']
    arr.includes(newStatus) ? setFeature('notes') : setFeature('appointments')
    arr.includes(newStatus) ? setAddNote(true) : setAddSch(true)
    if (newStatus === 'visitfixed') {
      await setTakTitle('Schedule a cab ')
    } else if (newStatus === 'booked') {
      await setTakTitle('Share the Details with CRM team')
      await fAddSchedule()
    } else {
      setTakTitle(' ')
    }

    //
    // updateLeadStatus(leadDocId, newStatus)
    // toast.success('Status Updated Successfully')
  }

  const downloadFile = (url) => {
    window.location.href = url
  }
  const getLeadsDataFun = async () => {
    console.log('ami triggered')
    const unsubscribe = steamLeadActivityLog(
      orgId,
      (doc) => {
        console.log('my total fetched list is yo yo ', doc.data())
        const usersList = doc.data()
        const usersListA = []

        Object.entries(usersList).forEach((entry) => {
          const [key, value] = entry
          usersListA.push(value)
          console.log('my total fetched list is 3', `${key}: ${value}`)
        })
        // for (const key in usersList) {
        //   if (usersList.hasOwnProperty(key)) {
        //     console.log(`${key} : ${usersList[key]}`)
        //     console.log(`my total fetched list is 2 ${usersList[key]}`)
        //   }
        // }

        console.log('my total fetched list is', usersListA.length)
        setLeadsFetchedActivityData(usersListA)
      },
      {
        uid: id,
      },
      (error) => setLeadsFetchedActivityData([])
    )

    //  lead Schedule list
    steamLeadScheduleLog(
      orgId,
      (doc) => {
        console.log('my total fetched list is 1', doc.data())
        const usersList = doc.data()
        const usersListA = []

        const sMapStsA = []
        const { staA, staDA } = usersList
        console.log('this is what we found', staA)
        setschStsA(staA)
        setschStsMA(staDA)
        // delete usersList['staA']
        // delete usersList['staDA']
        Object.entries(usersList).forEach((entry) => {
          const [key, value] = entry
          if (['staA', 'staDA'].includes(key)) {
            if (key === 'staA') {
              // setschStsA(value)
            } else if (key === 'staDA') {
              // sMapStsA = value
            }
          } else {
            usersListA.push(value)
            // console.log(
            //   'my total fetched list is 3',
            //   `${key}: ${JSON.stringify(value)}`
            // )
          }
        })
        // for (const key in usersList) {
        //   if (usersList.hasOwnProperty(key)) {
        //     console.log(`${key} : ${usersList[key]}`)
        //     console.log(`my total fetched list is 2 ${usersList[key]}`)
        //   }
        // }

        console.log('my total fetched list is', usersListA.length)
        usersListA.sort((a, b) => {
          return b.ct - a.cr
        })
        setLeadsFetchedSchData(
          usersListA.sort((a, b) => {
            return a.ct - b.ct
          })
        )
      },
      {
        uid: id,
      },
      (error) => setLeadsFetchedSchData([])
    )

    return unsubscribe
  }
  const getLeadNotesFun = async () => {
    console.log('ami triggered')
    const unsubscribe = steamLeadNotes(
      (doc) => {
        console.log('my total fetched list is yo yo ', doc.data())
        const usersList = doc.data()
        const usersListA = []

        Object.entries(usersList).forEach((entry) => {
          const [key, value] = entry
          usersListA.push(value)
          console.log('my total fetched list is 3', `${key}: ${value}`)
        })
        console.log('my total notes list is ', usersListA)
        setLeadsFetchedNotesData(usersListA)
      },
      {
        uid: id,
      },
      (error) => setLeadsFetchedActivityData([])
    )
    return unsubscribe
  }
  const fAddSchedule = async () => {
    console.log('start time is ', startDate)
    const data = {
      by: user.email,
      type: 'schedule',
      pri: selected?.name,
      notes: takTitle,
      sts: 'pending',
      schTime:
        tempLeadStatus === 'booked'
          ? Timestamp.now().toMillis() + 10800000
          : startDate.getTime(),
      ct: Timestamp.now().toMillis(),
    }

    const x = schStsA

    console.log('new one ', schStsA, x)
    x.push('pending')
    setschStsA(x)
    // addSchedulerLog(id, data)
    console.log('new one ', schStsA)
    await addLeadScheduler(orgId, id, data, schStsA, '')
    if (Status != tempLeadStatus) {
    }
    await setTakTitle('')
    await setAddSch(false)
    await setLoader(false)
  }
  const cancelResetStatusFun = () => {
    setAddSch(false)
    setAddNote(false)
    // if its not edit mode ignore it
    setLeadStatus(Status)
    setLoader(false)
  }

  const handleColor = (time) => {
    return time.getHours() > 12 ? 'text-success' : 'text-error'
  }

  const setTitleFun = (e) => {
    console.log('title value is', e.target.value)
    setTakTitle(e.target.value)
  }
  const doneFun = (data) => {
    console.log('clicked schedule is', data)
    const inx = schStsMA.indexOf(data.ct)
    const x = schStsA
    x[inx] = 'completed'
    setschStsA(x)

    updateSchLog(orgId, id, data.ct, 'completed', schStsA)
  }
  const delFun = (data) => {
    console.log('clicked schedule is', data)
    const inx = schStsMA.indexOf(data.ct)
    const x = schStsA
    const y = schStsMA
    x.splice(inx, 1)
    y.splice(inx, 1)
    setschStsA(x)
    setschStsMA(y)

    deleteSchLog(orgId, id, data.ct, 'completed', schStsA, schStsMA)
  }

  const selFun = () => {
    console.log('i was selcted')
    setAddNote(true)
  }

  const showAddAttachF = () => {
    setAttach(true)
  }

  const fAddNotes = async () => {
    console.log('start time is ', startDate)
    const data = {
      by: user.email,
      type: 'notes',
      notes: takNotes,
      ct: Timestamp.now().toMillis(),
    }

    await addLeadNotes(orgId, id, data)
    await setNotesTitle('')
    await setAddNote(false)
  }

  const docUploadHandler = async (e) => {
    e.preventDefault()
    console.log('filer upload stuff', e.target[0].files[0])
    uploadStuff(e.target[0].files[0])
  }

  const uploadStuff = async (file) => {
    if (!file) return
    try {
      const uid = uuidv4()
      const storageRef = ref(storage, `/spark_files/${Name}_${uid}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgress(prog)
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            createAttach(orgId, url, by, file.name, id, attachType)
            console.log('file url i s', url)
            //  save this doc as a new file in spark_leads_doc
          })
        }
      )
    } catch (error) {
      console.log('upload error is ', error)
    }
  }
  return (
    <div
      className={`bg-white   h-screen    ${openUserProfile ? 'hidden' : ''} `}
    >
      <div className="rounded-t bg-[#F1F5F9] mb-0 px-3 pt-2">
        <div className="flex flex-col justify-between">
          <p className="text-md font-bold tracking-tight uppercase font-body my-[2px]  ml-2">
            UNIT-101, PHASE-I, SUBHA ECOSTONE
          </p>
          <p className="text-xs tracking-tight uppercase font-body my-[2px] ml-2">
            Mr.Somit Mukerjee & Mrs. Sonali Banejee
          </p>
          <p className="text-xs tracking-tight  font-body my-[2px] ml-2">
            <span className="">8971610977</span>
            <span className="ml-2">somitm@gmail.com</span>
          </p>
        </div>
        <>
          <div className="">
            <div className="">
              {/* <div className="font-md font-medium text-xs  text-gray-800">
                          Notes
                        </div> */}

              <div className=" border-gray-900  bg-[#F1F5F9] rounded-t-lg ">
                <ul
                  className="flex   rounded-t-lg overflow-x-scroll"
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  {[
                    // { lab: 'Schedules', val: 'appointments' },
                    { lab: 'Summary', val: 'summary' },
                    { lab: 'Tasks', val: 'tasks' },

                    // { lab: 'Attachments', val: 'attachments' },
                    // { lab: 'Phone', val: 'phone' },

                    { lab: 'Unit Information', val: 'unit_information' },
                    { lab: 'Commercials', val: 'finance_info' },
                    { lab: 'Legal', val: 'legal_info' },

                    // { lab: 'Phone', val: 'phone' },
                    { lab: 'Timeline', val: 'timeline' },
                  ].map((d, i) => {
                    return (
                      <li
                        key={i}
                        className="mr-2 ml-2 text-sm font-bodyLato"
                        role="presentation"
                      >
                        <button
                          className={`inline-block py-3 mr-3 px-1 text-sm font-medium text-center text-black rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${
                            selFeature === d.val
                              ? 'border-black text-black'
                              : 'border-transparent'
                          }`}
                          type="button"
                          role="tab"
                          onClick={() => setFeature(d.val)}
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
            </div>
          </div>
          {selFeature === 'attachments' && (
            <div className="border px-4 bg-[#F6F7FF]">
              {docsList.length === 0 && (
                <div className="py-8 px-8 flex flex-col items-center mt-6">
                  <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                    <img
                      className="w-[80px] h-[80px] inline"
                      alt=""
                      src="/empty-dashboard.svg"
                    />
                  </div>
                  <h3 className="mb-1 text-xs font-semibold text-gray-900 ">
                    No Attachments
                  </h3>
                  <button onClick={() => showAddAttachF()}>
                    <time className="block mb-2 text-xs font-normal leading-none text-gray-400 ">
                      Better always attach a string
                      <span className="text-blue-600 text-xs">
                        {' '}
                        Add Dcoument
                      </span>
                    </time>
                  </button>
                </div>
              )}

              {attach && (
                <div className="flex justify-center mt-4">
                  <div className="mb-3 w-96 px-10 bg-[#FFF9F2] rounded-md py-3 pb-6">
                    <div className="w-full flex flex-col mb-3 mt-2">
                      <CustomSelect
                        name="source"
                        label="Document Type *"
                        className="input mt-3"
                        onChange={(value) => {
                          // formik.setFieldValue('source', value.value)
                          setAttachType(value.value)
                        }}
                        value={attachType}
                        options={attachTypes}
                      />
                    </div>
                    <label
                      htmlFor="formFile"
                      className="form-label inline-block mb-2  font-regular text-sm "
                    >
                      Upload file
                    </label>
                    <form onSubmit={docUploadHandler}>
                      <input
                        className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="file"
                        id="formFile"
                      />
                      <div className="flex flex-row mt-3">
                        <button
                          // onClick={() => fAddSchedule()}
                          type="submit"
                          className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                        >
                          <span className="ml-1 ">Upload</span>
                        </button>
                        <button
                          // onClick={() => fSetLeadsType('Add Lead')}
                          onClick={() => setAttach(false)}
                          className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                        >
                          <span className="ml-1 ">Cancel</span>
                        </button>
                      </div>
                    </form>

                    {/* <h3> {progress}</h3> */}
                  </div>
                </div>
              )}

              {docsList.length > 0 && (
                <div className="py-8">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight">
                      Customer attachments
                    </h2>
                    <button onClick={() => showAddAttachF()}>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                        <span className="text-blue-600"> Add Dcoument</span>
                      </time>
                    </button>
                  </div>
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Name
                            </th>

                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Created On / By
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Status
                            </th>
                            {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {docsList.map((dat, i) => {
                            return (
                              <tr key={i} className=" border-b">
                                <td className="px-5 py-5 bg-white text-sm ">
                                  <div className="flex">
                                    <div className="">
                                      <p className="text-gray-900 whitespace-no-wrap overflow-ellipsis">
                                        {dat.name}
                                      </p>
                                      <p className="text-blue-600 whitespace-no-wrap">
                                        {dat.type}
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-5 py-5 bg-white text-sm ">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {prettyDate(dat.cTime)}
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap overflow-ellipsis">
                                    {dat.by}
                                  </p>
                                </td>
                                <td className="px-5 py-5 bg-white text-sm">
                                  <>
                                    {/* <span className="relative inline px-3 py-1 font-semibold text-red-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">Approved</span>
                                  </span> */}

                                    <DownloadIcon
                                      onClick={() => downloadFile(dat.url)}
                                      className="w-5 h-5 text-gray-400 ml-3 cursor-pointer"
                                      aria-hidden="true"
                                    />
                                  </>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {selFeature === 'tasks' && (
            <div className="py-8 px-8 flex flex-col items-center">
              <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                <img
                  className="w-[200px] h-[200px] inline"
                  alt=""
                  src="/all-complete.svg"
                />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                You are clean
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                Sitback & Relax <span className="text-blue-600">Add Task</span>
              </time>
            </div>
          )}

          {selFeature === 'timeline' && (
            <div className="py-8 px-8  border bg-[#F6F7FF]">
              {filterData.length == 0 && (
                <div className="py-8 px-8 flex flex-col items-center">
                  <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                    <img
                      className="w-[80px] h-[80px] inline"
                      alt=""
                      src="/templates.svg"
                    />
                  </div>
                  <h3 className="mb-1 text-xs font-semibold text-gray-900 ">
                    Timeline is Empty
                  </h3>
                  <time className="block mb-2 text-xs font-normal leading-none text-gray-400 ">
                    This scenario is very rare to view
                  </time>
                </div>
              )}
              <div className="font-md font-medium text-xs mb-4 text-gray-800">
                Timelines
              </div>
              <ol className="relative border-l border-gray-200 ">
                {filterData.map((data, i) => (
                  <section key={i} className="">
                    <a
                      href="#"
                      className="block items-center p-3 sm:flex hover:bg-gray-100 "
                    >
                      {/* <PlusCircleIcon className="mr-3 mb-3 w-10 h-10 rounded-full sm:mb-0" /> */}
                      {data?.type == 'status' && (
                        <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white  ">
                          <svg
                            className="w-3 h-3 text-blue-600 \"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      )}
                      {data?.type == 'ph' && (
                        <>
                          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-blue-600 "
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </span>
                          <div className="text-gray-600  m-3">
                            <div className="text-base font-normal">
                              <span className="font-medium text-green-900 ">
                                {'Rajiv'}
                              </span>{' '}
                              called{' '}
                              <span className="text-sm text-red-900 ">
                                {Name}
                              </span>{' '}
                            </div>
                            <div className="text-sm font-normal">
                              {data?.txt}
                            </div>
                            <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                              <ClockIcon className="mr-1 w-3 h-3" />
                              {data?.type == 'ph'
                                ? timeConv(Number(data?.time)).toLocaleString()
                                : timeConv(data?.T).toLocaleString()}
                              {'    '}
                              <span className="text-red-900 ml-4 mr-4">
                                {Number(data?.duration)} sec
                              </span>
                              or
                              <span className="text-red-900 ml-4">
                                {parseInt(data?.duration / 60)} min
                              </span>
                            </span>
                          </div>
                        </>
                      )}
                      {data?.type != 'ph' && (
                        <div className="text-gray-600  m-3">
                          <div className="text-base font-normal">
                            <span className="font-medium text-green-900 ">
                              {data?.type?.toUpperCase()}
                            </span>{' '}
                            set by{' '}
                            <span className="text-sm text-red-900 ">
                              {data?.by}
                            </span>{' '}
                          </div>
                          <div className="text-sm font-normal">{data?.txt}</div>
                          <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                            {/* <svg
                          className="mr-1 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                            clipRule="evenodd"
                          ></path>
                        </svg> */}

                            <ClockIcon className="mr-1 w-3 h-3" />
                            {data?.type == 'ph'
                              ? timeConv(Number(data?.time)).toLocaleString()
                              : timeConv(data?.T).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </a>
                  </section>
                ))}
              </ol>
            </div>
          )}
        </>
      </div>
      {selFeature === 'summary' && (
        <div className="py-3 px-3 m-4 mt-2 rounded-lg border border-gray-100 h-[100%] overflow-y-scroll">
          <div className="flex flex-row justify-between">
            {/* <div className="px-3  font-md font-medium text-sm mt-3 mb-2 text-gray-800">
            Customer Details
          </div> */}

            <div className="inline mt-2 ml-2 mb-5">
              <div className="">
                <label className="font-semibold text-[#053219]  text-sm  mt-3 mb-1  tracking-wide ">
                  Transaction Details<abbr title="required"></abbr>
                </label>
              </div>

              <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>
            </div>
            <div className="p-3 flex flex-col">
              <span
                className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-green-500 bg-green-100 rounded-full
                      `}
              >
                {'In-Progress'}
              </span>
            </div>
          </div>
          <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
            <section className="flex flow-row justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                Amount
              </div>
              <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                Rs 1,20,000
              </div>
            </section>
          </section>

          <div className="mt-2  grid grid-cols-2">
            <section className="mr-2 flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
              <section className="flex flex-row justify-between mb-1">
                <div className="font-md text-xs text-gray-500  tracking-wide">
                  From
                </div>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                  Imps
                </div>
              </section>
              <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                data
              </div>
            </section>
            <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
              <section className="flex flex-row  justify-between mb-1">
                <div className="font-md text-xs text-gray-500  tracking-wide">
                  To
                </div>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                  date
                </div>
              </section>
              <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                data
              </div>
            </section>
          </div>
          <div className="my-2  grid grid-cols-2 ">
            <section className="mr-2 flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
              <section className="flex flex-row justify-between mb-1">
                <div className="font-md text-xs text-gray-500  tracking-wide">
                  Date
                </div>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                  31/11/2022
                </div>
              </section>
              <section className="flex flex-row justify-between mb-1">
                <div className="font-md text-xs text-gray-500  tracking-wide">
                  Ref No
                </div>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                  00022344x45
                </div>
              </section>
              <section className="flex flex-row  justify-between mb-1">
                <div className="font-md text-xs text-gray-500  tracking-wide">
                  By
                </div>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                  date
                </div>
              </section>
            </section>
            <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
              <section className="flex flex-row justify-between mb-1">
                <div className="font-md text-xs text-gray-500  tracking-wide">
                  Owner
                </div>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900 "></div>
              </section>
              <section className="flex flex-row  justify-between mb-1">
                <div className="font-md text-xs text-gray-500  tracking-wide">
                  Status
                </div>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900 "></div>
              </section>
            </section>
          </div>
        </div>
      )}

      {selFeature === 'unit_information' && (
        <>
          <div className="flex flex-col  my-10 rounded-lg bg-white border border-gray-100 px-4 m-4 mt-4">
            <div className="py-3 grid grid-cols-3 mb-4">
              <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md">
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-700 tracking-wide">
                    Unit No
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.unit_no} */}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    Size
                    <span className="text-[10px] text-black-500 ml-1">
                      (sqft)
                    </span>
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.builtup_area?.toLocaleString('en-IN')} */}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    Facing
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.facing} */}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    BUA
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.builtup_area?.toLocaleString('en-IN')} */}
                  </div>
                </section>
              </section>
              <section className="flex flex-col mx-4 bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-700 tracking-wide">
                    East
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.east?.toLocaleString('en-IN')} */}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    West
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.west?.toLocaleString('en-IN')} */}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    South
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.south?.toLocaleString('en-IN')} */}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    North
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.north?.toLocaleString('en-IN')} */}
                  </div>
                </section>
              </section>
              <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-700 tracking-wide">
                    Cost
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {(
                      data?.unitDetail?.builtup_area *
                      data?.unitDetail?.rate_per_sqft
                    )?.toLocaleString('en-IN')} */}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    PLC
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.builtup_area?.toLocaleString('en-IN')} */}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    Total
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.facing} */}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    KathaId
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {/* {data?.unitDetail?.kathaId} */}
                  </div>
                </section>
              </section>
            </div>
          </div>
        </>
      )}
      {selFeature === 'finance_info' && (
        <>
          <div className="py-3 px-3 m-4 mt-2 rounded-lg border border-gray-100 h-[100%] overflow-y-scroll">
            <div className=" border-gray-800 flex flex-row justify-between bg-[#F6F7FE]">
              <ul
                className="flex justify-  rounded-t-lg  ml-2"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                {[
                  { lab: 'Payment Schedule', val: 'demands' },
                  {
                    lab: 'Transactions',
                    val: 'transactions',
                  },
                ].map((d, i) => {
                  return (
                    <li
                      key={i}
                      className="mr-2 font-bodyLato"
                      role="presentation"
                    >
                      <button
                        className={`inline-block py-3 mr-4 text-sm font-medium text-center rounded-t-lg border-b-2  hover:text-blue hover:border-gray-300   ${
                          financeMode === d.val
                            ? 'border-[#1B97F2] border-b-3'
                            : 'border-transparent'
                        }`}
                        type="button"
                        role="tab"
                        onClick={() => setFinanceMode(d.val)}
                      >
                        {`${d.lab} `}
                        {/* <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <section className="bg-[#F6F7FE]">
                <div className="w-full flex items-center mt-3 mr-3 ">
                  <label
                    htmlFor="area"
                    className="label font-regular text-sm font-bodyLato"
                  >
                    Bank Split
                  </label>
                </div>
              </section>
            </div>
            <section className="flex flex-col bg-[#F6F7FF] p-3 mt-3 border border-[#e5e7f8] rounded-md ">
              <section className="flex flow-row justify-between mb-1">
                <div className="font-md text-xs text-gray-500  tracking-wide">
                  Out Standing Balance
                </div>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                  Rs 1,00,000
                </div>
              </section>
              <section className="flex flow-row justify-between mb-1">
                <div className="font-md text-xs text-gray-500  tracking-wide">
                  Total Amount
                </div>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                  Rs 1,20,001
                </div>
              </section>
            </section>

            <div className="mt-2">
              <section className="mr-2 flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                <div>
                  <h1 className="text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
                    Plot Sales Value Information (A)
                  </h1>
                  <table className="w-[100%]">
                    <thead>
                      <tr className=" h-6 border-b-[0.2px] border-gray-300 w-[100%]">
                        <th className="min-w-[35%] text-[10px] text-left text-[#8993a4] font-bodyLato tracking-wide uppercase">
                          Particulars
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase">
                          Plot Rate/Sqft
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase">
                          Sale Value
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase">
                          GST
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {' '}
                      {[
                        { component: { label: 'Unit Cost' } },
                        { component: { label: 'PLC' } },
                      ]?.map((d1, inx) => (
                        <tr
                          key={inx}
                          className="border-b-[0.05px] border-gray-300"
                        >
                          <th className="w-[40%] text-[10px] text-left text-gray-700  ">
                            {d1?.component?.label}
                          </th>
                          <td className="w-[15%] text-[10px] text-right text-gray-700 "></td>
                          <td className="w-[15%] text-[10px] text-right text-gray-700 ">
                            {d1?.TotalSaleValue?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] text-[10px] text-right text-gray-700 ">
                            {d1?.gst?.value?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] text-[10px] text-right text-gray-800 ">
                            {d1?.TotalNetSaleValueGsT?.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-b-[0.05px] border-gray-300">
                        <th className="w-[40%] text-[10px] text-left text-gray-800 ">
                          Total (A)
                        </th>
                        <td className="w-[15%] font-bold text-[10px] text-right text-gray-800 "></td>
                        <td className="w-[15%] font-bold  text-[10px] text-right text-gray-800 "></td>
                        <td className="w-[15%] font-bold  text-[10px] text-right text-gray-800 "></td>
                        <td className="w-[15%] font-bold  text-[10px] text-right text-gray-800 "></td>
                      </tr>
                    </tbody>
                  </table>
                  <h1 className=" mt-10 mb-1 text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-1">
                    Other Charges (B)
                  </h1>
                  <table className="w-full">
                    <thead>
                      {' '}
                      <tr className=" h-6  border-b-[0.2px] border-gray-300">
                        <th className="w-[40%] text-[10px] text-left text-gray-700 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                          Particulars
                        </th>
                        <th className="w-[45%] text-[10px] text-right text-gray-700 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                          Timeline
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-gray-700  text-[#8993a4] font-bodyLato tracking-wide uppercase">
                          Total Inc GST
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { component: { label: 'Unit Cost' } },
                        { component: { label: 'PLC' } },
                      ].map((d1, inx) => (
                        <tr
                          key={inx}
                          className="border-b-[0.05px] border-gray-300"
                        >
                          <th className=" text-[10px] text-left text-gray-700 ">
                            {d1?.component?.label} (0.05% Plor Sale value)
                          </th>
                          <td className="text-[10px] text-right text-gray-700 ">
                            {d1?.description}
                          </td>
                          <td className="text-[10px] text-right text-gray-700 "></td>
                        </tr>
                      ))}
                      <tr className="border-b-[0.05px] border-gray-300">
                        <th className="text-[10px] text-left text-gray-700 ">
                          Total (B)
                        </th>
                        <td className="text-[10px] text-right text-gray-400 "></td>
                        <td className="text-[10px] text-right text-gray-800 font-bold "></td>
                      </tr>
                    </tbody>
                  </table>

                  <section className="flex flex-row justify-between  mt-4 rounded">
                    <h1 className=" mt-4 text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
                      Total Plot Sale Value(A+B)
                    </h1>
                    <section className=" mt-4 text-green-600  "></section>
                  </section>
                  <h1 className=" mt-10 text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
                    Plot - Payment Schedule
                  </h1>
                  <table className="w-full">
                    <thead>
                      {' '}
                      <tr className=" h-6 border-b-[0.2px] border-gray-300">
                        <th className="w-[30%] text-[10px] text-left text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                          Particulars
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-gray-400  text-[#8993a4] font-bodyLato tracking-wide uppercase">
                          Payment Timeline
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                          Total inc GST
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                          Eligible
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                          Amount Received
                        </th>
                        <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {[
                        { component: { label: 'Unit Cost' } },
                        { component: { label: 'PLC' } },
                      ]?.map((d1, inx) => (
                        <tr
                          key={inx}
                          className="border-b-[0.05px] border-gray-300"
                        >
                          <th className=" text-[10px] text-left text-gray-700 ">
                            {d1?.stage?.label}
                          </th>
                          <td className="text-[10px] text-right text-gray-700 ">
                            {d1?.description}
                          </td>

                          <td className="text-[10px] text-right text-gray-800 "></td>
                        </tr>
                      ))}

                      <tr className="border-b-[0.05px] border-gray-300">
                        <th className="text-[10px] text-left text-gray-800 ">
                          Plot Value Total Rs.:
                        </th>
                        <td className="text-[10px] text-right text-gray-400 "></td>
                        <th className="text-[10px] text-right text-gray-800 "></th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <section className="flex flex-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    From
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    Imps
                  </div>
                </section>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                  data
                </div> */}
              </section>
            </div>
            <div className="my-2  grid grid-cols-2 ">
              <section className="mr-2 flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                <section className="flex flex-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    Date
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    31/11/2022
                  </div>
                </section>
                <section className="flex flex-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    Ref No
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    00022344x45
                  </div>
                </section>
                <section className="flex flex-row  justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    By
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    date
                  </div>
                </section>
              </section>
              <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                <section className="flex flex-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    Owner
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 "></div>
                </section>
                <section className="flex flex-row  justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    Status
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 "></div>
                </section>
              </section>
            </div>
          </div>
        </>
      )}

      {selFeature === 'legal_info' && <></>}
    </div>
  )
}
