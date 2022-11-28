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
  addBankAccount,
  addVirtualAccount,
  createPhase,
  updatePhase,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

const AddBankDetailsForm = ({ title, dialogOpen, phase: bankData }) => {
  const { user } = useAuth()

 const { orgId } = user
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { uid } = useParams()

  const onSubmit = async (data, resetForm) => {
    const updatedData = {
      ...data,
    }

    setLoading(true)
    if (title === 'Bank Accounts' || title === 'Add New Account') {
      await addBankAccount(
        orgId,
        updatedData,
        'nithe.nithesh@gmail.com',
        'bankAccount Creation',
        enqueueSnackbar,
        resetForm
      )
      console.log('bank details are', updatedData, loading)
      await setLoading(false)
      await dialogOpen(false)
    } else if (title === 'Virtual Accounts') {
      await addVirtualAccount(
        orgId,
        updatedData,
        'nithe.nithesh@gmail.com',
        'virtural Creation'
      )
      await setLoading(false)
    }
    // if (bankData?.editMode) {
    //   await updatePhase(bankData.uid, updatedData, enqueueSnackbar)
    // } else {
    //   await createPhase(updatedData, enqueueSnackbar, resetForm)
    // }
  }

  const initialState = {
    accountName: bankData?.accountName || '',
    aliasName: bankData?.aliasName || '',
    accountNo: bankData?.accountNo || '',
    ifsccode: bankData?.ifsccode || '',
    branchName: bankData?.branchName || '',
    bank: bankData?.bank || '',
    preferredtype: bankData?.preferredtype || '',
    gstNo: bankData?.gstNo || '',
  }

  const validateSchema = Yup.object({
    accountName: Yup.string()
      .max(60, 'Must be 60 characters or less')
      .required('Account Name Required'),
    accountNo: Yup.number().required('AccountNo Required'),
    ifsccode: Yup.string()
      .max(60, 'Must be 60 characters or less')
      .required('IFSC code Required'),
    branchName: Yup.string()
      .max(60, 'Must be 60 characters or less')
      .required('Branch Name Required'),
    bank: Yup.string().required('Bank Required'),
    preferredtype: Yup.string().required('Required'),
    gstNo: Yup.string().required('Required'),
  })

  const submitFormFun = (formik) => {
    formik.handleSubmit()
  }

  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title>
      </div>

      <div className="grid gap-8 grid-cols-1">
        <div className="flex flex-col rounded-lg bg-white m-4">
          <div className="mt-0">
            <Formik
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
                    <div className="flex flex-col mt-2 rounded-lg bg-white border border-gray-100 px-4 ">
                      <div className="flex flex-col mt-3 mb-3 space-y-2 w-full text-xs">
                        <h6 className="font-semibold text-[#053219] py-2 text-sm mb-2 mt-0">
                          Account Details
                        </h6>
                        <div className="mt-2 mr-3 w-full">
                          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                            <TextField
                              label="Account Name*"
                              name="accountName"
                              type="text"
                            />
                            <TextField
                              label="Alias Name*"
                              name="aliasName"
                              type="text"
                            />
                          </div>
                          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                            <TextField
                              label="Account Number*"
                              name="accountNo"
                              type="number"
                            />
                            <TextField
                              label="Ifsc Code*"
                              name="ifsccode"
                              type="text"
                            />
                          </div>
                          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                            <div className="mt-2 w-full">
                              <TextField
                                label="Branch Name*"
                                name="branchName"
                                type="text"
                              />
                            </div>
                            <div className="w-full">
                              <CustomSelect
                                name="bank"
                                label="Bank*"
                                className="input mt-2"
                                onChange={({ value }) => {
                                  formik.setFieldValue('bank', value)
                                }}
                                value={formik.values.bank}
                                options={banksList}
                              />
                              {formik.errors.bank ? (
                                <div className="error-message text-red-700 text-xs p-2">
                                  {formik.errors.bank}
                                  {formik.values.bank}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                            <div className="mt-2 w-full">
                              <TextField
                                label="GST No*"
                                name="gstNo"
                                type="text"
                              />
                            </div>
                            <div className="w-full">
                              <CustomSelect
                                name="preferredtype"
                                label="Preferred Type*"
                                className="input mt-2"
                                onChange={({ value }) => {
                                  formik.setFieldValue('preferredtype', value)
                                }}
                                value={formik.values.preferredtype}
                                options={bankPreferredType}
                              />
                              {formik.errors.preferredtype ? (
                                <div className="error-message text-red-700 text-xs p-2">
                                  {formik.errors.preferredtype}
                                  {formik.values.preferredtype}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="flex flex-col mt-2 p-4 ">
                            <p className="text-xs text-red-500 text-right my-3">
                              Required fields are marked with an asterisk{' '}
                              <abbr title="Required field">*</abbr>
                            </p>
                            <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                              <button
                                onClick={() => dialogOpen(false)}
                                type="button"
                                className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                              >
                                {' '}
                                Cancel{' '}
                              </button>
                              <button
                                className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                                type="button"
                                disabled={loading}
                                onClick={() => submitFormFun(formik)}
                              >
                                {loading && <Loader />}
                                {bankData?.editMode ? 'Update' : 'Save'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default AddBankDetailsForm
