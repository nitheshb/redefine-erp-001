
import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import ClearIcon from '@mui/icons-material/Clear'
import MenuIcon from '@mui/icons-material/Menu'
import { PDFExport } from '@progress/kendo-react-pdf'

import { Link, routes } from '@redwoodjs/router'

import { MetaTags } from '@redwoodjs/web'

import ExecutiveHomeViewerPage from 'src/components/ExecutiveHomeViewerPage'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import HeadSideBarDetailView2 from 'src/components/HeadDetailSideBar2'
import HeadSideBar from 'src/components/HeadSideBar/HeadSideBar'
import LeadsManagementHome from 'src/components/LeadsManagement'
import LeadsTeamReportBody from 'src/components/LeadsTeamReportBody'
import MyAttedanceHomeBody from 'src/components/myAttedanceHomeBody'
import MyLeadsReportHome from 'src/components/myLeadsReportHome'
import MyPayHomeBody from 'src/components/myPayHomeBody'
import ProjectsUnitInventory from 'src/components/projectUnitsInventory'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import { useAuth } from 'src/context/firebase-auth-context'
import { USER_ROLES } from 'src/constants/userRoles'

import TodayLeadsHomePage from 'src/components/TodayLeadsHomePage'
import UserAccessTable from 'src/components/UserAccessTable/UserAccessTable'

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
          <div className="flex flex-row overflow-auto  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            {showSideBar && <HeadSideBar pgName={'leadsManager'} />}
            <div className="relative">
              {showDetailedSideBar ? (
                <button
                  className="absolute ml-4"
                  onClick={() => {
                    setDetailedShowSideBar(!showDetailedSideBar)
                  }}
                >
                  <ClearIcon />
                </button>
              ) : (
                <button
                  className="absolute ml-2"
                  onClick={() => {
                    setDetailedShowSideBar(!showDetailedSideBar)
                  }}
                >
                  <MenuIcon />
                </button>
              )}
              {showDetailedSideBar ? (
                <HeadSideBarDetailView2
                  pgName={'leadsManager'}
                  sourceLink={'leadsScreen'}
                  showSideBar={showSideBar}
                  showSideView1={showSideView1}
                  setViewable={setViewable}
                  viewable={viewable}
                />
              ) : (
                ''
              )}
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
              <div>
                <div className="example-config flex flex-row justify-center w-full ">
                  <button
                    className="k-button delay-500  bg-blue-400 hover:bg-blue-600 w-40 h-10 rounded-lg k-button-md k-rounded-md k-button-solid k-button-solid-base"
                    onClick={() => {
                      if (pdfExportComponent.current) {
                        pdfExportComponent.current.save()
                      }
                    }}
                  >
                    Export PDF
                  </button>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: '-1000px',
                    top: 0,
                  }}
                >
                  <PDFExport
                    paperSize="A4"
                    margin="1cm"
                    ref={pdfExportComponent}
                  >
                    <div
                      style={{
                        width: '500px',
                      }}
                    >
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col justify-between">
                          <div className="text-3xl text-gray-700 ">
                            <img src={logo} alt="" className="w-40" />
                          </div>
                          <div className="grid grid-cols-2 ">
                            <h1 className="text-[12px] ">Redefine ERP.</h1>
                            <h1 className="text-[12px] ">+91 9874326789</h1>
                            <h1 className="text-[12px] ">123 Street</h1>
                            <h1 className="text-[12px] ">nithesh@gmial.com</h1>
                            <h1 className="text-[12px] ">City/state,country</h1>
                            <h1 className="text-[12px] ">nithesh@gmial.com</h1>
                            <h1 className="text-[12px] ">603202</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className=" pt-1 text-[18px] font-bold text-gray-700">
                            Invoice
                          </h1>
                          <table className="w3-table">
                            <tr>
                              <td className="text-[12px]">Date:</td>
                              <td className=" text-[12px] bg-slate-400 w-40">
                                23/09/2022
                              </td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Invoice #:</td>
                              <td className=" text-[12px] bg-slate-400 w-40">
                                0001
                              </td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Customer ID:</td>
                              <td className=" text-[12px] bg-slate-400 w-40">
                                customer - 1
                              </td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Purchase order #:</td>
                              <td className=" text-[12px] bg-slate-400 w-40">
                                00001
                              </td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Payment Due by:</td>
                              <td className=" text-[12px] bg-slate-400 w-40">
                                30/09/2022
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      {/* billerd ares  */}
                      <div className="flex flex-row justify-between my-4">
                        <div>
                          <h1 className=" text-[12px] px-2 text-white bg-slate-400 w-40">
                            Billed to
                          </h1>
                          <h1 className="text-[12px] ">Nithesh</h1>
                          <h1 className="text-[12px] ">123, Demo Street</h1>
                          <h1 className="text-[12px] ">City, Orrisa,Country</h1>
                          <h1 className="text-[12px] ">603202</h1>
                          <h1 className="text-[12px] ">+91 70793493455</h1>
                        </div>
                        <div>
                          <h1 className=" text-[12px] px-2 text-white bg-slate-400 w-40">
                            Ship To
                          </h1>
                          <h1 className="text-[12px] ">Nithesh</h1>
                          <h1 className="text-[12px] ">123, Demo Street</h1>
                          <h1 className="text-[12px] ">City, Orrisa,Country</h1>
                          <h1 className="text-[12px] ">603202</h1>
                          <h1 className="text-[12px] ">+91 70793493455</h1>
                        </div>
                      </div>
                      <div>
                        <table className="w-full">
                          <tr className="bg-slate-400">
                            <th className="w-[40%] text-[12px] text-left text-white font-semibold">
                              Description
                            </th>
                            <th className="w-[20%] text-[12px] text-left text-white font-semibold">
                              Unit cost
                            </th>
                            <th className="w-[20%] text-[12px] text-left text-white font-semibold">
                              QTY/HR Rate
                            </th>
                            <th className="w-[20%] text-[12px] text-left text-white font-semibold">
                              Amount
                            </th>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left text-[12px]">House</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                            <td className="text-left text-[12px]">1</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left text-[12px]">House</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                            <td className="text-left text-[12px]">1</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left text-[12px]">House</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                            <td className="text-left text-[12px]">1</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left text-[12px]">House</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                            <td className="text-left text-[12px]">1</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left text-[12px]">House</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                            <td className="text-left text-[12px]">1</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left text-[12px]">House</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                            <td className="text-left text-[12px]">1</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left text-[12px]">House</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                            <td className="text-left text-[12px]">1</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left text-[12px]">House</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                            <td className="text-left text-[12px]">1</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                          </tr>
                          <tr className=" bg-slate-300 ">
                            <td className="text-left text-[12px]">House</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                            <td className="text-left text-[12px]">1</td>
                            <td className="text-left text-[12px]">Rs 240000</td>
                          </tr>
                        </table>
                      </div>
                      <div className="w-full my-4 flex flex-row justify-between ">
                        <div className="w-[60%]">
                          <h1 className=" bg-slate-400 px-4 text-[12px] font-semibold text-white ">
                            Special notes and instructions
                          </h1>
                          <textarea className=" bg-slate-300 h-20 w-full " />
                        </div>
                        <div>
                          <table className="w3-table">
                            <tr>
                              <td className="text-[12px]">Subtotal:</td>
                              <td className=" text-[12px] ">Rs 480000</td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Discount:</td>
                              <td className=" text-[12px] ">5%</td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Tax rate:</td>
                              <td className=" text-[12px] ">10%</td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Tax:</td>
                              <td className=" text-[12px] ">45000</td>
                            </tr>
                            <tr>
                              <td className="text-[12px]">Total:</td>
                              <td className=" text-[12px]">Rs 460000</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <h1 className=" text-[18px] text-slate-600 ">
                        Thankyou for your business
                      </h1>
                      <p className="text-[8px]">
                        {' '}
                        For any queries please contact us
                      </p>
                    </div>
                  </PDFExport>
                </div>
              </div>
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
