import { TabList } from '@mui/lab'
import { Box, Card, Grid, styled } from '@mui/material'
import LLeadsTableBody from '../LLeadsTableBody/LLeadsTableBody'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next' // styled components
import uniqueId from '../../util/generatedId'

const tableData2 = [
  {
    id: uniqueId(),
    avatar: '/static/avatar/001-man.svg',
    name: 'Zachary Gomez',
    username: 'zachary-gomez',
    email: 'zachary-gomez@gmail.com',
    role: 'Editor',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/002-girl.svg',
    name: 'Amanda Montgomery',
    username: 'amanda-montgomery',
    email: 'montgomery@ya.com',
    role: 'Subscriber',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/003-boy.svg',
    name: 'Lester Holland',
    username: 'lester-holland',
    email: 'lester75@gmail.com',
    role: 'Subscriber',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/004-woman.svg',
    name: 'Max Allison',
    username: 'max-allison',
    email: 'max-allison@pochta.io',
    role: 'Subscriber',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/005-man-1.svg',
    name: 'Richard Gregory',
    username: 'r.gregory',
    email: 'gregory@gmail.com',
    role: 'Subscriber',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/006-woman-1.svg',
    name: 'Clifford Caldwell',
    username: 'clifford-caldwell',
    email: 'clifford-c@gmail.com',
    role: 'Author',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/007-boy-1.svg',
    name: 'Lester Holland',
    username: 'zlester-holland',
    email: 'lester75@gmail.com',
    role: 'Subscriber',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/008-clown.svg',
    name: 'Richard Gregory',
    username: 'r.gregory',
    email: 'gregory@gmail.com',
    role: 'Subscriber',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/009-firefighter.svg',
    name: 'Max Allison',
    username: 'max-allison',
    email: 'max-allison@pochta.io',
    role: 'Subscriber',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/010-girl-1.svg',
    name: 'Zachary Gomez',
    username: 'zachary-gomez',
    email: 'zachary-gomez@gmail.com',
    role: 'Editor',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/011-man-2.svg',
    name: 'Zachary Gomez',
    username: 'zachary-gomez',
    email: 'zachary-gomez@gmail.com',
    role: 'Editor',
  },
  {
    id: uniqueId(),
    avatar: '/static/avatar/012-woman-2.svg',
    name: 'Zachary Gomez',
    username: 'zachary-gomez',
    email: 'zachary-gomez@gmail.com',
    role: 'Editor',
  },
]
function createData(
  id,
  Date,
  Name,
  Mobile,
  Email,
  Source,
  Assignedto,
  Status,
  Project,
  Note
) {
  return {
    id,
    Date,
    Name,
    Mobile,
    Email,
    Project,
    Assignedto,
    Source,
    Status,
    Note,
  }
}

const rowsParent = [
  createData(
    '1',
    '23-01-20221',
    'myName 1',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'new',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '2',
    '23-01-20221',
    'myName 2',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'new',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '3',
    '23-01-20221',
    'myName 3',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'facebook',
    'Arun',
    'inprogress',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '4',
    '23-01-20221',
    'myName 4',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'inprogress',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '5',
    '23-01-20221',
    'myName 5',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'followup',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '6',
    '23-01-20221',
    'myName 6',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'facebook1',
    'Arun',
    'followup',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '7',
    '23-01-20221',
    'myName 7',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Magic Bricks',
    'Arun',
    'visitfixed',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '8',
    '23-01-20221',
    'myName 8',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Magic Bricks',
    'Arun',
    'visitfixed',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '9',
    '23-01-20221',
    'myName 9',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'visitdone',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '10',
    '23-01-20221',
    'myName 10',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'visitdone',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '11',
    '23-01-20221',
    'myName 11',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'negotiation',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '12',
    '23-01-20221',
    'myName 12',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'negotiation',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '13',
    '23-01-20221',
    'myName 13',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'reassign',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '14',
    '23-01-20221',
    'myName 14',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'reassign',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '15',
    '23-01-20221',
    'myName 15',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'RNR',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '16',
    '23-01-20221',
    'myName 16',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'RNR',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '17',
    '23-01-20221',
    'myName 17',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'booked',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '18',
    '23-01-20221',
    'myName 18',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'booked',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '19',
    '23-01-20221',
    'myName 19',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'notinterested',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '20',
    '23-01-20221',
    'myName 20',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'notinterested',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '21',
    '23-01-20221',
    'myName 21',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'dead',
    'Nakshatra Township',
    'NA'
  ),
  createData(
    '22',
    '23-01-20221',
    'myName 22',
    '9000000000',
    'Jessicanewmannhz@Yahoo.Com',
    'Google',
    'Arun',
    'dead',
    'Nakshatra Township',
    'NA'
  ),
]
const rowsCounter = (parent, searchKey) => {
  return parent.filter((item) => {
    if (searchKey === 'all') {
      return item
    } else if (item.Status.toLowerCase() === searchKey.toLowerCase()) {
      console.log('All1', item)
      return item
    }
  })
}
const Wrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '0 1.5rem',
  paddingTop: '1rem',
}))
const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  width: 40,
  height: 40,
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '0.5rem',
}))
const TabListWrapper = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(700)]: {
    order: 3,
    marginTop: 1,
  },
}))

