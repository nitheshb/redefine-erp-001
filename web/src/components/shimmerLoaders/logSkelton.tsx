import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import '../../styles/myStyles.css'
const LogSkelton = () => {
  const [first, setfirst] = useState('')

  return (
    <>
      <div className="card mx-2 mb-1">
        <div className="header">
          <div className="title" data-title>
            <div className="flex flex-row justify-between">
              <div className="skeleton skeleton-text"></div>
              <div className="flex flex-row  justify-end w-12">
                <div className="skeleton skeleton-text-xs mx-2"></div>
                <div className="skeleton skeleton-text-xs"></div>
              </div>
            </div>
          </div>
        </div>

        <div data-body>
          <div className="flex flex-row justify-between">
            <div className="skeleton skeleton-text-md"></div>
            <div className="flex flex-row  justify-end w-96 ">
              <div className="skeleton skeleton-text-xss mx-2"></div>
              <div className="skeleton skeleton-text-xss mx-2"></div>
              <div className="skeleton skeleton-text-xss mx-2"></div>
              <div className="skeleton skeleton-text-xss"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogSkelton
