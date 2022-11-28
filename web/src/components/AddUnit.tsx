/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dialog } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Label, InputField, TextAreaField, FieldError } from '@redwoodjs/forms'
import Select from 'react-select'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import NumberFormat from 'react-number-format'

import { TextField } from 'src/util/formFields/TextField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import Loader from './Loader/Loader'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import {
  addUnit,
  checkIfUnitAlreadyExists,
  getAllProjects,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { Timestamp } from 'firebase/firestore'
import { useRouterStateSetter } from '@redwoodjs/router/dist/router-context'
import {
  sendWhatAppMediaSms,
  sendWhatAppTextSms,
} from 'src/util/axiosWhatAppApi'
const AddUnit = ({
  title,
  dialogOpen,
  BlockFeed,
  phaseFeed,
  projectDetails,
  phaseDetails,
  blockDetails,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [phaseList, setphaseList] = useState([])
  const [blockList, setblockList] = useState([])
  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(usersListA)
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA)

        setusersList(usersListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        console.log('fetched users list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    phaseFeed.map((user) => {
      user.label = user.phaseName
      user.value = user.phaseName
    })
    console.log('fetched users list is', phaseFeed)
    setphaseList(phaseFeed)
  }, [])

  useEffect(() => {
    if (BlockFeed) {
      BlockFeed?.map((user) => {
        user.label = user.blockName
        user.value = user.blockName
      })
      console.log('fetched users list is', phaseFeed)
      setblockList(BlockFeed)
    }
  }, [])

  const aquaticCreatures = [
    { label: 'Select the Project', value: '' },
    { label: 'Subha Ecostone', value: 'subhaecostone' },
    { label: 'Esperanza', value: 'esperanza' },
    { label: 'Nakshatra Township', value: 'nakshatratownship' },
  ]
  // const usersList = [
  //   { label: 'User1', value: 'User1' },
  //   { label: 'User2', value: 'User2' },
  //   { label: 'User3', value: 'User3' },
  // ]
  const budgetList = [
    { label: 'Select Customer Budget', value: '' },
    { label: '5 - 10 Lacs', value: 'Bangalore,KA' },
    { label: '10 - 20 Lacs', value: 'Cochin,KL' },
    { label: '20 - 30 Lacs', value: 'Mumbai,MH' },
    { label: '30 - 40 Lacs', value: 'Mumbai,MH' },
    { label: '40 - 50 Lacs', value: 'Mumbai,MH' },
    { label: '50 - 60 Lacs', value: 'Mumbai,MH' },
    { label: '60 - 70 Lacs', value: 'Mumbai,MH' },
    { label: '70 - 80 Lacs', value: 'Mumbai,MH' },
    { label: '80 - 90 Lacs', value: 'Mumbai,MH' },
    { label: '90 - 100 Lacs', value: 'Mumbai,MH' },
    { label: '1.0 Cr - 1.1 Cr', value: 'Mumbai,MH' },
    { label: '1.1 Cr - 1.2 Cr', value: 'Mumbai,MH' },
    { label: '1.2 Cr - 1.3 Cr', value: 'Mumbai,MH' },
    { label: '1.3 Cr - 1.4 Cr', value: 'Mumbai,MH' },
    { label: '1.4 Cr - 1.5 Cr', value: 'Mumbai,MH' },
    { label: '1.5 + Cr', value: 'Mumbai,MH' },
  ]

  const plans = [
    {
      name: 'Apartment',
      img: '/apart1.svg',
    },
    {
      name: 'Plots',
      img: '/plot.svg',
    },
    {
      name: 'WeekendVillas',
      img: '/weekend.svg',
    },
    {
      name: 'Villas',
      img: '/villa.svg',
    },
  ]

  const devTypeA = [
    {
      name: 'Outright',
      img: '/apart.svg',
    },
    {
      name: 'Joint',
      img: '/apart1.svg',
    },
  ]
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [devType, setdevType] = useState(devTypeA[0])
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

  const typeSel = async (sel) => {
    await console.log('value is', selected)
    await setSelected(sel)
    await console.log('thsi si sel type', sel, selected)
  }
  const devTypeSel = async (sel) => {
    await setdevType(sel)
  }
  const onSubmitFun = async (data, resetForm) => {
    console.log(data)

    setLoading(true)

    const {
      area,
      bathrooms,
      bedRooms,
      buildup_area,
      carpet_area,
      facing,
      sqft_rate,
      floor,
      super_build_up_area,
      unit_no,
    } = data
    // updateUserRole(uid, deptVal, myRole, email, 'nitheshreddy.email@gmail.com')

    const foundLength = await checkIfUnitAlreadyExists(
      'spark_units',
      projectDetails?.uid,
      phaseDetails?.uid,
      blockDetails?.uid,
      unit_no

      // myBlock?.uid,
      // dRow['unit_no']
    )
    const leadData = {
      Date: Timestamp.now().toMillis(),
      bed_rooms: bedRooms,
      builtup_area: buildup_area,
      builtup_area_uom: 'sqft',
      carpet_area: carpet_area,
      carpet_area_uom: 'sqft',
      facing: facing,
      floor: floor,
      intype: 'Form',
      mode: '',
      pId: projectDetails?.uid,
      phaseId: phaseDetails?.uid,
      blockId: blockDetails?.uid,
      Status: 'available',
      rate_per_sqft: sqft_rate,
      super_built_up_area: super_build_up_area,
      super_built_up_area_uom: 'sqft',
      undivided_share: '',
      unit_no: unit_no,
      unit_type: '',
      by: user?.email,
    }
    console.log('user is ', user)
    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength)
      setFormMessage('Unit Already Exists')
      setLoading(false)
    } else {
      console.log('foundLENGTH IS empty ', foundLength)

      // proceed to copy
      await addUnit(orgId, leadData, user?.email, `Unit Created by form `)

      // msg2
      resetForm()
      setFormMessage('Saved Successfully..!')
      setLoading(false)
    }
  }

  const unitTypeList = [
    { label: 'Select Count', value: '' },
    { label: '1 Bhk', value: 1 },
    { label: '2 Bhk', value: 2 },
    { label: '3 Bhk', value: 3 },
    { label: '4 Bhk', value: 4 },
    { label: '5 Bhk', value: 5 },
  ]
  const bathTypeList = [
    { label: 'Select Count', value: '' },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ]
  const facingTypeList = [
    { label: 'Select the Source', value: '' },
    { label: 'East', value: 'East' },
    { label: 'West', value: 'West' },
    { label: 'North', value: 'North' },
    { label: 'South', value: 'South' },
    { label: 'South-East', value: 'South-East' },
    { label: 'South-West', value: 'South-West' },
    { label: 'North-East', value: 'North-East' },
    { label: 'North-West', value: 'North-West' },
  ]
  const validate = Yup.object({
    unit_no: Yup.string()
      // .max(15, 'Must be 15 characters or less')
      .required('Unit_no is Required'),
    // lastName: Yup.string()
    //   .max(20, 'Must be 20 characters or less')
    //   .required('Required'),
    sqft_rate: Yup.number().required('sqft rate is required'),
    bedRooms:
      projectDetails?.projectType?.name === 'Apartment'
        ? Yup.string().required('bedRooms is required')
        : Yup.string().notRequired(),
    floor: Yup.number().required('floor is required'),
    bathrooms:
      projectDetails?.projectType?.name === 'Apartment'
        ? Yup.string().required('bathrooms is required')
        : Yup.string().notRequired(),
    // bathrooms: Yup.string().required('bathrooms is required'),
    area:
      projectDetails?.projectType?.name === 'Plots'
        ? Yup.number().required('area is required')
        : Yup.number().notRequired(),

    facing: Yup.string().required('facing is required'),
    carpet_area: Yup.number().required('Carpet Area is required'),
    buildup_area: Yup.number().required('Buildup Area is required'),
    super_build_up_area: Yup.number().required('Sqft Rate is required'),
  })
  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }
  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10 flex items-center justify-between">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title>
      </div>

      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col  my-10 rounded-lg bg-white border border-gray-100 px-4 m-4 mt-4">
          <div className="mt-0">
            {/* new one */}

            <Formik
              initialValues={{
                unit_no: '',
                sqft_rate: 0,
                bedRooms: '',
                floor: 0,
                bathrooms: '',
                area: 0,
                facing: '',
                carpet_area: 0,
                buildup_area: 0,
                super_build_up_area: 0,
              }}
              validationSchema={validate}
              onSubmit={(values, { resetForm }) => {
                console.log('ami submitted', values)

                onSubmitFun(values, resetForm)
              }}
            >
              {(formik) => (
                <div className="mt-8">
                  <div className="mb-4 ">
                    <div className="flex flex-row justify-between">
                      <div className="inline">
                        <div className="">
                          <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                            Project Details<abbr title="required"></abbr>
                          </label>
                        </div>

                        <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>
                      </div>
                      {/* 2 */}
                      <div className="p-3 flex flex-col">
                        <span
                          className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-green-500 bg-green-100 rounded-full
                      `}
                        >
                          {projectDetails?.projectType?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="py-3 grid grid-cols-3 mb-4">
                    <section>
                      <div className="font-md text-xs text-gray-500 mb-[2] tracking-wide">
                        Project
                      </div>
                      <div className="font-semibold text-sm text-slate-900 tracking-wide overflow-ellipsis overflow-hidden">
                        {projectDetails?.projectName}
                      </div>
                    </section>

                    <section className="ml-8">
                      <div className="font-md text-xs text-gray-500 mb-[2] tracking-wide">
                        Phase
                      </div>
                      <div className="font-semibold text-sm text-slate-900">
                        {phaseDetails?.phaseName}
                      </div>
                    </section>
                    <section className="flex flex-col ml-[54px]">
                      <div className="font-md text-xs  text-gray-500 mb-[2] flow-right tracking-wide">
                        Block
                      </div>
                      <div className="font-lg text-sm text-slate-900 tracking-wide overflow-ellipsis overflow-hidden">
                        <span className="overflow-ellipsis">
                          {blockDetails?.blockName}
                        </span>
                      </div>
                    </section>
                  </div>
                  <Form>
                    <div className="mb-4 ">
                      <div className="inline">
                        <div className="">
                          <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                            Unit Details<abbr title="required"></abbr>
                          </label>
                        </div>

                        <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>
                      </div>
                    </div>

                    {/* 2 */}
                    <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-1">
                      {projectDetails?.projectType?.name === 'Apartment' && (
                        <div className="mb-3 space-y-2 w-full text-xs mt-4">
                          <TextField
                            label="Floor*"
                            name="floor"
                            type="number"
                          />
                        </div>
                      )}
                      <div className="mb-3 space-y-2 w-full text-xs mt-4">
                        <TextField
                          label="unit no*"
                          name="unit_no"
                          type="text"
                        />
                      </div>
                      <div className="mb-3 space-y-2 w-full text-xs mt-4">
                        <TextField
                          label="Rate/Sqft *"
                          name="sqft_rate"
                          type="number"
                        />
                      </div>
                    </div>
                    {/* 3 */}
                    <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-">
                      {projectDetails?.projectType?.name === 'Apartment' && (
                        <div className="w-full flex flex-row mb-3">
                          <CustomSelect
                            name="bedRooms"
                            label="BedRooms*"
                            className="input mt-"
                            onChange={(value) => {
                              formik.setFieldValue('bedRooms', value.value)
                            }}
                            value={formik.values.bedRooms}
                            options={unitTypeList}
                          />
                          <CustomSelect
                            name="bathrooms"
                            label="Bathrooms"
                            className="input ml-4"
                            onChange={(value) => {
                              formik.setFieldValue('bathrooms', value.value)
                            }}
                            value={formik.values.bathrooms}
                            options={bathTypeList}
                          />
                        </div>
                      )}

                      {projectDetails?.projectType?.name != 'Apartment' && (
                        <div className="mb-3 space-y-2 w-full text-xs mt-">
                          <TextField label="Area*" name="area" type="number" />
                        </div>
                      )}

                      <div className="w-full flex flex-col mb-3">
                        <CustomSelect
                          name="facing"
                          label="Facing*"
                          className="input mt-"
                          onChange={(value) => {
                            formik.setFieldValue('facing', value.value)
                          }}
                          value={formik.values.facing}
                          // options={aquaticCreatures}
                          options={facingTypeList}
                        />
                      </div>
                    </div>
                    {/* 4 */}
                    {projectDetails?.projectType?.name === 'Apartment' && (
                      <>
                        <div className="mt-8">
                          <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                            More Details<abbr title="required">*</abbr>
                          </label>
                        </div>
                        <div className="border-t-4 rounded-xl w-16 mt-1  border-green-600"></div>
                        <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-6">
                          <div className="mb-3 space-y-2 w-full text-xs mt-">
                            <TextField
                              label="Carpet Area*"
                              name="carpet_area"
                              type="number"
                            />
                          </div>

                          <div className="mb-3 space-y-2 w-full text-xs mt-">
                            <TextField
                              label="Build Up Area*"
                              name="buildup_area"
                              type="number"
                            />
                          </div>

                          <div className="mb-3 space-y-2 w-full text-xs mt-">
                            <TextField
                              label="Super Build Up Area*"
                              name="super_build_up_area"
                              type="number"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* 6 */}

                    <div className="mb-8">
                      <p className="text-xs text-red-400 text-right my-3">
                        <abbr title="Required field">*</abbr> fields are
                        mandatory
                      </p>
                      {formMessage === 'Saved Successfully..!' && (
                        <p className=" flex text-md text-slate-800 text-right my-3">
                          <img
                            className="w-[40px] h-[40px] inline mr-2"
                            alt=""
                            src="/ok.gif"
                          />
                          <span className="mt-2">{formMessage}</span>
                        </p>
                      )}
                      {formMessage === 'Unit Already Exists' && (
                        <p className=" flex text-md text-pink-800 text-right my-3">
                          <img
                            className="w-[40px] h-[40px] inline mr-2"
                            alt=""
                            src="/error.gif"
                          />
                          <span className="mt-2">{formMessage}</span>
                        </p>
                      )}
                      <div className="mt-5 mt-8 text-right md:space-x-3 md:block flex flex-col-reverse">
                        <button
                          className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                          type="reset"
                          onClick={() => resetter()}
                        >
                          Reset
                        </button>
                        <button
                          className="mb-2 md:mb-0 bg-green-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white  rounded-sm hover:shadow-lg hover:bg-green-500"
                          type="submit"
                          disabled={loading}
                        >
                          {loading && <Loader />}
                          Add Unit
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUnit
