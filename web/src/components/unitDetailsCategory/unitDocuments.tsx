// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'

import { EyeIcon, DownloadIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'

const valueFeedData = [
  { k: 'Jan-2022', v: 4, pic: '' },
  { k: 'Feb-2022', v: 59, pic: '' },
  { k: 'Mar-2022', v: 6, pic: '' },
  { k: 'Apr-2022', v: 12, pic: '' },
]

const UnitDocumentsBody = () => {
  return (
    <div>
      <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          {/* <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
              <Link
                className="flex items-center"
                to={routes.projectEdit({ uid })}
              >
                <img className="w-16 h-16" alt="" src="/apart.svg"></img>
                <span className="relative z-10 flex items-center w-auto text-3xl font-bold leading-none pl-0 mt-[18px]">
                  {projectName}
                </span>
              </Link>
            </div>
          </div> */}

          <div className="grid grid-cols-2 gap-7 mt-10">
            <span>
              {/* sec 1 */}
              <span>
                <div
                  className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                  style={{ backgroundColor: '#f3f5ff' }}
                >
                  <div className="flex items-center flex-shrink-0  px-0  pl-0 mb-2 ">
                    {/* <h1 className="text-lg font-medium">redefine.</h1> */}
                    <img className="w-8 h-8" alt="" src={'/m4.png'}></img>
                    <span className="relative z-10 flex items-center w-auto text-xl font-bold leading-none pl-0 ml-1 ">
                      {'Legal Documents'}
                    </span>
                  </div>

                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <DownloadIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    EC
                  </span>
                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <DownloadIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Aggrement
                  </span>
                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <DownloadIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Register Doc
                  </span>
                </div>
              </span>
            </span>

            <span>
              <span>
                <div
                  className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                  style={{ backgroundColor: '#f3f5ff' }}
                >
                  <div className="flex items-center flex-shrink-0  px-0  pl-0 mb-2 ">
                    <img className="w-8 h-8" alt="" src={'/m4.png'}></img>
                    <span className="relative z-10 flex items-center w-auto text-xl font-bold leading-none pl-0 ml-1 ">
                      {'Finance Doc'}
                    </span>
                  </div>

                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Cost Sheet
                  </span>
                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Payment Schedule
                  </span>
                  <span className="flex ml-2 mt-6 items-center h-6 px-3 py-5 justify-center text-xs font-semibold text-pink-800 bg-pink-200 rounded-sm">
                    <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    Welcome Document
                  </span>
                </div>
              </span>
            </span>
          </div>
         
        </div>
      </section>
    </div>
  )
}

export default UnitDocumentsBody
