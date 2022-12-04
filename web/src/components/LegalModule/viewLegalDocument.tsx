import React, { useEffect, useState } from 'react'

import { Dialog } from '@headlessui/react'
import { Button, Card, CardContent, Grid } from '@material-ui/core'
import csv from 'csvtojson'
import { Form, Formik } from 'formik'
import { parse } from 'papaparse'
import * as Yup from 'yup'

import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { TextField2 } from 'src/util/formFields/TextField2'

import { MultipleFileUploadField } from '../LeadUplodCsv/MultipleFileUploadField'

export default function LegalDocsViewHome({
  title,
  pId,
  myPhase,
  myBlock,
  projectsList,
  viewLegalDocData,
}) {
  const [existingCols, setexistingCols] = useState([])
  const initialState = {
    amount: '',
    towardsBankDocId: '',
    mode: 'cheque',
    payto: '',
    bookingSource: '',
    bookedBy: '',
  }

  const validateSchema = Yup.object({
    // date: Yup.string().required('Bank Required'),
    // amount: Yup.string().required('Required'),
    // payto: Yup.string().required('Required'),
    // mode: Yup.string().required('Bank Required'),
    // drawnonbank: Yup.string().required('Required'),
    // chequeno: Yup.string().required('Required'),
    // dated: Yup.string().required('Required'),
  })

  return (
    <div className="h-full flex flex-col pb-6 bg-white  overflow-y-scroll">
      <div className="grid gap-8 grid-cols-1">
        <div className="flex flex-col rounded-lg bg-white mt-">
          <div className="mt-0">
            <Formik
              enableReinitialize={true}
              initialValues={initialState}
              validationSchema={validateSchema}
              onSubmit={(values, { resetForm }) => {
                // onSubmit(values, resetForm)
              }}
            >
              {(formik) => (
                <Form>
                  <div className="form">
                    {/* Phase Details */}

                    <section className="  bg-blueGray-50">
                      <div className="w-full mx-auto ">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F9FBFB] border-0">
                          <div className="rounded-t bg-[#F1F5F9] mb-0 px-3 py-2">
                            <div className="text-center flex justify-between">
                              <p className="text-xs font-extrabold tracking-tight uppercase font-body my-[2px] p-1 ml-2">
                                Document Summary
                              </p>
                            </div>
                          </div>
                          <div className="flex-auto px-2 py-4 ">
                            <section
                              className="bg-[#fff] p-4 rounded-md "
                              style={{
                                boxShadow: '0 1px 12px #f2f2f2',
                              }}
                            >
                              <h6 className="text-blueGray-400 text-sm mt-3 ml-0 mb-2 font-bold uppercase">
                                Document Details
                              </h6>
                              <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-700 tracking-wide">
                                    Project
                                  </div>
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    {12000}
                                  </div>
                                </section>
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-500  tracking-wide">
                                    Phase
                                  </div>
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    {1200}
                                  </div>
                                </section>
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-500  tracking-wide">
                                    Document Name
                                  </div>
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    {'facing'}
                                  </div>
                                </section>
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-500  tracking-wide">
                                    Document Category
                                  </div>
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    {'kathaId'}
                                  </div>
                                </section>
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-500  tracking-wide">
                                    Size
                                  </div>
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    {'kathaId'}
                                  </div>
                                </section>
                              </section>
                              <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mt-3">
                                <section className="flex flow-row items-baseline justify-between mb-1">
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    DocumentName
                                  </div>

                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5 inline"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
                                      />
                                    </svg>

                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5 inline ml-2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                      />
                                    </svg>
                                  </div>
                                </section>
                              </section>
                              <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mt-3">
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-700 tracking-wide">
                                    Description
                                  </div>
                                </section>
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    NA
                                  </div>
                                </section>
                              </section>
                              <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mt-3">
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-700 tracking-wide">
                                    Created By
                                  </div>
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    {12000}
                                  </div>
                                </section>
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-500  tracking-wide">
                                    Owner
                                  </div>
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    {1200}
                                  </div>
                                </section>
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-500  tracking-wide">
                                    Created
                                  </div>
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    {'facing'}
                                  </div>
                                </section>
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-500  tracking-wide">
                                    Opened
                                  </div>
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    {'kathaId'}
                                  </div>
                                </section>
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-500  tracking-wide">
                                    Modified
                                  </div>
                                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                    {'kathaId'}
                                  </div>
                                </section>
                              </section>
                              <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mt-3">
                                <section className="flex flow-row justify-between mb-1">
                                  <div className="font-md text-xs text-gray-700 tracking-wide">
                                    Access
                                  </div>
                                </section>
                              </section>

                              <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </section>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
