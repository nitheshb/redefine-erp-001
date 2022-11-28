import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { visuallyHidden } from '@mui/utils'
import Highlighter from 'react-highlight-words'
import CSVDownloader from '../../util/csvDownload'
import { timeConv, prettyDate } from '../../util/dateConverter'

import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone'
import { ConnectingAirportsOutlined } from '@mui/icons-material'

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
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
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
    label: 'Date',
  },
  {
    id: 'Currentstatus',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'Clientdetails',
    numeric: false,
    disablePadding: false,
    label: 'Client Details',
  },
  {
    id: 'Assigned',
    numeric: false,
    disablePadding: false,
    label: 'Assigned',
  },
  {
    id: 'Source',
    numeric: false,
    disablePadding: false,
    label: 'Source',
  },
  {
    id: 'Project',
    numeric: false,
    disablePadding: false,
    label: 'Project',
  },

  {
    id: 'Notes',
    numeric: true,
    disablePadding: false,
    label: 'Notes',
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
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow selected={true}>
        <TableCell
          align="center"
          component="th"
          scope="row"
          padding="checkbox"
          size="small"
          style={{ backgroundColor: '#efedfe' }}
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
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ backgroundColor: '#efedfe' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
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
  const { numSelected, selStatus, filteredData, setSearchKey, rows } = props

  const [rowsAfterSearchKey, setRowsAfterSearchKey] = React.useState(rows)

  React.useEffect(() => {
    setRowsAfterSearchKey(rows)
  }, [rows])

  const searchKeyField = (e) => {
    // console.log('searched values is ', e.target.value)
    setSearchKey(e.target.value)
    const searchString = e.target.value

    const rowsR = rows.filter((item) => {
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
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 2, sm: 2 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <span className="relative  p-1 border">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 absolute left-0 ml-1 mt-1"
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
          className="ml-6 bg-transparent focus:border-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus:outline-none"
        />
      </span>

      {numSelected > 0 ? (
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
          <span className="ml-3">Showing {rowsAfterSearchKey.length}</span>
        </Typography>
      )}
      <span style={{ display: 'flex' }}>
        <Tooltip title={`Download ${rowsAfterSearchKey.length} Rows`}>
          {/* <IconButton>
            <FileDownloadIcon />
            <CSVDownloader />
          </IconButton> */}
          <IconButton className="bg-gray-200">
            <EventNoteTwoToneIcon />
          </IconButton>
        </Tooltip>

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton className="bg-gray-200">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={`Download ${rowsAfterSearchKey.length} Rows`}>
            {/* <IconButton>
            <FileDownloadIcon />
            <CSVDownloader />
          </IconButton> */}

            <CSVDownloader className="mr-6" downloadRows={rowsAfterSearchKey} />
          </Tooltip>
        )}
      </span>
    </Toolbar>
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
export default function FinanceTableBody({
  selStatus,
  rowsParent,
  selUserProfileF,
}) {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setRows] = React.useState([])
  const [searchKey, setSearchKey] = React.useState('')

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
    const x = await parent.filter((item) => {
      if (selStatus === 'all') {
        return item
      } else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
        console.log('All1', item)
        return item
      }
    })
    await setRows(x)
    await console.log('xo', x, parent, selStatus)
  }
  const filterSearchString = async (parent) => {
    return
    const x = await parent.filter((item) => {
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
    const newSelected = []

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }} style={{ border: 'none' }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        selStatus={selStatus}
        filteredData={rows}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        rows={rows}
      />
      {['values']
        .filter((item) => {
          if (searchKey == '' || !searchKey) {
            return item
          } else if (
            item?.Email.toLowerCase().includes(searchKey.toLowerCase()) ||
            item?.Mobile.toLowerCase().includes(searchKey.toLowerCase()) ||
            item?.Name.toLowerCase().includes(searchKey.toLowerCase()) ||
            item?.Project.toLowerCase().includes(searchKey.toLowerCase()) ||
            item?.Source.toLowerCase().includes(searchKey.toLowerCase()) ||
            item?.Status.toLowerCase().includes(searchKey.toLowerCase())
          ) {
            return item
          }
        })
        .slice()
        .sort(getComparator(order, orderBy))
        .map((row, index) => {
          const isItemSelected = isSelected(row.Name)
          const labelId = `enhanced-table-checkbox-${index}`
          return (
            <div
              key={index}
              className="flex flex-row my-7 border-b pb-6 justify-between border-[#e0cfcf] px-4"
            >
              <section className="flex flex-row">
                <div className="flex w-10 h-10 mt-auto mb-auto justify-center items-center border-2 rounded-md ">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col ml-5 w-40 max-w-40">
                  <span className="font-semibold text-sm app-color-black">
                    Aakash Raj
                  </span>
                  <span className="font-semibold text-sm app-color-black">
                    52346673647
                  </span>
                  <span className="font text-sm app-color-black">
                    HDFC-Silk Board Branch Layout
                  </span>
                </div>
              </section>
              <div className="flex flex-col ml-5 w-40 max-w-40">
                <span className="font-semibold text-sm app-color-black">
                  Vertex Apartments
                </span>
                <span className="font-semibold text-sm app-color-black">
                  52346673647
                </span>
                <span className="font text-sm app-color-black">
                  HDFC-Silk Board Branch Layout
                </span>
              </div>
              <div className="flex flex-col  items-end ml-3">
                <span className="font-semibold text-sm app-color-black">
                  ₹120000.00
                </span>
                <span className="font text-xs app-color-gray-2 mt-1">
                  31 Mar 2019
                </span>
              </div>

              <div className="flex flex-col ml-12 items-end">
                <span className="font-semibold text-sm app-color-black border p-2 rounded-2xl rounded-tl-none px-6">
                  Cleared
                </span>
                {/* <span className="font-semibold text-xs app-color-gray-2">
                  Un Cleared
                </span> */}
              </div>
            </div>
          )
        })}
    </Box>
  )
}
