/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, createRef } from 'react'

import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import {
  updateLeadCustomerDetailsTo,
  getAllProjects,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { TextFieldFlat } from 'src/util/formFields/TextFieldFlatType'

const PaymentScheduleSheet = ({
  title,
  leadDetailsObj2,
  selUnitDetails,
  dialogOpen,
  phase,
  soldPrice,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [paymentScheduleA, setPaymentScheduleA] = useState([])
  useEffect(() => {
    setPaymentScheduleA(phase?.paymentScheduleObj || [])
    console.log('what is this value ', phase?.paymentScheduleObj)
  }, [phase])

  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(usersListA)
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA)

        setusersList(usersListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    console.log('new customer object', leadDetailsObj2)
  }, [leadDetailsObj2])

  useEffect(() => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        console.log('fetched users list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])

  const devTypeA = [
    {
      name: 'Outright',
      img: '/apart.svg',
    },
    {
      name: 'Joint',
      img: '/apart1.svg',
    },
  ]
  const ref = createRef()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [devType, setdevType] = useState(devTypeA[0])
  const [initialValuesA, setInitialValuesA] = useState({})
  const [costSheetA, setCostSheetA] = useState([])
  const [newSqftPrice, setNewSqftPrice] = useState(0)
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

  const typeSel = async (sel) => {
    await console.log('value is', selected)
    await setSelected(sel)
    await console.log('thsi si sel type', sel, selected)
  }
  const devTypeSel = async (sel) => {
    await setdevType(sel)
  }

  const validate = Yup.object({
    // blockReason: Yup.number()
    //   .max(15, 'Must be 15 characters or less')
    //   .required('Name is Required'),
  })

  useEffect(() => {
    console.log('phase details are ', phase)
    const { additonalChargesObj, paymentScheduleObj } = phase
    console.log('unit details', selUnitDetails)
    const { uid } = selUnitDetails
    const y =
      leadDetailsObj2?.Status === 'booked'
        ? leadDetailsObj2[`${uid}_cs`]?.newSqftPrice
        : ''

    const x = [
      // {
      //   myId: '1',
      //   units: {
      //     value: 'fixedcost',
      //     label: 'Fixed cost',
      //   },
      //   component: {
      //     value: 'unit_cost_charges',
      //     label: 'Unit Cost',
      //   },
      //   charges: typeof y
      //     ? selUnitDetails?.super_built_up_area * y
      //     : selUnitDetails?.super_built_up_area * selUnitDetails?.rate_per_sqft,
      //   gst: {
      //     label: '0',
      //     value: '0',
      //   },
      // },
    ]
    // const x = costSheetA
    let merged = []
    try {
      if (leadDetailsObj2) {
        if (leadDetailsObj2[`${uid}_ps`]['paymentScheduleA']) {
          const removeFulCostFieldA = leadDetailsObj2[`${uid}_ps`][
            'paymentScheduleA'
          ].filter((dat) => dat?.component?.value != 'unit_cost_charges')
          merged = [...x, ...removeFulCostFieldA]
          console.log('pending here todo')
        } else {
          merged = [...x, ...paymentScheduleObj]
        }
      }
    } catch (error) {
      console.log('error at feching the leadDetails Obj')
      merged = [...x, ...paymentScheduleObj]
    }

    const initformValues = {}
    merged.map((d) => {
      const x = d['stage']['value']
      console.log('initial values ', x, d?.charges)
      initformValues[`${x}`] = d?.percentage
    })
    console.log('initial values ', initformValues)
    setInitialValuesA(initformValues)

    setCostSheetA(merged)
    console.log('phase details are ', merged, costSheetA)
  }, [phase, leadDetailsObj2])

  const { uid } = selUnitDetails

  const initialState = initialValuesA

  const validateSchema = Yup.object({
    // customerName1: Yup.string().required('Required'),
    // co_Name1: Yup.string().required('Required'),
    // panNo1: Yup.string().required('Required'),
    // panDocUrl1: Yup.string().required('Required'),
    // aadharNo1: Yup.string().required('Required'),
    // aadharUrl1: Yup.string().required('Required'),
    // occupation1: Yup.string().required('Required'),
    // phoneNo1: Yup.string().required('Required'),
    // email1: Yup.string().required('Required'),
    // aggrementAddress: Yup.string().required('Required'),
  })

  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }
  const calTotal = (costSheetA, formik) => {
    console.log('cehck this bro', costSheetA)

    const total = costSheetA.reduce(
      (partialSum, obj) =>
        partialSum +
        (obj['stage'].value === 'Booking'
          ? Number(formik.values[`${obj['stage'].value}`])
          : Number(
              (soldPrice - formik.values[`Booking`]) *
                Number(formik.values[`${obj['stage'].value}`]) *
                0.01
            )),
      0
    )

    // setSoldPrice(total)
    return total
  }

  const onSubmit = async (data, resetForm) => {
    console.log('customer details form', data)
    const {
      customerName1,
      co_Name1,
      phoneNo1,
      email1,
      dob1,
      marital1,
      panNo1,
      panDocUrl1,
      aadharNo1,
      aadharUrl1,
      occupation1,
      companyName1,
      customerName2,
      co_Name2,
      phoneNo2,
      email2,
      dob2,
      marital2,
      panNo2,
      panDocUrl2,
      aadharNo2,
      aadharUrl2,
      occupation2,
      companyName2,
      aggrementAddress,
      industry,
      designation,
      annualIncome,
      leadSource,
      sourceOfPay,
      purpose,
      bookingSource,
      bookedBy,
      purchasePurpose,
    } = data
    const { uid } = selUnitDetails
    const customerDetailsObj = {
      customerName1: customerName1,
      co_Name1: co_Name1,
      phoneNo1: phoneNo1,
      email1: email1,
      dob1: dob1,
      marital1: marital1,
      panNo1: panNo1,
      panDocUrl1: panDocUrl1,
      aadharNo1: aadharNo1,
      aadharUrl1,
      occupation1,
      companyName1,
    }
    const secondaryCustomerDetailsObj = {
      customerName2,
      co_Name2,
      phoneNo2,
      email2,
      dob2,
      marital2,
      panNo2,
      panDocUrl2,
      aadharNo2,
      aadharUrl2,
      occupation2,
      companyName2,
    }
    const aggrementDetailsObj = {
      aggrementAddress,
    }

    const xData = {}
    xData[`${uid}${'_source_of_pay'}`] = { self: 20, bank: 80 } // sourceOfPay
    xData[`${uid}${'_otherInfo'}`] = { leadSource, sourceOfPay, purpose }

    const updateDoc = {
      customerDetailsObj,
      secondaryCustomerDetailsObj,
      aggrementDetailsObj,
      ...xData,
      industry,
      designation,
      annualIncome,
    }
    const { id } = leadDetailsObj2
    console.log('did you find my id', id, leadDetailsObj2)

    updateLeadCustomerDetailsTo(
      orgId,
      id,
      updateDoc,
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar,
      resetForm
    )
  }
  return (
    <>
      <div className="">
        <div className=" z-10"></div>

        <div className="grid gap-8 grid-cols-1">
          <div className="flex flex-col rounded-lg bg-white mt-10">
            <div className="mt-0">
              <Formik
                enableReinitialize={true}
                initialValues={initialState}
                validationSchema={validateSchema}
                onSubmit={(values, { resetForm }) => {
                  onSubmit(values, resetForm)
                }}
              >
                {(formik) => (
                  <Form>
                    <div className="form">
                      {/* Phase Details */}

                      <section className=" bg-blueGray-50">
                        <div className="w-full  mx-auto ">
                          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F6F7FE] border-0">
                            <div className="rounded-t bg-[#F6F7FE] mb-0 px-3 py-2">
                              <div className="text-center flex justify-between">
                                <p className="text-sm font-extrabold tracking-tight uppercase font-body mt-2">
                                  Payment Schedule
                                </p>

                                {/* <button
                                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                  type="button"
                                >
                                  Receipt Download
                                </button> */}
                                <div className="flex-auto flex flex-row-reverse">
                                  <button
                                    className="h-[30px] text-base hover:scale-110 focus:outline-none flex justify-center px-2  rounded font-bold cursor-pointer
                        hover:bg-teal-200
                        bg-teal-100
                        text-teal-700
                        border duration-200 ease-in-out
                        border-teal-100 transition"
                                    type="button"
                                  >
                                    {'>'}
                                  </button>
                                  <button
                                    className=" mx-2 h-[30px] text-base hover:scale-110 focus:outline-none flex justify-center px-2  rounded font-bold cursor-pointer
        hover:bg-teal-200
        bg-teal-100
        text-teal-700
        border duration-200 ease-in-out
        border-teal-100 transition"
                                    type="button"
                                  >
                                    {'<'}{' '}
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col mx-0 bg-[#F6F7FE] ">
                              <div className="px-2 py-2">
                                <Formik
                                  enableReinitialize={true}
                                  initialValues={initialState}
                                  validationSchema={validate}
                                  onSubmit={(values, { resetForm }) => {
                                    console.log('i was clicked')
                                    onSubmit(values, resetForm)
                                  }}
                                >
                                  {(formik) => (
                                    <Form ref={ref}>
                                      <section
                                        className="bg-[#fff] p-2 rounded-md "
                                        style={{
                                          boxShadow: '0 1px 12px #f2f2f2',
                                        }}
                                      >
                                        <table className="divide-y divide-slate-500 w-full overflow-x-auto ">
                                          <thead>
                                            <tr>
                                              <th
                                                scope="col"
                                                className="py-3.5 pl-3 pr-4 text-left text-sm font-bold uppercase text-slate-700 sm:pr-6 md:pr-0 max-w-[100px] w-[49px]"
                                              >
                                                SNo
                                              </th>
                                              <th
                                                scope="col"
                                                colSpan={3}
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-bold uppercase text-slate-700 sm:pl-6 md:pl-0"
                                              >
                                                Description
                                              </th>

                                              <th
                                                scope="col"
                                                className="py-3.5 pl-3 pr-8 text-right text-sm font-bold uppercase text-slate-700 sm:pr-6 md:pr-0"
                                              >
                                                %
                                              </th>
                                              <th
                                                scope="col"
                                                className="py-3.5 pl-3 pr-4 text-right text-sm font-bold uppercase text-slate-700 sm:pr-6 md:pr-0"
                                              >
                                                Value
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {paymentScheduleA?.map(
                                              (d1, inx) => (
                                                <tr
                                                  className="border-b border-slate-200"
                                                  key={inx}
                                                >
                                                  <td
                                                    className="py-4 pl-3 pr-4 text-sm text-center text-slate-500 sm:pr-6 md:pr-0 max-w-[14px]"
                                                    colSpan={1}
                                                  >
                                                    {inx + 1}
                                                    {')'}
                                                  </td>
                                                  <td
                                                    className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0"
                                                    colSpan={3}
                                                  >
                                                    <div className="font-medium text-slate-700">
                                                      {d1?.stage?.label}{' '}
                                                    </div>
                                                    <div className="mt-0.5 text-slate-500 sm:hidden">
                                                      1 unit at $0.00
                                                    </div>
                                                  </td>

                                                  <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                    {d1?.stage?.value ===
                                                    'Booking' ? (
                                                      <>
                                                        <TextFieldFlat
                                                          label=""
                                                          name="Booking"
                                                          onChange={(e) => {
                                                            // setNewSqftPrice(e.target.value)
                                                            // console.log(
                                                            //   'changed value is',
                                                            //   e.target.value
                                                            // )
                                                            // formik.setFieldValue(
                                                            //   'unit_cost_charges',
                                                            //   selUnitDetails?.super_built_up_area *
                                                            //     e.target.value
                                                            // )
                                                            // setNewSqftPrice(
                                                            //   e.target.value
                                                            // )
                                                            formik.setFieldValue(
                                                              `${
                                                                d1?.stage?.value
                                                              }_${'cal'}`,

                                                              d1?.stage
                                                                ?.value ===
                                                                'Booking'
                                                                ? d1?.percentage
                                                                : Number(
                                                                    (soldPrice -
                                                                      formik
                                                                        .values[
                                                                        `Booking`
                                                                      ]) *
                                                                      d1?.percentage *
                                                                      0.01
                                                                  )
                                                            )
                                                          }}
                                                          value={
                                                            formik.values[
                                                              `Booking`
                                                            ]
                                                          }
                                                          // value={newSqftPrice}
                                                          type="number"
                                                        />
                                                      </>
                                                    ) : (
                                                      <TextFieldFlat
                                                        label=""
                                                        onChange={(e) => {
                                                          formik.setFieldValue(
                                                            `${
                                                              d1?.stage?.value
                                                            }_${'cal'}`,

                                                            d1?.stage?.value ===
                                                              'Booking'
                                                              ? d1?.percentage
                                                              : Number(
                                                                  (soldPrice -
                                                                    formik
                                                                      .values[
                                                                      `Booking`
                                                                    ]) *
                                                                    d1?.percentage *
                                                                    0.01
                                                                )
                                                          )
                                                        }}
                                                        name={d1?.stage?.value}
                                                        type="number"
                                                      />
                                                    )}
                                                  </td>
                                                  <td
                                                    className="py-4 pl-4 pr-3 text-sm text-right sm:pl-6 md:pl-0"
                                                    colSpan={3}
                                                  >
                                                    <div className="font-medium text-slate-700">
                                                      {d1?.stage?.value ===
                                                      'Booking'
                                                        ? d1?.percentage
                                                        : Number(
                                                            (soldPrice -
                                                              formik.values[
                                                                `Booking`
                                                              ]) *
                                                              d1?.percentage *
                                                              0.01
                                                          )}
                                                    </div>
                                                    <div className="mt-0.5 text-slate-500 sm:hidden">
                                                      1 unit at $0.00
                                                    </div>
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                          <tfoot>
                                            <tr>
                                              <th
                                                scope="row"
                                                colSpan={3}
                                                className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                              >
                                                {'     '}
                                              </th>
                                              <th
                                                scope="row"
                                                className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500"
                                              ></th>
                                              <th
                                                scope="row"
                                                className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500"
                                              ></th>
                                              <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                                <span className="font-semibold mr-4">
                                                  Total {'   '}
                                                </span>
                                                ₹
                                                {calTotal(
                                                  paymentScheduleA,
                                                  formik
                                                )}
                                                {/* {paymentScheduleA.reduce(
                                                  (partialSum, obj) =>
                                                    partialSum +
                                                    Number(
                                                      formik.values[
                                                        `${obj['percentage']}`
                                                      ]
                                                    ),
                                                  0
                                                )} */}
                                                {/* {paymentScheduleA.reduce(function (acc, obj) {
                                    return acc + obj.x
                                  }, 0)} */}
                                              </td>
                                            </tr>
                                          </tfoot>
                                        </table>
                                      </section>
                                      <div className="flex flex-col mt-2 p-4 ">
                                        <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                                          <button
                                            onClick={() => dialogOpen(false)}
                                            type="button"
                                            className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                                          >
                                            {' '}
                                            Send to WhatsApp{' '}
                                          </button>
                                          {/* <Pdf targetRef={ref} filename="post.pdf">
                              {({ toPdf }) => (
                                <button
                                  onClick={toPdf}
                                  type="button"
                                  className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                                >
                                  {' '}
                                  Download{' '}
                                </button>
                              )}
                            </Pdf> */}
                                          <button
                                            onClick={() => downloadPdf()}
                                            type="button"
                                            className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                                          >
                                            {' '}
                                            Download{' '}
                                          </button>

                                          <button
                                            className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-sm hover:shadow-lg hover:bg-green-500"
                                            type="submit"
                                            disabled={loading}
                                            // onClick={() => submitFormFun(formik)}
                                          >
                                            {/* {loading && <Loader />} */}
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </Form>
                                  )}
                                </Formik>
                              </div>
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

      {/* old form  */}
    </>
  )
}

export default PaymentScheduleSheet
