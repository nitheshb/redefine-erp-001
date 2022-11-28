/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { EyeIcon, PencilIcon, PlusCircleIcon } from '@heroicons/react/outline'

import { ClockIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {

  steamUsersActivityLog,
  steamUsersActivityOfUser,
} from 'src/context/dbQueryFirebase'

import LeadsTeamReportBody from '../LeadsTeamReportBody'
import { useAuth } from 'src/context/firebase-auth-context'


const MyActivityHome = ({ source }) => {
  const { user } = useAuth()
  const { orgId } = user
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [selDept, setSelDept] = useState('')
  useEffect(() => {
    getLeadsDataFun(source)
    setSelDept('all')
  }, [source])

  useEffect(() => {
    console.log('what is the source', source)
  }, [source])

  useEffect(() => {
    let filData
    console.log('what is this', leadsFetchedData)
    setFilterData(leadsFetchedData)
    return
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
  const getLeadsDataFun = async (source) => {
    // const leadsData = await getUsersList()
    // setLeadsFetchedData(leadsData)
    // await console.log('leadsData', leadsData)
    if (source === 'team') {
      const unsubscribe = steamUsersActivityLog(
        orgId,
        (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          )
          setLeadsFetchedData(usersListA)
        },
        (error) => setLeadsFetchedData([])
      )
      return unsubscribe
    } else {
      const unsubscribe = steamUsersActivityOfUser(
        orgId, 
        (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          )
          setLeadsFetchedData(usersListA)
        },
        (error) => setLeadsFetchedData([])
      )
      return unsubscribe
    }
  }

  const showOnlyDept = async (category) => {
    setSelDept(category)
  }
  return (

    <div className="flex flex-col">
     <LeadsTeamReportBody project={undefined} isEdit={undefined} />
    </div>
  )
}

export default MyActivityHome
