/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { checkActionCode } from '@firebase/auth'
import { UserGroupIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
import { spawnSync } from 'child_process'
import { useEffect, useState } from 'react'
import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'
const HeadSideBarDetailView2 = ({
  pgName,
  sourceLink,
  showSideView1,
  setViewable,
  viewable,
}) => {
  // projectsScreen leadsScreenf

  // const showSideView = () => {
  //   console.log('iam clicked', showSideBar)
  //   setShowSideBar1()
  // }
  const { user } = useAuth()
  // const { access } = user
  // const access = user?.access
  const [access, setUserAccess] = useState([])
  useEffect(() => {
    if (user) {
      const { access } = user
      setUserAccess(access)
    }
  }, [user])

  return (
    <div className="flex flex-col items-left w-16 min-w-[226px]   bg-white bg-opacity-75 bg-[#f0f3ff] ">
      <div className="bg-[#f0f3ff] overflow-auto">
        <div className="pl-4 mr-6 mt-[13px] border-l h-screen">
          <span
            style={{ marginLeft: '-43px' }}
            className="relative z-10 flex items-center text-xl font-extrabold leading-none text-[#141446] select-none pl-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="88"
              height="32"
              viewBox="0 0 1 28"
              fill="none"
              className="injected-svg"
              data-src="/images/logo/cubejs-logo.svg"
            >
              <path
                d="M22.1337 7.03243L11.8594 1V5.17391L22.1336 11.1804L22.1337 7.03243Z"
                fill="#FF6492"
              ></path>
              <path
                d="M22.1336 11.1823L19.0513 13.0019L11.8574 8.78565L7.74692 11.1857L4.66406 9.49917L11.8593 5.17578L22.1336 11.1823Z"
                fill="#141446"
              ></path>
              <path
                d="M7.74692 11.1826L4.66406 9.49609V12.9988L7.74692 11.1826Z"
                fill="#A14474"
              ></path>
              <path
                d="M1.58105 18.9676L11.8572 13L22.1334 18.9676L11.8572 25L1.58105 18.9676Z"
                fill="#141446"
              ></path>
              <path
                d="M22.1336 14.8259L11.8574 8.71875V12.9998L22.1336 18.9674L22.1336 14.8259Z"
                fill="#FF6492"
              ></path>
              <path
                d="M4.66391 13V9.4973L11.8592 5.17391V1L1.58105 7.03243V18.9676L11.8573 13V8.71892L4.66391 13Z"
                fill="#7A77FF"
              ></path>
            </svg>
            <span className="ml-" style={{ marginLeft: '-11px' }}>
              {' '}
              Redefine Erp.
            </span>
          </span>
          <ul className=" pt-4">
            {sourceLink != 'projectsScreen' &&
              !access?.includes('manage_leads') && (
                // !user?.role?.includes(USER_ROLES.CP_AGENT) &&
                <>
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden  border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer '
                    }
                    onClick={() => setViewable('inProgress')}
                  >
                    <span className="flex items-center ml-">
                      <span className="text-md font-bold pl-1 ">
                        My Schedule
                      </span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                  <li className="relative ">
                    <span
                      className={
                        'flex items-center text-sm py-1 h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (viewable === 'Today1'
                          ? 'text-blue-600 text-md font-semibold '
                          : '')
                      }
                      onClick={() => setViewable('Today1')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="evenodd">
                              <path
                                fillRule="nonzero"
                                d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                                opacity=".1"
                              ></path>
                              <path
                                fillRule="nonzero"
                                d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                              ></path>
                              <text
                                fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                                fontSize="9"
                                transform="translate(4 2)"
                                fontWeight="500"
                              >
                                <tspan x="8" y="15" textAnchor="middle">
                                  28
                                </tspan>
                              </text>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-1">My Task</span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                      </span>
                    </span>
                  </li>
                  {/* <li className="relative ">
                    <span
                      className={
                        'flex items-center text-sm py-1 h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (viewable === 'Today1'
                          ? 'text-blue-600 text-md font-semibold '
                          : '')
                      }
                      onClick={() => setViewable('Today1')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="evenodd">
                              <path
                                fillRule="nonzero"
                                d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                                opacity=".1"
                              ></path>
                              <path
                                fillRule="nonzero"
                                d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                              ></path>
                              <text
                                fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                                fontSize="9"
                                transform="translate(4 2)"
                                fontWeight="500"
                              >
                                <tspan x="8" y="15" textAnchor="middle">
                                  28
                                </tspan>
                              </text>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-1">General Tasks</span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                      </span>
                    </span>
                  </li> */}

                  {/* <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'Upcoming'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('Upcoming')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">Upcoming</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li> */}
                </>
              )}
            {['crmModule'].includes(sourceLink) && (
              <>
                <span
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden  border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer '
                  }
                  onClick={() => setViewable('inProgress')}
                >
                  <span className="flex items-center ml-">
                    <span className="text-md font-bold pl-1 ">My Schedule</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </span>
                <li className="relative ">
                  <span
                    className={
                      'flex items-center text-sm py-1 h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'Today1'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('Today1')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#058527' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <g fill="currentColor" fillRule="evenodd">
                            <path
                              fillRule="nonzero"
                              d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                              opacity=".1"
                            ></path>
                            <path
                              fillRule="nonzero"
                              d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                            ></path>
                            <text
                              fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                              fontSize="9"
                              transform="translate(4 2)"
                              fontWeight="500"
                            >
                              <tspan x="8" y="15" textAnchor="middle">
                                28
                              </tspan>
                            </text>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">My Task</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span className="flex ml-auto items-bottom text-xs mt-2"></span>
                    </span>
                  </span>
                </li>
                <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'CrmTeamTasks'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('CrmTeamTasks')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">Team Tasks</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li>
                <span
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden  border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer '
                  }
                  onClick={() => setViewable('inProgress')}
                >
                  <span className="flex items-center ml-">
                    <span className="text-md font-bold pl-1 ">My CRM</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </span>
                <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'MyCustomers'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('MyCustomers')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">CRM Space</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li>
                <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'MyCustomers'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('MyCustomers')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">My Customers</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li>
                <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'TeamCustomers'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('TeamCustomers')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">Team Customers</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li>
              </>
            )}
            {['financeModule'].includes(sourceLink) && (
              <>
                <span
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden  border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer '
                  }
                  onClick={() => setViewable('inProgress')}
                >
                  <span className="flex items-center ml-">
                    <span className="text-md font-bold pl-1 ">Finanace</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </span>
                <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'Payments'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('Payments')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">Transactions</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li>
                <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'Dashboard'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('Dashboard')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">Dashboard</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li>
              </>
            )}
            {sourceLink === 'projectsScreen' && (
              <>
                <span
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden  border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer '
                  }
                  onClick={() => setViewable('inProgress')}
                >
                  <span className="flex items-center ml-">
                    <span className="text-md font-bold pl-1 ">My Projects</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </span>

                <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'ongoing_projects'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('ongoing_projects')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">Ongoing Projects</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li>
                <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'completed_projects'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('completed_projects')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">Completed</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li>
                <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'hold_projects'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('hold_projects')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">Hold</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li>
              </>
            )}
            {sourceLink === 'leadsScreen' && access?.includes('manage_leads') && (
              <>
                <span
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden  border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer '
                  }
                  onClick={() => setViewable('inProgress')}
                >
                  <span className="flex items-center ml-">
                    <span className="text-md font-bold pl-1 ">My Schedule</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </span>
                <li className="relative ">
                  <span
                    className={
                      'flex items-center text-sm py-1 h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'Today1Team'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('Today1Team')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#058527' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <g fill="currentColor" fillRule="evenodd">
                            <path
                              fillRule="nonzero"
                              d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                              opacity=".1"
                            ></path>
                            <path
                              fillRule="nonzero"
                              d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                            ></path>
                            <text
                              fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                              fontSize="9"
                              transform="translate(4 2)"
                              fontWeight="500"
                            >
                              <tspan x="8" y="15" textAnchor="middle">
                                28
                              </tspan>
                            </text>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">My Tasks</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li>
                {/* <li className="relative ">
                  <span
                    className={
                      'flex items-center text-sm py-1 h-9  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'Today1Team'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('Today1Team')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#058527' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <g fill="currentColor" fillRule="evenodd">
                            <path
                              fillRule="nonzero"
                              d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v2.5h-15V6A1.5 1.5 0 0 1 6 4.5z"
                              opacity=".1"
                            ></path>
                            <path
                              fillRule="nonzero"
                              d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
                            ></path>
                            <text
                              fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                              fontSize="9"
                              transform="translate(4 2)"
                              fontWeight="500"
                            >
                              <tspan x="8" y="15" textAnchor="middle">
                                28
                              </tspan>
                            </text>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">General Team Tasks</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li> */}
                {/* <li className="relative w-full">
                  <span
                    className={
                      'flex items-center text-sm py-3  h-9 w-full  overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (viewable === 'UpcomingTeam'
                        ? 'text-blue-600 text-md font-semibold '
                        : '')
                    }
                    onClick={() => setViewable('UpcomingTeam')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="currentColor" fillRule="nonzero">
                            <path
                              d="M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z"
                              opacity="0.1"
                            ></path>
                            <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm10 12a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm8-4a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zm-4 0a1 1 0 110-2 1 1 0 010 2zM7 8h10a.5.5 0 110 1H7a.5.5 0 010-1z"></path>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-1">Upcoming Activity</span>
                    </span>
                    <span className="flex ml-auto items-bottom">
                      <span
                        // style={{ color: '#058527' }}
                        className="flex ml-auto items-bottom text-xs mt-2"
                      ></span>
                    </span>
                  </span>
                </li> */}
              </>
            )}
            {/* {sourceLink != 'hrModule' && (
              <li className="relative">
                <span
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  onClick={() => setViewable('inProgress')}
                >
                  <span className="flex items-center ml-1">
                    <span style={{ color: '#692fc2' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <g transform="translate(-266, -17)" fill="#777777">
                          <path d="M280,22.7581818 L279.1564,22 L273.9922,26.506 L273.4414,26.0254545 L273.4444,26.0281818 L268.8562,22.0245455 L268,22.7712727 C269.2678,23.878 272.8084,26.9674545 273.9922,28 C274.8718,27.2330909 274.0144,27.9809091 280,22.7581818"></path>
                        </g>
                      </svg>
                    </span>
                    <span className="text-md font-bold pl-2 ">Projects</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </span>
                <ul className="px-1">
                  {' '}
                  <li className="relative">
                    <Link
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      to={routes.home()}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[1px]">
                          Nakashatra Township
                        </span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        >
                          27
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      to={routes.home()}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[1px]">Esparanza</span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        >
                          6
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            )} */}
            {sourceLink === 'leadsScreen' && !access?.includes('manage_leads') && (
              <li className="relative">
                <span
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden  border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '') +
                    (viewable === 'inProgress'
                      ? 'text-blue-600 text-md font-semibold '
                      : '')
                  }
                  onClick={() => setViewable('inProgress')}
                >
                  <span className="flex items-center ml-">
                    <span className="text-md font-bold pl-1 ">My Leads</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </span>
                <ul className="px-1 pt-2">
                  {' '}
                  {['Lead Management', 'Booked', 'Archive'].map((data, inx) => (
                    <li className="relative" key={inx}>
                      <span
                        className={
                          'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                          (viewable === 'archieveLeads'
                            ? 'text-blue-600 text-md font-semibold '
                            : '')
                        }
                        onClick={() =>
                          data === 'Lead Management'
                            ? setViewable('inProgress')
                            : data === 'Archive'
                            ? setViewable('archieveLeads')
                            : setViewable('booked')
                        }
                      >
                        <span className="flex items-center">
                          <span style={{ color: '#058527' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                              <g fill="currentColor" fillRule="nonzero">
                                <path
                                  d="M10 14.5a2 2 0 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                  opacity="0.1"
                                ></path>
                                <path d="M8.062 4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                              </g>
                            </svg>
                          </span>
                          <span className="text-sm pl-[4px]">{data}</span>
                        </span>
                        <span className="flex ml-auto items-bottom">
                          <span
                            // style={{ color: '#058527' }}
                            className="flex ml-auto items-bottom text-xs mt-2"
                          ></span>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {sourceLink === 'leadsScreen' && access?.includes('manage_leads') && (
              <li className="relative">
                <span
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden  border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  onClick={() => setViewable('inProgress')}
                >
                  <span className="flex items-center ml-">
                    <span className="text-md font-bold pl-1 ">My Leads</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </span>
                <ul className="px-1 pt-2">
                  {' '}
                  {['Lead Management', 'Booked', 'Archive'].map((data, inx) => (
                    <li className="relative" key={inx}>
                      <span
                        className={
                          'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                          (pgName === 'home' ? 'bg-gray-300' : '')
                        }
                        onClick={() =>
                          data === 'Lead Management'
                            ? setViewable('inProgress')
                            : data === 'Archive'
                            ? setViewable('archieveLeads')
                            : setViewable('booked')
                        }
                      >
                        <span className="flex items-center">
                          <span style={{ color: '#058527' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                              <g fill="currentColor" fillRule="nonzero">
                                <path
                                  d="M10 14.5a2 2 0 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                  opacity="0.1"
                                ></path>
                                <path d="M8.062 4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                              </g>
                            </svg>
                          </span>
                          <span className="text-sm pl-[4px]">{data}</span>
                        </span>
                        <span className="flex ml-auto items-bottom">
                          <span
                            // style={{ color: '#058527' }}
                            className="flex ml-auto items-bottom text-xs mt-2"
                          ></span>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {[
              'crmModule',
              'leadsScreen',
              'financeModule',
              'projectsScreen',
            ].includes(sourceLink) && (
              <li className="relative">
                <Link
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  // to={routes.home()}
                >
                  <span className="flex items-center ml-1">
                    <span className="text-md font-bold pl-1 ">Inventory</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </Link>
                <ul className="px-1">
                  {' '}
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '') +
                        (viewable === 'unitsInventory'
                          ? 'text-blue-600 text-md font-semibold '
                          : '')
                      }
                      onClick={() => setViewable('unitsInventory')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#eb8909' }}>
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.1"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                              fill="currentColor"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>

                        <span className="text-sm pl-[6px] ">
                          Projects Inventory
                        </span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        ></span>
                      </span>
                    </span>
                  </li>
                </ul>
              </li>
            )}
            {['financeModule', 'projectsScreen'].includes(sourceLink) && (
              <li className="relative">
                <Link
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  // to={routes.home()}
                >
                  <span className="flex items-center ml-1">
                    <span className="text-md font-bold pl-1 ">Add-ons</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </Link>
                <ul className="px-1">
                  {' '}
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '') +
                        (viewable === 'Bank Accounts'
                          ? 'text-blue-600 text-md font-semibold '
                          : '')
                      }
                      onClick={() => setViewable('Bank Accounts')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#eb8909' }}>
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.1"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                              fill="currentColor"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>

                        <span className="text-sm pl-[6px]">Bank Accounts</span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        ></span>
                      </span>
                    </span>
                  </li>
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'Virtual Accounts' ? 'bg-gray-300' : '') +
                        (viewable === 'Virtual Accounts'
                          ? 'text-blue-600 text-md font-semibold '
                          : '')
                      }
                      onClick={() => setViewable('Virtual Accounts')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#eb8909' }}>
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.1"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                              fill="currentColor"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>

                        <span className="text-sm pl-[6px]">
                          Virtual Accounts
                        </span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        ></span>
                      </span>
                    </span>
                  </li>
                  {/* Virtual Accounts */}
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      onClick={() => setViewable('LeadsManagerHome')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          {/* <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </span>

                        <span className="text-sm pl-[6px]">
                          Marketing budget
                        </span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        ></span>
                      </span>
                    </span>
                  </li>
                </ul>
              </li>
            )}
            {sourceLink === 'hrModule' && (
              <li className="relative">
                <Link
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  // to={routes.home()}
                >
                  <span className="flex items-center ml-1">
                    <span style={{ color: '#692fc2' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fillRule="evenodd">
                          <g fill="currentColor" fillRule="nonzero">
                            <g>
                              <g>
                                <path
                                  d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                  transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <span className="text-md font-bold pl-1 ">
                      Resource Management
                    </span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </Link>
                <ul className="px-1">
                  {' '}
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      onClick={() => setViewable('User Management')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[4px]">
                          Employees Management
                        </span>
                      </span>
                    </span>
                  </li>
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      onClick={() => setViewable('Roles Management')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[4px]">
                          Access Management
                        </span>
                      </span>
                    </span>
                  </li>
                </ul>
              </li>
            )}
            <li className="relative">
              <Link
                className={
                  'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden   border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                  (pgName === 'home' ? 'bg-gray-300' : '')
                }
                // to={routes.home()}
              >
                <span className="flex items-center ml-">
                  <span className="text-md font-bold pl-1 ">Reports</span>
                </span>
                <span className="flex ml-auto items-bottom">
                  <span
                    // style={{ color: '#058527' }}
                    className="flex ml-auto items-bottom text-xs mt-2"
                  ></span>
                </span>
              </Link>
              <ul className="px-1 pt-1">
                {' '}
                {sourceLink === 'projectsScreen' && (
                  <>
                    <li className="relative">
                      <span
                        className={
                          'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                          (pgName === 'home' ? 'bg-gray-300' : '')
                        }
                        onClick={() => setViewable('Projects Lead Report')}
                      >
                        <span className="flex items-center">
                          <span style={{ color: '#692fc2' }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <g fill="none" fillRule="evenodd">
                                <g fill="currentColor" fillRule="nonzero">
                                  <g>
                                    <g>
                                      <path
                                        d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                        transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                      ></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </span>
                          <span className="text-sm pl-[4px]">Lead Report</span>
                        </span>
                      </span>
                    </li>
                    <li className="relative">
                      <span
                        className={
                          'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                          (pgName === 'home' ? 'bg-gray-300' : '')
                        }
                        onClick={() => setViewable('Campaign Budget Report')}
                      >
                        <span className="flex items-center">
                          <span style={{ color: '#692fc2' }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <g fill="none" fillRule="evenodd">
                                <g fill="currentColor" fillRule="nonzero">
                                  <g>
                                    <g>
                                      <path
                                        d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                        transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                      ></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </span>
                          <span className="text-sm pl-[4px]">
                            Campaign Report
                          </span>
                        </span>
                      </span>
                    </li>
                  </>
                )}
                <li className="relative">
                  <span
                    className={
                      'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                      (pgName === 'home' ? 'bg-gray-300' : '')
                    }
                    onClick={() => setViewable('My Lead Report')}
                  >
                    <span className="flex items-center">
                      <span style={{ color: '#692fc2' }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none" fillRule="evenodd">
                            <g fill="currentColor" fillRule="nonzero">
                              <g>
                                <g>
                                  <path
                                    d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                    transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </span>
                      <span className="text-sm pl-[4px]">My Report</span>
                    </span>
                  </span>
                </li>
                {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      onClick={() => setViewable('Team Lead Report')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#692fc2' }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none" fillRule="evenodd">
                              <g fill="currentColor" fillRule="nonzero">
                                <g>
                                  <g>
                                    <path
                                      d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                      transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                        <span className="text-sm pl-[4px]">Team Report</span>
                      </span>
                    </span>
                  </li>
                )}
              </ul>
            </li>

            {
              <li className="relative">
                <Link
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  // to={routes.home()}
                >
                  <span className="flex items-center ml-1">
                    <span className="text-md font-bold pl-1 ">HR</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </Link>
                <ul className="px-1">
                  {' '}
                  {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
                    <li className="relative">
                      <span
                        className={
                          'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                          (pgName === 'home' ? 'bg-gray-300' : '')
                        }
                        onClick={() => setViewable('Attendance')}
                      >
                        <span className="flex items-center">
                          <span style={{ color: '#eb8909' }}>
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.1"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                                fill="currentColor"
                              ></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>

                          <span className="text-sm pl-[6px]">Attendance</span>
                        </span>
                        <span className="flex ml-auto items-bottom">
                          <span
                            // style={{ color: '#058527' }}
                            className="flex ml-auto items-bottom text-xs mt-1"
                          ></span>
                        </span>
                      </span>
                    </li>
                  )}
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      onClick={() => setViewable('Pay')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#eb8909' }}>
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.1"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                              fill="currentColor"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>

                        <span className="text-sm pl-[6px]">My Incentives</span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        ></span>
                      </span>
                    </span>
                  </li>
                  {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
                    <li className="relative">
                      <span
                        className={
                          'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                          (pgName === 'home' ? 'bg-gray-300' : '')
                        }
                        onClick={() => setViewable('Pay')}
                      >
                        <span className="flex items-center">
                          <span style={{ color: '#eb8909' }}>
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.1"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                                fill="currentColor"
                              ></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>

                          <span className="text-sm pl-[6px]">Pay Slips</span>
                        </span>
                        <span className="flex ml-auto items-bottom">
                          <span
                            // style={{ color: '#058527' }}
                            className="flex ml-auto items-bottom text-xs mt-1"
                          ></span>
                        </span>
                      </span>
                    </li>
                  )}
                  {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
                    <li className="relative">
                      <span
                        className={
                          'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                          (pgName === 'home' ? 'bg-gray-300' : '')
                        }
                        onClick={() => setViewable('LinkWhatsApp')}
                      >
                        <span className="flex items-center">
                          <span style={{ color: '#eb8909' }}>
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.1"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                                fill="currentColor"
                              ></path>
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>

                          <span className="text-sm pl-[6px]">
                            Link WhatsApp
                          </span>
                        </span>
                        <span className="flex ml-auto items-bottom">
                          <span
                            // style={{ color: '#058527' }}
                            className="flex ml-auto items-bottom text-xs mt-1"
                          ></span>
                        </span>
                      </span>
                    </li>
                  )}
                </ul>
              </li>
            }
            {sourceLink === 'leadsScreen' && access?.includes('manage_leads') && (
              <li className="relative">
                <Link
                  className={
                    'flex items-center text-sm py-1  h-9 mt-4 overflow-hidden border-b text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                    (pgName === 'home' ? 'bg-gray-300' : '')
                  }
                  // to={routes.home()}
                >
                  <span className="flex items-center ml-1">
                    <span style={{ color: '#eb8909' }}>
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z"
                          fill="currentColor"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-md font-bold pl-1 ">Extra Apps</span>
                  </span>
                  <span className="flex ml-auto items-bottom">
                    <span
                      // style={{ color: '#058527' }}
                      className="flex ml-auto items-bottom text-xs mt-2"
                    ></span>
                  </span>
                </Link>
                <ul className="px-1">
                  {' '}
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      onClick={() => setViewable('LeadsManagerHome')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          {/* <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg> */}
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </span>

                        <span className="text-sm pl-[6px]">
                          Incentive Design
                        </span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        ></span>
                      </span>
                    </span>
                  </li>
                  <li className="relative">
                    <span
                      className={
                        'flex items-center text-sm py-1  h-9 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer ' +
                        (pgName === 'home' ? 'bg-gray-300' : '')
                      }
                      onClick={() => setViewable('LeadsManagerHome')}
                    >
                      <span className="flex items-center">
                        <span style={{ color: '#058527' }}>
                          {/* <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor" fillRule="nonzero">
                              <path
                                d="M10 14.5a2 2 0adfaf 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z"
                                opacity="0.1"
                              ></path>
                              <path d="M8.062 adfafafafa4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>
                            </g>
                          </svg> */}
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </span>

                        <span className="text-sm pl-[6px]">
                          Marketing budget
                        </span>
                      </span>
                      <span className="flex ml-auto items-bottom">
                        <span
                          // style={{ color: '#058527' }}
                          className="flex ml-auto items-bottom text-xs mt-1"
                        ></span>
                      </span>
                    </span>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeadSideBarDetailView2

// ExecutiveHomePage
//  <HeadSideBar pgName={'executiveHome'} />
