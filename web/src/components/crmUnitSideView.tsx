/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react'

import { Menu } from '@headlessui/react'
import { Listbox, Transition } from '@headlessui/react'
import { ArrowRightIcon } from '@heroicons/react/outline'
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
  deleteSchLog,
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
import { prettyDate, prettyDateTime, timeConv } from 'src/util/dateConverter'
import { CustomSelect } from 'src/util/formFields/selectBoxField'

import SortComp from './sortComp'

import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

import StatusDropComp from './statusDropComp'
import AssigedToDropComp from './assignedToDropComp'
import Loader from './Loader/Loader'
import ProjPhaseHome from './ProjPhaseHome/ProjPhaseHome'
import AddBookingForm from './bookingForm'
import { H4 } from './Typography'

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
export default function CrmUnitSideView({
  openUserProfile,
  customerDetails,
  unitViewerrr,
  unitsViewMode,
  setUnitsViewMode,
}) {
  console.log('customer Details', customerDetails)
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])

  // const [leadStatus, setLeadStatus] = useState([])
  const [selFeature, setFeature] = useState('payment_schedule')
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
    documents,
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
    } else if (selFeature === 'documents') {
      fet = 'attach'
    } else if (selFeature === 'appointments') {
      fet = 'appoint'
    } else if (selFeature === 'timeline') {
      fet = 'status'
    }

    if (fet === 'appoint') {
      return
    } else {
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

    // updateLeadAssigTo(orgId, leadDocId, value,'', by)
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
      // updateLeadStatus(orgId, id, tempLeadStatus, enqueueSnackbar)
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
      <div className="flex flex-row justify-between">
        <div className="p-3">
          <span className="text-md flex mt-1 font-semibold text-xl mr-auto ml-1 text-[#053219] tracking-wide">
            Unit Summary
          </span>

          {/* <XIcon className="w-5 h-5 mt-[2px]" /> */}
        </div>
        <div className="p-3">
          <div className="flex justify-center items-center space-x-4">
            <div className="w-8 h-8">
              <img
                className="w-full h-full"
                alt="logo"
                src="https://i.ibb.co/L8KSdNQ/image-3.png"
              />
            </div>
            <div className="flex flex-col justify-start items-center">
              <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                Subha Ecostone
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" m-4 mt-2 p-3 rounded-lg border border-gray-100 h-screen overflow-y-auto">
        <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-1 md:space-y-0 md:space-x-6 xl:space-x-8 mb-3">
          <div className="flex flex-col p-3 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
            <h4 className="text-md dark:text-white font-semibold leading-5 text-gray-800">
              Customer Details
            </h4>
            <div className="flex justify-center items-center w-full space-y-2 flex-col border-gray-200 border-b pb-1">
              <div className="flex justify-between items-center w-full">
                <p className="text-xs text-gray-600  uppercase">
                  Applicant Name{' '}
                </p>
                <p className="text-sm dark:text-gray-300 leading-4 tracking-wide text-blue-600 uppercase">
                  Sakthivel alagappan
                </p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xs text-gray-600  uppercase">
                  Co-Applicant Name
                </p>
                <p className="text-sm dark:text-gray-300 leading-4 text-blue-600">
                  Selvi Subramani
                </p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xs text-gray-600  uppercase">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </p>
                <p className="text-sm dark:text-gray-300 leading-4 text-blue-600">
                  Sakthipharma07@gmail.com
                </p>
              </div>
              <div className="flex justify-between w-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm dark:text-gray-300 leading-4 text-blue-600">
                  9849000525
                </p>
              </div>
            </div>

            <div className="w-full text-center mt- border-gray-200 border-b pb-2">
              <div className="flex justify-between   pb-0">
                <div className="p-3 text-center">
                  <span className="text-sm font-semibold  block uppercase tracking-wide text-slate-900">
                    1,163
                  </span>
                  <span className="font-md text-xs text-gray-600 tracking-wide uppercase">
                    Demanded
                  </span>
                  {/* <div className="font-md text-xs mt-2 text-gray-500 mb-[1] tracking-wide">
                  Assigned To
                </div> */}
                </div>
                <div className="p-3 text-center">
                  <span className="text-sm font-semibold  block uppercase tracking-wide text-gray-900">
                    4,100
                  </span>
                  <span className="font-md text-xs text-gray-600 tracking-wide uppercase">
                    Received
                  </span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-sm font-semibold block uppercase tracking-wide text-gray-900">
                    47,68,300
                  </span>
                  <span className="font-md text-xs text-gray-600 tracking-wide uppercase">
                    Balance
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify- px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-3">
            <h4 className="text-md  dark:text-white font-semibold leading-5 text-gray-800">
              Unit Details
            </h4>
            <div className="flex justify-center items-center w-full space-y-2 flex-col border-gray-200 border-b pb-6">
              <div className="flex justify-between items-center w-full">
                <p className="font-xs text-xs text-gray-600 tracking-wide uppercase">
                  Unit No{' '}
                </p>
                <p className="text-xs  font-xs dark:text-gray-300 leading-4 text-blue-800">
                  52
                </p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-xs text-xs text-gray-600 tracking-wide uppercase">
                  Facing{' '}
                </p>
                <p className="text-xs font-xs dark:text-gray-300 leading-4 text-gray-600">
                  North East
                </p>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-xs text-xs text-gray-600 tracking-wide uppercase">
                  Unit Manager{' '}
                </p>
                <p className="text-xs font-xs dark:text-gray-300 leading-4 text-gray-600">
                  <AssigedToDropComp
                    assignerName={assignerName}
                    id={id}
                    setAssigner={setAssigner}
                    usersList={usersList}
                  />
                </p>
              </div>
            </div>
            <div className="w-full text-center mt-20 border-gray-200 border-b pb-2">
              <div className="flex justify-between lg:pt-4 pt-8 pb-0">
                <div className="p-3 text-center">
                  <span className="text-sm font-semibold  block uppercase tracking-wide text-slate-900">
                    1,163
                  </span>
                  <span className="font-md text-xs text-gray-600 tracking-wide uppercase">
                    Area(sft)
                  </span>
                  {/* <div className="font-md text-xs mt-2 text-gray-500 mb-[1] tracking-wide">
                  Assigned To
                </div> */}
                </div>
                <div className="p-3 text-center">
                  <span className="text-sm font-semibold  block uppercase tracking-wide text-gray-900">
                    4,100
                  </span>
                  <span className="font-md text-xs text-gray-600 tracking-wide uppercase">
                    Rate/sft
                  </span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-sm font-semibold block uppercase tracking-wide text-gray-900">
                    47,68,300
                  </span>
                  <span className="font-md text-xs text-gray-600 tracking-wide uppercase">
                    Site Cost
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-b mt-3">
          <div className="py-2 px-1">
            <div className="px-3  font-md font-medium text-sm mb-3  text-gray-800">
              Assigner Details
            </div>
            <div className="px-3  flex justify-between">
              <section>
                <div className="font-md text-xs text-gray-500 mb-[2]">
                  Assigned To
                </div>
                <div className="font-lg text-sm text-slate-900 min-w-[200%] bg-red-50">

                  <CustomSelect
                    name="roleName"
                    label=""
                    className="input mt-3"
                    onChange={(value) => {
                      // formik.setFieldValue('myRole', value.value)
                      console.log('i was changed', value, usersList)
                      setAssigner(id, value)
                    }}
                    value={assignedTo}
                    options={usersList}
                  />
                </div>
              </section>
              <section>
                <div className="font-md text-xs text-gray-500 mb-[2]">
                  Assigned On
                </div>

                <div className="font-lg text-sm text-slate-900">26 July</div>
              </section>
            </div>

            <div className="px-3 py-1 mb-3 mt-3 flex justify-between">
              <div>
                <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                  Assigned By
                </div>
                <div className="font-lg text-sm text-slate-900">
                  {AssignedBy || 'NA'}
                </div>
              </div>
              <div>
                <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                  Last Activist
                </div>
                <div className="font-lg text-sm text-slate-900">3 days ago</div>
              </div>
            </div>
          </div>
        </div> */}

        {unitsViewMode && (
          <>
            <ProjPhaseHome
              projectDetails={selProjectIs}
              leadDetailsObj={leadDetailsObj}
            />
          </>
        )}
        {!unitsViewMode && (
          <>
            <div className="">
              <div className="">
                {/* <div className="font-md font-medium text-xs  text-gray-800">
                          Notes
                        </div> */}

                <div className=" border-gray-200 ">
                  <ul
                    className="flex   bg-[#F9FAFB] rounded-t-lg"
                    id="myTab"
                    data-tabs-toggle="#myTabContent"
                    role="tablist"
                  >
                    {[
                      // { lab: 'Schedules', val: 'appointments' },
                      { lab: 'Tasks', val: 'tasks' },
                      { lab: 'Payment Summary', val: 'payment_summary' },
                      { lab: 'Cost Information', val: 'cost_information' },

                      { lab: 'Payment Schedule', val: 'payment_schedule' },
                      {
                        lab: 'Funding Information',
                        val: 'funding_information',
                      },
                      { lab: 'Booking Details', val: 'booking_details' },
                      { lab: 'Payment History', val: 'payment_history' },
                      // { lab: 'Phone', val: 'phone' },
                      { lab: 'Lead Logs', val: 'timeline' },
                    ].map((d, i) => {
                      return (
                        <li key={i} className="mr-2" role="presentation">
                          <button
                            className={`inline-block py-3 px-4 text-sm font-medium text-center text-black rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${
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

                {selFeature === 'cost_information' && (
                  <div className="p-9">
                    <div className="flex flex-col mx-0 mt-8">
                      <table className="min-w-full divide-y divide-slate-500">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                            >
                              Cost
                            </th>
                            <th
                              scope="col"
                              className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                            >
                              GST %
                            </th>
                            <th
                              scope="col"
                              className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                            >
                              GST Value
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                            >
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200">
                            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                              <div className="font-medium text-slate-700">
                                Site Cost
                              </div>
                              <div className="mt-0.5 text-slate-500 sm:hidden">
                                1 unit at $0.00
                              </div>
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              48
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              $0.00
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              $0.00
                            </td>
                            <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                              $0.00
                            </td>
                          </tr>
                          <tr className="border-b border-slate-200">
                            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                              <div className="font-medium text-slate-700">
                                Club House
                              </div>
                              <div className="mt-0.5 text-slate-500 sm:hidden">
                                1 unit at $75.00
                              </div>
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              4
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              $0.00
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              $0.00
                            </td>
                            <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                              $0.00
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th
                              scope="row"
                              colSpan={3}
                              className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                            >
                              Subtotal
                            </th>
                            <th
                              scope="row"
                              className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                            >
                              Subtotal
                            </th>
                            <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                              $0.00
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              colSpan={3}
                              className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                            >
                              Discount
                            </th>
                            <th
                              scope="row"
                              className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                            >
                              Discount
                            </th>
                            <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                              $0.00
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              colSpan={3}
                              className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                            >
                              Tax
                            </th>
                            <th
                              scope="row"
                              className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                            >
                              Tax
                            </th>
                            <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                              $0.00
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              colSpan={3}
                              className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                            >
                              Total
                            </th>
                            <th
                              scope="row"
                              className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                            >
                              Total
                            </th>
                            <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                              $0.00
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                {selFeature === 'payment_summary' && (
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                      Payment Summary
                    </h3>
                    <div className="block w-full overflow-x-auto">
                      <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                          <tr>
                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                              Item
                            </th>
                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                              Sold Price
                            </th>
                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                              Received
                            </th>
                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                              Balance
                            </th>
                            <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr className="text-gray-500">
                            <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                              Organic Search
                            </th>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                <span className="mr-2 text-xs font-medium">
                                  30%
                                </span>
                                <div className="relative w-full">
                                  <div className="w-full bg-gray-200 rounded-sm h-2">
                                    <div
                                      className="bg-cyan-600 h-2 rounded-sm"
                                      style={{ width: '30%' }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="text-gray-500">
                            <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                              Site Cost
                            </th>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              4,025
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                <span className="mr-2 text-xs font-medium">
                                  24%
                                </span>
                                <div className="relative w-full">
                                  <div className="w-full bg-gray-200 rounded-sm h-2">
                                    <div
                                      className="bg-orange-300 h-2 rounded-sm"
                                      style={{ width: '24%' }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="text-gray-500">
                            <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                              Eco ClubHouse
                            </th>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              3,105
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                <span className="mr-2 text-xs font-medium">
                                  18%
                                </span>
                                <div className="relative w-full">
                                  <div className="w-full bg-gray-200 rounded-sm h-2">
                                    <div
                                      className="bg-teal-400 h-2 rounded-sm"
                                      style={{ width: '18%' }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="text-gray-500">
                            <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                              Maintenance
                            </th>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              1251
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                <span className="mr-2 text-xs font-medium">
                                  12%
                                </span>
                                <div className="relative w-full">
                                  <div className="w-full bg-gray-200 rounded-sm h-2">
                                    <div
                                      className="bg-pink-600 h-2 rounded-sm"
                                      style={{ width: '12%' }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="text-gray-500">
                            <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                              PLC charges
                            </th>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              734
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                <span className="mr-2 text-xs font-medium">
                                  9%
                                </span>
                                <div className="relative w-full">
                                  <div className="w-full bg-gray-200 rounded-sm h-2">
                                    <div
                                      className="bg-indigo-600 h-2 rounded-sm"
                                      style={{ width: '9%' }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="text-gray-500">
                            <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">
                              Other Charges
                            </th>
                            <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">
                              456
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                              5,649
                            </td>
                            <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                              <div className="flex items-center">
                                <span className="mr-2 text-xs font-medium">
                                  7%
                                </span>
                                <div className="relative w-full">
                                  <div className="w-full bg-gray-200 rounded-sm h-2">
                                    <div
                                      className="bg-purple-500 h-2 rounded-sm"
                                      style={{ width: '7%' }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {selFeature === 'funding_information' && (
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Summary
                    </h3>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                      <div className="flex justify-between w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Funding Type
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          Self
                        </p>
                      </div>
                      <div className="flex justify-between w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Bank Name
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          Andhra Bank
                        </p>
                      </div>

                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Self Contribution Amount
                          <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                            100%
                          </span>
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          -$28.00 (50%)
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Loan Amount
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          $0.00
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                        Total
                      </p>
                      <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                        $36.00
                      </p>
                    </div>
                  </div>
                )}
                {selFeature === 'booking_details' && (
                  <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                        Summary
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">
                            Unit Status{' '}
                          </p>
                          <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                            -$28.00 (50%)
                          </p>
                        </div>
                        <div className="flex justify-between w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">
                            Enquiry Date
                          </p>
                          <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                            $56.00
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">
                            Booking Date{' '}
                          </p>
                          <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                            -$28.00 (50%)
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Executive Name
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          $8.00
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Contact No
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          $8.00
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Executive Email
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          $8.00
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Manager
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          $8.00
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                        Paid In Favour of
                      </h3>
                      <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center space-x-4">
                          <div className="w-8 h-8">
                            <img
                              className="w-full h-full"
                              alt="logo"
                              src="https://i.ibb.co/L8KSdNQ/image-3.png"
                            />
                          </div>
                          <div className="flex flex-col justify-start items-center">
                            <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                              Subha luxury projects LLP
                              <br />
                              <span className="font-normal">
                                subha ecostone rera collection account
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selFeature === 'payment_history' && (
                  <section className="py-1 bg-blueGray-50">
                    <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-auto mt-16">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                          <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                              <h3 className="font-semibold text-base text-blueGray-700">
                                Page History
                              </h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                              <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                              >
                                See all
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                          <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                              <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  SNo
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Date Paid
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Payment Particulars
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Amount Paid
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                  /argon/
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                  4,569
                                </td>
                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  340
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                  46,53%
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                  /argon/index.html
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  3,985
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  319
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                                  46,53%
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                  /argon/charts.html
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  3,513
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  294
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                                  36,49%
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {selFeature === 'payment_schedule' && (
                  <section className="py-1 bg-blueGray-50">
                    <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-auto mt-16">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                          <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                              <h3 className="font-semibold text-base text-blueGray-700">
                                Page Schedule
                              </h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                              <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                              >
                                See all
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                          <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                              <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  SNo
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Schedule Name
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Schedule Date
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Sold Amount
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Received Amount
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Status
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                  /argon/
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                  4,569
                                </td>
                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  340
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                  46,53%
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                  /argon/index.html
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  3,985
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  319
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                                  46,53%
                                </td>
                              </tr>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                  /argon/charts.html
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  3,513
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  294
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                                  36,49%
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {selFeature === 'notes' && (
                  <div className="flex flex-col justify-between border pt-6">
                    {leadNotesFetchedData.length === 0 && !addNote && (
                      <div className="py-8 px-8 flex flex-col items-center mt-5">
                        <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                          <img
                            className="w-[180px] h-[180px] inline"
                            alt=""
                            src="/note-widget.svg"
                          />
                        </div>
                        <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                          No Helpful Notes {addNote}
                        </h3>
                        <button onClick={() => selFun()}>
                          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                            Better always attach a string
                            <span className="text-blue-600"> Add Notes</span>
                          </time>
                        </button>
                      </div>
                    )}
                    {addNote && (
                      <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-[#FFF9F2] mx-4 p-4">
                        <div className="w-full flex flex-col mb-3 mt-2">
                          <CustomSelect
                            name="source"
                            label="Not Interest Reason*"
                            className="input mt-3"
                            onChange={(value) => {
                              // formik.setFieldValue('source', value.value)
                              setNotInterestType(value.value)
                            }}
                            value={notInterestType}
                            options={notInterestOptions}
                          />
                        </div>

                        <div className="  outline-none border  rounded p-4 mt-4">
                          <textarea
                            value={takNotes}
                            onChange={(e) => setNotesTitle(e.target.value)}
                            placeholder="Type & make a notes"
                            className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded  "
                          ></textarea>
                        </div>
                        <div className="flex flex-row mt-1">
                          <button
                            onClick={() => fAddNotes()}
                            className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Save</span>
                          </button>
                          <button
                            onClick={() => fAddNotes()}
                            className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Save & Whats App</span>
                          </button>
                          <button
                            // onClick={() => fSetLeadsType('Add Lead')}
                            onClick={() => cancelResetStatusFun()}
                            className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Cancel</span>
                          </button>
                        </div>
                      </div>
                    )}
                    {leadNotesFetchedData.length > 0 && (
                      <div className="px-4">
                        <div className="flex justify-between">
                          <div className="font-md font-medium text-xl mb-4 text-[#053219]">
                            Notes
                          </div>

                          <button onClick={() => selFun()}>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                              <span className="text-blue-600"> Add Notes</span>
                            </time>
                          </button>
                        </div>
                        <ol className="relative border-l ml-3 border-gray-200  ">
                          {leadNotesFetchedData.map((data, i) => (
                            <section key={i} className="">
                              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white  ">
                                {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-blue-600 "
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg> */}
                                <DocumentIcon className=" w-3 h-3" />
                              </span>
                              <div className="text-gray-600  m-3 ml-6">
                                <div className="text-base font-normal">
                                  <span className="font-medium text-green-900 ">
                                    {data?.notes}
                                  </span>{' '}
                                </div>
                                <div className="text-sm font-normal">
                                  {data?.txt}
                                </div>
                                <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                                  <ClockIcon className=" w-3 h-3" />

                                  <span className="ml-1">added on:</span>
                                  <span className="text-red-900 ml-1 mr-4">
                                    {prettyDateTime(data?.ct)}
                                  </span>
                                  <span className="ml-2">added by:</span>
                                  <span className="text-red-900 ml-1 mr-4">
                                    {data?.by}
                                  </span>
                                </span>
                              </div>
                            </section>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {selFeature === 'documents' && (
              <div className="border px-4">
                {docsList.length === 0 && (
                  <div className="py-8 px-8 flex flex-col items-center mt-6">
                    <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                      <img
                        className="w-[200px] h-[200px] inline"
                        alt=""
                        src="/empty-dashboard.svg"
                      />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                      No Attachments
                    </h3>
                    <button onClick={() => showAddAttachF()}>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                        Better always attach a string
                        <span className="text-blue-600"> Add Dcoument</span>
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
                        Customer Documents
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
                  Sitback & Relax{' '}
                  <span className="text-blue-600">Add Task</span>
                </time>
              </div>
            )}
            {selFeature === 'phone' && (
              <>
                {filterData.length === 0 && (
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
                      Sitback & Relax{' '}
                      <span className="text-blue-600">Add Task</span>
                    </time>
                  </div>
                )}

                <div className="px-4 mt-4">
                  <div className="font-md font-medium text-xl mb-4 text-[#053219]">
                    Phone Calls
                  </div>
                  <ol className="relative border-l border-gray-200 ml-3 ">
                    {filterData.map((data, i) => (
                      <section key={i} className="">
                        <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-blue-600 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </span>
                        <div className="text-gray-600  m-3 ml-6">
                          <div className="text-base font-normal">
                            <span className="font-medium text-green-900 ">
                              {'Rajiv'}
                            </span>{' '}
                            called{' '}
                            <span className="text-sm text-red-900  ">
                              {Name}
                            </span>{' '}
                          </div>
                          <div className="text-sm font-normal">{data?.txt}</div>
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
                      </section>
                    ))}
                  </ol>
                </div>
              </>
            )}

            {selFeature === 'timeline' && (
              <div className="py-8 px-8  border">
                {filterData.length == 0 && (
                  <div className="py-8 px-8 flex flex-col items-center">
                    <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                      <img
                        className="w-[200px] h-[200px] inline"
                        alt=""
                        src="/templates.svg"
                      />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                      Timeline is Empty
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
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
                                  ? timeConv(
                                      Number(data?.time)
                                    ).toLocaleString()
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
                            <div className="text-sm font-normal">
                              {data?.txt}
                            </div>
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
        )}
      </div>
    </div>
  )
}
