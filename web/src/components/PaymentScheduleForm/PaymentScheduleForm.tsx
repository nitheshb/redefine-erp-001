import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Alert, AlertTitle } from '@mui/lab'
import DatePicker from 'react-datepicker'
import { format, parse, isDate } from 'date-fns'
import { useSnackbar } from 'notistack'
import Select from 'react-select'
import { useAuth } from 'src/context/firebase-auth-context'
// import { Edit, DeleteOutline } from '@material-ui/icons'
import { MaterialCRUDTable } from 'src/components/MaterialCRUDTable'
import {
  getPaymentSchedule,
  createPaymentSheduleComp,
  updatePayment,
  deletePayment,
  addPhasePaymentScheduleCharges,
  updatePaymentScheduleCharges,
} from 'src/context/dbQueryFirebase'
import { paymentScheduleA } from 'src/constants/projects'

const PaymentScheduleForm = ({ title, data, source }) => {
  const { user } = useAuth()

  const { orgId } = user
  const [tableData, setTableData] = useState([])
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [editOpitionsObj, setEditOptions] = useState({})

  useEffect(() => {
    if (source === 'projectManagement') {
      setEditOptions({
        onRowAdd: async (newData) => await handleRowAdd(newData),
        onRowUpdate: async (newData, oldData) =>
          await handleRowUpdate(newData, oldData),
        onRowDelete: async (oldData) => await handleRowDelete(oldData),
      })
    }
  }, [source, data, tableData])
  useEffect(() => {
    const { phase } = data
    const { paymentScheduleObj } = phase

    setTableData(paymentScheduleObj)
    console.log('payment', paymentScheduleObj)
  }, [data])

  const defaultValue = (options, value) => {
    return (
      (options
        ? options.find((option) => option.value === value?.value)
        : '') || ''
    )
  }
  const columns = [
    {
      title: 'Stage*',
      field: 'stage',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => {
        return rowData?.stage?.label
      },
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="component"
            onChange={(value_x) => {
              onChange(value_x)
            }}
            options={paymentScheduleA}
            value={defaultValue(paymentScheduleA, value)}
            className="text-md mr-2 z-50"
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        )
      },
    },
    {
      title: ' ₹ or % *',
      field: 'percentage',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      editComponent: ({ value, onChange }) => (
        <>
          <input
            placeholder="percentage"
            className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
            autoComplete="off"
            onChange={(e) => onChange(e.target.value)}
            value={value}
            type="number"
            max="100"
          />
        </>
      ),
    },
    {
      title: 'Zero Day*',
      field: 'zeroDay',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      editComponent: ({ value, onChange }) => (
        <input
          placeholder="Days"
          className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          type="number"
          max="100"
        />
      ),
    },
    // {
    //   title: 'Description*',
    //   field: 'description',
    //   headerStyle: {
    //     padding: '0.25rem',
    //   },
    //   cellStyle: {
    //     padding: '0.25rem',
    //   },
    //   editComponent: ({ value, onChange }) => (
    //     <input
    //       placeholder="Description"
    //       className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
    //       autoComplete="off"
    //       onChange={(e) => onChange(e.target.value)}
    //       value={value}
    //     />
    //   ),
    // },
    {
      title: 'Due date*',
      field: 'dueDate',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      editComponent: ({ value, onChange }) => (
        <DatePicker
          selected={
            value && !isDate(value)
              ? parse(value, 'dd/MM/yyyy', new Date())
              : value
          }
          onChange={onChange}
          autoComplete="off"
          className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/mm/yyyy"
        />
      ),
    },
  ]

  // const getPayments = async () => {
  //   const { projectId, uid } = data?.phase || {}
  //   const unsubscribe = getPaymentSchedule(
  //     { projectId, phaseId: uid },
  //     (querySnapshot) => {
  //       const response = querySnapshot.docs.map((docSnapshot) =>
  //         docSnapshot.data()
  //       )
  //       setTableData(response)
  //     },
  //     (e) => {
  //       console.log('error', e)
  //       setTableData([])
  //     }
  //   )
  //   return unsubscribe
  // }

  // useEffect(() => {
  //   getPayments()
  // }, [])

  const errors = (formData, isEdit) => {
    //validating the data inputs
    const errorList = []
    if (!formData.stage) {
      errorList.push("Try Again, You didn't enter the stage field")
    }
    if (!formData.percentage) {
      errorList.push("Try Again, You didn't enter the Percentage field")
    }

    // if (!formData.description) {
    //   errorList.push("Try Again, description field can't be blank")
    // }
    // if (!isEdit && !isDate(formData.dueDate)) {
    //   errorList.push("Try Again, You didn't enter valid date")
    // }
    return errorList
  }
  //function for updating the existing row details
  const handleRowUpdate = async (newData, oldData) => {
    const errorList = errors(newData, true)
    if (errorList.length < 1) {
      const { uid, paymentScheduleObj } = data?.phase || {}
      const update = {
        ...newData,
        dueDate: isDate(newData.dueDate)
          ? format(newData.dueDate, 'dd/MM/yyyy')
          : newData.dueDate || null,
      }

      console.log('check this stuff', tableData, paymentScheduleObj)
      const c = await tableData.map((e) => {
        console.log(e.myId, oldData.myId, e.myId === oldData.myId)
        if (e.myId === oldData.myId) {
          return update
        }
        return e
      })
      console.log('check this stuff it', c)
      await updatePaymentScheduleCharges(orgId,uid, c, enqueueSnackbar)
    } else {
      setErrorMessages(errorList)
      setIserror(true)
    }
  }

  //function for deleting a row
  const handleRowDelete = async (oldData) => {
    const { uid } = data?.phase || {}
    const c = tableData.filter((e) => e.myId != oldData.myId)
    console.log('check this stuff', c)
    await updatePaymentScheduleCharges(orgId,uid, c, enqueueSnackbar)
  }

  //function for adding a new row to the table
  const handleRowAdd = async (newData) => {
    setIserror(false)
    setErrorMessages([])
    const errorList = errors(newData, false)
    if (errorList.length < 1) {
      const { projectId, uid } = data?.phase || {}
      const update = {
        ...newData,
        dueDate: format(newData.dueDate, 'dd/MM/yyyy'),
      }
      // await createPayment(update, enqueueSnackbar)
      await addPhasePaymentScheduleCharges(orgId,uid, update, enqueueSnackbar)
    } else {
      setErrorMessages(errorList)
      setIserror(true)
    }
  }

  return (
    <div className="h-full shadow-xl flex flex-col pt-6 mb-6 mt-10 bg-[#F1F5F9] rounded-t overflow-y-scroll">
      <div className="z-10">
        {/* <Dialog.Title className="font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
        <span className="mr-auto ml-3  text-md font-extrabold tracking-tight uppercase font-body ">
          {title}
        </span>
        <div className="mt-5">
          <MaterialCRUDTable
            title=""
            columns={columns}
            data={tableData}
            options={{
              headerStyle: {
                borderBottomWidth: '3px',
              },
              actionsColumnIndex: -1,
              paging: false,
              minBodyHeight: '1000px',
              doubleHorizontalScroll: true,
            }}
            style={{
              padding: '30px',
              borderRadius: '0px',
              boxShadow: 'none',
            }}
            actionsCellStyle={{
              width: 'auto',
              justifyCenter: 'center',
            }}
            editable={editOpitionsObj}
          />
        </div>

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
    </div>
  )
}

export default PaymentScheduleForm
