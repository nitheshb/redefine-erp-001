import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import UkoAvatar from '../../components/GenUkoAvatar'
import { useState } from 'react'
// import AddEmployeeModal from './AddEmployeeModal'
const columnShape = [
  {
    Header: 'Avatar',
    accessor: 'avatar',
    Cell: ({ value }) => <UkoAvatar src={value} />,
  },
  {
    minWidth: 180,
    Header: 'Username',
    accessor: 'username',
  },
  {
    minWidth: 230,
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Role',
    accessor: 'role',
  },
  {
    Header: 'Edit',
    accessor: 'edit',
    Cell: (props) => {
      const { state, row } = props
      const [open, setOpen] = useState(false)
      const selectedRow = Object.keys(state.selectedRowIds).includes(row.id)
      return (
        <>
          <IconButton
            component="span"
            disableRipple
            onClick={() => {
              setOpen(true)
            }}
          >
            <Edit
              sx={{
                color: selectedRow ? 'primary.main' : 'text.disabled',
              }}
            />
          </IconButton>

          {/* <AddEmployeeModal
            edit
            open={open}
            data={row.original}
            onClose={() => setOpen(false)}
          /> */}
        </>
      )
    },
  },
]
export default columnShape
