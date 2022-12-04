/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { Link, routes } from '@redwoodjs/router'

import { Fragment, useState, useEffect } from 'react'

// import { XIcon } from '@heroicons/react/outline'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { MetaTags } from '@redwoodjs/web'

import LLeadsTableView from 'src/components/LLeadsTableView/LLeadsTableView'
import { USER_ROLES } from 'src/constants/userRoles'
import {
  getFinanceTransactionsByStatus,
  getLeadsByAdminStatus,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { prettyDate } from 'src/util/dateConverter'
import { CustomSelect } from 'src/util/formFields/selectBoxField'

import CardItem from '../leadsCard'
import SiderForm from '../SiderForm/SiderForm'

import FinanceTableView from './financeTableView'

const LeadsDummyHome = ({ leadsTyper }) => {
  const { user } = useAuth()
  const { orgId } = user
  const isImportLeads =
    user?.role?.includes(USER_ROLES.ADMIN) ||
    user?.role?.includes(USER_ROLES.SALES_MANAGER)
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)

  // kanban board
  const [ready, setReady] = useState(false)

  const [addLeadsTypes, setAddLeadsTypes] = useState('')
  const [selUserProfile, setSelUserProfile] = useState({})
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [serialLeadsData, setSerialLeadsData] = useState([])
  const [projectList, setprojectList] = useState([])

  const [value, setValue] = useState('latest')
  const tabHeadFieldsA = [
    { lab: 'In Progress', val: 'inprogress' },
    { lab: 'New', val: 'new' },
    { lab: 'Follow Up', val: 'followup' },
    { lab: 'Visit Fixed', val: 'visitfixed' },
    { lab: 'Visit Done', val: 'visitdone' },
    { lab: 'Visit Cancel', val: 'visitcancel' },
    { lab: 'Negotiation', val: 'negotiation' },
    { lab: 'Unassigned', val: 'unassigned' },
  ]
  const archieveFields = ['Dead', 'RNR', 'blocked', 'notinterested', 'junk']
  useEffect(() => {
    getLeadsDataFun()
  }, [])

  const rowsCounter = (parent, searchKey) => {
    console.log('seach key is', searchKey)
    if (searchKey === 'inprogress') {
      return serialLeadsData
    } else {
      return serialLeadsData.filter((item) => {
        return item?.status?.toLowerCase() === searchKey?.toLowerCase()
        // if (searchKey === 'inprogress') {
        //   return item
        // } else if (item?.status?.toLowerCase() === searchKey?.toLowerCase()) {
        //   console.log('All1', item)
        //   return item
        // }
      })
    }
  }

  const getLeadsDataFun = async () => {
    console.log('login role detials', user)
    const { access, uid, projAccessA } = user

    const unsubscribe = getLeadsByAdminStatus(
      orgId,
      async (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          return x
        })

        // setBoardData
        await console.log(
          'my Array data is delayer ',
          projAccessA,
          usersListA.length
        )
        await console.log('this is strange 1', serialLeadsData.length)
        await setSerialLeadsData(usersListA)
        await setLeadsFetchedData(usersListA)
        await console.log('this is strange 2', serialLeadsData.length)

        // await setLeadsFetchedRawData(usersListA)
        // await serealizeData(usersListA)
        // filter_Leads_Projects_Users_Fun()
        // await setLeadsFetchedData(usersListA)
      },
      {
        status:
          leadsTyper === 'inProgress'
            ? [
                'new',
                'followup',
                'unassigned',
                'visitfixed',
                '',
                'visitdone',
                'visitcancel',
                'negotiation',
                'reassign',
                'RNR',
                // 'booked',
              ]
            : leadsTyper === 'booked'
            ? ['booked']
            : archieveFields,
        projAccessA: projAccessA,
      },
      (error) => setLeadsFetchedData([])
    )
    return unsubscribe
    return
    if (access?.includes('manage_leads')) {
      const unsubscribe = getFinanceTransactionsByStatus(
        orgId,
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // setBoardData
          console.log('my Array data is ', usersListA, leadsFetchedData)
          // await serealizeData(usersListA)
          await setLeadsFetchedData(usersListA)
          await console.log('my Array data is set it', leadsFetchedData)
        },
        {
          status: [
            'latest',
            'reviewing',
            'cleared',
            'rejected',
            '',
            // 'booked',
          ],
        },
        (error) => setLeadsFetchedData([])
      )
      return unsubscribe
    } else {
      const unsubscribe = getFinanceTransactionsByStatus(
        orgId,
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // setBoardData
          console.log('my Array data is ', usersListA)
          await serealizeData(usersListA)
          await setLeadsFetchedData(usersListA)
        },
        {
          uid: uid,
          status: [
            'new',
            'review',
            'cleared',
            'rejected',
            '',
            // 'booked',
          ],
        },
        (error) => setLeadsFetchedData([])
      )
      return unsubscribe
    }

    // await console.log('leadsData', leadsData)
  }

  const serealizeData = (array) => {
    // let newData =
    const x = [
      'new',
      'review',
      'cleared',
      'rejected',
      '',
      // 'booked',
    ].map((status) => {
      const items = array.filter((data) => data.Status.toLowerCase() == status)

      return { name: status, items }
    })
    setSerialLeadsData(x)
  }

  const selUserProfileF = (title, data) => {
    setAddLeadsTypes(title)
    setisImportLeadsOpen(true)
    setSelUserProfile(data)
  }
  return (
    <>
      <div className="">
        <div className="">
          <div
            className="
            "
          >
            <div className="flex items-center justify-between py-2 px-6 bg-white ">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 leading-light py-2 ">
                  Leads Management Dummy
                </h2>
              </div>
              <div className="flex px-6">
                {leadsTyper == 'inProgress' && (
                  <span className="inline-flex p-1 border bg-gray-200 rounded-md">
                    <button
                      className={`px-2 py-1  rounded ${
                        ready ? 'bg-white shadow' : ''
                      }`}
                      onClick={() => setReady(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                        />
                      </svg>
                    </button>
                    <button
                      className={`px-2 py-1  rounded ${
                        !ready ? 'bg-white shadow' : ''
                      }`}
                      onClick={() => setReady(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </span>
                )}
                <></>
              </div>
            </div>

            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />

            {!ready && (
              <div className="container overflow-hidden rounded-2xl px-6">
                <div className="flex flex-col app-bg-white-1  pb-10">
                  <div className="flex flex-row py-5">
                    <span className="text-lg font-bold app-color-black"></span>
                  </div>

                  <div className="flex flex-row">
                    {tabHeadFieldsA.map((fieldHead, i) => (
                      <div
                        key={i}
                        className={`flex flex-col w-40 h-[55px] bg-white pl-5 py-1 mr- border-r-2 border-t-slate-700  ${
                          value != fieldHead?.val
                            ? 'bg-[#EAF0F6]'
                            : 'bg-[#F5F8FA]'
                        } `}
                        onClick={() => setValue(fieldHead?.val)}
                      >
                        <span
                          className={`text-[14px] ${
                            value != fieldHead?.val ? '' : 'text-black'
                          } font-bold`}
                        >
                          {' '}
                          {serialLeadsData.length}
                          {rowsCounter(leadsFetchedData, fieldHead?.val).length}
                        </span>
                        <span
                          className={`text-[12px] ${
                            value != fieldHead?.val ? '' : 'text-black'
                          }  font-semibold`}
                        >
                          {fieldHead?.lab}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row bg-[#F5F8FA] px-10 pt-6 relative">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="w-28"></th>
                          <th className="text-left text-xs app-color-black pb-3">
                            <span className="ml-4">FROM</span>
                          </th>
                          <th className="text-left text-xs app-color-black pb-3">
                            <span className="ml-4">To</span>
                          </th>
                          <th className="text-left text-xs app-color-black pb-3">
                            TRANSACTION DETAILS
                          </th>
                          <th className="text-right text-xs app-color-black pb-3">
                            <span className="mr-10">AMOUNT</span>
                          </th>

                          <th className="text-left text-xs app-color-black pb-3">
                            COMMENTS
                          </th>

                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {serialLeadsData.map((row, index) => (
                          <tr
                            className="app-border-1 border-y border-slate-200 my-2 py-2 h-[120px]"
                            key={index}
                          >
                            <td>{index + 1}</td>
                            <td>
                              {' '}
                              <span className="font-bodyLato">
                                {prettyDate(row.Date).toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        ))}

                        {leadsFetchedData.map((dat, i) => (
                          <tr
                            className="app-border-1 border-y border-slate-200 my-2 py-2 h-[120px]"
                            key={i}
                            onClick={() => selUserProfileF('Transaction', dat)}
                          >
                            <td>
                              <div className="flex justify-center text-right items-center rounded-md w-8 h-8 app-bg-yellow-2 app-color-yellow-1 text-lg font-semibold">
                                {i + 1}
                              </div>
                              <div
                                className={`${
                                  dat?.status === 'cleared'
                                    ? 'bg-green-700'
                                    : dat?.status === 'rejected'
                                    ? 'bg-yellow-600'
                                    : 'bg-violet-600'
                                }   w-24 text-xs font-semibold px-3 py-0.5 rounded-br-md rounded-tl-md text-white`}
                              >
                                {dat?.status?.toLocaleUpperCase()}
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-row py-3 ml-4">
                                <div className="mr-2 w-[3px] rounded-2xl  bg-violet-300 "></div>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-sm app-color-black">
                                    {dat?.fromObj?.name || 'Vikram Bose'}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.fromObj?.accountNo || '52346673647'}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.fromObj?.bankName || 'Andhara Bank'}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.fromObj?.branch || 'Hsr layout'}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-row ml-4 py-3">
                                <div className="mr-2 w-[3px] rounded-2xl bg-violet-300  "></div>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-sm app-color-black">
                                    {dat?.toAccount?.name || 'Vertex Apartment'}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.toAccount?.accountNo || '52346673647'}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.toAccount?.bankName || 'Andhara Bank'}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.toAccount?.branch || 'Hsr layout'}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-row py-3">
                                {/* <div className="mr-2 w-[3px]  bg-gray-100 "></div> */}
                                <div className="flex flex-col">
                                  <span className="font-semibold text-sm app-color-black">
                                    {dat?.mode}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.chequeno}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.dated}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <span className="text-right font-semibold text-sm app-color-gray-1 mr-10">
                                Rs {dat?.amount}
                              </span>
                            </td>

                            <td>
                              <span className="ml-3 font-semibold text-md app-color-gray-1">
                                NA
                              </span>
                            </td>
                            <td>
                              <svg
                                className="w-6 h-6 app-color-blue-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                ></path>
                              </svg>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* {!ready && (
              <FinanceTableView
                leadsFetchedData={leadsFetchedData}
                setisImportLeadsOpen={setisImportLeadsOpen}
                selUserProfileF={selUserProfileF}
                leadsTyper={leadsTyper}
              />
            )} */}
          </div>
        </div>
      </div>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={'Transaction'}
        customerDetails={selUserProfile}
        widthClass="max-w-4xl"
      />
    </>
  )
}

export default LeadsDummyHome
