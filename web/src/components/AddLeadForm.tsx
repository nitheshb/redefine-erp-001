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
import DatePicker from 'react-datepicker'
import { setHours, setMinutes } from 'date-fns'

import { TextField } from 'src/util/formFields/TextField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import Loader from './Loader/Loader'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import {
  addCpLead,
  addLead,
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
import { sourceList } from 'src/constants/projects'
import { USER_ROLES } from 'src/constants/userRoles'
import { DeviceMobileIcon, MailIcon } from '@heroicons/react/outline'
import AssigedToDropComp from './assignedToDropComp'
import { prettyDateTime } from 'src/util/dateConverter'
import { currentStatusDispFun } from 'src/util/leadStatusDispFun'

const AddLeadForm = ({ title, dialogOpen }) => {
  const d = new window.Date()
  const { user } = useAuth()
  const { orgId } = user
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [closeWindowMode, setCloseWindowMode] = useState(false)
  const [startDate, setStartDate] = useState(d)

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

  // const usersList = [
  //   { label: 'User1', value: 'User1' },
  //   { label: 'User2', value: 'User2' },
  //   { label: 'User3', value: 'User3' },
  // ]
  const budgetList = [
    { label: 'Select Customer Budget', value: '' },
    { label: '5 - 10 Lacs', value: '5-10L' },
    { label: '10 - 20 Lacs', value: '10-20L' },
    { label: '20 - 30 Lacs', value: '20-30L' },
    { label: '30 - 40 Lacs', value: '30-40L' },
    { label: '40 - 50 Lacs', value: '40-50L' },
    { label: '50 - 60 Lacs', value: '50-60L' },
    { label: '60 - 70 Lacs', value: '60-70L' },
    { label: '70 - 80 Lacs', value: '70-80L' },
    { label: '80 - 90 Lacs', value: '80-90L' },
    { label: '90 - 100 Lacs', value: '90-100L' },
    { label: '1.0 Cr - 1.1 Cr', value: '1-1.1C' },
    { label: '1.1 Cr - 1.2 Cr', value: '1.1-1.2C' },
    { label: '1.2 Cr - 1.3 Cr', value: '1.2-1.3C' },
    { label: '1.3 Cr - 1.4 Cr', value: '1.3-1.4C' },
    { label: '1.4 Cr - 1.5 Cr', value: '1.4-1.5C' },
    { label: '1.5 + Cr', value: '1.5+' },
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
  const [founDocs, setFoundDocs] = useState([])

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

    if (user?.role?.includes(USER_ROLES.CP_AGENT)) {
      const { uid, email, displayName, department, role, orgId, phone } = user
      data.assignedTo = uid
      data.assignedToObj = {
        department: department || [],
        email: email || '',
        label: displayName || '',
        name: displayName || '',
        namespace: orgId,
        roles: role || [],
        uid: uid || '',
        value: uid || '',
        offPh: phone || '',
      }
    }

    const {
      email,
      name,
      mobileNo,
      assignedTo,
      assignedToObj,
      source,
      project,
      projectId,
    } = data

    // updateUserRole(uid, deptVal, myRole, email, 'nitheshreddy.email@gmail.com')

    const foundLength = await checkIfLeadAlreadyExists(
      `${orgId}_leads`,
      mobileNo
    )
    // Timestamp.now().toMillis()
    const leadData = {
      Date: startDate.getTime(),
      Email: email,
      Mobile: mobileNo,
      Name: name,
      Note: '',
      Project: project,
      ProjectId: projectId,
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
        offPh: assignedToObj?.offPh || '',
      },
      by: user?.email,
    }
    console.log('user is ', user)
    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength)
      setFoundDocs(foundLength)
      setFormMessage('User Already Exists with Ph No')
      setLoading(false)
    } else {
      console.log('foundLENGTH IS empty ', foundLength)

      if (user?.role?.includes(USER_ROLES.CP_AGENT)) {
        await addCpLead(
          orgId,
          leadData,
          user?.email,
          `lead created and assidged to ${assignedToObj?.email || assignedTo}`
        )
      } else {
        // proceed to copy
        await addLead(
          orgId,
          leadData,
          user?.email,
          `lead created and assidged to ${assignedToObj?.email || assignedTo}`
        )
        //
      }

      await sendWhatAppTextSms(
        mobileNo,
        `Thank you ${name} for choosing the world class ${project || 'project'}`
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
      if (closeWindowMode) {
        console.log('am cloded')
        dialogOpen()
      }
    }
  }

  // const sourceList = [
  //   { label: 'Select the Source', value: '' },
  //   { label: 'CP Skagen', value: 'cpskagen' },
  //   { label: 'Direct Contact', value: 'directcontact' },
  //   { label: 'Facebook Ad', value: 'facebookad' },
  //   { label: 'Google Adwords', value: 'googleadwords' },
  //   { label: 'Instagram Ad', value: 'instagramad' },
  //   { label: 'Magic Bricks', value: 'magicbricks' },
  //   { label: 'MCube', value: 'mcube' },
  //   { label: 'Website', value: 'website' },
  //   { label: '99acres', value: '99acres' },
  // ]
  const validate = Yup.object({
    name: Yup.string()
      .max(45, 'Must be 45 characters or less')
      .required('Name is Required'),
    // lastName: Yup.string()
    //   .max(20, 'Must be 20 characters or less')
    //   .required('Required'),
    email: Yup.string().email('Email is invalid'),

    // password: Yup.string()
    //   .min(6, 'Password must be at least 6 charaters')
    //   .required('Password is required'),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref('password'), null], 'Password must match')
    //   .required('Confirm password is required'),
    // mobileNo
    mobileNo: Yup.string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'to short')
      .max(10, 'to long'),

    // deptVal: Yup.string()
    //   // .oneOf(['Admin', 'CRM'], 'Required Dept')
    //   .required('Req Dept'),
    // myRole: Yup.string()
    //   //  .oneOf(['Admin', 'CRM'], 'DEPT IS REQ')
    //   .required('Required Role'),
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
                name: '',
                cDate: '',
                mobileNo: '',
                email: '',
                source: '',
                project: '',
                projectId: '',
                assignedTo: '',
                budget: '20-30L',
                deptVal: '',
                myRole: '',
              }}
              validationSchema={validate}
              onSubmit={(values, { resetForm }) => {
                console.log('ami submitted', values)
                console.log('ami submitted 1', values.assignedTo === '')
                onSubmitFun(values, resetForm)
              }}
            >
              {(formik) => (
                <div className="mt-8">
                  <Form>
                    <div className="mb-4 ">
                      <div className="inline">
                        <div className="">
                          <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                            Client Details<abbr title="required"></abbr>
                          </label>
                        </div>

                        <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>
                      </div>
                    </div>
                    <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2">
                      {/* <div className="mb-3 space-y-2 w-full text-xs">

                        <TextField
                          label="Contact Date"
                          name="cDate"
                          type="text"
                        />
                      </div> */}

                      <div className="mb-3 space-y-2 w-full text-xs">
                        <TextField
                          label="Customer Name"
                          name="name"
                          type="text"
                        />
                      </div>
                      <div className="mb-3 space-y-2 w-full text-xs">
                        {/* <TextField
                          label="Mobile No*"
                          name="mobileNo"
                          type="text"
                        /> */}
                        {/* <NumberFormat
                          // label="Mobile No*"
                          className=" w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-4 mt-1"
                          name="mobileNo"
                          value={formik.values.mobileNo}
                          onValueChange={(value) => {
                            formik.setFieldValue('mobileNo', value.value)
                          }}
                          format="+91 ###-###-####"
                          mask=""
                        /> */}
                        <PhoneNoField
                          name="mobileNo"
                          label="Mobile No*"
                          className="input"
                          onChange={(value) => {
                            formik.setFieldValue('mobileNo', value.value)
                          }}
                          value={formik.values.mobileNo}
                          options={sourceList}
                        />
                      </div>
                    </div>
                    {/* 2 */}
                    <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-">
                      <div className="mb-3 space-y-2 w-full text-xs">
                        <TextField label="Email" name="email" type="text" />
                      </div>
                      <div className="mb-3 space-y-2 w-full text-xs">
                        <span className="inline">
                          <label className="label font-regular text-sm block mb-1">
                            Enquiry Date
                          </label>
                          <DatePicker
                            className=" pl- px- h-10 rounded-md   min-w-[151px] inline  text-[#0091ae]   w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] px-4"
                            selected={startDate}
                            onChange={(date) => {
                              formik.setFieldValue('enquiryDat', date.getTime())
                              setStartDate(date)
                            }}
                            timeFormat="HH:mm"
                            injectTimes={[
                              setHours(setMinutes(d, 1), 0),
                              setHours(setMinutes(d, 5), 12),
                              setHours(setMinutes(d, 59), 23),
                            ]}
                            dateFormat="MMMM d, yyyy"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                        More Details<abbr title="required">*</abbr>
                      </label>
                    </div>
                    <div className="border-t-4 rounded-xl w-16 mt-1  border-green-600"></div>

                    {/* </div>
                      <div className="rounded-lg bg-white border border-gray-100 p-4 mt-4"> */}
                    {/* 3 */}
                    <div className="md:flex md:flex-row md:space-x-4 w-full text-xs ">
                      <div className="w-full flex flex-col mb-3 mt-2">
                        <CustomSelect
                          name="source"
                          label="Lead Source*"
                          className="input mt-3"
                          onChange={(value) => {
                            formik.setFieldValue('source', value.value)
                          }}
                          value={formik.values.source}
                          options={sourceList}
                        />
                      </div>

                      <div className="w-full flex flex-col mb-3 mt-2">
                        <CustomSelect
                          name="project"
                          label="Select Project"
                          className="input mt-3"
                          onChange={(value) => {
                            console.log('value of project is ', value)
                            formik.setFieldValue('projectId', value.uid)
                            formik.setFieldValue('project', value.value)
                          }}
                          value={formik.values.project}
                          // options={aquaticCreatures}
                          options={projectList}
                        />
                      </div>
                    </div>
                    {/* 4 */}
                    {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
                      <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                        <div className="w-full flex flex-col mb-3">
                          <CustomSelect
                            name="assignedTo"
                            label="Assign To"
                            className="input mt-"
                            onChange={(value) => {
                              console.log('value is ', value, user)
                              formik.setFieldValue('assignedTo', value.value)
                              formik.setFieldValue('assignedToObj', value)
                            }}
                            value={formik.values.assignedTo}
                            options={usersList}
                          />

                          <p
                            className="text-sm text-red-500 hidden mt-3"
                            id="error"
                          >
                            Please fill out this field.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 6 */}
                    <div className=" mt-8 ">
                      <label className="font-semibold text-[#053219]  text-sm  mb-1 ">
                        Advanced<abbr title="required"></abbr>
                      </label>
                    </div>
                    <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>

                    <div className="">
                      <div className=" flex flex-col  mt-4  px-1 py-1 ">
                        <label className="font- text-[#053219]  text-sm mb-2">
                          Type<abbr title="required"></abbr>
                        </label>
                        <RadioGroup value={selected} onChange={typeSel}>
                          <div className="grid grid-cols-4 gap-4">
                            {plans.map((plan) => (
                              <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={({ active, checked }) =>
                                  `${
                                    active
                                      ? 'ring-2 ring-offset-2  ring-white ring-opacity-60 col-span-2'
                                      : ''
                                  }
                ${
                  selected.name == plan.name
                    ? 'ring-1  ring-green-400 bg-opacity-75 text-black'
                    : 'bg-[#f7f9f8]'
                }
                  relative rounded-lg px-5 py-2 cursor-pointer flex focus:outline-none col-span-2`
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className=" col-span-2 flex justify-center contents">
                                      <div className="flex items-center">
                                        <div className="text-sm">
                                          <RadioGroup.Label
                                            as="p"
                                            className={`font-medium  ${
                                              selected.name == plan.name
                                                ? 'text-gray-900'
                                                : 'text-gray-900'
                                            }`}
                                          >
                                            <img
                                              className="w-8 h-8 inline"
                                              alt=""
                                              src={plan.img}
                                            ></img>{' '}
                                          </RadioGroup.Label>
                                        </div>
                                      </div>
                                      <div className="mt-3 ml-1 mr-2 inline text-sm text-b ">
                                        {plan.name}
                                      </div>
                                      {true && (
                                        <div
                                          className={`${
                                            selected.name == plan.name
                                              ? 'flex-shrink-0 text-white ml-auto'
                                              : 'flex-shrink-0 text-black ml-auto'
                                          } mt-2`}
                                        >
                                          <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="w-5 h-5"
                                          >
                                            <circle
                                              cx={11}
                                              cy={11}
                                              r={11}
                                              fill={
                                                selected.name == plan.name
                                                  ? '#61d38a'
                                                  : ''
                                              }
                                            />
                                            <path
                                              d="M6 11l3 3 7-7"
                                              stroke={
                                                selected.name == plan.name
                                                  ? '#fff'
                                                  : ''
                                              }
                                              strokeWidth={1.5}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="md:flex md:flex-row md:space-x-4 w-full text-xs mt-3 mx-2">
                        <div className="w-full flex flex-col mb-3">
                          <CustomSelect
                            name="budget"
                            label="Budget"
                            className="input mt-3"
                            onChange={(value) => {
                              formik.setFieldValue('budget', value.value)
                            }}
                            value={formik.values.budget}
                            options={budgetList}
                          />
                          <p
                            className="text-sm text-red-500 hidden mt-3"
                            id="error"
                          >
                            Please fill out this field.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-8">
                      <p className="text-xs text-red-400 text-right my-3">
                        Mobile No / Email is required{' '}
                        <abbr title="Required field">*</abbr>
                      </p>
                      {formMessage === 'Saved Successfully..!' && (
                        <p className=" flex text-md text-slate-800  my-3">
                          <img
                            className="w-[40px] h-[40px] inline mr-2"
                            alt=""
                            src="/ok.gif"
                          />
                          <span className="mt-2">{formMessage}</span>
                        </p>
                      )}
                      {formMessage === 'User Already Exists with Ph No' && (
                        <p className=" flex  flex-col text-md text-pink-800  my-3">
                          <img
                            className="w-[40px] h-[40px] inline mr-2"
                            alt=""
                            src="/error.gif"
                          />
                          <span className="mt-2">{formMessage}</span>
                          {founDocs.map((customDetails, i) => {
                            const {
                              id,
                              Name,
                              Project,
                              ProjectId,
                              Source,
                              Status,
                              by,
                              Mobile,
                              Date,
                              Email,
                              Assigned,
                              AssignedBy,
                              Notes,
                              Timeline,
                              documents,
                              Remarks,
                              notInterestedReason,
                              notInterestedNotes,
                              stsUpT,
                              assignT,
                              leadDetailsObj,
                              assignedToObj,
                              CT,
                            } = customDetails
                            return (
                              <div
                                key={i}
                                className=" pb-[2px] px-3  mt-0 rounded-xs  mb-1  bg-[#F2F5F8]"
                              >
                                <div className="-mx-3 flex flex-col sm:-mx-4 px-3">
                                  <div className=" w-full px-1  ">
                                    <div className="">
                                      <div className="font-semibold flex  flex-row justify-between text-[#053219]  text-sm  mt-3 mb-1  tracking-wide font-bodyLato">
                                        <div className="mb-[4px] text-xl uppercase">
                                          {Name}
                                        </div>

                                        <div className="mt-1">
                                          <div className="font-md text-sm text-gray-500 mb-[2] tracking-wide">
                                            <MailIcon className="w-4 h-4 inline text-[#058527] " />{' '}
                                            {Email}
                                          </div>
                                        </div>

                                        <div className="font-md mt-1 text-sm text-gray-500 mb-[2] tracking-wide ">
                                          <DeviceMobileIcon className="w-4 h-4 inline text-[#058527] " />{' '}
                                          {Mobile?.replace(
                                            /(\d{3})(\d{3})(\d{4})/,
                                            '$1-$2-$3'
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full px-1  mt-1 mb-1 bg-white  pl-3 pt-2 ">
                                    <div className="relative z-10 my-1 bg-white">
                                      <div className="grid grid-cols-3 gap-5">
                                        <section className="">
                                          <div className="flex flex-row  cursor-pointer">
                                            <div className="font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4">
                                              Project {}
                                            </div>
                                          </div>
                                          <div className="font-semibold text-sm text-slate-900 tracking-wide overflow-ellipsis">
                                            {/* projectList */}

                                            {!user?.role?.includes(
                                              USER_ROLES.CP_AGENT
                                            ) &&
                                              [
                                                'junk',
                                                'notinterested',
                                                'dead',
                                              ].includes(Status) && (
                                                <AssigedToDropComp
                                                  assignerName={Project}
                                                  id={id}
                                                  align="right"
                                                  // setAssigner={setNewProject}
                                                  usersList={projectList}
                                                />
                                              )}
                                            {!user?.role?.includes(
                                              USER_ROLES.CP_AGENT
                                            ) &&
                                              ![
                                                'junk',
                                                'notinterested',
                                                'dead',
                                              ].includes(Status) && (
                                                <div className="font-semibold text-[#053219] text-sm  mt- px-[3px] pt-[2px] rounded ">
                                                  {Project}{' '}
                                                  {/* {leadDetailsObj?.Status != tempLeadStatus
  ? `--> ${' '}${tempLeadStatus}`
  : ''} */}
                                                </div>
                                              )}
                                          </div>
                                        </section>

                                        <section>
                                          <div className="font-md text-xs text-gray-500 mb-[px] tracking-wide mr-4">
                                            Assigned To {}
                                          </div>
                                          {!user?.role?.includes(
                                            USER_ROLES.CP_AGENT
                                          ) &&
                                            [
                                              'junk',
                                              'notinterested',
                                              'dead',
                                            ].includes(Status) && (
                                              <div>
                                                <AssigedToDropComp
                                                  assignerName={
                                                    assignedToObj?.label
                                                  }
                                                  id={id}
                                                  // setAssigner={setAssigner}
                                                  usersList={usersList}
                                                  align={undefined}
                                                />
                                              </div>
                                            )}
                                          {!user?.role?.includes(
                                            USER_ROLES.CP_AGENT
                                          ) &&
                                            ![
                                              'junk',
                                              'notinterested',
                                              'dead',
                                            ].includes(Status) && (
                                              <div className="font-semibold text-[#053219] text-sm  mt- px-[3px] pt-[2px] rounded ">
                                                {assignedToObj?.label}{' '}
                                                {/* {leadDetailsObj?.Status != tempLeadStatus
  ? `--> ${' '}${tempLeadStatus}`
  : ''} */}
                                              </div>
                                            )}
                                          {user?.role?.includes(
                                            USER_ROLES.CP_AGENT
                                          ) && (
                                            <span className="text-left text-sm">
                                              {' '}
                                              {assignedToObj?.label}
                                              {/* {assignerName} */}
                                            </span>
                                          )}
                                        </section>
                                        <section>
                                          <div className="font-md text-xs text-gray-500 mb-[0px] tracking-wide mr-4">
                                            Current Status {}
                                          </div>
                                          <div className="font-semibold text-[#053219] text-sm  mt- px-[3px] pt-[2px] rounded ">
                                            {currentStatusDispFun(Status)}{' '}
                                            {/* {leadDetailsObj?.Status != tempLeadStatus
? `--> ${' '}${tempLeadStatus}`
: ''} */}
                                          </div>
                                        </section>
                                      </div>
                                      <div className="w-full border-b border-[#ebebeb] mt-4"></div>
                                      <div className=" w-full  pt-1 font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4 grid grid-cols-3 gap-5">
                                        {' '}
                                        <section>
                                          <span className="font-thin   font-bodyLato text-[9px]  py-[6px]">
                                            Created On
                                            <span className="text-[#867777] ck ml-2">
                                              {CT != undefined
                                                ? prettyDateTime(CT)
                                                : prettyDateTime(Date)}
                                            </span>
                                          </span>
                                        </section>
                                        <section>
                                          <span className="font-thin   font-bodyLato text-[9px]  py-[6px]">
                                            Updated On :
                                            <span className="text-[#867777] ck ml-2">
                                              {stsUpT === undefined
                                                ? 'NA'
                                                : prettyDateTime(stsUpT) ||
                                                  'NA'}
                                            </span>
                                          </span>
                                        </section>
                                        <section>
                                          <span className="font-thin text-[#867777]   font-bodyLato text-[9px]  py-[6px]">
                                            Assigned On
                                            <span className="text-[#867777] ck ml-2">
                                              {assignT != undefined
                                                ? prettyDateTime(assignT)
                                                : prettyDateTime(Date)}
                                            </span>
                                          </span>
                                        </section>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-row justify-between">
                                  <div className="px-3 py-2 flex flex-row  text-xs  border-t border-[#ebebeb] font-thin   font-bodyLato text-[12px]  py-[6px] ">
                                    Recent Comments:{' '}
                                    <span className="text-[#867777] ml-1 ">
                                      {' '}
                                      {Remarks || 'NA'}
                                    </span>
                                  </div>
                                  <div
                                    className="relative flex flex-col  group"
                                    // style={{ alignItems: 'end' }}
                                  >
                                    <div
                                      className="absolute bottom-0 right-0 flex-col items-center hidden mb-6 group-hover:flex"
                                      // style={{  width: '300px' }}
                                      style={{ zIndex: '9999' }}
                                    >
                                      <span
                                        className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                                        style={{
                                          color: 'black',
                                          background: '#e2c062',
                                          maxWidth: '300px',
                                        }}
                                      >
                                        <div className="italic flex flex-col">
                                          <div className="font-bodyLato">
                                            {Source?.toString() || 'NA'}
                                          </div>
                                        </div>
                                      </span>
                                      <div
                                        className="w-3 h-3  -mt-2 rotate-45 bg-black"
                                        style={{
                                          background: '#e2c062',
                                          marginRight: '12px',
                                        }}
                                      ></div>
                                    </div>
                                    <span className="font-bodyLato text-[#867777] text-xs mt-2">
                                      {/* <HighlighterStyle
searchKey={searchKey}
source={row.Source.toString()}
/> */}

                                      {Source?.toString() || 'NA'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
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
                          Add Lead
                        </button>
                        <button
                          className="mb-2 md:mb-0 bg-green-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white  rounded-sm hover:shadow-lg hover:bg-green-500"
                          type="submit"
                          onClick={() => setCloseWindowMode(true)}
                          disabled={loading}
                        >
                          {loading && <Loader />}
                          Add Lead & Close
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

export default AddLeadForm
