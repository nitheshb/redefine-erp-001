/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Fragment, useState, useEffect } from 'react'

import { XIcon } from '@heroicons/react/outline'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { MetaTags } from '@redwoodjs/web'

import LLeadsTableView from 'src/components/LLeadsTableView/LLeadsTableView'

import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'
import HeadSideBar from '../../components/HeadSideBar/HeadSideBar'
import CardItem from '../../components/leadsCard'
import SiderForm from '../../components/SiderForm/SiderForm'

// import BoardData from '../../components/board-data.json'
const BoardData = [
  {
    name: 'New',
    items: [
      {
        id: 1,
        priority: 2,
        title: 'Chiranjeevi',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 1,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 2,
        priority: 1,
        title: 'Pawan Kalyan',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 10,
        attachment: 4,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/67.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'In Progress',
    items: [
      {
        id: 3,
        priority: 2,
        title: 'Venkatesh',
        mobile: 9000000001,
        project: 'Nakshatra Township',
        chat: 0,
        attachment: 3,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/79.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Follow Up',
    items: [
      {
        id: 4,
        priority: 1,
        title: 'Raana',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 0,
        attachment: 3,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/79.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Visit Fixed',
    items: [
      {
        id: 5,
        priority: 1,
        title: 'Bala Krishna',
        mobile: 9000000001,
        project: 'Esparnza',
        chat: 0,
        attachment: 3,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/79.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Visit Done',
    items: [
      {
        id: 6,
        priority: 2,
        title: 'Mahesh Babu',
        mobile: 9000000001,
        project: 'Nakshatra Township',
        chat: 13,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 7,
        priority: 0,
        title: 'Shoban Babu',
        mobile: 9000000001,
        project: 'Projech High',
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/68.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Negotiation',
    items: [
      {
        id: 8,
        priority: 0,
        title: 'NTR',
        mobile: 9000000001,
        project: 'Project High',
        chat: 13,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 9,
        priority: 1,
        title: 'Nagrjuna',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/68.jpg',
          },
        ],
      },
      {
        id: 10,
        priority: 2,
        title: 'Ram Charan',
        mobile: 9000000001,
        project: 'Nakshatra Township',
        chat: 5,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/64.jpg',
          },
        ],
      },
    ],
  },
]
function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
const ExecutiveHomePage = () => {
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)
  // const [selUserProfileF, setSelUserProfileF] = useState({})

  // kanban board
  const [ready, setReady] = useState(true)
  const [boardData, setBoardData] = useState(BoardData)
  const [showForm, setShowForm] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState(0)
  const [openUserProfile, setopenUserProfile] = useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = useState('')
  useEffect(() => {
    // if (process.browser) {
    setReady(true)
    // }
  }, [])

  const selUserProfileF = (data, check) => {
    console.log('sel user profile', data, check)
  }
  const onDragEnd = (re) => {
    if (!re.destination) return
    const newBoardData = boardData
    const dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index]
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    )
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    )
    setBoardData(newBoardData)
  }

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value
      if (val.length === 0) {
        setShowForm(false)
      } else {
        const boardId = e.target.attributes['data-id'].value
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        }
        const newBoardData = boardData
        newBoardData[boardId].items.push(item)
        setBoardData(newBoardData)
        setShowForm(false)
        e.target.value = ''
      }
    }
  }

  const fSetLeadsType = (type) => {
    setAddLeadsTypes(type)
    setisImportLeadsOpen(true)
  }
  return (
    <>
      <div className="flex  flex-row  text-gray-700">
        <HeadSideBar pgName={'executiveHome'} />
        <div className="flex-1 overflow-auto">
          <HeadNavBar />

          <div className="flex-grow p-6 overflow-auto h-screen text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex items-center justify-between py-2 ">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 leading-light">
                  Leads Space
                </h2>
              </div>
              <div className="flex">
                <span className="inline-flex p-1 border bg-gray-200 rounded-md">
                  {/* ${
                    ready ? 'bg-white shadow' : ''
                  } */}
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
                <button
                  onClick={() => fSetLeadsType('Add Lead')}
                  className={`flex items-center ml-5 pl-2 pr-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>

                  <span className="ml-1">Add Lead</span>
                </button>

                <button
                  onClick={() => fSetLeadsType('Import Leads')}
                  className={`flex items-center ml-5 pl-2 pr-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>

                  <span className="ml-1">Import Leads</span>
                </button>
              </div>
            </div>

            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />

            {ready && (
              <div className="flex flex-row ">
                <main className="mt-3 flex flex-row overflow-auto ">
                  <div className="flex">
                    <DragDropContext onDragEnd={onDragEnd}>
                      {boardData.map((board, bIndex) => {
                        return (
                          <div key={bIndex} className=" m-1 rounded-md">
                            <Droppable droppableId={bIndex.toString()}>
                              {(provided, snapshot) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className={`flex-shrink-0 p-3 w-50 bg-gray-100 rounded-md ${
                                    snapshot.isDraggingOver && 'bg-green-100'
                                  }`}
                                >
                                  <div className="flex">
                                    <span className="text-sm  mb-4  ml-1 font-medium text-gray-900">
                                      {board.name}
                                    </span>
                                    <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                                      {board.items.length}
                                    </span>
                                  </div>
                                  <div>
                                    {board.items.length > 0 &&
                                      board.items.map((item, iIndex) => {
                                        return (
                                          <div
                                            key={item.id}
                                            className="mt-2 "
                                            onClick={() => {
                                              setopenUserProfile(
                                                !openUserProfile
                                              )
                                              console.log('iam clicked1', item)
                                            }}
                                          >
                                            <CardItem
                                              key={item.id}
                                              data={item}
                                              index={iIndex}
                                              onClick={() => {
                                                console.log(
                                                  'iam clicked1',
                                                  item
                                                )
                                              }}
                                            />
                                          </div>
                                        )
                                      })}
                                    {provided.placeholder}
                                    {console.log('dragDatga is', board)}
                                  </div>
                                </div>
                              )}
                            </Droppable>
                          </div>
                        )
                      })}
                    </DragDropContext>
                  </div>
                </main>

                <div
                  className={`ml-5 mt-4   bg-white w-800 min-w-[300px] max-w-[20%] rounded shadow  ${
                    openUserProfile ? 'hidden' : ''
                  }`}
                >
                  <div className="border-b">
                    <div className="p-3 flex justify-between">
                      <span className="text-md font-semibold">
                        User Profile
                      </span>
                      <XIcon className="w-5 h-5 mt-[2px]" />
                    </div>
                  </div>
                  <div className="py-3 px-3">
                    <div className="px-3  font-md font-medium text-sm mt-3 mb-2 text-gray-800">
                      Customer Details
                    </div>
                    <div className="p-3 flex justify-between">
                      <section>
                        <div className="font-md text-xs text-gray-500 mb-[2]">
                          Name
                        </div>
                        <div className="font-semibold text-sm text-slate-900">
                          Chiranjeevi
                        </div>
                      </section>

                      <span
                        className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                        `}
                      >
                        Esparanza
                      </span>
                    </div>
                    <div className="border-b mb-2">
                      <div className="px-3 mb-4 flex justify-between">
                        <section>
                          <div className="font-md text-xs text-gray-500">
                            Phone
                          </div>
                          <div className="font-lg text-md">900-000-0001</div>

                          <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                            Email
                          </div>
                          <div className="font-lg text-sm text-slate-900">
                            chiranjeevi@gmail.com
                          </div>
                        </section>
                      </div>
                    </div>
                    <div className="border-b mt-3">
                      <div className="py-2 px-1">
                        <div className="px-3  font-md font-medium text-sm mb-3  text-gray-800">
                          Assinger Details
                        </div>
                        <div className="px-3  flex justify-between">
                          <section>
                            <div className="font-md text-xs text-gray-500 mb-[2]">
                              Assigned To
                            </div>
                            <div className="font-lg text-sm text-slate-900">
                              Amitabh Exe
                            </div>
                          </section>
                        </div>

                        <div className="px-3 py-1 mb-3 flex justify-between">
                          <div>
                            <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                              Assigned On
                            </div>
                            <div className="font-lg text-sm text-slate-900">
                              26 July
                            </div>
                          </div>
                          <div>
                            <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                              Last Activity
                            </div>
                            <div className="font-lg text-sm text-slate-900">
                              3 days ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b">
                      <div className="py-6 px-4 ">
                        {/* <div className="font-md font-medium text-xs  text-gray-800">
                            Notes
                          </div> */}
                        <div className=" font-md font-medium text-sm   text-gray-800">
                          Notes
                        </div>
                        <div className="max-h-32 h-32 overflow-y-auto">
                          <div className="font-lg text-xs mt-3">
                            * Interested in 2 bhk apartment.
                          </div>
                          <div className="font-lg text-xs mt-3">
                            * Call him at 10.00 pm tomorrow
                          </div>
                          <div className="font-lg text-xs mt-3">
                            * Interested in 2 bhk apartment.
                          </div>
                          <div className="font-lg text-xs mt-3">
                            * Call him at 10.00 pm tomorrow
                          </div>
                          <div className="font-lg text-xs mt-3">
                            * Interested in 2 bhk apartment.
                          </div>
                          <div className="font-lg text-xs mt-3">
                            * Call him at 10.00 pm tomorrow
                          </div>
                          <div className="font-lg text-xs mt-3">
                            * Interested in 2 bhk apartment.
                          </div>
                          <div className="font-lg text-xs mt-3">
                            * Call him at 10.00 pm tomorrow
                          </div>
                          <div className="font-lg text-xs mt-3">
                            * Interested in 2 bhk apartment.
                          </div>
                          <div className="font-lg text-xs mt-3">
                            * Call him at 10.00 pm tomorrow
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-8 px-8 ">
                      <div className="font-md font-medium text-xs mb-4 text-gray-800">
                        Timelinessss
                      </div>
                      <ol className="relative border-l border-gray-200 dark:border-gray-700">
                        <li className="mb-10 ml-6">
                          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <svg
                              className="w-3 h-3 text-blue-600 dark:text-blue-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                          <h3 className="flex items-center mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                            Lead Assigned{' '}
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                              Latest
                            </span>
                          </h3>
                          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            Released on January 13th, 2022
                          </time>

                          {/* <a
                            href="#"
                            className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            <svg
                              className="mr-2 w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                                clipRule="evenodd"
                              ></path>
                            </svg>{' '}
                            Download ZIP
                          </a> */}
                        </li>
                        <li className="mb-10 ml-6">
                          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-blue-600 dark:text-blue-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </span>
                          <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                            Call Placed
                          </h3>
                          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            Released on December 7th, 2021
                          </time>
                        </li>
                        <li className="mb-10 ml-6">
                          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <svg
                              className="w-3 h-3 text-blue-600 dark:text-blue-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                          <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                            Call Rescheduled
                          </h3>
                          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            Released on December 2nd, 2021
                          </time>
                        </li>
                        <li className="mb-10 ml-6">
                          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                            <svg
                              className="w-3 h-3 text-blue-600 dark:text-blue-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                          <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                            Visit Fixed
                          </h3>
                          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            Released on December 2nd, 2021
                          </time>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!ready && (
              <LLeadsTableView
                setisImportLeadsOpen={setisImportLeadsOpen}
                fSetLeadsType={fSetLeadsType}
                selUserProfileF={selUserProfileF}
                // setSelUserProfileF={setSelUserProfileF}
              />
            )}
          </div>
        </div>
      </div>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={addLeadsTypes}
        customerDetails={customerDetails}
        widthClass="max-w-4xl"
      />
    </>
  )
}

export default ExecutiveHomePage
