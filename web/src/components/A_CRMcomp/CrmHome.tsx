/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Fragment, useState, useEffect } from 'react'
import LLeadsTableView from 'src/components/LLeadsTableView/LLeadsTableView'

// import { XIcon } from '@heroicons/react/outline'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { useAuth } from 'src/context/firebase-auth-context'
import { USER_ROLES } from 'src/constants/userRoles'
import {
  getAllProjects,
  updateLeadStatus,
} from 'src/context/dbQueryFirebase'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import SiderForm from '../SiderForm/SiderForm'
import CardItem from '../leadsCard'
import FinanceTableView from '../TableComp/financeTableView'
import CRMTableView from './CrmTableLayout'
import { useSnackbar } from 'notistack'

// import CustomerProfileSideView from './customerProfileSideView'
// import CardItem from '../../components/leadsCard'
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
    name: 'Followup',
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
// function createGuidId() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     const r = (Math.random() * 16) | 0,
//       v = c == 'x' ? r : (r & 0x3) | 0x8
//     return v.toString(16)
//   })
// }
const CrmHome = ({ leadsTyper }) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const isImportLeads =
    user?.role?.includes(USER_ROLES.ADMIN) ||
    user?.role?.includes(USER_ROLES.SALES_MANAGER)
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)

  // kanban board
  const [ready, setReady] = useState(false)
  const [boardData, setBoardData] = useState(BoardData)
  // const [showForm, setShowForm] = useState(false)
  // const [selectedBoard, setSelectedBoard] = useState(0)
  const [openUserProfile, setopenUserProfile] = useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = useState('')
  const [selUserProfile, setSelUserProfile] = useState({})
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [serialLeadsData, setSerialLeadsData] = useState([])
  const [projectList, setprojectList] = useState([])
  const [selProjectIs, setSelProject] = useState('all')

  const statusFields = [
    'new',
    'followup',
    'visitfixed',
    'visitdone',
    'negotiation',
    'reassign',
    'RNR',
    'booked',
  ]
  const archieveFields = ['Dead', 'RNR', 'blocked', 'notinterested']

  useEffect(() => {
    if (leadsTyper == 'archieveLeads') {
      const archieveFields1 = ['Review', 'Cleared', 'UnCleared']
      setGetStatus(archieveFields1)
    } else if (leadsTyper == 'inProgress') {
      const archieveFields2 = [
        'new',
        'followup',
        'unassigned',
        'visitfixed',
        '',
        'visitdone',
        'negotiation',
        'reassign',
        'RNR',
      ]
      setGetStatus(archieveFields2)
    }
  }, [leadsTyper])

  useEffect(() => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )

        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        console.log('fetched users list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setprojectList([])
    )

    return unsubscribe
  }, [])
  const [getStatus, setGetStatus] = useState([])

  const serealizeData = (array) => {
    // let newData =
    const x = statusFields.map((status) => {
      const items = array.filter((data) => data.Status.toLowerCase() == status)

      return { name: status, items }
    })
    setSerialLeadsData(x)
  }
  const onDragEnd = (re) => {
    console.log('re is', re)
    if (!re.destination) return
    const newBoardData = serialLeadsData
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

    // updateLeadStatus(
    //   orgId,
    //   re.draggableId,
    //   statusFields[parseInt(re.destination.droppableId)],
    //   enqueueSnackbar
    // )
    setBoardData(newBoardData)
  }

  // const onTextAreaKeyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     //Enter
  //     const val = e.target.value
  //     if (val.length === 0) {
  //       setShowForm(false)
  //     } else {
  //       const boardId = e.target.attributes['data-id'].value
  //       const item = {
  //         id: createGuidId(),
  //         title: val,
  //         priority: 0,
  //         chat: 0,
  //         attachment: 0,
  //         assignees: [],
  //       }
  //       const newBoardData = boardData
  //       newBoardData[boardId].items.push(item)
  //       setBoardData(newBoardData)
  //       setShowForm(false)
  //       e.target.value = ''
  //     }
  //   }
  // }

  const fSetLeadsType = (type) => {
    setAddLeadsTypes(type)
    setisImportLeadsOpen(true)
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
            p-6"
          >
            <div className="flex items-center justify-between py ">
              <div className="flex">
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

            {ready && (
              <div className="flex flex-row ">
                <main className="mt-3 flex flex-row overflow-auto max-h-[60%] rounded ">
                  <div className="flex">
                    <DragDropContext onDragEnd={onDragEnd}>
                      {serialLeadsData.map((board, bIndex) => {
                        const x = leadsFetchedData.filter(
                          (data) =>
                            data.Status.toLowerCase() ===
                            board.name.toLowerCase()
                        )
                        console.log('serialLeadsData, ', serialLeadsData)
                        return (
                          <div
                            key={bIndex}
                            className=" border-[1px]  border-gray-200  bg-[#F5F8FA] w-56"
                          >
                            <Droppable droppableId={bIndex.toString()}>
                              {(provided, snapshot) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className={`flex-shrink-0  min-w-150 bg-[#F5F8FA] rounded-md  h-screen ${
                                    snapshot.isDraggingOver && 'bg-green-100'
                                  }`}
                                >
                                  <div className="flex border-b p-3 ">
                                    <span className="text-sm  mb-1  ml-1 font-medium text-gray-900">
                                      {board.name}
                                    </span>
                                    <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                                      {/* {x.length} */}
                                      {board.items.length}
                                    </span>
                                  </div>
                                  <div>
                                    {board.items.length > 0 &&
                                      board.items.map((item, iIndex) => {
                                        return (
                                          <div
                                            key={item.id}
                                            className="mt-2 ml-2.5 "
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
                {/* <CustomerProfileSideView openUserProfile={openUserProfile} /> */}
              </div>
            )}

            {!ready && (
              <CRMTableView
                leadsFetchedData={leadsFetchedData}
                setisImportLeadsOpen={setisImportLeadsOpen}
                selUserProfileF={selUserProfileF}
                leadsTyper={leadsTyper}
              />
            )}
          </div>
        </div>
      </div>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={addLeadsTypes}
        customerDetails={selUserProfile}
      />
    </>
  )
}

export default CrmHome
