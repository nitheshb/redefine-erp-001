import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useParams } from '@redwoodjs/router'
import { InputAdornment, TextField as MuiTextField } from '@mui/material'
import Loader from 'src/components/Loader/Loader'
import { TextField } from 'src/util/formFields/TextField'
import { TextAreaField } from 'src/util/formFields/TextAreaField'
import { createBlock, updateBlock } from 'src/context/dbQueryFirebase'
import { CheckIcon } from '@heroicons/react/outline'

const AddBlockForm = ({ title, dialogOpen, data }) => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { uid } = useParams()

  const onSubmit = async (formData, resetForm) => {
    const updatedData = {
      ...formData,
      projectId: uid,
      phaseId: data?.phase?.uid,
      editMode: true,
    }
    setLoading(true)
    if (data?.block?.editMode) {
      await updateBlock(
        data?.block?.uid,
        {
          ...formData,
          editMode: true,
        },
        enqueueSnackbar
      )
    } else {
      await createBlock(updatedData, enqueueSnackbar, resetForm)
    }
    setLoading(false)
  }

  const initialState = {
    blockName: data?.block?.blockName || '',
    floors: data?.block?.floors || 0,
    units: data?.block?.units || 0,
    totalArea: data?.block?.totalArea || 0,
    remarks: data?.block?.remarks || '',
  }

  const createProjectSchema = Yup.object({
    blockName: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Required'),
  })
  return (
    <div className="h-full flex flex-col  rounded bg-white shadow-xl overflow-y-scroll">
      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col m-4">
          <div className="mt-0">
            <Formik
              initialValues={initialState}
              validationSchema={createProjectSchema}
              onSubmit={(values, { resetForm }) => {
                onSubmit(values, resetForm)
              }}
            >
              {(formik) => (
                <Form>
                  <div className="form">
                    <div className="flex flex-col mt-2 rounded-lg bg-white  ">
                      <div className="min-w-[96px]">
                        <TextField
                          label="Block Name*"
                          name="blockName"
                          type="text"
                        />
                      </div>
                      <div className=" w-full md:space-x-3 md:block flex  mb-6 align-center mt-1 bg-green-400 hover:shadow-sm hover:bg-green-500 rounded-sm ">
                        {/* <button
                          onClick={() => dialogOpen(false)}
                          type="button"
                          className="mb-4  mt-5 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                        >
                          {' '}
                          Cancel{' '}
                        </button> */}
                        <button
                          className="mb-2 py-[9px] flex pl-[2px] md:mb-0 bg-green-400  py-2 w-[42px] text-sm shadow-sm font-medium tracking-wider text-white rounded-sm "
                          type="submit"
                          disabled={loading}
                        >
                          {loading && <Loader />}
                          <div className="align-center">
                            {' '}
                            {data?.block?.editMode ? (
                              'Update'
                            ) : (
                              <section className="flex flex-row">
                                {' '}
                                <CheckIcon className="w-4 h-4 ml-8 mt-[1px] mr-1 inline" />
                                <span>Save</span>
                              </section>
                            )}
                          </div>
                        </button>
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

export default AddBlockForm
