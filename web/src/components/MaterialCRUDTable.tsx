import { forwardRef } from 'react'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

export const MaterialCRUDTable = (props) => {
  const tableIcons = {
    Add: forwardRef((props, ref) => (
      <AddBox fontSize="small" {...props} ref={ref} />
    )),
    Check: forwardRef((props, ref) => (
      <Check fontSize="small" {...props} ref={ref} />
    )),
    Clear: forwardRef((props, ref) => (
      <Clear fontSize="small" {...props} ref={ref} />
    )),
    Delete: forwardRef((props, ref) => (
      <DeleteOutline fontSize="small" {...props} ref={ref} />
    )),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight fontSize="small" {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => (
      <Edit fontSize="small" {...props} ref={ref} />
    )),
    Export: forwardRef((props, ref) => (
      <SaveAlt fontSize="small" {...props} ref={ref} />
    )),
    Filter: forwardRef((props, ref) => (
      <FilterList fontSize="small" {...props} ref={ref} />
    )),
    FirstPage: forwardRef((props, ref) => (
      <FirstPage fontSize="small" {...props} ref={ref} />
    )),
    LastPage: forwardRef((props, ref) => (
      <LastPage fontSize="small" {...props} ref={ref} />
    )),
    NextPage: forwardRef((props, ref) => (
      <ChevronRight fontSize="small" {...props} ref={ref} />
    )),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft fontSize="small" {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => (
      <Clear fontSize="small" {...props} ref={ref} />
    )),
    Search: forwardRef((props, ref) => (
      <Search fontSize="small" {...props} ref={ref} />
    )),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward fontSize="small" {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove fontSize="small" {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => (
      <ViewColumn fontSize="small" {...props} ref={ref} />
    )),
  }
  return <MaterialTable icons={tableIcons} {...props} />
}
