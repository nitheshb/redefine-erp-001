import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useParams } from '@redwoodjs/router'
import {
  InputAdornment,
  TextField as MuiTextField,
  Checkbox,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { format, isDate, parse } from 'date-fns'
import Loader from 'src/components/Loader/Loader'
import { TextField } from 'src/util/formFields/TextField'
import { DateField } from 'src/util/formFields/DateField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import {
  bankPreferredType,
  banksList,
  unitsCancellation,
} from 'src/constants/projects'
import { AreaConverter } from 'src/components/AreaConverter'
import {
  addPaymentReceivedEntry,
  createBookedCustomer,
  updateLeadStatus,
  updateUnitAsBooked,
} from 'src/context/dbQueryFirebase'
import { TextField2 } from 'src/util/formFields/TextField2'
import { arrayUnion } from 'firebase/firestore'
import { useAuth } from 'src/context/firebase-auth-context'

const AddPaymentDetailsForm = ({
  title,
  selUnitDetails,
  leadDetailsObj2,
  dialogOpen,
  phase,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const [loading, setLoading] = useState(false)
  const [openAreaFields, setOpenAreaFields] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { uid } = useParams()
  const bankData = {}

  const onSubmit = async (data, resetForm) => {
    // get booking details, leadId, unitDetails,
    //  from existing object send values of
    //  booking
    // copy unit data as it is
    // copy lead data as it is
    //  unit details

    // 1)Make an entry to finance Table {source: ''}
    // 2)Create new record in Customer Table
    // 3)Update unit record with customer record and mark it as booked
    // 4)update lead status to book

    //   const x = await addDoc(collection(db, 'spark_leads'), data)
    // await console.log('x value is', x, x.id)

    const { uid } = selUnitDetails
    const { id, purpose, customerDetailsObj, secondaryCustomerDetailsObj } =
      leadDetailsObj2

    // 1)Make an entry to finance Table {source: ''}
    const x1 = await addPaymentReceivedEntry(
      orgId,
      uid,
      { leadId: id },
      data,
      'leadsPage',
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )

    // 2)Create('')
    console.log('submit doc is ', orgId, uid, {
      leadId: id,
      ...customerDetailsObj,
      secondaryCustomerDetailsObj,
      assets: arrayUnion(uid),
      [`${uid}_cs`]: leadDetailsObj2[`${uid}_cs`],
      [`${uid}_ps`]: phase?.paymentScheduleObj || {},
      [`${uid}_unitDetails`]: selUnitDetails || {},

      //paymentScheduleObj
    })
    const x2 = await createBookedCustomer(
      orgId,
      uid,
      {
        leadId: id,
        ...customerDetailsObj,
        secondaryCustomerDetailsObj,
        assets: arrayUnion(uid),
        [`${uid}_cs`]: leadDetailsObj2[`${uid}_cs`],
        [`${uid}_ps`]: phase?.paymentScheduleObj || {},
        [`${uid}_unitDetails`]: selUnitDetails || {},

        //paymentScheduleObj
      },
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )

    // 3)Update unit record with customer record and mark it as booked

    // customerDetailsObj
    const otherData = leadDetailsObj2[`${uid}_others`]
    const unitUpdate = {
      leadId: id,
      status: 'booked',
      customerDetailsObj,
      secondaryCustomerDetailsObj: secondaryCustomerDetailsObj || {},
      ...otherData,
    }
    unitUpdate[`cs`] = leadDetailsObj2[`${uid}_cs`]
    console.log('unit space is ', uid)
    updateUnitAsBooked(
      orgId,
      uid,
      id,
      unitUpdate,
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar,
      resetForm
    )

    // 4)update lead status to book
    // updateLeadStatus(leadDocId, newStatus)

    updateLeadStatus(
      orgId,
      id,
      leadDetailsObj2?.Status,
      'booked',
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )

    const updatedData = {
      ...data,
    }
    console.log('submit data i s', updatedData)
  }

  const initialState = {
    amount: bankData?.amount || '',

    mode: bankData?.mode || '',
    payto: bankData?.payto || '',
    chequeno: bankData?.chequeno || '',
    dated: bankData?.dated || '',
    bookingSource: '',
    bookedBy: '',
  }

  const validateSchema = Yup.object({
    // date: Yup.string().required('Bank Required'),
    // amount: Yup.string().required('Required'),
    // payto: Yup.string().required('Required'),
    // mode: Yup.string().required('Bank Required'),
    // drawnonbank: Yup.string().required('Required'),
    // chequeno: Yup.string().required('Required'),
    // dated: Yup.string().required('Required'),
  })

  const submitFormFun = (formik) => {
    formik.handleSubmit()
  }

  return (
    <div className="">
      <div className="px-4 sm:px-6  z-10">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
      </div>

      <div className="grid gap-8 grid-cols-1">
        <div className="flex flex-col rounded-lg bg-white m-4">
          <div className="mt-0">
            <Formik
              enableReinitialize={true}
              initialValues={initialState}
              validationSchema={validateSchema}
              onSubmit={(values, { resetForm }) => {
                onSubmit(values, resetForm)
              }}
            >
              {(formik) => (
                <Form>
                  <div className="form">
                    {/* Phase Details */}

                    <section className=" py-1 bg-blueGray-50">
                      <div className="w-full px-4 mx-auto ">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                          <div className="rounded-t bg-[#F1F5F9] mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                              <p className="text-md font-extrabold tracking-tight uppercase font-body">
                                Payment Entry
                              </p>
                              <button
                                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                              >
                                Receipt Download
                              </button>
                            </div>
                          </div>
                          <div className="flex-auto px-4 lg:px-10 py-10 pt-4">
                            <section>
                              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Booking Amount Details
                              </h6>
                              <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Amount"
                                      name="amount"
                                      type="number"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Mode"
                                      name="mode"
                                      type="text"
                                    />
                                  </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Cheque No/Reference No"
                                      name="chequeno"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Dated"
                                      name="dated"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Paid To"
                                      name="paidTo"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr className="mt-6 border-b-1 border-blueGray-300" />

                              <h6 className="text-blueGray-400 text-sm mt-3 pt-4 mb-6 font-bold uppercase">
                                Source Of Booking
                              </h6>
                              <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Source"
                                      name="bookingSource"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-12/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Booked By"
                                      name="bookedBy"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr className="mt-6 border-b-1 border-blueGray-300" />
                              <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                                <button
                                  className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-xs hover:shadow-lg hover:bg-green-500"
                                  type="submit"
                                  disabled={loading}
                                >
                                  {/* {loading && <Loader />} */}
                                  {'Book'}
                                </button>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPaymentDetailsForm
