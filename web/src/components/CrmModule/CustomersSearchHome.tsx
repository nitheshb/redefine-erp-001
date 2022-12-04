/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import { useState, useEffect } from 'react'

import { Link } from '@redwoodjs/router'

import DropCompUnitStatus from 'src/components/dropDownUnitStatus'
import DummyBodyLayout from 'src/components/DummyBodyLayout/DummyBodyLayout'
import SiderForm from 'src/components/SiderForm/SiderForm'
import { getAllProjects } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import 'flowbite'
import DropDownSearchBar from 'src/components/dropDownSearchBar'

import { PlusIcon } from '@heroicons/react/outline'
const CustomersSearchHome = ({ project }) => {
  const { projectName } = project
  const { user } = useAuth()

  const { orgId } = user
  const [projects, setProjects] = useState([])
  const [payments, setPayments] = useState([])

  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [isDocViewOpenSideView, setIsDocViewOpenSideView] = useState(false)
  const [projectDetails, setProjectDetails] = useState({})
  const [viewDocData, setViewDocData] = useState({})

  const [filteredUnits, setFilteredUnits] = useState([])
  const [filStatus, setFilStatus] = useState(['available', 'booked', 'blocked'])

  const paymentsA = [
    {
      label: 'Demands',
      projectName: 'Demands',
      value: 'demands',
    },
    {
      label: 'Review',
      projectName: 'review',
      value: 'review',
    },
    {
      label: 'Received',
      projectName: 'received',
      value: 'received',
    },
    {
      label: 'Rejected',
      projectName: 'rejected',
      value: 'rejected',
    },
  ]
  const registerA = [
    {
      label: 'Booking',
      projectName: 'Booking',
      value: 'booking',
    },
    {
      label: 'Agreement',
      projectName: 'Agreement',
      value: 'agreement',
    },
    {
      label: 'Registered',
      projectName: 'registered',
      value: 'registered',
    },
    {
      label: 'Rejected',
      projectName: 'rejected',
      value: 'rejected',
    },
  ]

  useEffect(() => {
    getProjects()
  }, [])
  const getProjects = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        projects.map((user) => {
          user.label = user?.projectName
          user.value = user?.uid
        })
        setProjects([...projects])
        console.log('project are ', projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }
  const selProjctFun = (project) => {
    setIsOpenSideView(!isOpenSideView)
    setProjectDetails(project)
  }

  const dispDoc = (docData) => {
    setViewDocData(docData)
    setIsDocViewOpenSideView(!isDocViewOpenSideView)
  }

  return (
    <div>
      <section className=" mt-2 mr-2 py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg  ">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          {/* <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0   mb-2">
              <Link
                className="flex items-center"
                // to={routes.projectEdit({ uid })}
              >
                <span className="relative z-10 flex items-center w-auto text-3xl font-bold leading-none pl-0 mt-[18px]">
                  Documents
                </span>
              </Link>
            </div>
          </div> */}

          <div className=" mt-6">
            <form className="">
              <div className="flex">
                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder={` Search Unit No, Customer name, Phone no, Dues, Review...`}
                    required
                  />
                  <section className="absolute top-0 right-0  flex flex-row">
                    <DropDownSearchBar
                      type={'All Projects'}
                      id={'id'}
                      setStatusFun={{}}
                      viewUnitStatusA={filteredUnits}
                      pickCustomViewer={selProjctFun}
                      selProjectIs={projectDetails}
                      dropDownItemsA={projects}
                    />
                    <DropDownSearchBar
                      type={'All Registration'}
                      id={'id'}
                      setStatusFun={{}}
                      viewUnitStatusA={filteredUnits}
                      pickCustomViewer={selProjctFun}
                      selProjectIs={projectDetails}
                      dropDownItemsA={registerA}
                    />
                    <DropDownSearchBar
                      type={'All Payments'}
                      id={'id'}
                      setStatusFun={{}}
                      viewUnitStatusA={filteredUnits}
                      pickCustomViewer={selProjctFun}
                      selProjectIs={projectDetails}
                      dropDownItemsA={paymentsA}
                    />
                    <button
                      type="submit"
                      className="p-2.5 px-8 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </section>
                </div>
              </div>
            </form>
          </div>

          <section className="grid justify-center md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7 my-10 ">
            <div
              className="cursor-pointer  z-10 flex flex-col  max-w-md p-2 my-0  mx-4 rounded-sm inline-block  min-h-[50px]  min-w-[100px] border border-dotted border-black rounded-md"
              onClick={() => {
                setSliderInfo({
                  open: true,
                  title: ['Apartments'].includes(
                    projectDetails?.projectType?.name
                  )
                    ? 'Import Units'
                    : 'Import Project Units',
                  sliderData: {
                    phase: {},
                    block: {},
                  },
                  widthClass: 'max-w-6xl',
                })
              }}
            >
              <div
                className="flex flex-col items-center justify-between"
                onClick={() => setIsOpenSideView(!isOpenSideView)}
              >
                <PlusIcon className="h-8 w-8 mr-1 mt-14" aria-hidden="true" />
                <h3 className="m-0  text-sm  mt-1 font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 text-xl ">
                  Upload Document
                </h3>
              </div>
              <div className="flex flex-row justify-between px-2">
                <span className="flex flex-row items-center justify-between mr-2">
                  <span className="text-sm font-"></span>
                </span>
              </div>
            </div>
            {projects.length > 0 ? (
              projects.map((project, i) => (
                // <span key={i}>{project?.projectName}</span>
                <>
                  <div
                    key={i}
                    className=" cursor-pointer relative max-w-md mx-auto md:max-w-2xl  min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl  mr-8 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl bg-white bg-opacity-50 shadow-xl bg-gradient-to-br from-green-50 to-cyan-100"
                    onClick={() => dispDoc(project)}
                  >
                    <div className="px-4 py-2 mb-4 flex flex-col">
                      <span>#103459</span>

                      <h3 className="text-lg text-slate-700 font-bold  leading-normal mb-1 mt-">
                        {project?.projectName}
                      </h3>
                      <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                        Nithesh B 31/11/2022
                      </div>
                      <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                        Sale Agreement
                      </div>

                      {/* <div className="text-center mt-2 mb-4">
                        <div className="flex justify-center lg:pt-2 pt-2 pb-0">
                          <div className="p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                              3,360
                            </span>
                            <span className="text-sm text-slate-400">
                              Phases
                            </span>
                          </div>
                          <div className="p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                              2,454
                            </span>
                            <span className="text-sm text-slate-400">
                              Available Units
                            </span>
                          </div>

                        </div>
                      </div> */}
                    </div>
                  </div>
                </>

                // <ProjectsMHomeBody
                //   key={project.uid}
                //   project={project}
                //   onSliderOpen={() => {
                //     // setProject(project)
                //     // setIsEditProjectOpen(true)
                //   }}
                //   isEdit={false}
                // />
              ))
            ) : (
              <></>
            )}
          </section>
          {/* <div className="grid grid-cols-1 gap-7 mt-10">
            <span>
              <div
                className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                style={{ backgroundColor: '#f3f5ff' }}
              >
                <div className="flex items-center flex-row px-0  pl-0 mb-2 ">
                  <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 ">
                    {'Payslips'}
                  </div>
                </div>

                <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                  {'This gets generated after 10 days of salary credit'}
                </div>
                <ul className="flex-1 p-0 mt-8 ml-2 mr-2  border   rounded-md leading-7 text-gray-900  border-gray-200">
                  {valueFeedData.map((data, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-between px-4 py-1 w-full mb-2  font-semibold text-left border-dotted border-b border-gray-300 "
                      >
                        <span className="inline-flex">
                          <span className="text-[16px]    text-blue-900">
                            {' '}
                            {data.k}
                          </span>
                        </span>

                        <div
                          className="relative flex flex-col items-center group"
                          style={{ alignItems: 'end' }}
                        >
                          <div
                            className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex"
                            style={{ alignItems: 'end', width: '300px' }}
                          >
                            <span
                              className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                              style={{
                                color: 'black',
                                background: '#e2c062',
                                maxWidth: '300px',
                              }}
                            ></span>
                            <div
                              className="w-3 h-3  -mt-2 rotate-45 bg-black"
                              style={{
                                background: '#e2c062',
                                marginRight: '12px',
                              }}
                            ></div>
                          </div>
                          <span className="text-[16px] font-medium text-gray-900">
                            <DownloadIcon
                              className="h-5 w-5 mr-1 mt-1"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </span>
          </div> */}
        </div>
      </section>
      <SiderForm
        open={isOpenSideView}
        setOpen={setIsOpenSideView}
        title={'upload_legal_docs'}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-2xl"
        projectsList={projects}
      />
      <SiderForm
        open={isDocViewOpenSideView}
        setOpen={setIsDocViewOpenSideView}
        title={'unitDetails_crm_view'}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-7xl"
        projectsList={projects}
        viewLegalDocData={viewDocData}
      />
    </div>
  )
}

export default CustomersSearchHome
