/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import { useState, useEffect } from 'react'

import { CalendarIcon, EyeIcon, DownloadIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
import ProjectStatsCard from './ProjectStatsCard/ProjectStatsCard'
import { getAllProjects } from 'src/context/dbQueryFirebase'
import DummyBodyLayout from './DummyBodyLayout/DummyBodyLayout'
import SiderForm from './SiderForm/SiderForm'
import { useAuth } from 'src/context/firebase-auth-context'

const projectFeedData = [
  { k: 'Total', v: 125, pic: '' },
  { k: 'Sold', v: 5, pic: '' },
  { k: 'Booked', v: 25, pic: '' },
  { k: 'Available', v: 85, pic: '' },
  { k: 'Hold', v: 10, pic: '' },
]
const unitFeedData = [
  { k: 'Total', v: 137500, pic: '' },
  { k: 'Sold', v: 5500, pic: '' },
  { k: 'Booked', v: 27500, pic: '' },
  { k: 'Available', v: 93500, pic: '' },
  { k: 'Hold', v: 11000, pic: '' },
]
const valueFeedData = [
  { k: 'Jan-2022', v: 4, pic: '' },
  { k: 'Feb-2022', v: 59, pic: '' },
  { k: 'Mar-2022', v: 6, pic: '' },
  { k: 'Apr-2022', v: 12, pic: '' },
]

const ProjectsUnitInventory = ({
  project,
  onSliderOpen = () => {},
  isEdit,
}) => {
  const {
    area,
    builderName,
    location,
    projectName,
    projectType,
    uid = 0,
  } = project
  const { user } = useAuth()

  const { orgId } = user
  const [projects, setProjects] = useState([])
  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [projectDetails, setProjectDetails] = useState({})
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
        setProjects(projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }
  const selProjctFun = (project) => {
    setIsOpenSideView(!isOpenSideView)
    setProjectDetails(project)
  }
  return (
    <div>
      <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg  ">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
              <Link
                className="flex items-center"
                // to={routes.projectEdit({ uid })}
              >
                <img className="w-16 h-16" alt="" src="/apart.svg"></img>
                <span className="relative z-10 flex items-center w-auto text-3xl font-bold leading-none pl-0 mt-[18px]">
                  {projectName}
                </span>
              </Link>
            </div>
          </div>

          <section className="grid justify-center md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7 my-10 ">
            {projects.length > 0 ? (
              projects.map((project, i) => (
                // <span key={i}>{project?.projectName}</span>
                <>
                  <div
                    key={i}
                    className=" cursor-pointer relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16 mr-8 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl bg-white bg-opacity-50 shadow-xl bg-gradient-to-br from-green-50 to-cyan-100"
                    onClick={() => selProjctFun(project)}
                  >
                    <div className="px-6 mb-4">
                      <div className="flex flex-wrap justify-center">
                        <div className="-mb-35 -translate-y-1/2 transform">
                          <img
                            src={
                              project?.projectType?.name === 'Apartment'
                                ? '/apart1.svg'
                                : project?.projectType?.name === 'Plots'
                                ? '/plot.svg'
                                : project?.projectType?.name === 'WeekendVillas'
                                ? '/weekend.svg'
                                : `/villa.svg`
                            }
                            alt="Kobe Bryant"
                            title="Kobe Bryant"
                            className="py-3 bg-teal-100 mx-auto my-auto w-16 h-16 shadow-xl rounded-full align-middle border-none"
                          />
                        </div>
                        <div className="w-full text-center mt-[-10px]">
                          <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1 mt-">
                            {project?.projectName}
                          </h3>
                          <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                            {project?.location},{project?.pincode}
                          </div>
                        </div>
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
              <DummyBodyLayout />
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
        title={'Project Inventory'}
        projectDetails={projectDetails}
        unitsViewMode={true}
      />
    </div>
  )
}

export default ProjectsUnitInventory
