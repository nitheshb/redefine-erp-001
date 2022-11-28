import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Alert, AlertTitle } from '@mui/lab'
import { useSnackbar } from 'notistack'
import Select from 'react-select'
import { MaterialCRUDTable } from 'src/components/MaterialCRUDTable'
import {
  getAdditionalCharges,
  createAdditonalCharges,
  updateAdditionalCharges,
  deleteAdditionalCharge,
  addPhaseAdditionalCharges,
  updatePhaseAdditionalCharges,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import {
  costSheetAdditionalChargesA,
  gstValesA,
  unitsCancellation,
} from 'src/constants/projects'

const AdditionalChargesForm = ({ title, data, source }) => {
  const { user } = useAuth()

  const { orgId } = user
  const [tableData, setTableData] = useState([])
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
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
    const { additonalChargesObj } = phase

    setTableData(additonalChargesObj)
  }, [data])

  const { enqueueSnackbar } = useSnackbar()
  const defaultValue = (options, value) => {
    return (
      (options
        ? options.find((option) => option.value === value?.value)
        : '') || ''
    )
  }
  // paymentScheduleA
  const columns = [
    {
      title: 'Charges For*',
      field: 'component',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => {
        return rowData?.component?.label
      },
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="component"
            onChange={(value_x) => {
              onChange(value_x)
            }}
            options={costSheetAdditionalChargesA}
            value={defaultValue(costSheetAdditionalChargesA, value)}
            className="text-md mr-2"
          />
        )
      },
      // editComponent: ({ value, onChange }) => (
      //   <input
      //     placeholder="Charges For"
      //     className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
      //     autoComplete="off"
      //     onChange={(e) => onChange(e.target.value)}
      //     value={value}
      //   />
      // ),
    },
    {
      title: 'Units*',
      field: 'units',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => rowData?.units?.label,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="Chargesdropdown"
            onChange={(value) => {
              onChange(value)
            }}
            options={unitsCancellation}
            value={defaultValue(unitsCancellation, value)}
            className="text-md mr-2"
          />
        )
      },
    },
    {
      title: 'Charges*',
      field: 'charges',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) =>
        rowData?.units?.value === 'percentage'
          ? `${rowData.charges} %`
          : `₹ ${rowData.charges}`,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <input
            placeholder="Charges"
            className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
            autoComplete="off"
            onChange={(e) =>
              rowData?.units?.value === 'percentage'
                ? onChange(
                    parseInt(e.target.value) > 100 ? 100 : e.target.value
                  )
                : onChange(e.target.value)
            }
            value={value}
            type="number"
            max="100"
          />
        )
      },
    },
    {
      title: 'GST*',
      field: 'gst',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => rowData?.gst?.label,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <Select
            name="Chargesdropdown"
            onChange={(value_x) => {
              onChange(value_x)
            }}
            options={gstValesA}
            value={defaultValue(gstValesA, value)}
            className="text-md mr-2"
          />
        )
      },
    },
    {
      title: 'Description*',
      field: 'description',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      editComponent: ({ value, onChange }) => (
        <input
          placeholder="Description"
          className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      ),
    },
  ]

  // const getCharges = async () => {
  //   const { projectId, uid } = data?.phase || {}

  //   const unsubscribe = getAdditionalCharges(
  //     { projectId, phaseId: uid },
  //     (querySnapshot) => {
  //       const response = querySnapshot.docs.map((docSnapshot) =>
  //         docSnapshot.data()
  //       )
  //       console.log('before', response)

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
  //   getCharges()
  // }, [])

  const errors = (formData) => {
    //validating the data inputs
    const errorList = []
    if (!formData.component) {
      errorList.push("Try Again, You didn't enter the Charges For field")
    }
    if (!formData.units) {
      errorList.push("Try Again, You didn't enter the Units field")
    }
    if (!formData.charges) {
      errorList.push("Try Again, You didn't enter the Charges field")
    }
    if (!formData.gst) {
      errorList.push("Try Again, You didn't enter the gst field")
    }

    // if (!formData.description) {
    //   errorList.push("Try Again, description field can't be blank")
    // }
    return errorList
  }
  //function for updating the existing row details
  const handleRowUpdate = async (newData, oldData) => {
    const { uid, additonalChargesObj } = data?.phase || {}

    console.log('check this stuff', tableData, additonalChargesObj)
    const c = await tableData.map((e) => {
      console.log(e.myId, oldData.myId, e.myId === oldData.myId)
      if (e.myId === oldData.myId) {
        return newData
      }
      return e
    })
    console.log('check this stuff', tableData, c)
    await updatePhaseAdditionalCharges(orgId,uid, c, enqueueSnackbar)
  }

  //function for deleting a row
  const handleRowDelete = async (oldData) => {
    const { uid } = data?.phase || {}
    const c = tableData.filter((e) => e.myId != oldData.myId)
    console.log('check this stuff', c)
    await updatePhaseAdditionalCharges(orgId,uid, c, enqueueSnackbar)
    // await deleteAdditionalCharge(oldData?.uid, enqueueSnackbar)
  }

  //function for adding a new row to the table
  const handleRowAdd = async (newData) => {
    console.log('newData is', newData)

    setIserror(false)
    setErrorMessages([])
    const errorList = errors(newData)
    if (errorList.length < 1) {
      console.log('newData is inside yo', newData)
      const { projectId, uid } = data?.phase || {}

      const additonalChargesObj = {
        ...newData,
      }
      // await createAdditonalCharges(additonalChargesObj, enqueueSnackbar)
      await addPhaseAdditionalCharges(
        orgId,
        uid,
        additonalChargesObj,
        enqueueSnackbar
      )
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

        <div className="mt-5 min">
          <MaterialCRUDTable
            title=""
            columns={columns}
            data={tableData}
            options={{
              headerStyle: {
                borderRadius: 0,
                borderBottomWidth: '2px',
              },
              actionsColumnIndex: -1,
              paging: false,
              minBodyHeight: '100px',
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
            source={source}
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

export default AdditionalChargesForm
