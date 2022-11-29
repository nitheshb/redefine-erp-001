/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import * as React from 'react'

import '../../styles/myStyles.css'
import Section from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { alpha } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

import { useAuth } from 'src/context/firebase-auth-context'
import {
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
} from 'src/util/dateConverter'

import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { visuallyHidden } from '@mui/utils'
import Highlighter from 'react-highlight-words'

import CSVDownloader from '../../util/csvDownload'
import { timeConv, prettyDate } from '../../util/dateConverter'
import DropCompUnitStatus from '../dropDownUnitStatus'

import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone'
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone'
import { ConnectingAirportsOutlined } from '@mui/icons-material'

import LogSkelton from '../shimmerLoaders/logSkelton'

// function createData(
//   Date,
//   Name,
//   Mobile,
//   Email,
//   Project,
//   Source,
//   Empmobile,
//   Note
// ) {
//   return {
//     Date,
//     Name,
//     Mobile,
//     Email,
//     Project,
//     Source,
//     Empmobile,
//     Note,
//   }
// }

function descendingComparator(a, b, orderBy) {
  console.log('what is the order 1 ', b,  b[orderBy])
  if (b[orderBy] || b['Date'] < a[orderBy] || b['Date']) {
    return -1
  }
  if (b[orderBy] || b['Date'] > a[orderBy] || b['Date']) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  // {
  //   id: 'S.No',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'S.No',
  // },
  {
    id: 'Date',
    numeric: false,
    disablePadding: true,
    label: 'Created Date',
  },
  {
    id: 'stsUpT',
    numeric: false,
    disablePadding: true,
    label: 'Updated',
  },
  {
    id: 'Clientdetails',
    numeric: false,
    disablePadding: false,
    label: 'Client Details',
  },
  {
    id: 'Project',
    numeric: false,
    disablePadding: false,
    label: 'Project',
  },

  {
    id: 'Assigned',
    numeric: false,
    disablePadding: false,
    label: 'Assigned To',
  },
  {
    id: 'Source',
    numeric: false,
    disablePadding: false,
    label: 'Source',
  },
  {
    id: 'Currentstatus',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },

  {
    id: 'Notes',
    numeric: true,
    disablePadding: false,
    label: 'Comments',
  },
]

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    searchKey,
    viewUnitStatusA,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead style={{ height: '10px' }}>
      <TableRow selected={true}>
        <TableCell
          align="center"
          component="th"
          scope="row"
          padding="none"
          size="small"
          style={{
            backgroundColor: '#F7F9FB',
            color: '#1a91eb',
            maxHeight: '10px',
            height: '10px',
            lineHeight: '10px',
            maxWidth: '52px',
            minWidth: '25px',
            paddingLeft: '14px',
            paddingRight: '29px',
            marginRight: '10px',
          }}
        >
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
          <TableSortLabel>S.No</TableSortLabel>
        </TableCell>
        {headCells.map((headCell) => (
          <>
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{
                backgroundColor: '#F7F9FB',
                color: '#1a91eb',
                height: '10px',
                maxHeight: '10px',
                lineHeight: '7px',
                display:
                  headCell.id != 'Assigned'
                    ? ''
                    : viewUnitStatusA.includes('Assigned To') &&
                      headCell.id === 'Assigned'
                    ? ''
                    : 'none',
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                style={{
                  backgroundColor: '#F7F9FB',
                  color: '#1a91eb',
                  fontFamily: 'inherit',
                }}
              >
                <span className="text-black font-bodyLato">
                  {headCell.label}
                </span>
                {orderBy === headCell.id ? (
                  <Section component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Section>
                ) : null}
              </TableSortLabel>
            </TableCell>
          </>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  searchkey: PropTypes.number.isRequired || PropTypes.string.isRequired,
}

const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    selStatus,
    filteredData,
    setSearchKey,
    rows,
    viewUnitStatusA,
    pickCustomViewer,
    setViewUnitStatusA,
    startDate,
    endDate,
    setDateRange,
  } = props
  const d = new window.Date()
  const [rowsAfterSearchKey, setRowsAfterSearchKey] = React.useState(rows)
  const [downloadFormatRows, setDownloadFormatRows] = React.useState([])
  const [cutOffDate, setCutOffDate] = React.useState(d.getTime() + 60000)

  const [isOpened, setIsOpened] = React.useState(false)

  React.useEffect(() => {
    setRowsAfterSearchKey(rows)
  }, [rows])
  // React.useEffect(() => {
  //  console.log('calendar state', isOpened, startDate?.getTime())
  //  if(startDate !== null && endDate !=null){
  //   console.log('inside you1')
  //   let rowsR = rows.filter((item) => {
  //    return item.Date >=startDate.getTime() && item.Date <=endDate.getTime()
  //   })
  //   setRowsAfterSearchKey(rowsR)
  //  }else if(startDate !==null) {
  //   console.log('inside you')
  //   let rowsR = rows.filter((item) => {
  //     console.log('inside you wjat os tjo filter', item.Date>= startDate.getTime() && item.Date <= startDate.getTime()+ 86400000,startDate.getTime()+ 86399999,startDate.getTime(),   item.Name)
  //     return item.Date>= startDate.getTime() && item.Date <= startDate.getTime()+ 86400000
  //    })
  //    console.log('inside you wjat os tjo filter', rowsR.length)
  //    setRowsAfterSearchKey(rowsR)
  //    console.log('inside you wjat os tjo filter 1', rowsAfterSearchKey)
  //  }
  // }, [startDate,endDate ])

  React.useEffect(() => {
    let downRows = []
    rowsAfterSearchKey.map((data) => {
      let row = {}
      let remark
      if (data?.Remarks) {
        remark =
          data?.Remarks?.charAt(0) == '-'
            ? data?.Remarks.substring(1)
            : data?.Remarks
      } else {
        remark = data?.Remarks
      }
      row.Date = prettyDate(data?.Date).toLocaleString()
      row.Name = data?.Name
      row.CountryCode = data['Country Code']
      row.Mobile = data?.Mobile
      row.Email = data?.Email
      row.AssignedTo = data?.assignedToObj?.name
      row.Source = data?.Source
      row.Status = data?.Status
      row.Project = data?.Project
      row.Remarks = remark

      downRows.push(row)
    })

    setDownloadFormatRows(downRows)
  }, [rowsAfterSearchKey])

  const searchKeyField = (e) => {
    // console.log('searched values is ', e.target.value)
    setSearchKey(e.target.value)
    let searchString = e.target.value

    let rowsR = rows.filter((item) => {
      if (searchString == '' || !searchString) {
        console.log('ami here')
        return item
      } else if (
        // item.Assignedto.toLowerCase().includes(searchString.toLowerCase()) ||
        // item.Date.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Email.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Mobile.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Name.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Project.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Source.toLowerCase().includes(searchString.toLowerCase()) ||
        item.Status.toLowerCase().includes(searchString.toLowerCase())
      ) {
        return item
      }
    })
    setRowsAfterSearchKey(rowsR)
    // setRows(rowsR)
  }
  return (
    <section className="flex flex-row justify-between pb pt-1 px-3 ">
      <span className="flex flex-row">
        <span className="relative  p- border rounded h-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 absolute left-0 ml-1 mt-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={`Search...${selStatus}`}
            onChange={searchKeyField}
            className="ml-6 bg-transparent text-xs focus:border-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus:outline-none"
          />
        </span>
        {/* <span className="max-h-[42px] mt-[2px] ml-3">

          <label className="bg-green   pl-   flex flex-row cursor-pointer">
            <CalendarMonthTwoToneIcon className="mr-1" />
            <span className="inline">
              <DatePicker
                className="z-10 pl- py-1  inline text-xs text-[#0091ae] bg-white cursor-pointer min-w-[170px]"

                onCalendarOpen={() => setIsOpened(true)}
                onCalendarClose={() => setIsOpened(false)}
                onChange={(update) => setDateRange(update)}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                isClearable={true}

                dateFormat="MMM d, yyyy "
              />
            </span>
          </label>
        </span> */}
      </span>

      {/* <span className="inline mt-[4px] pl-2">
                    <DatePicker
                      className=" pl- px- min-w-[151px] inline text-xs text-[#0091ae] bg-white cursor-pointer"
                      selected={cutOffDate}
                      onChange={(date) =>{ setCutOffDate(date.getTime())}}
                      showTimeSelect
                      timeFormat="HH:mm"

                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </span> */}

      {/* {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {' '}
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="subtitle2"
          id="tableTitle"
          component="div"
        >
          <span className="ml-3 pt-[7px] font-light font-bodyLato block text-xs ">
            <span className="ml-1 mr-1 pt-2 font-thick font-bodyLato text-[12px] text-blue-800">
              {rowsAfterSearchKey.length}
            </span>
            Results{' '}
          </span>
        </Typography>
      )} */}
      <span style={{ display: 'flex' }}>
        <section className="pt-1">
          <DropCompUnitStatus
            type={'show'}
            id={'id'}
            setStatusFun={{}}
            viewUnitStatusA={viewUnitStatusA}
            pickCustomViewer={pickCustomViewer}
          />
        </section>
        {/* <Tooltip title={`Download ${rowsAfterSearchKey.length} Rows`}>

          <IconButton className="bg-gray-200 ">
            <EventNoteTwoToneIcon
              className="h-[20px] w-[20px]"
              style={{ height: '20px', width: '20px' }}
            />
          </IconButton>
        </Tooltip> */}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton className="bg-gray-200">
              <DeleteIcon
                className="h-[20px] w-[20px]"
                style={{ height: '20px', width: '20px' }}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={`Download ${rowsAfterSearchKey.length} Rows`}>
            {/* <IconButton>
            <FileDownloadIcon />
            <CSVDownloader />
          </IconButton> */}

            <CSVDownloader
              className="mr-6 h-[20px] w-[20px]"
              downloadRows={downloadFormatRows}
              style={{ height: '20px', width: '20px' }}
            />
          </Tooltip>
        )}
      </span>
    </section>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selStatus: PropTypes.string.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchKey: PropTypes.string || PropTypes.number,
}

