/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react'

import { Timestamp } from 'firebase/firestore'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'

import {
  addLead,
  checkIfLeadAlreadyExists,
  getAllProjects,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import {
  sendWhatAppMediaSms,
  sendWhatAppTextSms,
} from 'src/util/axiosWhatAppApi'

const BlockingUnitForm = ({ title, dialogOpen }) => {
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
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [devType, setdevType] = useState(devTypeA[0])
  const [selDays, setSelDays] = useState(5)

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

  const initialState = {
    blockReason: '',
  }
  const validate = Yup.object({
    blockReason: Yup.string().required('Reason is Required'),
  })
  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }
  return (
    <>
      <section className="bg-blueGray-50  mt-10">
        <div className="w-full  mx-auto ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F9FBFB] border-0 ">
            <div className="rounded-t bg-[#F1F5F9] mb-0 px-3 py-2">
              <div className="text-center flex justify-between">
                <p className="text-xs font-extrabold tracking-tight uppercase font-body my-1">
                  Block Unit
                </p>
              </div>
            </div>
            <div className="mx-2 o my-10 mt-4 ">
              <div className="bg-white p-10 rounded-xl">
                <h1 className="text-center text-xl font-semibold text-gray-500">
                  How many days you want to block?
                </h1>
                <div className="flex flex-wrap justify-center mt-10 space-x-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((days, i) => (
                    <option
                      key={i}
                      value={days}
                      onMouseEnter={() => setSelDays(days)}
                      onClick={() => setSelDays(days)}
                      className={`${
                        days === selDays ? 'bg-[#FFCD3E]  text-green-50 ' : ''
                      } flex items-center justify-center w-10 h-10 bg-gray--100 text-gray-600 hover:bg-[#FFCD3E]  transition duration-150 rounded-full font-bold hover:text-green-50 cursor-pointer`}
                    >
                      {days}
                    </option>
                  ))}
                  <span className="mt-[12px] text-sm text-gray-700 ">days</span>
                </div>
                <Formik
                  initialValues={initialState}
                  validationSchema={validate}
                  onSubmit={(values, { resetForm }) => {
                    // onSubmit(values, resetForm)
                  }}
                >
                  {(formik) => (
                    <Form className="mt-8">
                      <div className="flex justify-center border-2 py-2 px-6 rounded-xl">
                        <input
                          type="text"
                          name="blockReason"
                          placeholder="Write a blocking reason"
                          className="w-full outline-none text-gray-700 text-lg"
                        />
                        <ErrorMessage
                          component="div"
                          name={'blockReason'}
                          className="error-message text-red-700 text-xs p-1 mx-auto"
                        />
                        <button
                          type="submit"
                          className="bg-[#FFCD3E]  text-green-50 font-semibold px-6 py-2 rounded-xl text-md"
                        >
                          Block
                        </button>
                      </div>
                      <span className="text-center block mt-6 text-gray-400 text-md font-semibold">
                        Blocking unit for
                        <span className="text-[#FFCD3E] ml-2 text-xl w-10 ">
                          {selDays}
                        </span>{' '}
                        days
                      </span>
                    </Form>
                  )}
                </Formik>
              </div>

              {/* <div className="flex justify-end">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 bg-green-50 rounded-full text-[#FFCD3E]  mb-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlockingUnitForm
