/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'

import { getLeadsByStatus } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import SiderForm from './SiderForm/SiderForm'
// import CardItem from '../../components/leadsCard'
// import BoardData from '../../components/board-data.json'

const LeadsManagementHome = () => {
  const { user } = useAuth()
  const { orgId } = user
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)
  const [value, setValue] = useState('new')
  const [tableData, setTableData] = useState([])
  const [leadsFetchedData, setLeadsFetchedData] = useState([])

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setRows] = useState([])
  const [searchKey, setSearchKey] = useState('')

  // kanban board
  const [ready, setReady] = useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = useState('')

  const selUserProfileF = (title) => {
    setAddLeadsTypes(title)
    setisImportLeadsOpen(true)
  }
  // useEffect(() => {
  //   console.log('table data is ', tableData2)
  //   setTableData(tableData2)
  // }, [])

  useEffect(() => {
    getLeadsDataFun()
  }, [])
  const getLeadsDataFun = async () => {
    const unsubscribe = getLeadsByStatus(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        console.log('fetched details are', usersListA.length)
        setLeadsFetchedData(usersListA)
      },
      {
        status: ['unassigned'],
        isCp: user?.role?.includes(USER_ROLES.CP_AGENT),
      },
      (error) => setLeadsFetchedData([])
    )
    return unsubscribe
  }

  useEffect(() => {
    console.log('search on is', searchKey)
    filterSearchString(rows)
  }, [searchKey])
  const filterStuff = async (parent) => {
    const x = await parent.filter((item) => {
      if (selStatus === 'all') {
        return item
      } else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
        console.log('All1', item)
        return item
      }
    })
    await setRows(x)
    await console.log('xo', x, parent, selStatus)
  }
  const filterSearchString = async (parent) => {
    return
    const x = await parent.filter((item) => {
      if (item.Source.toLowerCase().includes(selStatus.toLowerCase())) {
        return item
      }
      //  else if (item.Status.toLowerCase() === selStatus.toLowerCase()) {
      //   console.log('All1', item)
      //   return item
      // } else if (item.Source.toLowerCase().includes(selStatus.toLowerCase())) {
      //   return item
      // }
    })
    await setRows(x)
    await console.log('xo', x)
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  const fSetLeadsType = (type) => {
    setAddLeadsTypes(type)
    setisImportLeadsOpen(true)
  }
  return (
    <>
      <div className="flex  flex-row  text-gray-700">
        <div className="flex-1 overflow-auto">
          <div className="p-6 ">
            <div className="flex items-center justify-between py-2 ">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 leading-light">
                  Leads Management
                </h2>
              </div>
              <div className="flex">
                <>
                  <span className="text-blue-600 pt-2"> Team Status</span>

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

                    <span className="ml-1">Add lead</span>
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
                </>
              </div>
            </div>

            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />
            {/* {!ready && (
              <TodayLeadsActivityListHomeView
                setisImportLeadsOpen={setisImportLeadsOpen}
                selUserProfileF={selUserProfileF}
              />
            )} */}
            {leadsFetchedData.length === 0 && (
              <div className="py-8 px-8 mt-10 flex flex-col items-center bg-red-100 rounded">
                <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                  <img
                    className="w-[180px] h-[180px] inline"
                    alt=""
                    src="/note-widget.svg"
                  />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  No Unassigned Leads Found
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  <span className="text-blue-600"> Add New Lead</span>
                </time>
              </div>
            )}
            <div>
              {/* <Header /> */}
              <div className="flex justify-center items-center text-gray-900 h-12"></div>
              <div className=" p-16 justify-center items-center text-gray-900">
                {/* { listings.map(listing => <JobCard listing={listing} key={listing.id} filtering={filterListings} />) } */}
                {/* <EnhancedTableToolbar
                  numSelected={selected.length}
                  selStatus={selStatus}
                  filteredData={rows}
                  searchKey={searchKey}
                  setSearchKey={setSearchKey}
                  rows={rows}
                /> */}
                {leadsFetchedData
                  .filter((item) => {
                    if (searchKey == '' || !searchKey) {
                      return item
                    } else if (
                      item.Email.toLowerCase().includes(
                        searchKey.toLowerCase()
                      ) ||
                      item.Mobile.toLowerCase().includes(
                        searchKey.toLowerCase()
                      ) ||
                      item.Name.toLowerCase().includes(
                        searchKey.toLowerCase()
                      ) ||
                      item.Project.toLowerCase().includes(
                        searchKey.toLowerCase()
                      ) ||
                      item.Source.toLowerCase().includes(
                        searchKey.toLowerCase()
                      ) ||
                      item.Status.toLowerCase().includes(
                        searchKey.toLowerCase()
                      )
                    ) {
                      return item
                    }
                  })
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .map((listing, index) => {
                    // const isItemSelected = isSelected(listing.Name)
                    // const labelId = `enhanced-table-checkbox-${index}`
                    return (
                      <>
                        <div
                          key={index}
                          className="flex-1 px-4 py-2 mb-8  bg-white rounded-md"
                        >
                          <div className="flex flex-grow">
                            {listing.Status == 'new' ? (
                              <p className="tags new-tag rounded-xl p-1 mr-1 px-0 ">
                                New 1
                              </p>
                            ) : null}
                            <p className="ml-2 flex justify-center items-center">
                              {listing.Project}
                            </p>
                            {listing.featured ? (
                              <p className="tags new-tag rounded-xl px-2 p-1">
                                featured
                              </p>
                            ) : null}
                          </div>
                          <p className="main-heading my-2">{listing.Name}</p>
                          <p className="main-heading my-2">{listing.Mobile}</p>
                          <p className="main-heading my-2">{listing.Email}</p>
                          <div className="flex items-center justify-between py-2">
                            <small className="text-gray-400">
                              {listing.Date}
                            </small>
                            <small className="text-gray-400">
                              {listing.Source}
                            </small>
                          </div>
                        </div>
                      </>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={addLeadsTypes}
        widthClass="max-w-4xl"

        // customerDetails={selUserProfile}
      />
    </>
  )
}

export default LeadsManagementHome