const HighlighterStyle = (props) => {
  const { searchKey, source } = props
  return (
    <Highlighter
      highlightStyle={{
        backgroundColor: '#ffc069',
        padding: 0,
      }}
      searchWords={[searchKey]}
      autoEscape
      textToHighlight={source}
    />
  )
}
export default function LLeadsTableBody({
  fetchLeadsLoader,
  selStatus,
  rowsParent,
  selUserProfileF,
  newArray
}) {
  const { user } = useAuth()
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('Date')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setRows] = React.useState([])
  const [searchKey, setSearchKey] = React.useState('')
  const [dateRange, setDateRange] = React.useState([null, null])
  const [startDate, endDate] = dateRange

  React.useEffect(() => {
    console.log('send values is', rowsParent, selStatus)
    filterStuff(rowsParent)
    // let x = rowsParent.filter((item) => {
    //   if (selStatus === 'all') {
    //     return item
    //   } else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
    //     console.log('All1', item)
    //     return item
    //   } else if (item.Status.toLowerCase().includes(selStatus.toLowerCase())) {
    //     return item
    //   } else {
    //     return item
    //   }
    // })
    // // console.log('All2', x)

    // console.log('what is x', rows)

    // return () => {
    //   second
    // }
  }, [selStatus, rowsParent])

  React.useEffect(() => {
    console.log('search on is', searchKey)
    filterSearchString(rows)
  }, [searchKey])

  const filterStuff = async (parent) => {
console.log('filter value stuff' , parent)
    let x =  selStatus === 'all'
    ? parent['all'] :  selStatus === 'archieve_all' ? parent['archieve_all'] : parent[selStatus]

    await setRows(newArray)
  }
  const filterByDate = () => {
    rows.filter((item) => {
      {
        /* console.log('inside xxxx ==>', item?.Date>= startDate.getTime() && item.Date <= startDate.getTime()+ 86400000,startDate.getTime()+ 86399999,startDate.getTime(),   item.Name) */
      }
      if (startDate !== null && endDate != null) {
        console.log('inside you1', startDate, endDate, item)
        let x = rows.filter((item) => {
          return (
            item?.Date >= startDate?.getTime() &&
            item?.Date <= endDate?.getTime()
          )
        })
        setRows(x)
      } else if (startDate !== null) {
        console.log('inside you1 x')
        console.log(
          'iinside you1 x',
          item?.Date >= startDate?.getTime() &&
            item?.Date <= startDate?.getTime() + 86400000,
          startDate?.getTime() + 86399999,
          startDate?.getTime(),
          item.Name
        )

        let x = rows.filter((item) => {
          console.log(
            'inside you wjat os tjo filter',
            item?.Date >= startDate?.getTime() &&
              item?.Date <= startDate?.getTime() + 86400000,
            startDate?.getTime() + 86399999,
            startDate?.getTime(),
            item.Name
          )
          return (
            item?.Date >= startDate?.getTime() &&
            item?.Date <= startDate?.getTime() + 86400000
          )
        })
        setRows(x)
      } else {
        return item
      }
    })
  }
  const filterSearchString = async (parent) => {
    return
    let x = await parent.filter((item) => {
      if (item.Source.toLowerCase().includes(selStatus.toLowerCase())) {
        return item
      }
      //  else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
      //   console.log('All1', item)
      //   return item
      // } else if (item.Source.toLowerCase().includes(selStatus.toLowerCase())) {
      //   return item
      // }
    })
    await setRows(x)
    await console.log('xo', x)
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    console.log('property is', property)
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, row) => {
    // const selectedIndex = selected.indexOf(name)
    let newSelected = []

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name)
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1))
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1))
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   )
    // }
    console.log('is row clicked', row)
    selUserProfileF('User Profile', row)
    setSelected(newSelected)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const [selBlock, setSelBlock] = React.useState({})
  const [viewUnitStatusA, setViewUnitStatusA] = React.useState([
    'Phone No',

    // 'Blocked',
    // 'Booked',
    // 'Total',
  ])
  React.useEffect(() => {
    if (user) {
      const { role } = user

      if (role[0] === 'sales-manager') {
        setViewUnitStatusA(['Phone No', 'Assigned To'])
      }
    }
  }, [user])



  const pickCustomViewer = (item) => {
    const newViewer = viewUnitStatusA
    if (viewUnitStatusA.includes(item)) {
      const filtered = newViewer.filter(function (value) {
        return value != item
      })
      setViewUnitStatusA(filtered)
      console.log('reviwed is ', viewUnitStatusA)
    } else {
      setViewUnitStatusA([...newViewer, item])
      console.log('reviwed is add ', viewUnitStatusA)
    }
  }

  return (
    <Section sx={{ width: '100%' }} style={{ border: 'none', radius: 0 }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        selStatus={selStatus}
        filteredData={rows}
        searchKey={searchKey}
        startDate={startDate}
        endDate={endDate}
        setDateRange={setDateRange}
        setSearchKey={setSearchKey}
        rows={rows}
        viewUnitStatusA={viewUnitStatusA}
        pickCustomViewer={pickCustomViewer}
        setViewUnitStatusA={setViewUnitStatusA}
      />
      <section
        style={{ borderTop: '1px solid #efefef', background: '#fefafb' }}
      >
        <TableContainer sx={{ maxHeight: 640 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            stickyHeader
            aria-label="sticky table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              searchkey={searchKey}
              viewUnitStatusA={viewUnitStatusA}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {/* {stableSort(rows, getComparator(order, orderBy)).map( */}
              {/* Assignedto: "Arun"
Date: "23-01-20221"
Email: "Jessicanewmannhz@Yahoo.Com"
Mobile: "9000000000"
Name: "myName 1"
Note: "NA"
Project: "Nakshatra Township"
Source: "Google"
Status: "new"
id: "1" */}

              {/* item.Assignedto.toLowerCase().includes(
                    searchKey.toLowerCase()
                  ) || */}
              {

                rows
                .filter((item) => {
                  if (searchKey == '' || !searchKey) {
                    return item
                  }
                   else if (
                    item.Email.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item.Mobile.toLowerCase().includes(
                      searchKey.toLowerCase()
                    ) ||
                    item.Name.toLowerCase().includes(searchKey.toLowerCase()) ||
                    item.Source.toLowerCase().includes(
                      searchKey.toLowerCase()
                    )
                  ) {
                    return item
                  }
                })
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.Name)
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        size="small"
                      >
                        {index + 1}
                      </TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <span className="font-bodyLato">
                          {prettyDate(row.Date).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                      <>
                        {/* <span className="font-bodyLato">
                          {prettyDate(row?.stsUpT || row.Date).toLocaleString()}
                        </span> */}
                        <span className="px- py-[1px]  min-w-[100px] inline-flex text-xs leading-5 tracking-wide  rounded-full  text-green-800">
                                                {Math.abs(
                                                  getDifferenceInMinutes(
                                                    (row?.stsUpT || row.Date),
                                                    ''
                                                  )
                                                ) > 60
                                                  ? Math.abs(
                                                      getDifferenceInMinutes(
                                                        (row?.stsUpT || row.Date),
                                                        ''
                                                      )
                                                    ) > 1440
                                                    ? `${Math.abs(getDifferenceInDays(
                                                      (row?.stsUpT || row.Date),
                                                        ''
                                                      ))} Days `
                                                    : `${Math.abs(getDifferenceInHours(
                                                      (row?.stsUpT || row.Date),
                                                        ''
                                                      ))} Hours `
                                                  : `${Math.abs(getDifferenceInMinutes(
                                                    (row?.stsUpT || row.Date),
                                                      ''
                                                    ))} Min`}{' '}
                                                {getDifferenceInMinutes(
                                                  (row?.stsUpT || row.Date),
                                                  ''
                                                ) < 0
                                                  ? 'ago'
                                                  : 'Left'}
                                              </span>
                        </>
                      </TableCell>

                      <TableCell align="left">
                        <section>
                          <div>
                            <div
                              className="relative flex flex-col  group"
                              // style={{ alignItems: 'end' }}
                            >
                              <div
                                className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex"
                                // style={{  width: '300px' }}
                                style={{ 'zIndex': '9' }}
                              >
                                <span
                                  className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                                  style={{
                                    color: 'black',
                                    background: '#e2c062',
                                    maxWidth: '300px',
                                  }}
                                >
                                  <div className="italic flex flex-col">
                                    <div className="font-bodyLato">
                                      <HighlighterStyle
                                        searchKey={searchKey}
                                        source={row.Name.toString()}
                                      />
                                    </div>
                                    <div className="font-bodyLato">
                                      <HighlighterStyle
                                        searchKey={searchKey}
                                        source={row.Email.toString()}
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bodyLato">
                                        <HighlighterStyle
                                          searchKey={searchKey}
                                          source={row.Mobile.toString().replace(
                                            /(\d{3})(\d{3})(\d{4})/,
                                            '$1-$2-$3'
                                          )}
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </span>
                                <div
                                  className="w-3 h-3  -mt-2 rotate-45 bg-black"
                                  style={{
                                    background: '#e2c062',
                                    marginRight: '12px',
                                  }}
                                ></div>
                              </div>
                              <span className="font-bodyLato">
                                <HighlighterStyle
                                  searchKey={searchKey}
                                  source={row.Name.toString()}
                                />
                              </span>
                            </div>
                          </div>
                          {viewUnitStatusA.includes('Email Id') && (
                            <div>
                              <span className="font-bodyLato">
                                <HighlighterStyle
                                  searchKey={searchKey}
                                  source={row.Email.toString()}
                                />
                              </span>
                            </div>
                          )}
                          {viewUnitStatusA.includes('Phone No') && (
                            <div>
                              <span className="font-bodyLato">
                                <HighlighterStyle
                                  searchKey={searchKey}
                                  source={row.Mobile.toString().replace(
                                    /(\d{3})(\d{3})(\d{4})/,
                                    '$1-$2-$3'
                                  )}
                                />
                              </span>
                            </div>
                          )}
                        </section>
                      </TableCell>
                      <TableCell align="left">{row.Project}</TableCell>
                      {/* display:
                  viewUnitStatusA.includes('Assigned To') &&
                  headCell.id === 'Assigned'
                    ? 'none'
                    : '', */}
                      {viewUnitStatusA.includes('Assigned To') && (
                        <TableCell align="left">
                          {/* <HighlighterStyle
                        searchKey={searchKey}
                        source={row.Assignedto}
                      /> */}
                          <span className="font-bodyLato">
                            {row?.assignedToObj?.label}
                          </span>
                        </TableCell>
                      )}

                      <TableCell align="middle">
                        <span className="px-2 uppercase inline-flex text-[11px] text-black-900  ">
                          {row?.Source?.toString() || 'NA'}
                        </span>
                      </TableCell>

                      <TableCell align="left">
                        <span className="px-2 uppercase inline-flex text-[10px] leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <HighlighterStyle
                            searchKey={searchKey}
                            source={row.Status.toString()}
                          />
                        </span>
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{ maxWidth: '150px', textOverflow: 'ellipsis' }}
                      >
                        {' '}
                        <span className="font-bodyLato">{row.Remarks}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </Section>
  )
}
