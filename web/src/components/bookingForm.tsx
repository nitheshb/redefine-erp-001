/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dialog } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Label, InputField, TextAreaField, FieldError } from '@redwoodjs/forms'
import Select from 'react-select'
import { Form, Formik, Field } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import NumberFormat from 'react-number-format'

import { TextField } from 'src/util/formFields/TextField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import Loader from './Loader/Loader'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import {
  addLead,
  updateLeadCustomerDetailsTo,
  checkIfLeadAlreadyExists,
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
import { TextField2 } from 'src/util/formFields/TextField2'

const AddBookingForm = ({
  title,
  leadDetailsObj2,
  selUnitDetails,
  dialogOpen,
}) => {
  const { user } = useAuth()
  const { orgId } = user

  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
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
    console.log('new customer object', leadDetailsObj2)
  }, [leadDetailsObj2])

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
  const { enqueueSnackbar } = useSnackbar()
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
      email,
      name,
      mobileNo,
      assignedTo,
      assignedToObj,
      source,
      project,
    } = data
    // updateUserRole(uid, deptVal, myRole, email, 'nitheshreddy.email@gmail.com')

    const foundLength = await checkIfLeadAlreadyExists('spark_leads', mobileNo)
    const leadData = {
      Date: Timestamp.now().toMillis(),
      Email: email,
      Mobile: mobileNo,
      Name: name,
      Note: '',
      Project: project,
      Source: source,
      Status: assignedTo === '' ? 'unassigned' : 'new',
      intype: 'Form',
      assignedTo: assignedToObj?.value || '',
      assignedToObj: {
        department: assignedToObj?.department || [],
        email: assignedToObj?.email || '',
        label: assignedToObj?.label || '',
        name: assignedToObj?.name || '',
        namespace: orgId,
        roles: assignedToObj?.roles || [],
        uid: assignedToObj?.value || '',
        value: assignedToObj?.value || '',
      },
      by: user?.email,
    }
    console.log('user is ', user)
    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength)
      setFormMessage('User Already Exists with Ph No')
      setLoading(false)
    } else {
      console.log('foundLENGTH IS empty ', foundLength)

      // proceed to copy
      await addLead(
        orgId,
        leadData,
        user?.email,
        `lead created and assidged to ${assignedTo}`
      )

      await sendWhatAppTextSms(
        mobileNo,
        `Thank you ${name} for choosing the world className ${
          project || 'project'
        }`
      )

      // msg2
      await sendWhatAppMediaSms(mobileNo)
      const smg =
        assignedTo === ''
          ? 'You Interested will be addressed soon... U can contact 9123456789 mean while'
          : 'we have assigned dedicated manager to you. Mr.Ram as ur personal manager'

      // msg3
      sendWhatAppTextSms(mobileNo, smg)
      resetForm()
      setFormMessage('Saved Successfully..!')
      setLoading(false)
    }
  }

  const { uid } = selUnitDetails
  const initialState = {
    customerName1:
      leadDetailsObj2?.customerDetailsObj?.customerName1 ||
      leadDetailsObj2?.Name ||
      '',
    customerName2:
      leadDetailsObj2?.secondaryCustomerDetailsObj?.customerName2 || '',
    co_Name1: leadDetailsObj2?.customerDetailsObj?.co_Name1 || '',
    co_Name2: leadDetailsObj2?.secondaryCustomerDetailsObj?.co_Name2 || '',
    phoneNo1:
      leadDetailsObj2?.customerDetailsObj?.phoneNo1 ||
      leadDetailsObj2?.Mobile ||
      '',
    phoneNo2: leadDetailsObj2?.secondaryCustomerDetailsObj?.phoneNo2 || '',
    email1:
      leadDetailsObj2?.customerDetailsObj?.email1 ||
      leadDetailsObj2?.Email ||
      '',
    email2: leadDetailsObj2?.secondaryCustomerDetailsObj?.email2 || '',
    dob1: leadDetailsObj2?.customerDetailsObj?.dob1 || '',
    dob2: leadDetailsObj2?.secondaryCustomerDetailsObj?.dob2 || '',
    marital1: leadDetailsObj2?.customerDetailsObj?.marital1 || '',
    marital2: leadDetailsObj2?.secondaryCustomerDetailsObj?.marital2 || '',
    panNo1: leadDetailsObj2?.customerDetailsObj?.panNo1 || '',
    panNo2: leadDetailsObj2?.secondaryCustomerDetailsObj?.panNo2 || '',
    panDocUrl1: leadDetailsObj2?.customerDetailsObj?.panDocUrl1 || '',

    panDocUrl2: leadDetailsObj2?.secondaryCustomerDetailsObj?.panDocUrl2 || '',
    aadharNo1: leadDetailsObj2?.customerDetailsObj?.aadharNo1 || '',
    aadharNo2: leadDetailsObj2?.secondaryCustomerDetailsObj?.aadharNo2 || '',
    aadharUrl1: leadDetailsObj2?.customerDetailsObj?.aadharUrl1 || '',
    aadharUrl2: leadDetailsObj2?.secondaryCustomerDetailsObj?.aadharUrl2 || '',
    occupation1: leadDetailsObj2?.customerDetailsObj?.occupation1 || '',
    companyName1: leadDetailsObj2?.customerDetailsObj?.companyName1 || '',

    occupation2:
      leadDetailsObj2?.secondaryCustomerDetailsObj?.occupation2 || '',
    companyName2:
      leadDetailsObj2?.secondaryCustomerDetailsObj?.companyName2 || '',

    aggrementAddress:
      leadDetailsObj2?.aggrementDetailsObj?.aggrementAddress || '',
    industry: leadDetailsObj2?.industry || '',
    designation: leadDetailsObj2?.designation || '',
    annualIncome: leadDetailsObj2?.annualIncome || '',
    leadSource:
      leadDetailsObj2?.Status === 'booked'
        ? leadDetailsObj2[`${uid}_otherInfo`]?.leadSource
        : '',
    sourceOfPay:
      leadDetailsObj2?.Status === 'booked'
        ? leadDetailsObj2[`${uid}_otherInfo`]?.sourceOfPay
        : '',
    purpose:
      leadDetailsObj2?.Status === 'booked'
        ? leadDetailsObj2[`${uid}_otherInfo`]?.purpose
        : '',
    // leadSource: "",
    // sourceOfPay: "",
    // purpose: "",
    bookingSource: leadDetailsObj2?.bookingSource || '',
    bookedBy:
      leadDetailsObj2?.bookedBy || leadDetailsObj2?.assignedToObj?.label || '',
    purchasePurpose: leadDetailsObj2?.purchasePurpose || '',
  }

  const validateSchema = Yup.object({
    // customerName1: Yup.string().required('Required'),
    // co_Name1: Yup.string().required('Required'),
    // panNo1: Yup.string().required('Required'),
    // panDocUrl1: Yup.string().required('Required'),
    // aadharNo1: Yup.string().required('Required'),
    // aadharUrl1: Yup.string().required('Required'),
    // occupation1: Yup.string().required('Required'),
    // phoneNo1: Yup.string().required('Required'),
    // email1: Yup.string().required('Required'),
    // aggrementAddress: Yup.string().required('Required'),
  })

  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }

  const onSubmit = async (data, resetForm) => {
    console.log('customer details form', data)
    const {
      customerName1,
      co_Name1,
      phoneNo1,
      email1,
      dob1,
      marital1,
      panNo1,
      panDocUrl1,
      aadharNo1,
      aadharUrl1,
      occupation1,
      companyName1,
      customerName2,
      co_Name2,
      phoneNo2,
      email2,
      dob2,
      marital2,
      panNo2,
      panDocUrl2,
      aadharNo2,
      aadharUrl2,
      occupation2,
      companyName2,
      aggrementAddress,
      industry,
      designation,
      annualIncome,
      leadSource,
      sourceOfPay,
      purpose,
      bookingSource,
      bookedBy,
      purchasePurpose,
    } = data
    const { uid } = selUnitDetails
    const customerDetailsObj = {
      customerName1: customerName1,
      co_Name1: co_Name1,
      phoneNo1: phoneNo1,
      email1: email1,
      dob1: dob1,
      marital1: marital1,
      panNo1: panNo1,
      panDocUrl1: panDocUrl1,
      aadharNo1: aadharNo1,
      aadharUrl1,
      occupation1,
      companyName1,
    }
    const secondaryCustomerDetailsObj = {
      customerName2,
      co_Name2,
      phoneNo2,
      email2,
      dob2,
      marital2,
      panNo2,
      panDocUrl2,
      aadharNo2,
      aadharUrl2,
      occupation2,
      companyName2,
    }
    const aggrementDetailsObj = {
      aggrementAddress,
    }

    const xData = {}
    xData[`${uid}${'_source_of_pay'}`] = { self: 20, bank: 80 } // sourceOfPay
    xData[`${uid}${'_otherInfo'}`] = { leadSource, sourceOfPay, purpose }

    const updateDoc = {
      customerDetailsObj,
      secondaryCustomerDetailsObj,
      aggrementDetailsObj,
      ...xData,
      industry,
      designation,
      annualIncome,
    }
    const { id } = leadDetailsObj2
    console.log('did you find my id', id, leadDetailsObj2)

    updateLeadCustomerDetailsTo(
      orgId,
      id,
      updateDoc,
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar,
      resetForm
    )

    // const updatedData = {
    //   ...data,
    // }

    // setLoading(true)
    // addCustomer(
    // orgId,
    //   updatedData,
    //   'nithe.nithesh@gmail.com',
    //   enqueueSnackbar,
    //   resetForm
    // )
    // setLoading(false)
  }
  return (
    <>
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
                          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F9FBFB] border-0">
                            <div className="rounded-t bg-[#F1F5F9] mb-0 px-6 py-6">
                              <div className="text-center flex justify-between">
                                <p className="text-md font-extrabold tracking-tight uppercase font-body">
                                  Customer Details
                                </p>
                                {/* <button
                                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  Receipt Download
                                </button> */}
                              </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-4 py-10 pt-0 mt-4">
                              <section className=" lg:px-2 py-6">
                                <div className="flex flex-wrap">
                                  <section
                                    className="w-full flex p-4 rounded-md   mt- bg-[#fff] hover:shadow-2xl"
                                    style={{
                                      boxShadow: '0 1px 12px #f2f2f2',
                                    }}
                                  >
                                    <div className="w-full lg:w-6/12 px-4 border-r">
                                      <div className="w-full flex flex-row">
                                        <div className="w-3 h-3 mt-[16px] bg-teal-500"></div>
                                        <div className="w-2 h-3 ml-[1px]  mt-[16px] bg-teal-500"></div>
                                        <div className="w-1 h-3 ml-[1px] mr-1 mt-[16px] bg-teal-500"></div>
                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase ">
                                          First Applicant Personal Details
                                        </h6>
                                      </div>
                                      <div className="flex flex-wrap">
                                        <div className="w-full lg:w-12/12 ">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Customer Name*"
                                              name="customerName1"
                                              type="text"
                                            />
                                          </div>
                                        </div>

                                        <div className="w-full lg:w-12/12">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Son/Daughter/Wife of"
                                              name="co_Name1"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Phone No"
                                              name="phoneNo1"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-8/12 pl-4">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Email"
                                              name="email1"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 ">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Date Of Birth"
                                              name="dob1"
                                              type="text"
                                            />
                                          </div>
                                        </div>

                                        <div className="w-full lg:w-8/12 pl-4">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Marital Status"
                                              name="marital1"
                                              type="text"
                                            />
                                          </div>
                                        </div>

                                        {/* <section
                                        className="w-full  rounded-md  mt-6 bg-[#fff]"
                                        style={{
                                          boxShadow: '0 1px 12px #f2f2f2',
                                        }}
                                      > */}

                                        {/* </section> */}
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4 mt">
                                      {/* add here */}

                                      <div className="w-full flex flex-row">
                                        <div className="w-3 h-3 mt-[16px] bg-teal-500"></div>
                                        <div className="w-2 h-3 ml-[1px]  mt-[16px] bg-teal-500"></div>
                                        <div className="w-1 h-3 ml-[1px] mr-1 mt-[16px] bg-teal-500"></div>
                                        <h6 className="w-full lg:w-12/12 text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                          First Applicant Proofs
                                        </h6>
                                      </div>
                                      <div className="w-full flex flex-row">
                                        <div className="w-full lg:w-4/12 px-">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="PAN No"
                                              name="panNo1"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-8/12 pl-4">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="PAN upload"
                                              name="panDocUrl1"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="w-full flex flex-row">
                                        <div className="w-full lg:w-4/12 px-">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Aadhar No"
                                              name="aadharNo1"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-8/12 pl-4">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Aadhar Upload"
                                              name="aadharUrl1"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                  <section
                                    className="w-full flex p-4 rounded-md   mt-6  bg-[#fff]"
                                    style={{ boxShadow: '0 1px 12px #f2f2f2' }}
                                  >
                                    <div className="w-full lg:w-6/12 px-4 border-r-2 ">
                                      <div className="w-full flex flex-row">
                                        <div className="w-3 h-3 mt-[16px] rounded-full bg-teal-500"></div>
                                        <div className="w-2 h-2 ml-[1px] rounded-md mt-[18px] bg-teal-500"></div>
                                        <div className="w-1 h-1 ml-[1px] rounded-md mr-1 mt-[20px] bg-teal-500"></div>
                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase ">
                                          Second Applicant Personal Details
                                        </h6>
                                      </div>
                                      <div className="flex flex-wrap">
                                        <div className="w-full lg:w-12/12 ">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Customer Name*"
                                              name="customerName2"
                                              type="text"
                                            />
                                          </div>
                                        </div>

                                        <div className="w-full lg:w-12/12">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Son/Daughter/Wife of"
                                              name="co_Name2"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Phone No"
                                              name="phoneNo2"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-8/12 pl-4">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Email"
                                              name="email2"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 ">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Date Of Birth"
                                              name="dob2"
                                              type="text"
                                            />
                                          </div>
                                        </div>

                                        <div className="w-full lg:w-8/12 pl-4 ">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Marital Status"
                                              name="marital2"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4 ">
                                      <div className="w-full flex flex-row ">
                                        <div className="w-3 h-3 mt-[16px] rounded-md bg-teal-500"></div>
                                        <div className="w-2 h-2 ml-[1px] rounded-md mt-[18px] bg-teal-500"></div>
                                        <div className="w-1 h-1 ml-[1px] rounded-md mr-1 mt-[20px] bg-teal-500"></div>
                                        <h6 className="w-full lg:w-12/12 text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                          Second Applicant Proofs
                                        </h6>
                                      </div>
                                      <div className="w-full flex flex-row">
                                        <div className="w-full lg:w-4/12 px-">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="PAN No"
                                              name="panNo2"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-8/12 pl-4">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="PAN upload"
                                              name="panDocUrl2"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="w-full flex flex-row">
                                        <div className="w-full lg:w-4/12 px-">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Aadhar No"
                                              name="aadharNo2"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="w-full lg:w-8/12 pl-4">
                                          <div className="relative w-full mb-3 mt-2">
                                            <TextField2
                                              label="Aadhar Upload"
                                              name="aadharUrl2"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>

                                {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}
                                <section
                                  className="rounded-md  p-4 mt-6 bg-[#fff]"
                                  style={{ boxShadow: '0 1px 12px #f2f2f2' }}
                                >
                                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Agreement Information
                                  </h6>
                                  <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <TextField2
                                          label="Address"
                                          name="aggrementAddress"
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}
                                <section
                                  className="rounded-md  p-4 mt-6 bg-[#fff]"
                                  style={{ boxShadow: '0 1px 12px #f2f2f2' }}
                                >
                                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Professional Information
                                  </h6>
                                  <div className="flex flex-wrap">
                                    <div className="w-full lg:w-4/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <TextField2
                                          label="Industry"
                                          name="industry"
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <TextField2
                                          label="Job Designation"
                                          name="designation"
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <TextField2
                                          label="Annual Income"
                                          name="annualIncome"
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}
                                <section
                                  className="rounded-md  p-4 mt-6 bg-[#fff]"
                                  style={{ boxShadow: '0 1px 12px #f2f2f2' }}
                                >
                                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Other Information
                                  </h6>
                                  <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <TextField2
                                          label="How do you come to know about this project?"
                                          name="leadSource"
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <TextField2
                                          label="Source of payment/source"
                                          name="sourceOfPay"
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <TextField2
                                          label="Purpose of purchase"
                                          name="purpose"
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                {/* <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
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
                                  <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <TextField2
                                        label="Purpose of purchase"
                                        name="purchasePurpose"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                </div> */}

                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                                  <button
                                    className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-xs hover:shadow-lg hover:bg-green-500"
                                    type="submit"
                                    disabled={loading}
                                  >
                                    {/* {loading && <Loader />} */}
                                    {'Save'}
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

      {/* old form  */}
    </>
  )
}

export default AddBookingForm
