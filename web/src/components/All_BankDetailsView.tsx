/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react'

import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline'
import { useSnackbar } from 'notistack'

import {
  deleteBankAccount,
  steamBankDetailsList,
  steamVirtualAccountsList,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import SiderForm from './SiderForm/SiderForm'
const AllBankDetailsView = ({ title, pId, data }) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const [bankDetialsA, setGetBankDetailsA] = useState([])

  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: 'Bank Account',
    sliderData: {},
    widthClass: 'max-w-xl',
  })

  const handleSliderClose = () => {
    setSliderInfo({
      open: false,
      title: '',
      sliderData: {},
      widthClass: 'max-w-xl',
    })
  }

  useEffect(() => {
    getBankDetails()
  }, [])
  const getBankDetails = async () => {
    const { orgId } = user
    if (title === 'Bank Accounts') {
      const unsubscribe = steamBankDetailsList(
        orgId,
        (querySnapshot) => {
          const response = querySnapshot.docs.map((docSnapshot) => {
            return { ...docSnapshot.data(), ...{ docId: docSnapshot.id } }
          })
          console.log('bank_details data is ', response)
          setGetBankDetailsA(response)
        },
        (e) => {
          console.log('error', e)
        }
      )
      return unsubscribe
    } else if (title === 'Virtual Accounts') {
      const unsubscribe = steamVirtualAccountsList(
        orgId,
        (querySnapshot) => {
          const response = querySnapshot.docs.map((docSnapshot) => {
            return { ...docSnapshot.data(), ...{ docId: docSnapshot.id } }
          })
          console.log('bank_details data is ', response)
          setGetBankDetailsA(response)
        },
        (e) => {
          console.log('error', e)
        }
      )
      return unsubscribe
    }
  }
  const deleteAssetFun = async (docId, accountName, usedIn) => {
    console.log('assert details ', docId, accountName, usedIn)
    if (usedIn > 0) {
      enqueueSnackbar(
        `${accountName} Account Cannot be deleted. Remove the linked projects`,
        {
          variant: 'error',
        }
      )
    } else {
      deleteBankAccount(orgId, docId, '', '', '', enqueueSnackbar)
    }
  }

  return (
    <>
      <div className="w-full  mt-10 flex flex-row">
        <div className="lg:col-span-2 mr-10">
          <section className="justify-between">
            <h2 className="text-sm font-semibold">{title}</h2>
            <section className="flex flex-row justify-between">
              <span></span>
              <button
                className="text-right"
                onClick={() => {
                  setSliderInfo({
                    open: true,
                    title: title,
                    sliderData: {},
                    widthClass: 'max-w-xl',
                  })
                }}
              >
                {bankDetialsA.length > 0 && (
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                    <span className="text-blue-600">
                      {' '}
                      <PlusCircleIcon
                        className="h-4 w-4 mr-1 mb-[2px] inline"
                        aria-hidden="true"
                      />
                      <span>Add New</span>
                    </span>
                  </time>
                )}
              </button>
            </section>
          </section>
          <div className="">
            {bankDetialsA.map((bankDe, i) => {
              return (
                <section className="m-4 inline-block" key={i}>
                  <div className="bg-[#FFEDEA] p-8 rounded-xl shadow-md shadow-neutral-200 w-96">
                    <div className=" justify-between mb-4">
                      <div>
                        <div className="flex flex-row justify-between">
                          <p className="text-lg font-semibold text-neutral-700">
                            {bankDe?.accountName}
                          </p>
                          <span
                            onClick={() =>
                              deleteAssetFun(
                                bankDe?.docId,
                                bankDe?.accountName,
                                bankDe?.usedInA?.length || 0
                              )
                            }
                          >
                            <TrashIcon
                              className="h-4 w-4 mr-1  mt-3 inline"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <p className="mt-0.5  text-neutral-400 text-sm">
                          {bankDe?.aliasName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg  text-transparent">
                          <span>{'h'}</span>
                        </p>
                        {/* <p className="mt-0.5  text-neutral-400 text-sm">
                          #940590
                        </p> */}
                        <span className="text-green-600  text-sm  rounded-lg font">
                          {bankDe?.preferredtype}
                        </span>
                      </div>
                    </div>

                    {/* <div className="flex items-center justify-between mt-5">
                      <div className="flex items-center">
                        <svg
                          className="h-5 w-5 stroke-gray-400 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="gray-400"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-neutral-400 text-sm">
                          Added Today
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-neutral-400 text-sm">0</span>
                      </div>
                    </div> */}
                    <div className="mt-5 space-y-4 py-4">
                      <div className="flex justify-between group duration-150 cursor-pointer">
                        <div>
                          <p className="text-xs text-neutral-400">Account No</p>
                          <p className="text-sm text-neutral-600 group-hover:text-red-600 duration-150">
                            {bankDe?.accountNo}
                          </p>
                        </div>
                        <div className="max-w-[94px] min-w-[94px]">
                          <p className="text-xs text-neutral-400">IFSC Code</p>
                          <p className="text-sm text-neutral-600 group-hover:text-red-600 duration-150">
                            {bankDe?.ifsccode}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between group duration-150 cursor-pointer">
                        <div>
                          <p className="text-xs text-neutral-400">
                            Branch Name
                          </p>
                          <p className="text-sm text-neutral-600 group-hover:text-red-600 duration-150">
                            {bankDe?.branchName}
                          </p>
                        </div>
                        <div className="max-w-[94px] min-w-[94px]">
                          <p className="text-xs text-neutral-400">Bank</p>
                          <p className="text-sm text-neutral-600 group-hover:text-red-600 duration-150 min-h-[40px]">
                            {bankDe?.bank}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between group duration-150 cursor-pointer">
                        <div>
                          <p className="text-xs text-neutral-400">GST/PAN NO</p>
                          <p className="text-sm text-neutral-600 group-hover:text-red-600 duration-150">
                            {bankDe?.gstNo}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-dashed space-y-4 py-4">
                      <div className="flex justify-between group duration-150 cursor-pointer">
                        <div>
                          <p className="text-xs text-neutral-400">Linked In</p>
                          <p className="text-sm text-neutral-600 group-hover:text-red-600 duration-150">
                            {bankDe?.usedInA?.length || 0} Projects
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-400">
                            Total Transaction
                          </p>
                          <p className="text-sm text-neutral-600 group-hover:text-red-600 duration-150">
                            Rs. 0
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="text-center tracking-wide cursor-pointer duration-150 hover:bg-neutral-200 py-0.5 bg-[#FF919C] text-white font-semibold rounded-lg mt-3">
                      Reports
                    </div> */}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
        {bankDetialsA.length === 0 && (
          <div className="py-8 px-8 flex flex-col items-center mt-5 w-full">
            <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
              <img
                className="w-[180px] h-[180px] inline"
                alt=""
                src="/note-widget.svg"
              />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
              No {title} Available
            </h3>
            <button
              onClick={() => {
                setSliderInfo({
                  open: true,
                  title: title,
                  sliderData: {},
                  widthClass: 'max-w-xl',
                })
              }}
            >
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                Better always attach a string
                <span className="text-blue-600"> Add {title}</span>
              </time>
            </button>
          </div>
        )}
      </div>
      <SiderForm
        open={sliderInfo.open}
        setOpen={handleSliderClose}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
        widthClass={sliderInfo.widthClass}
        pId={pId}
        phaseDetails={data}
      />
    </>
  )
}

export default AllBankDetailsView