const CRMTableView = ({
  setisImportLeadsOpen,
  selUserProfileF,
  leadsFetchedData,

  leadsTyper,
}) => {
  // change navbar title
  // useTitle('Data Table V1')
  const { t } = useTranslation()
  const [value, setValue] = useState('new')
  const [tableData, setTableData] = useState([])
  const [tabHeadFieldsA, settabHeadFieldsA] = useState([])
  // const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const [searchKey, setSearchKey] = useState('pending')

  const handleChange = (_, newValue) => {
    console.log('newvalue is ', newValue)
    setValue(newValue)
  }

  useEffect(() => {
    console.log('table data is ', tableData2)
    setTableData(tableData2)
    // axios
    //   .get('/api/tableData1/all')
    //   .then(({ data }) => {
    //     setTableData(tableData1)
    //   })
    //   .catch((error) => {
    //     // setTableData(tableData1)
    //     console.log(error)
    //   })

    const tabHeadFieldsA1 =
      leadsTyper === 'inProgress'
        ? [
            { lab: 'In Progress', val: 'all' },
            { lab: 'New', val: 'new' },
            { lab: 'Follow Up', val: 'followup' },
            { lab: 'Visit Fixed', val: 'visitfixed' },
            { lab: 'Visit strokeLinejoin', val: 'visitdone' },
            { lab: 'Visit Cancel', val: 'visitcancel' },
            { lab: 'Negotiation', val: 'negotiation' },
            { lab: 'Reassign', val: 'reassign' },
            // { lab: 'RNR', val: 'RNR' },
            { lab: 'Un Assigned', val: 'unassigned' },
            // { lab: 'Booked', val: 'booked' },
            // { lab: 'Not Interested', val: 'notinterested' },
            // { lab: 'Dead', val: 'dead' },
          ]
        : leadsTyper === 'archieveLeads'
        ? archieveTab
        : financeTab
    settabHeadFieldsA(tabHeadFieldsA1)

    leadsTyper === 'inProgress'
      ? setValue('new')
      : leadsTyper === 'archieveLeads'
      ? setValue('all')
      : setValue('booked')
  }, [])

  const handleDelete = async (ids) => {
    const { data } = await axios.post('/api/tableData1/delete', {
      ids,
    })
    setTableData(data)
  }

  const filterTable = tableData.filter((item) =>
    value !== '' ? item.role.toLowerCase() === value : item.role
  )

  const archieveTab = [
    { lab: 'Archieve', val: 'all' },
    { lab: 'Dead', val: 'dead' },
    { lab: 'Not Interested', val: 'notinterested' },
    { lab: 'Blocked', val: 'blockded' },
  ]
  const financeTab = [
    { lab: 'All', val: 'all' },
    { lab: 'In Review', val: 'inReview' },
    { lab: 'Cleared', val: 'cleared' },
    { lab: 'Uncleared', val: 'uncleared' },
  ]
  return (
    <Box pt={2} pb={4}>
      <div className="sm:px-6 w-full">
        <div className=" md:pb-10 pb-7 md:pb-7">
          <div className="flex items-center justify-between">
            <p
              tabIndex={0}
              className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 font-Playfair"
            >
              My Tasks
            </p>
            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <p>Sort By:</p>
              <select
                aria-label="select"
                className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
              >
                <option className="text-sm text-indigo-800">Latest</option>
                <option className="text-sm text-indigo-800">Oldest</option>
                <option className="text-sm text-indigo-800">Latest</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <a
                className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                href=" javascript:void(0)"
              >
                <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                  <p>All</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Done</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Pending</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
                onClick={() => setSearchKey(['upcoming'])}
              >
                <div
                  className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                    searchKey.includes('upcoming') && searchKey.length === 1
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600'
                  }`}
                >
                  <p>Up Coming</p>
                </div>
              </a>
            </div>
            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
              <p className="text-sm font-medium leading-none text-white">
                Add Task
              </p>
            </button>
          </div>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                {[
                  {
                    title: 'Marketing Keynote Presentation1',
                    p: 'Urgent',
                    date: '04/07',
                    due: 'Today',
                  },
                ].map((dat, i) => (
                  <tr
                    tabIndex={0}
                    className="focus:outline-none h-16 border border-gray-100 rounded"
                    key={i}
                  >
                    <td>
                      <div className="ml-5">
                        <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                          <input
                            placeholder="checkbox"
                            type="checkbox"
                            className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
                          />
                          <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                            <svg
                              className="icon icon-tabler icon-tabler-check"
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z"></path>
                              <path d="M5 12l5 5l10 -10"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">
                          {dat?.title}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                            stroke="#3B82F6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                            stroke="#3B82F6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </td>
                    <td className="pl-24">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                            stroke="#52525B"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <circle
                            cx="7.50004"
                            cy="7.49967"
                            r="1.66667"
                            stroke="#52525B"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></circle>
                        </svg>
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          {dat?.p}
                        </p>
                      </div>
                    </td>
                    <td className="pl-5">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M7.5 5H16.6667"
                            stroke="#52525B"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M7.5 10H16.6667"
                            stroke="#52525B"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M7.5 15H16.6667"
                            stroke="#52525B"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M4.16669 5V5.00667"
                            stroke="#52525B"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M4.16669 10V10.0067"
                            stroke="#52525B"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M4.16669 15V15.0067"
                            stroke="#52525B"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <p className="text-sm leading-none text-gray-600 ml-2">
                          {dat?.date}
                        </p>
                      </div>
                    </td>
                    <td className="pl-5">
                      <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                        Due today at 18:00
                      </button>
                    </td>
                    <td className="pl-4">
                      <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                        View
                      </button>
                    </td>
                    <td>
                      <div className="relative px-5 pt-2">
                        <button
                          className="focus:ring-2 rounded-md focus:outline-none"
                          role="button"
                          aria-label="option"
                        >
                          <svg
                            className="dropbtn"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                              stroke="#9CA3AF"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                              stroke="#9CA3AF"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                              stroke="#9CA3AF"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </button>
                        <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                          <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                            <p>Edit</p>
                          </div>
                          <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                            <p>Delete</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                <tr className="h-3"></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <script src="./index.js"></script>
        <style>.checkbox:checked + .check-icon {
  display: flex;
}
</style>
        <script>function dropdownFunction(element) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                let list = element.parentElement.parentElement.getElementsByClassName("dropdown-content")[0];
                list.classList.add("target");
                for (i = 0; i < dropdowns.length; i++) {
                    if (!dropdowns[i].classList.contains("target")) {
                        dropdowns[i].classList.add("hidden");
                    }
                }
                list.classList.toggle("hidden");
            }</script> */}

      {/* <Card
        sx={{
          boxShadow: 4,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">

              <ul
                className="flex flex-wrap -mb-px "
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                {tabHeadFieldsA.map((d, i) => {
                  return (
                    <li key={i} className="mr-2" role="presentation">
                      <button
                        className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2  hover:text-gray-600 hover:border-blue-600 dark:text-gray-400 dark:hover:text-gray-300  ${
                          value === d.val
                            ? 'border-blue-600 text-gray-800'
                            : 'border-transparent'
                        }`}
                        type="button"
                        role="tab"
                        onClick={() => setValue(d.val)}
                      >
                        {`${d.lab} `}
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {rowsCounter(leadsFetchedData, d.val).length}
                        </span>

                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

          </Grid>
        </Grid>
      </Card> */}
    </Box>
  )
}

export default CRMTableView
