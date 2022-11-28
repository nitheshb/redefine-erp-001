import { PlusIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'

const UnitOverView = ({ data }) => {
  const [customerDetails, setCustomerDetails] = useState({})
  useEffect(() => {
    const { unitDetail } = data
    const { customerDetailsObj } = unitDetail
    setCustomerDetails(customerDetailsObj)
    console.log(
      'customerDetails?.customerName1',
      customerDetails?.customerName1,
      customerDetailsObj?.customerName1,
      customerDetailsObj,
      data?.customerDetailsObj
    )
    // console.log('data is', data)
  }, [data])

  return (
 
    <div className="w-full px-1 mt-1 mb-1 bg-white   pt-2 ">
      <div className="relative z-10 my-1 bg-white">
        <div className="py-3 grid grid-cols-2 mb-4">
          <section className="flex flex-col bg-[#FCF4F0] p-3 border border-[#e8e1e1] rounded-md">
            <section className="flex flow-row justify-between mb-1">
              <div className="font-md text-xs text-gray-700 tracking-wide">
                Primary Owner
              </div>
              <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                {customerDetails?.customerName1}
              </div>
            </section>
            <section className="flex flow-row justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                Phone
              </div>
              <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                {customerDetails?.phone1}
              </div>
            </section>
            <section className="flex flow-row justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                Email
              </div>
              <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                {customerDetails?.email1}
              </div>
            </section>
            <section className="flex flow-row justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                Dob
              </div>
              <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                {customerDetails?.Dob1}
              </div>
            </section>
            <section className="flex flow-row justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
              Aadhar no
              </div>
              <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
              {customerDetails?.aadharNo1 || '-'}
              </div>
            </section>

            <section className="flex flow-row justify-between mb-1">
              <div className="font-md text-xs text-gray-500  tracking-wide">
                Pancard
              </div>
              <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                {customerDetails?.panNo1 || '-'}
              </div>
            </section>
          </section>


        </div>
        {/* <div className="w-full border-b border-[#ebebeb] mt-4"></div> */}
        {/* <div className=" w-full  pt-1 font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4 grid grid-cols-3 gap-5">
        {' '}
        <section>
          <span className="font-thin   font-bodyLato text-[9px]  py-[6px]">
            Created On
            <span className="text-[#867777] ck ml-2">
           { {customerDetails?.customerName1}}
            </span>
          </span>
        </section>
        <section>
          <span className="font-thin   font-bodyLato text-[9px]  py-[6px]">
            Updated On :
            <span className="text-[#867777] ck ml-2">
              {stsUpT === undefined
                ? 'NA'
                : prettyDateTime(stsUpT) || 'NA'}
            </span>
          </span>
        </section>
        <section>
          <span className="font-thin text-[#867777]   font-bodyLato text-[9px]  py-[6px]">
            Assigned On
            <span className="text-[#867777] ck ml-2">
              {assignT != undefined
                ? prettyDateTime(assignT)
                : prettyDateTime(Date)}
            </span>
          </span>
        </section>
      </div> */}
      </div>
    </div>
  )
}

export default UnitOverView
