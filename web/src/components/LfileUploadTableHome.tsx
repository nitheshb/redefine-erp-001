import { ControlPoint } from '@mui/icons-material'
import { TabContext, TabList } from '@mui/lab'
import { Box, Button, Card, Grid, styled, Tab } from '@mui/material'
// import AddEmployeeModal from 'components/dataTable/dataTableV1/AddEmployeeModal'
// import useTitle from './../hooks/useTitle'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next' // styled components
import uniqueId from '../util/generatedId'
import LfileuploadTableTemplate from './LfileuploadTableTemplate'

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
    'Jessicanewmannhz@Yahoo1.Com',
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

const dupeDatais = [
  {
    id: 1,
    duplicate: [
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
    ],
  },
  {
    id: 2,
    duplicate: [
      createData(
        '21',
        '23-01-20221',
        'wow this is dupli',
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
    ],
  },
  {
    id: 3,
    duplicate: [
      createData(
        '21',
        '23-01-20221',
        'wow this is dupli',
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
    ],
  },
]
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

const LfileUploadTableHome = ({ fileRecords, title, pId, myBlock }) => {
  // change navbar title
  // useTitle('Data Table V1')
  const { t } = useTranslation()
  const [value, setValue] = useState('validR')
  const [validRows, setValidRows] = useState([])
  const [dupRows, setdupRows] = useState([])
  const [tableData, setTableData] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const handleChange = (_, newValue) => {
    console.log('newvalue is ', newValue)
    setValue(newValue)
  }

  useEffect(() => {
    console.log('table data is ', tableData2)
    setTableData(tableData2)
  }, [])

  useEffect(() => {
    console.log('table data is ', tableData2)
    const validMode = fileRecords.filter((rw) => rw['mode'] === 'valid')
    const dupMode = fileRecords.filter((rw) => rw['mode'] === 'duplicate')

    setValidRows(validMode)
    setdupRows(dupMode)
    // setTableData(tableData2)
  }, [fileRecords])

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
              <ul
                className="flex flex-wrap -mb-px"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                <li className="mr-2" role="presentation">
                  <button
                    className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2  hover:text-black hover:border-blue-600 dark:text-gray-400 dark:hover:text-gray-300  ${
                      value === 'all'
                        ? 'border-blue-600 text-gray-800'
                        : 'border-transparent'
                    }`}
                    type="button"
                    role="tab"
                    onClick={() => setValue('all')}
                  >
                    {`All `}
                    <span className="bg-gray-100 px-2 py-1 ml-2 rounded-full">
                      {fileRecords.length}
                    </span>
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500    rounded-t-lg border-b-2  hover:text-black hover:border-blue-600 dark:text-gray-400 dark:hover:text-gray-300  ${
                      value === 'validR'
                        ? 'border-blue-600 text-gray-800'
                        : 'border-transparent'
                    }`}
                    type="button"
                    role="tab"
                    onClick={() => setValue('validR')}
                  >
                    {`Valid `}
                    <span className="bg-gray-100 px-2 py-1 ml-2  text-gray-500  rounded-full">
                      {validRows.length}
                    </span>
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2  hover:text-black hover:border-blue-600 dark:text-gray-400 dark:hover:text-gray-300  ${
                      value === 'duplicateR'
                        ? 'border-blue-600 text-gray-800'
                        : 'border-transparent'
                    }`}
                    type="button"
                    role="tab"
                    onClick={() => setValue('duplicateR')}
                  >
                    {`Duplicate`}{' '}
                    <span className="bg-gray-100 px-2 py-1 rounded-full ml-2">
                      {dupRows.length}
                    </span>
                  </button>
                </li>
              </ul>
            </div>

            {/*  Data Table */}
            {value === 'all' && (
              <LfileuploadTableTemplate
                title={title}
                selStatus={'all'}
                rowsParent={fileRecords}
                sourceTab={value}
                pId={pId}
              />
            )}
            {value === 'validR' && (
              <LfileuploadTableTemplate
                selStatus={'all'}
                title={title}
                rowsParent={validRows}
                sourceTab={value}
                pId={pId}
                myBlock={myBlock}
              />
            )}

            {value === 'duplicateR' && (
              // dupeDatais.map((data, index) => (
              <LfileuploadTableTemplate
                // key={index}
                title={title}
                selStatus={'all'}
                rowsParent={dupRows}
                sourceTab={value}
                pId={pId}
              />
              // )
            )}

            {/* <LLeadsTableBody
              data={filterTable}
              handleDelete={handleDelete}
              selStatus={value}
            /> */}
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default LfileUploadTableHome
