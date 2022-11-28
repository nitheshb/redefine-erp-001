/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { EyeIcon, PencilIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { deleteUser, steamUsersList } from 'src/context/dbQueryFirebase'
import { TrashIcon } from '@heroicons/react/outline'
import StyledButton from 'src/components/RoundedButton'
import { useAuth } from 'src/context/firebase-auth-context'

const UserManageTable = ({ editEmployeeFun }) => {
  const { user } = useAuth()

  const { orgId } = user
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [selDept, setSelDept] = useState('')
  useEffect(() => {
    getLeadsDataFun()
    setSelDept('all')
  }, [])
  useEffect(() => {
    if (selDept === 'all') {
      setFilterData(leadsFetchedData)
    } else {
      console.log(
        ' what am i ',
        selDept,
        leadsFetchedData.filter((userD) => userD.department === selDept)
      )
      setFilterData(
        leadsFetchedData.filter(
          (userD) =>
            userD.department === selDept || userD?.department?.includes(selDept)
        )
      )
    }
  }, [selDept, leadsFetchedData])
  const getLeadsDataFun = async () => {
    const unsubscribe = steamUsersList(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setLeadsFetchedData(usersListA)
      },
      () => setLeadsFetchedData([])
    )
    return unsubscribe
  }

  const showOnlyDept = async (category) => {
    setSelDept(category)
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <section className="flex ml-auto mt-[18px]  bg-white  border-gray-100 py-4 md:py-7 px-4 md:px-8 xl:px-10">
            {[
              { label: 'All', val: 'all' },
              { label: 'Admin', val: 'admin' },
              { label: 'Crm', val: 'crm' },
              { label: 'Legal', val: 'legal' },
              { label: 'Project', val: 'project' },
              { label: 'Legal', val: 'legal' },
              { label: 'Sales', val: 'sales' },
            ].map((dat, index) => (
              <a
                key={index}
                className={`rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800 mr-4`}
                onClick={() => showOnlyDept(dat.val)}
              >
                <div
                  className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                    selDept.includes(dat.val)
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600'
                  }`}
                >
                  {dat.label}
                </div>
              </a>
            ))}
          </section>
          <div className="shadow overflow-hidden border-b border-gray-200  bg-white pb-4 md:py-7 px-4 md:px-8 xl:px-10">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Emp Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dept
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filterData.map((person) => (
                  <motion.tr key={person.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {person.empId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {person.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {person.department}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.roles}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <PencilIcon
                        className="w-5 h-5 ml-[6px] mb-[4px] inline cursor-pointer"
                        onClick={() => editEmployeeFun(person)}
                      />
                      <TrashIcon
                        className="w-5 h-5 ml-[18px] mb-[4px] inline cursor-pointer"
                        onClick={() =>
                          deleteUser(
                            orgId,
                            person?.uid,
                            'nithe.nithesh@gmail.com',
                            person?.email,
                            person?.roles
                          )
                        }
                      />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManageTable
