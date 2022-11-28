/* eslint-disable jsx-a11y/anchor-is-valid */
import { UserGroupIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from 'src/context/firebase-auth-context'
import { USER_ROLES } from 'src/constants/userRoles'

const HeadSideBar = (props) => {
  const { pgName } = props
  const { user } = useAuth()

  if (!user?.role?.includes(USER_ROLES.ADMIN)) {
    return null
  }

  return (
    <div className="flex flex-col items-center w-16 min-w-[66px] pb-4 overflow-auto  bg-white bg-opacity-75 border-l bg-[#f0f3ff] ">
      <a
        className="flex items-center justify-center flex-shrink-0 w-full h-16  border-b"
        href="#"
      >
        {/* bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 */}
        {/* <svg
          className="w-8 h-8 to-indigo-600 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          // color="#a770ef"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg> */}
      </a>

      <Link
        className={
          'flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300 ' +
          (pgName === 'home' ? 'bg-gray-300' : '')
        }
        to={routes.home()}
      >
        {/* <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        {/* <img className="w-5 h-5 inline" alt="" src="/apart1.svg"></img> */}
      </Link>

      <Link
        className={
          'flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300 ' +
          (pgName === 'leadsManager' ? 'bg-gray-300' : '')
        }
        to={routes.leadsManager()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </Link>

      <Link
        className={
          'flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300 ' +
          (pgName === 'crmModule' ? 'bg-gray-300' : '')
        }
        to={routes.crmModule()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </Link>
      <Link
        className={
          'flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300 ' +
          (pgName === 'financeModule' ? 'bg-gray-300' : '')
        }
        to={routes.financeModule()}
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link>

      <Link
        className={
          'flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300 ' +
          (pgName === 'legalModule' ? 'bg-gray-300' : '')
        }
        to={routes.legalModule()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          />
        </svg>
      </Link>

      <Link
        className={
          'flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300 ' +
          (pgName === 'usersAdmin' ? 'bg-gray-300' : '')
        }
        to={routes.usersAdmin()}
      >
        <UserGroupIcon className="h-5 w-5 " aria-hidden="true" />
      </Link>

      <Link
        className={
          'flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 mt-auto rounded hover:bg-gray-300 ' +
          (pgName === 'erpAccount' ? 'bg-gray-300' : '')
        }
        to={routes.erpAccount()}
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link>
    </div>
  )
}

export default HeadSideBar
