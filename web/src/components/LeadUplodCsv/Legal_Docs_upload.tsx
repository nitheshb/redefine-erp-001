import React, { useEffect, useState } from 'react'

import { Dialog } from '@headlessui/react'
import { Button, Card, CardContent, Grid } from '@material-ui/core'
import csv from 'csvtojson'
import { Form, Formik } from 'formik'
import { parse } from 'papaparse'
import * as Yup from 'yup'

import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { TextField2 } from 'src/util/formFields/TextField2'

import { MultipleFileUploadField } from './MultipleFileUploadField'

export default function LegalDocsUplaodHome({
  title,
  pId,
  myPhase,
  myBlock,
  projectsList,
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
    <div className="h-full flex flex-col pb-6 bg-white shadow-xl overflow-y-scroll">
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
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg bg-[#F9FBFB] border-0">
                          <div className="rounded-t bg-[#F1F5F9] mb-0 px-3 py-2">
                            <div className="text-center flex justify-between">
                              <p className="text-xs font-extrabold tracking-tight uppercase font-body my-[2px] p-1 ml-2">
                                Legal Documents Provision
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
                              <h6 className="text-blueGray-400 text-sm mt-3 ml-3 mb-6 font-bold uppercase">
                                Attachment To
                              </h6>
                              <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="w-full mb-3">
                                    <CustomSelect
                                      name="mode"
                                      label="Project Name"
                                      className="input"
                                      onChange={({ value }) => {
                                        formik.setFieldValue('mode', value)
                                      }}
                                      value={formik.values.mode}
                                      options={projectsList}
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="w-full mb-3">
                                    <CustomSelect
                                      name="mode"
                                      label="Project Phase"
                                      className="input"
                                      onChange={({ value }) => {
                                        formik.setFieldValue('mode', value)
                                      }}
                                      value={formik.values.mode}
                                      options={projectsList}
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="w-full mb-3">
                                    <CustomSelect
                                      name="mode"
                                      label="Document Name"
                                      className="input"
                                      onChange={({ value }) => {
                                        formik.setFieldValue('mode', value)
                                      }}
                                      value={formik.values.mode}
                                      options={projectsList}
                                    />
                                  </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4 mt-6">
                                  {/* <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Mode"
                                      name="mode"
                                      type="text"
                                    />
                                  </div> */}
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Document Name"
                                      name="amount"
                                      type="number"
                                    />
                                  </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Upload Document"
                                      name="chequeno"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr className="mt-6 border-b-1 border-blueGray-300" />

                              <h6 className="text-blueGray-400 text-sm mt-3 ml-3 pt-4 mb-6 font-bold uppercase">
                                Description
                              </h6>
                              <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Description"
                                      name="bookingSource"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr className="mt-6 border-b-1 border-blueGray-300" />
                              <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                                <button
                                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  Download
                                </button>
                                <button
                                  className="bg-green-400 text-gray-600 active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                  type="submit"
                                >
                                  {'Upload'}
                                </button>
                              </div>
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
      <div className="grid  gap-8 grid-cols-1">
        {title === 'import Unit' && (
          <div className="flex flex-col  my-10 rounded-lg  px-4 m-4 mt-12">
            Block:{' '}
          </div>
        )}
        <div className="flex flex-col  my-10 rounded-lg  px-4 m-4 mt-12">
          <Formik
            initialValues={{ files: null }}
            // validationSchema={object({
            //   files: array(
            //     object({
            //       url: string().required(),
            //     })
            //   ),
            // })}
            onSubmit={async (values) => {
              console.log('ehcek1', {
                fileName: values.files[0].file.name,
                type: values.files[0].type,
                size: `${values.files[0].size} bytes`,
              })

              if (title === 'Plan Diagram') {
              } else {
                try {
                  const jsonArray = await csv().fromFile(
                    values.files[0].file.path
                  )

                  await console.log('jsonArray is ', jsonArray)
                } catch (error) {
                  console.log('error at jsonArray', error)
                }

                parse(values.files[0].file, {
                  header: true,
                  // download: true,
                  complete: async function (input) {
                    await setexistingCols((existing) => [
                      ...existing,
                      ...input.data,
                    ])
                    // let x =   await getLedsData()
                    console.log('Finished:', existingCols)
                  },
                })
              }
              // const myFiles = Array.from(values.files)
              // console.log('upload file values', values)
              // console.log('vsv data is ', myFiles)

              // myFiles.forEach((file) => {
              //   console.log('filer is ', file)
              //   try {
              //     parse(file, {
              //       complete: function (results) {
              //         console.log('Finished:', results.data)
              //       },
              //     })
              //   } catch (error) {
              //     console.log('error', error)
              //   }
              // })
              // const reader = new FileReader()
              // const y = await reader.readAsText(values.files[0])
              // await console.log('yo yo', y)
              // Array.from(values.files)
              //   .filter((file) => file.type === 'text/csv')

              // myFiles.forEach(async (file) => {
              //   // const text = await file.text()
              //   console.log('ami i here')

              //   const result = await parse(file, {
              //     complete: function (results) {
              //       console.log('Finished:', results.data)
              //     },
              //   })
              //   await console.log('result is ', result)
              // })

              return new Promise((res) => setTimeout(res, 2000))
            }}
          >
            {() => (
              // {parseExcel(values)}
              <Form>
                <Grid container spacing={2} direction="column">
                  <MultipleFileUploadField
                    name="files"
                    title={title}
                    pId={pId}
                    myPhase={myPhase}
                    myBlock={myBlock}
                  />

                  {/* <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!isValid || isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid> */}
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
