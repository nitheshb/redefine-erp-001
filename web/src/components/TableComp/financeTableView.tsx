import { TabList } from '@mui/lab'
import { Box, Card, Grid, styled } from '@mui/material'
import LLeadsTableBody from '../LLeadsTableBody/LLeadsTableBody'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next' // styled components
import uniqueId from '../../util/generatedId'

import FinanceTableBody from './financeTableBody'

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

const FinanceTableView = ({
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
            { lab: 'Visit Done', val: 'visitdone' },
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
      <Card
        sx={{
          boxShadow: 4,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
              {/* bg-[#fdb7b7] */}
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
                        {/*
                        <div className="px-2 mt-1 text-[9px] text-black  rounded-full">
                          <span className="bg-gray-100 px-2 py-1 rounded-full">
                            {rowsCounter(leadsFetchedData, d.val).length}
                          </span>
                        </div> */}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            {/*  Data Table */}
            <FinanceTableBody
              data={filterTable}
              handleDelete={handleDelete}
              selStatus={value}
              rowsParent={leadsFetchedData}
              selUserProfileF={selUserProfileF}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default FinanceTableView
