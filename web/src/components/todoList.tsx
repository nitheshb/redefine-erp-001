/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { TabList } from '@mui/lab'
import { Box, Card, Grid, styled } from '@mui/material'
import LLeadsTableBody from '../LLeadsTableBody/LLeadsTableBody'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next' // styled components
import { ArrowNarrowRightIcon } from '@heroicons/react/solid'

import uniqueId from 'src/util/generatedId'
import {
  formatToPhone,
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
  prettyDateTime,
} from 'src/util/dateConverter'

const torrowDate = new Date(
  +new Date().setHours(0, 0, 0, 0) + 86400000
).getTime()

const TodoListView = ({
  taskListA,
  setisImportLeadsOpen,
  selUserProfileF,
  leadsFetchedData,
  leadsTyper,
  leadByViewLayout,
  setLeadByViewLayout,
  searchKey,
  setSearchKey,
}) => {
  // change navbar title
  // useTitle('Data Table V1')
  const { t } = useTranslation()
  const [value, setValue] = useState('new')
  const [tableData, setTableData] = useState([])
  const [tabHeadFieldsA, settabHeadFieldsA] = useState([])
  // const [leadsFetchedData, setLeadsFetchedData] = useState([])

  useEffect(() => {
    // axios
    //   .get('/api/tableData1/all')
    //   .then(({ data }) => {
    //     setTableData(tableData1)
    //   })
    //   .catch((error) => {
    //     // setTableData(tableData1)
    //     console.log(error)
    //   })

    const tabHeadFieldsA1 =
      leadsTyper === 'inProgress'
        ? [
            { lab: 'In Progress', val: 'all' },
            { lab: 'New', val: 'new' },
            { lab: 'Follow Up', val: 'followup' },
            { lab: 'Visit Fixed', val: 'visitfixed' },
            { lab: 'Visit strokeLinejoin', val: 'visitdone' },
            { lab: 'Visit Cancel', val: 'visitcancel' },
            { lab: 'Negotiation', val: 'negotiation' },
            { lab: 'Reassign', val: 'reassign' },
            // { lab: 'RNR', val: 'RNR' },
            { lab: 'Un Assigned', val: 'unassigned' },
            // { lab: 'Booked', val: 'booked' },
            // { lab: 'Not Interested', val: 'notinterested' },
            // { lab: 'Dead', val: 'dead' },
          ]
        : leadsTyper === 'archieveLeads'
        ? archieveTab
        : financeTab
    settabHeadFieldsA(tabHeadFieldsA1)

    leadsTyper === 'inProgress'
      ? setValue('new')
      : leadsTyper === 'archieveLeads'
      ? setValue('all')
      : setValue('booked')
  }, [])

  const handleDelete = async (ids) => {
    const { data } = await axios.post('/api/tableData1/delete', {
      ids,
    })
    setTableData(data)
  }

  const filterTable = tableData.filter((item) =>
    value !== '' ? item.role.toLowerCase() === value : item.role
  )

  const archieveTab = [
    { lab: 'Archieve', val: 'all' },
    { lab: 'Dead', val: 'dead' },
    { lab: 'Not Interested', val: 'notinterested' },
    { lab: 'Blocked', val: 'blockded' },
  ]
  const financeTab = [
    { lab: 'All', val: 'all' },
    { lab: 'In Review', val: 'inReview' },
    { lab: 'Cleared', val: 'cleared' },
    { lab: 'Uncleared', val: 'uncleared' },
  ]
  return (
    <Box pb={4}>
      <div className=" w-full">
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <a
                className={`rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800`}
                onClick={() => setSearchKey(['completed', 'pending'])}
              >
                <div
                  className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                    searchKey.includes('completed') &&
                    searchKey.includes('pending')
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600'
                  }`}
                >
                  All
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
                onClick={() => setSearchKey(['completed'])}
              >
                <div
                  className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                    searchKey.includes('completed') && searchKey.length === 1
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600'
                  }`}
                >
                  <p>Done</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
                onClick={() => setSearchKey(['pending'])}
              >
                <div
                  className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                    searchKey.includes('pending') && searchKey.length === 1
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600'
                  }`}
                >
                  <p>Pending</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
                onClick={() => setSearchKey(['upcoming'])}
              >
                <div
                  className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                    searchKey.includes('upcoming') && searchKey.length === 1
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600'
                  }`}
                >
                  <p>Up Coming</p>
                </div>
              </a>
            </div>
            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
              <p className="text-sm font-medium leading-none text-white">
                Add Task
              </p>
            </button>
          </div>
          {taskListA.length === 0 && (
            <div className="py-8 px-8 mt-10 flex flex-col items-center bg-red-100 rounded">
              <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                <img
                  className="w-[180px] h-[180px] inline"
                  alt=""
                  src="../note-widget.svg"
                />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-gray-900">
                No Tasks Found
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                <span className="text-blue-600"> Add New Task</span>
              </time>
            </div>
          )}
          <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                {
                  // [
                  //   {
                  //     title: 'Marketing Keynote Presentation1',
                  //     p: 'Urgent',
                  //     date: '04/07',
                  //     due: 'Today',
                  //   },
                  // ]
                  taskListA
                    ?.filter(
                      (d) =>
                        searchKey.includes(d['sts']) ||
                        searchKey.includes('upcoming')
                    )
                    .map((dat, i) => (
                      <tr
                        tabIndex={0}
                        className="focus:outline-none h-16 border border-gray-100 rounded"
                        key={i}
                        onClick={() => {
                          console.log('macho 1', dat?.leadUser, dat)
                          const y = dat.leadUser
                          y.id = dat?.uid
                          console.log('macho 1', y)
                          selUserProfileF('User Profile', y)
                        }}
                      >
                        <td>
                          <div className="ml-5">
                            <div className="rounded-sm h-5 w-5 flex flex-shrink-0 justify-center items-center relative">
                              {/* <input
                                placeholder="checkbox"
                                type="checkbox"
                                className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
                              /> */}
                              {i + 1}
                              {/* <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                <svg
                                  className="icon icon-tabler icon-tabler-check"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path stroke="none" d="M0 0h24v24H0z"></path>
                                  <path d="M5 12l5 5l10 -10"></path>
                                </svg>
                              </div> */}
                            </div>
                          </div>
                        </td>
                        <td className=" max-w-[300px]">
                          <div className="flex items-center ">
                            <div className="flex flex-col">
                              <p className="text-base max-w-[350px] overflow-ellipsis overflow-hidden font-semibold leading-none text-blue-800 mr-2 mt-2">
                                {dat?.notes}
                              </p>
                              <div className="flex flex-row">
                                <p className="text-[11px]  leading-none  pr-2 text-green-800  mt-1  py-[4px]  rounded-full  text-2xl  mb-1 mr-2  ">
                                  {dat?.leadUser?.Project}
                                </p>
                                <p className="text-[11px]  leading-none text-red-800  mt-1  py-[4px]  rounded-full  text-2xl  mb-1 mr-2  ">
                                  {dat?.pri}
                                </p>
                              </div>
                            </div>
                            {/*
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                              stroke="#3B82F6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                              stroke="#3B82F6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg> */}
                          </div>
                        </td>
                        <td className="pl-24">
                          {/* <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <circle
                              cx="7.50004"
                              cy="7.49967"
                              r="1.66667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></circle>
                          </svg>
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            {dat?.pri}
                          </p>
                        </div> */}
                        </td>
                        <td className="pl-5">
                          <div className="flex flex-col">
                            <p className="text-[12px] leading-none text-gray-600 ml-2 mt-2">
                              {formatToPhone(dat?.leadUser?.Mobile)}
                            </p>
                            <p className="text-[11px] leading-none text-gray-600 ml-2 mt-2">
                              {dat?.leadUser?.Name}
                            </p>
                            {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M7.5 5H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M7.5 10H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M7.5 15H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 5V5.00667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 10V10.0067"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 15V15.0067"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg> */}
                            <p className="text-sm leading-none text-gray-600 ml-2">
                              {/* {prettyDateTime(dat['schTime'])} */}
                            </p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex flex-row">
                            {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M7.5 5H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M7.5 10H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M7.5 15H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 5V5.00667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 10V10.0067"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 15V15.0067"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg> */}

                            <button className="py-3 px-3 text-[13px] focus:outline-none leading-none text-red-700 rounded">
                              {Math.abs(
                                getDifferenceInMinutes(dat['schTime'], '')
                              ) > 60
                                ? Math.abs(
                                    getDifferenceInMinutes(dat['schTime'], '')
                                  ) > 1440
                                  ? `${getDifferenceInDays(
                                      dat['schTime'],
                                      ''
                                    )} Days `
                                  : `${getDifferenceInHours(
                                      dat['schTime'],
                                      ''
                                    )} Hours `
                                : `${getDifferenceInMinutes(
                                    dat['schTime'],
                                    ''
                                  )} Min`}
                              {getDifferenceInMinutes(dat['schTime'], '') < 0
                                ? 'Due'
                                : 'Left'}
                              <p className="text-[11px] leading-none text-gray-600 ml-2 mt-2">
                                {prettyDateTime(dat['schTime'])}
                              </p>
                            </button>
                          </div>
                        </td>
                        <td className="pl-4">
                          {/* <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                          View
                        </button> */}
                          <span className="ml-4 px-4 py-[4px] inline-flex text-xs leading-5 font-semibold rounded-full  text-green-800">
                            {dat?.sts}
                          </span>
                        </td>
                        {/* <td>
                        <div className="relative px-1">
                          <button
                            className="focus:ring-2 rounded-md focus:outline-none"
                            role="button"
                            aria-label="option"
                          >
                            <ArrowNarrowRightIcon className="w-4 h-4 inline text-[#058527]" />

                          </button>
                          <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                            <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Edit</p>
                            </div>
                            <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Delete</p>
                            </div>
                          </div>
                        </div>
                      </td> */}
                      </tr>
                    ))
                }

                <tr className="h-3"></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <script src="./index.js"></script>
        <style>.checkbox:checked + .check-icon {
  display: flex;
}
</style>
        <script>function dropdownFunction(element) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                let list = element.parentElement.parentElement.getElementsByClassName("dropdown-content")[0];
                list.classList.add("target");
                for (i = 0; i < dropdowns.length; i++) {
                    if (!dropdowns[i].classList.contains("target")) {
                        dropdowns[i].classList.add("hidden");
                    }
                }
                list.classList.toggle("hidden");
            }</script> */}

      {/* <Card
        sx={{
          boxShadow: 4,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">

              <ul
                className="flex flex-wrap -mb-px "
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                {tabHeadFieldsA.map((d, i) => {
                  return (
                    <li key={i} className="mr-2" role="presentation">
                      <button
                        className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2  hover:text-gray-600 hover:border-blue-600 dark:text-gray-400 dark:hover:text-gray-300  ${
                          value === d.val
                            ? 'border-blue-600 text-gray-800'
                            : 'border-transparent'
                        }`}
                        type="button"
                        role="tab"
                        onClick={() => setValue(d.val)}
                      >
                        {`${d.lab} `}
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {rowsCounter(leadsFetchedData, d.val).length}
                        </span>

                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

          </Grid>
        </Grid>
      </Card> */}
    </Box>
  )
}

export default TodoListView

// {todaySch && schFetData.length > 0 && (
//   <TodoListView
//     taskListA={schFetCleanData}
//     setisImportLeadsOpen={undefined}
//     selUserProfileF={undefined}
//     leadsFetchedData={undefined}
//     leadsTyper={undefined}
//   />
// )}
// const [schFetCleanData, setSchFetCleanData] = React.useState([])
// React.useEffect(() => {
//   if (todaySch) {
//     console.log('my value is ', todaySch)
//     const streamedTodo = []
//     setSchFetData(todaySch)
//     const z = todaySch.map((data1) => {
//       data1['staDA'].map((data2) => {
//         const y = data1[data2]
//         y.uid = data1.uid
//         y.leadUser = data1.leadUser
//         streamedTodo.push(y)
//         console.log('my value is 1', y)
//         return y
//       })
//     })
//     setSchFetCleanData(streamedTodo)
//     console.log('my value is 1', z, streamedTodo)
//   } else {
//     console.log('my value is ', todaySch)
//   }
// }, [todaySch])
