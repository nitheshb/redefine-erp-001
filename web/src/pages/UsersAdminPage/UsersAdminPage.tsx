import { MetaTags } from '@redwoodjs/web'
import { Fragment, useState } from 'react'

import HeadNavBar from 'src/components/HeadNavBar/HeadNavBar'
import HeadSideBar from 'src/components/HeadSideBar/HeadSideBar'
import SUserSignup from 'src/components/SUserSignup/SUserSignup'
import UserManageTable from 'src/components/UserManageTable/UserManageTable'
import UserAccessTable from 'src/components/UserAccessTable/UserAccessTable'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import MyActivityHome from 'src/components/MyActivityHome/MyActivityHome'

const UsersAdminPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOnClose = () => setIsOpen(false)
  const [viewable, setViewable] = useState('User Management')
  const [empData, setEmpData] = useState({})

  const editEmployeeFun = (empData) => {
    setEmpData(empData)
    setIsOpen(true)
  }
  return (
    <>
      <MetaTags title="UsersAdmin" description="UsersAdmin page" />

      <div className="flex w-screen h-screen text-gray-700">
        <HeadSideBar pgName={'usersAdmin'} />
        <HeadSideBarDetailView
          pgName={'UsersManagement'}
          sourceLink={'hrModule'}
          showSideView1={undefined}
          setViewable={setViewable}
        />
        <div className="flex flex-col flex-grow">
          <HeadNavBar />
          <div className="flex-grow p-6 overflow-auto  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex items-center flex-shrink-0 h-16 px-0  pl-0  ">
              {/* <h1 className="text-lg font-medium">redefine.</h1> */}
              <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0">
                {viewable}
              </span>

              {viewable === 'User Management' && (
                <button
                  onClick={() => editEmployeeFun({})}
                  className="flex items-center justify-center h-10 px-4  bg-gray-200 ml-auto text-sm font-medium rounded hover:bg-gray-300"
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="ml-1 leading-none">Add Employee</span>
                </button>
              )}
            </div>

            {viewable === 'User Management' && (
              <UserManageTable editEmployeeFun={editEmployeeFun} />
            )}

            {viewable === 'Roles Management' && (
              <>
                <UserAccessTable />
              </>
            )}

            {viewable === 'My Activity' && (
              <>
                <MyActivityHome source={'individual'} />
              </>
            )}

            {viewable === 'Team Activity' && (
              <>
                <MyActivityHome source={'team'} />
              </>
            )}

            <SUserSignup
              open={isOpen}
              setOpen={handleOnClose}
              title="User"
              empData={empData}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default UsersAdminPage
