import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Alert, AlertTitle } from '@mui/lab'
import DatePicker from 'react-datepicker'
import { format, parse, isDate } from 'date-fns'
import { useSnackbar } from 'notistack'
import Select from 'react-select'

// import { Edit, DeleteOutline } from '@material-ui/icons'
import { MaterialCRUDTable } from 'src/components/MaterialCRUDTable'
import {
  getPaymentSchedule,
  createPaymentSheduleComp,
  updatePayment,
  deletePayment,
  updatePaymentScheduleCharges,
  steamUsersListByRole,
  updateUserAccessProject,
} from 'src/context/dbQueryFirebase'
import { paymentScheduleA } from 'src/constants/projects'
import { useAuth } from 'src/context/firebase-auth-context'
import Checkbox from '@mui/material/Checkbox'

const PaymentLeadAccess = ({ title, data, source }) => {
  const { user } = useAuth()
  const { orgId, email } = user
  const [tableData, setTableData] = useState([])
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [editOpitionsObj, setEditOptions] = useState({})
  const [salesPeopleList, setsalesPeopleList] = useState([])
  const [leadsProjectAccessA, setLeadsProjectAccessA] = useState([])
  const [selProjId, setProjId] = useState('')

  useEffect(() => {
    const { project } = data
    setProjId(project?.uid)
  }, [data])

  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA)

        setsalesPeopleList(usersListA)
      },
      (error) => setsalesPeopleList([])
    )

    return unsubscribe
  }, [])

  const addRemoveProjectAccessFun = (value) => {
    console.log('value is', value, data, source)
    const { uid, email: empEmailId, projAccessA } = value
    const { project } = data
    const { projectName, uid: projiD } = project

    //  projId
    // add projectId to users doc
    // const { uid, projAccessA, , email } = value
    let newProjAccessA = projAccessA || []
    console.log('new porj is', projAccessA)
    if (projAccessA?.includes(projiD)) {
      newProjAccessA = projAccessA?.filter((d) => d != projiD)
      console.log('new project Access is', newProjAccessA)
    } else {
      newProjAccessA = [...(projAccessA || []), ...[projiD]]
    }
    // projectName

    updateUserAccessProject(
      orgId,
      uid,
      newProjAccessA,
      projectName,
      empEmailId,
      email,
      enqueueSnackbar
    )

    // setLeadsProjectAccessA(value.target.value)
  }

  return (
    <>
      <div className="h-full shadow-xl flex flex-col pt-6 mb-6 mt-10 bg-[#F1F5F9] rounded-t overflow-y-scroll">
        <div className="z-10">
          {/* <Dialog.Title className="font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
          <span className="mr-auto ml-3  text-md font-extrabold tracking-tight uppercase font-body ">
            {title}
          </span>
          <div className="mt-5"></div>

          <div>
            {iserror && (
              <Alert severity="error">
                <AlertTitle>ERROR</AlertTitle>
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>
                })}
              </Alert>
            )}
          </div>
        </div>
        <div className="bg-white p-4">
          {salesPeopleList.map((salesPerson, i) => {
            return (
              <div key={i}>
                <Checkbox
                  color="primary"
                  checked={salesPerson?.projAccessA?.includes(selProjId)}
                  onChange={(e) => {
                    console.log('earnet')
                    addRemoveProjectAccessFun(salesPerson)
                  }}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
                {salesPerson.label}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default PaymentLeadAccess
