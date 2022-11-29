import { useState, useEffect } from 'react'

import { Button } from '@material-ui/core'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ClearIcon from '@mui/icons-material/Clear'
import MenuIcon from '@mui/icons-material/Menu'
import { PDFExport } from '@progress/kendo-react-pdf'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ExecutiveHomeViewerPage from 'src/components/ExecutiveHomeViewerPage'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import HeadSideBarDetailView2 from 'src/components/HeadDetailSideBar2'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import HeadSideBar from 'src/components/HeadSideBar/HeadSideBar'
import LeadsManagementHome from 'src/components/LeadsManagement'
import LeadsTeamReportBody from 'src/components/LeadsTeamReportBody'
import MyAttedanceHomeBody from 'src/components/myAttedanceHomeBody'
import MyLeadsReportHome from 'src/components/myLeadsReportHome'
import MyPayHomeBody from 'src/components/myPayHomeBody'
import ProjectsUnitInventory from 'src/components/projectUnitsInventory'
import TodayLeadsHomePage from 'src/components/TodayLeadsHomePage'
import UserAccessTable from 'src/components/UserAccessTable/UserAccessTable'
import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'
import CostBreakUpPdf from 'src/util/costBreakUpPdf'

import logo from '../../../public/logo.png'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'

const LeadsManagerPage = () => {
  const { user } = useAuth()

  const [showSideBar, setShowSideBar] = useState(false)
  const [showDetailedSideBar, setDetailedShowSideBar] = useState(false)
  const [viewable, setViewable] = useState('Today1')

  const pdfExportComponent = React.useRef(null)

  const showSideView1 = () => {
    setShowSideBar(!showSideBar)
  }
  useEffect(() => {
    if (user) {
      if (user?.role?.includes(USER_ROLES.CP_AGENT)) {
        setViewable('inProgress')
      } else {
        setViewable('Today1')
      }
    }
  }, [user])

  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        {/* {showSideBar && <HeadSideBar pgName={'leadsManager'} />}
        <HeadSideBarDetailView
          pgName={'leadsManager'}
          sourceLink={'leadsScreen'}
          showSideBar={showSideBar}
          showSideView1={showSideView1}
          setViewable={setViewable}
        /> */}

        <div className="flex flex-col flex-grow">
          <HeadNavBar />
          {}
          <div className="flex flex-row overflow-auto gap-2 h-[100vh]  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div
              className={`${
                showDetailedSideBar
                  ? 'flex flex-row overflow-auto w-[20vw]   text-gray-700 '
                  : 'flex flex-row overflow-auto   text-gray-700 '
              }`}
            >
              <HeadSideBar pgName={'leadsManager'} />
              <div className="flex items-start flex-row">
                <div>
                  <div>
                    <HeadSideBarDetailView
                      pgName={'leadsManager'}
                      sourceLink={'leadsScreen'}
                      showSideBar={showSideBar}
                      showSideView1={showSideView1}
                      setViewable={setViewable}
                      viewable={viewable}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow  items-center overflow-y-auto  px-300  py-300">
              {viewable === 'inProgress' && (
                <ExecutiveHomeViewerPage leadsTyper={'inProgress'} />
              )}
              {viewable === 'booked' && (
                <ExecutiveHomeViewerPage leadsTyper={'booked'} />
              )}
              {viewable === 'archieveLeads' && (
                <ExecutiveHomeViewerPage leadsTyper={'archieveLeads'} />
              )}
              {viewable === 'Today1' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'Upcoming' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'Today1Team' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'UpcomingTeam' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'unitsInventory' && (
                <ProjectsUnitInventory
                  project={{
                    projectName: 'Projects',
                  }}
                  isEdit={undefined}
                />
              )}

              {viewable === 'LeadsManagerHome' && <LeadsManagementHome />}
              {viewable === 'Team Lead Report' && (
                <LeadsTeamReportBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Team Leads Report',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'My Lead Report' && (
                <MyLeadsReportHome
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'My Leads Report',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'Attendance' && (
                <MyAttedanceHomeBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Attendance',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'Pay' && (
                <MyPayHomeBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Pay',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'LinkWhatsApp' && (
                <LeadsTeamReportBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Pay',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
            </div>
            {/* <div className="flex-grow mx-4  my-2 items-center overflow-y-auto  h-screen  px-300  py-300"> */}
            {/* {viewable === 'Today' && <ExecutiveHomeViewerPage />} *SS/}
            {/* {viewable === 'Today1' && <TodayLeadsHomePage />} */}
            {/* {viewable === 'LeadsManagerHome' && <LeadsManagementHome />} */}
            {/* </div> */}
            {/* <div
              flex-grow
              p-6
              overflow-auto
              h-screen
              text-gray-700
              bg-gradient-to-tr
              from-blue-200
              via-indigo-200
              to-pink-200
            >
              {viewable === 'Today' && <ExecutiveHomeViewerPage />}
              {viewable === 'Today1' && <TodayLeadsHomePage />}
              {viewable === 'LeadsManagerHome' && <LeadsManagementHome />}
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default LeadsManagerPage
