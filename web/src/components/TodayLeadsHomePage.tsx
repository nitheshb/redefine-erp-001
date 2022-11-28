/* eslint-disable jsx-a11y/no-static-element-interactions */
import { MetaTags } from '@redwoodjs/web'

import { Fragment, useState } from 'react'

import TodayLeadsActivityListHomeView from './TodayLeadsAcivityListHome'
// import CardItem from '../../components/leadsCard'
// import BoardData from '../../components/board-data.json'

const TodayLeadsHomePage = ({ taskType }) => {
  const [, setisImportLeadsOpen] = useState(false)

  // kanban board
  const [ready, setReady] = useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = useState('')

  const selUserProfileF = (title) => {
    setAddLeadsTypes(title)
    setisImportLeadsOpen(true)
  }
  return (
    <>
      <div className="flex  flex-row  text-gray-700">
        <div className="flex-1 overflow-auto">
          <div className="p-6 ">
            {/* <div className="flex items-center justify-between py-2 ">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 leading-light">
                  Today Activity
                </h2>
              </div>
              <div className="flex">
                <h1> hello</h1>
              </div>
            </div> */}

            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />
            {!ready && (
              <TodayLeadsActivityListHomeView
                setisImportLeadsOpen={setisImportLeadsOpen}
                selUserProfileF={selUserProfileF}
                taskType={taskType}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TodayLeadsHomePage
