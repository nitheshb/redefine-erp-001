import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { TextAreaField } from 'src/util/formFields/TextAreaField'
import Loader from 'src/components/Loader/Loader'
import { updateMoreDetails } from 'src/context/dbQueryFirebase'

const MoreDetailsPhaseForm = ({ title, dialogOpen, data }) => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (formData, resetForm) => {
    const updatedData = {
      ...formData,
      editMode: true,
    }
    setLoading(true)
    await updateMoreDetails(data?.phase?.uid, updatedData, enqueueSnackbar)
    setLoading(false)
    resetForm()
    dialogOpen(false)
  }

  const initialState = {
    highlights: data?.phase?.moreDetails?.highlights || '',
    amenities: data?.phase?.moreDetails?.amenities || '',
    remarks: data?.phase?.moreDetails?.remarks || '',
  }

  const schema = Yup.object({
    highlights: Yup.string().required('Required'),
  })

  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
        <span className="font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </span>
        <div className="grid  gap-8 grid-cols-1">
          <div className="flex flex-col m-4">
            <div className="mt-0"></div>
          </div>
        </div>
        <Formik
          initialValues={initialState}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values, resetForm)
          }}
        >
          {() => (
            <Form>
              <div className="mt-2 w-full">
                <TextAreaField
                  label="Highlights*"
                  name="highlights"
                  type="text"
                />
              </div>
              <div className="mt-2 w-full">
                <TextAreaField label="Amenities" name="amenities" type="text" />
              </div>
              <div className="mt-2 w-full">
                <TextAreaField label="Remarks" name="remarks" type="text" />
              </div>
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
                  type="submit"
                  disabled={loading}
                >
                  {loading && <Loader />}
                  {data?.block?.editMode ? 'Update' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default MoreDetailsPhaseForm
