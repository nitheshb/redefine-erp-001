/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react'

import { Dialog } from '@headlessui/react'
import { Timestamp } from 'firebase/firestore'
import { Formik } from 'formik'
import * as Yup from 'yup'

import {
  addUnit,
  checkIfUnitAlreadyExists,
  getAllProjects,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import CostBreakUpSheet from './costBreakUpSheet'
import UnitDocumentsBody from './unitDetailsCategory/unitDocuments'
import UnitFinanceBody from './unitDetailsCategory/unitFinance'
import UnitOverView from './unitDetailsCategory/unitOverView'
const ViewUnitDetails = ({
  title,
  data,
  dialogOpen,
  BlockFeed,
  phaseFeed,
  projectDetails,
  phaseDetails,
  blockDetails,
  leadDetailsObj,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  console.log('unit Details ', data, data?.facing)
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
  const [unitDetailCat, setUnitDetailCat] = useState('overview')
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
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-2 text-[#053219] w-full">
          <div className="flex flex-row justify-between">
            <>
              <div className="font-semibold text-[#053219]  text-sm  mb-[1] tracking-wide">
                {data?.unitDetail?.unit_no}
                <span
                  className={`items-center h-6 px-3 py-1 ml-3 mt-1 text-xs font-semibold text-green-500 bg-green-100 rounded-full mr-2
                      `}
                >
                  {data?.unitDetail?.status}
                </span>
              </div>
            </>

            {/* 2 */}
            <div className=" flex flex-row">
              <div className="font text-sm text-slate-900 tracking-wide overflow-ellipsis overflow-hidden">
                {projectDetails?.projectName}
              </div>
              {/* <span
                className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-green-500 bg-green-100 rounded-full
                      `}
              >
                {projectDetails?.projectType?.name}
              </span> */}
            </div>
          </div>
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
                <div className="mt-4">
                  <div className="py-3 grid grid-cols-3 mb-4">
                    <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md">
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-700 tracking-wide">
                          Unit No
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.unit_no}
                        </div>
                      </section>
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-500  tracking-wide">
                          Size
                          <span className="text-[10px] text-black-500 ml-1">
                            (sqft)
                          </span>
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.builtup_area?.toLocaleString(
                            'en-IN'
                          )}
                        </div>
                      </section>
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-500  tracking-wide">
                          Facing
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.facing}
                        </div>
                      </section>
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-500  tracking-wide">
                          BUA
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.builtup_area?.toLocaleString(
                            'en-IN'
                          )}
                        </div>
                      </section>
                    </section>
                    <section className="flex flex-col mx-4 bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-700 tracking-wide">
                          East
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.east?.toLocaleString('en-IN')}
                        </div>
                      </section>
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-500  tracking-wide">
                          West
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.west?.toLocaleString('en-IN')}
                        </div>
                      </section>
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-500  tracking-wide">
                          South
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.south?.toLocaleString('en-IN')}
                        </div>
                      </section>
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-500  tracking-wide">
                          North
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.north?.toLocaleString('en-IN')}
                        </div>
                      </section>
                    </section>
                    <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-700 tracking-wide">
                          Cost
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {(
                            data?.unitDetail?.builtup_area *
                            data?.unitDetail?.rate_per_sqft
                          )?.toLocaleString('en-IN')}
                        </div>
                      </section>
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-500  tracking-wide">
                          PLC
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.builtup_area?.toLocaleString(
                            'en-IN'
                          )}
                        </div>
                      </section>
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-500  tracking-wide">
                          Total
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.facing}
                        </div>
                      </section>
                      <section className="flex flow-row justify-between mb-1">
                        <div className="font-md text-xs text-gray-500  tracking-wide">
                          KathaId
                        </div>
                        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                          {data?.unitDetail?.kathaId}
                        </div>
                      </section>
                    </section>
                  </div>
                  {data?.unitDetail?.status === 'available' && (
                    <CostBreakUpSheet
                      selMode={'Detail View'}
                      title="Cost Break Up Sheet"
                      leadDetailsObj1={leadDetailsObj}
                      selPhaseObj={data?.phaseDetail[0]}
                      unitDetails={data?.unitDetail}
                      projectDetails={projectDetails}
                      setShowCostSheetWindow={() => {}}
                      selUnitDetails={data?.unitDetail}
                    />
                  )}

                  {data?.unitDetail?.status != 'available' && (
                    <>
                      <div className=" border-gray-800 ">
                        <ul
                          className="flex justify-  rounded-t-lg border-b"
                          id="myTab"
                          data-tabs-toggle="#myTabContent"
                          role="tablist"
                        >
                          {[
                            { lab: 'Overview', val: 'overview' },
                            { lab: 'Finance', val: 'finance' },
                            {
                              lab: 'Documents',
                              val: 'documents',
                            },
                            { lab: 'Owner Details', val: 'ownerdetails' },
                            { lab: 'Issues', val: 'issues' },
                            { lab: 'Logs', val: 'logs' },
                          ].map((d, i) => {
                            return (
                              <li key={i} className="mr-2" role="presentation">
                                <button
                                  className={`inline-block py-3 px-2 text-sm font-medium text-center rounded-t-lg border-b-2  hover:text-blue hover:border-gray-300   ${
                                    unitDetailCat === d.val
                                      ? 'border-black border-b-3'
                                      : 'border-transparent'
                                  }`}
                                  type="button"
                                  role="tab"
                                  onClick={() => setUnitDetailCat(d.val)}
                                >
                                  {`${d.lab} `}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>

                      {unitDetailCat === 'overview' && (
                        <>
                          <UnitOverView data={data} />
                        </>
                      )}
                      {unitDetailCat === 'finance' && (
                        <>
                          <UnitFinanceBody />
                        </>
                      )}
                      {unitDetailCat === 'documents' && (
                        <>
                          <UnitDocumentsBody />
                        </>
                      )}
                      {unitDetailCat === 'issues' && <>{unitDetailCat}</>}
                      {unitDetailCat === 'logs' && <>{unitDetailCat}</>}
                    </>
                  )}
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewUnitDetails
