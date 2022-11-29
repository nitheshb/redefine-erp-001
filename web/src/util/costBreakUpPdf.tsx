import { useState, useEffect, createRef, useRef } from 'react'

import { PDFExport } from '@progress/kendo-react-pdf'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { useAuth } from 'src/context/firebase-auth-context'

import { TextFieldFlat } from './formFields/TextFieldFlatType'

const CostBreakUpPdf = ({
  projectDetails,
  csMode,
  pdfExportComponent,
  selPhaseObj,
  selUnitDetails,
  leadDetailsObj1,
}) => {
  const { user } = useAuth()
  const ref = createRef()

  useEffect(() => {}, [])
  const [initialValuesA, setInitialValuesA] = useState({})
  const [costSheetA, setCostSheetA] = useState([])
  const [newSqftPrice, setNewSqftPrice] = useState(0)

  const [netTotal, setNetTotal] = useState(0)
  const [partATotal, setPartATotal] = useState(0)
  const [partBTotal, setPartBTotal] = useState(0)
  const [plotBookingAdv, setPlotBookingAdv] = useState(0)
  const [partBPayload, setPartBPayload] = useState([])
  const [psPayload, setPSPayload] = useState([])

  useEffect(() => {
    console.log('cost sheert obj change')
    setTotalFun()
  }, [costSheetA, selPhaseObj])

  useEffect(() => {
    console.log(
      'phase details are ',
      selPhaseObj,
      leadDetailsObj1,
      selUnitDetails
    )
    const {
      additonalChargesObj,
      ConstructOtherChargesObj,
      ConstructPayScheduleObj,
      paymentScheduleObj,
    } = selPhaseObj
    console.log('unit details', selUnitDetails)
    const { uid } = selUnitDetails
    const y = leadDetailsObj1[`${uid}_cs`]?.newSqftPrice || ''
    const z = leadDetailsObj1[`${uid}_cs`]?.newPLC || ''

    let x = []
    if (csMode === 'plot_cs') {
      setPartBPayload(additonalChargesObj)
      setPSPayload(paymentScheduleObj)
      x = [
        {
          myId: '1',
          units: {
            value: 'fixedcost',
            label: 'Fixed cost',
          },
          component: {
            value: 'unit_cost_charges',
            label: 'Unit Cost',
          },
          others: selUnitDetails?.rate_per_sqft,
          charges: Number.isFinite(y) ? y : selUnitDetails?.rate_per_sqft,
          TotalSaleValue: Number.isFinite(y)
            ? Number(selUnitDetails?.super_built_up_area * y)
            : Number(
                selUnitDetails?.super_built_up_area *
                  selUnitDetails?.rate_per_sqft
              ),
          // charges: y,
          gst: {
            label: '0.05',
            value: Number.isFinite(y)
              ? Number(selUnitDetails?.super_built_up_area * y)
              : Math.round(
                  selUnitDetails?.super_built_up_area *
                    selUnitDetails?.rate_per_sqft
                ) * 0.05,
          },
          TotalNetSaleValueGsT:
            (Number.isFinite(y)
              ? Number(selUnitDetails?.super_built_up_area * y)
              : Number(
                  selUnitDetails?.super_built_up_area *
                    selUnitDetails?.rate_per_sqft
                )) +
            (Number.isFinite(y)
              ? Number(selUnitDetails?.super_built_up_area * y)
              : Math.round(
                  selUnitDetails?.super_built_up_area *
                    selUnitDetails?.rate_per_sqft
                ) * 0.05),
        },
        {
          myId: '2',
          units: {
            value: 'fixedcost',
            label: 'Fixed cost',
          },
          component: {
            value: 'plc_cost_sqft',
            label: 'PLC ',
          },
          others: selUnitDetails?.PLC,
          charges: Number.isFinite(y) ? y : selUnitDetails?.PLC || 200,
          TotalSaleValue: Math.round(
            selUnitDetails?.super_built_up_area * (selUnitDetails?.PLC || 200)
          ),
          // charges: y,
          gst: {
            label: '0.05',
            value: Math.round(
              Number(
                selUnitDetails?.super_built_up_area *
                  (selUnitDetails?.PLC || 200)
              ) * 0.05
            ),
          },
          TotalNetSaleValueGsT:
            Math.round(
              selUnitDetails?.super_built_up_area * (selUnitDetails?.PLC || 200)
            ) +
            Math.round(
              Number(
                selUnitDetails?.super_built_up_area *
                  (selUnitDetails?.PLC || 200)
              ) * 0.05
            ),
        },
      ]
    } else {
      setPartBPayload(ConstructOtherChargesObj)
      setPSPayload(ConstructPayScheduleObj)
      x = [
        {
          myId: '1',
          units: {
            value: 'fixedcost',
            label: 'Fixed cost',
          },
          component: {
            value: 'villa_construct_cost',
            label: 'Villa Construction Cost',
          },
          others: selUnitDetails?.construct_price,
          charges: Number.isFinite(y) ? y : selUnitDetails?.construct_price,
          TotalSaleValue: Number.isFinite(y)
            ? Number(selUnitDetails?.builtup_area * y)
            : Number(
                selUnitDetails?.builtup_area * selUnitDetails?.construct_price
              ),
          // charges: y,
          gst: {
            label: '0.05',
            value: Number.isFinite(y)
              ? Number(selUnitDetails?.builtup_area * y)
              : Math.round(
                  selUnitDetails?.builtup_area * selUnitDetails?.construct_price
                ) * 0.05,
          },
          TotalNetSaleValueGsT:
            (Number.isFinite(y)
              ? Number(selUnitDetails?.builtup_area * y)
              : Number(
                  selUnitDetails?.builtup_area * selUnitDetails?.construct_price
                )) +
            (Number.isFinite(y)
              ? Number(selUnitDetails?.builtup_area * y)
              : Math.round(
                  selUnitDetails?.builtup_area * selUnitDetails?.construct_price
                ) * 0.05),
        },
        {
          myId: '2',
          units: {
            value: 'fixedcost',
            label: 'Fixed cost',
          },
          component: {
            value: 'Bescom_Sewage_Charges',
            label: 'Bescom & Sewage Charges ',
          },
          others: selUnitDetails?.PLC,
          charges: Number.isFinite(y) ? y : selUnitDetails?.PLC || 200,
          TotalSaleValue: Math.round(
            selUnitDetails?.builtup_area * (selUnitDetails?.PLC || 200)
          ),
          // charges: y,
          gst: {
            label: '0.05',
            value: Math.round(
              Number(
                selUnitDetails?.builtup_area * (selUnitDetails?.PLC || 200)
              ) * 0.05
            ),
          },
          TotalNetSaleValueGsT:
            Math.round(
              selUnitDetails?.builtup_area * (selUnitDetails?.PLC || 200)
            ) +
            Math.round(
              Number(
                selUnitDetails?.builtup_area * (selUnitDetails?.PLC || 200)
              ) * 0.05
            ),
        },
        {
          myId: '3',
          units: {
            value: 'fixedcost',
            label: 'Fixed cost',
          },
          component: {
            value: 'clubhouse',
            label: 'Club House ',
          },
          others: selUnitDetails?.PLC,
          charges: 0,
          TotalSaleValue: 354000,
          // charges: y,
          gst: {
            label: '0.05',
            value: Math.round(354000 * 0.0),
          },
          TotalNetSaleValueGsT: 354000,
        },
      ]
    }
    // const x = costSheetA
    let merged = []
    try {
      if (leadDetailsObj1) {
        if (leadDetailsObj1[`${uid}_cs`]['costSheetA']) {
          const removeFulCostFieldA = leadDetailsObj1[`${uid}_cs`][
            'costSheetA'
          ].filter((dat) => dat?.component?.value != 'unit_cost_charges')
          merged = [...x, ...removeFulCostFieldA]
          console.log('pending here todo')
        } else {
          merged = [...x, ...additonalChargesObj]
        }
      }
    } catch (error) {
      console.log('error at feching the leadDetails Obj')
      merged = [...x, ...additonalChargesObj]
    }

    const initformValues = {}
    merged.map((d) => {
      const x = d['component']['value']
      console.log('initial values ', x, d?.charges)
      initformValues[`${x}`] = d?.charges
    })
    console.log('initial values ', initformValues)
    setInitialValuesA(initformValues)

    setCostSheetA(x)
    console.log('phase details are ', merged, costSheetA)
  }, [selPhaseObj, leadDetailsObj1, csMode])
  const initialState = initialValuesA
  const validate = Yup.object({
    // blockReason: Yup.number()
    //   .max(15, 'Must be 15 characters or less')
    //   .required('Name is Required'),
  })
  const setTotalFun = async () => {
    const partBTotal = selPhaseObj?.additonalChargesObj.reduce(
      (partialSum, obj) => partialSum + Number(obj?.charges),
      0
    )

    const partATotal = costSheetA.reduce(
      (partialSum, obj) => partialSum + Number(obj?.TotalNetSaleValueGsT),
      0
    )
    setPartBTotal(partBTotal)
    setPartATotal(partATotal)
    setNetTotal(partATotal + partBTotal)
    selPhaseObj?.paymentScheduleObj.map((data) => {
      if (data.stage?.value === 'on_booking') {
        setPlotBookingAdv(data?.percentage)
      }
    })
  }
  const onSubmit = async (data, resetForm) => {
    console.log('customer sheet form', costSheetA, selUnitDetails, data)

    const { uid } = selUnitDetails
    const { id } = leadDetailsObj1
    // const x = {
    //   myId: '2',
    //   units: {
    //     value: 'fixedcost',
    //     label: 'Fixed cost',
    //   },
    //   component: {
    //     value: 'ratePerSqft',
    //     label: 'sqftCost',
    //   },
    //   charges: Number(newSqftPrice),
    //   gst: {
    //     label: '0',
    //     value: '0',
    //   },
    // }

    const newCostSheetA = costSheetA.map((dat) => {
      dat.charges = data[dat?.component?.value]
      return dat
    })
    console.log('customer sheet form new values is', newCostSheetA)
    // newCostSheetA.push(x)
    // i need unit_uID & unit details
    const xData = {}

    xData[`${uid}${'_cs'}`] = {
      oldUnitDetailsObj: selUnitDetails,
      newSqftPrice: Number(newSqftPrice),
      soldPrice: Number(soldPrice),
      costSheetA: newCostSheetA,
    }

    updateLeadCostSheetDetailsTo(
      orgId,
      id,
      xData,
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar,
      resetForm
    )
  }
  const changeOverallCostFun = async (inx, payload, newValue) => {
    console.log('cost sheert obj change 0')
    const y = costSheetA
    const total = Math.round(selUnitDetails?.super_built_up_area * newValue)
    const gstTotal = Math.round(
      Number(selUnitDetails?.super_built_up_area * newValue) * 0.05
    )
    y[inx].charges = newValue
    y[inx].TotalSaleValue = total
    y[inx].gst.value = gstTotal
    y[inx].TotalNetSaleValueGsT = total + gstTotal

    setCostSheetA(y)
    setTotalFun()
  }
  return (
    <div>
      <div
      // style={{
      //   position: 'absolute',
      //   left: '-1000px',
      //   top: 0,
      // }}
      >
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
            <PDFExport paperSize="A4" margin="1cm" ref={pdfExportComponent}>
              <div className="p-4">
                <div>
                  {/* upper part */}
                  <div className="flex flex-row justify-between">
                    <span className="h-full mt-10 w-[50%] items-center justify-center ">
                      <h1 className="font-playfair text-[24px]  text-gray-700 font-bold ">
                        {projectDetails?.projectName?.toUpperCase()}
                      </h1>
                    </span>
                    <div className="flex w-[25%] flex-col gap-4 mt-4">
                      <div>
                        {' '}
                        <h1 className="font-bodyLato text-gray-400 text-[10px] mb-[2px]">
                          Costsheet Id
                        </h1>
                        <p className="font-playfair font-semibold text-gray-800 text-[9px]">
                          25852332
                        </p>
                      </div>

                      <div>
                        <h1 className="font-bodyLato  text-gray-400 text-[10px] mb-[2px] ">
                          Issued By
                        </h1>
                        <p className="font-playfair font-semibold text-gray-800 text-[9px]">
                          {leadDetailsObj1?.assignedToObj?.name}
                        </p>
                        <p className="font-playfair font-semibold text-gray-800 text-[9px]">
                          Maa Homes LLP
                        </p>
                        <p className="font-playfair  text-gray-800 text-[8px]">
                          Sector-2,HSR Layout, Banglore,India
                        </p>
                      </div>
                    </div>
                    {/* form  */}
                    <div className="flex w-[25%] flex-col gap-4 mt-4">
                      <div>
                        <h1 className="font-bodyLato  text-gray-400 text-[10px] mb-[2px]">
                          Cost Sheet To
                        </h1>
                        <p className="font-playfair font-semibold text-gray-800 text-[9px]">
                          {leadDetailsObj1?.Name}
                        </p>
                        <p className="font-playfair  text-gray-800 text-[9px]">
                          {leadDetailsObj1?.Mobile}
                        </p>
                        <p className="font-playfair  text-gray-800 text-[9px]">
                          29, 1st Floor, 5th Main, KG Road, Kaveri Nagar, BSK
                          3rd Stage, Bangelore-560085
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" my-10  justify-end">
                    <h1 className="text-bodyLato text-right text-green-600 font-semibold text-[8px]">
                      Total Amount
                    </h1>
                    <p className="text-bodyLato font-bold text-right text-gray-800 text-[10px]">
                      Rs.{netTotal?.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
                      Plot Sales Value Information (A)
                    </h1>
                    <table className="w-[100%]">
                      <thead>
                        <tr className=" h-6 border-b-[0.2px] border-gray-300 w-[100%]">
                          <th className="min-w-[35%] text-[10px] text-left text-[#8993a4] font-bodyLato tracking-wide uppercase">
                            Particulars
                          </th>
                          <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase">
                            Plot Rate/Sqft
                          </th>
                          <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase">
                            Sale Value
                          </th>
                          <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase">
                            GST
                          </th>
                          <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {' '}
                        {costSheetA?.map((d1, inx) => (
                          <tr
                            key={inx}
                            className="border-b-[0.05px] border-gray-300"
                          >
                            <th className="w-[40%] text-[10px] text-left text-gray-700  ">
                              {d1?.component?.label}
                            </th>
                            <td className="w-[15%] text-[10px] text-right text-gray-700 ">
                              <TextFieldFlat
                                label=""
                                className
                                name="ratePerSqft"
                                onChange={(e) => {
                                  // setNewSqftPrice(e.target.value)
                                  console.log(
                                    'changed value is',
                                    d1,
                                    e.target.value
                                  )
                                  formik.setFieldValue(
                                    'unit_cost_charges',
                                    e.target.value
                                  )
                                  setNewSqftPrice(e.target.value)
                                  changeOverallCostFun(inx, d1, e.target.value)
                                  // formik.setFieldValue(
                                  //   'ratePerSqft',
                                  //   e.target.value
                                  // )
                                  // console.log(
                                  //   'what is =it',
                                  //   value.value
                                  // )
                                  // formik.setFieldValue(
                                  //   `${d1?.component?.value}`,
                                  //   value
                                  // )
                                }}
                                // value={formik.values[`unit_cost_charges`]}
                                value={d1?.charges?.toLocaleString('en-IN')}
                                // value={newSqftPrice}
                                // type="number"
                              />
                              <TextFieldFlat
                                className="hidden"
                                label=""
                                name={d1?.component?.value}
                                // onChange={(value) => {
                                //   console.log('what is =it', value.value)
                                //   formik.setFieldValue(
                                //     `${d1?.component?.value}`,
                                //     value
                                //   )
                                // }}
                                // value={
                                //   formik.values[`${d1?.component?.value}`]
                                // }
                                // value={d1?.charges}
                                type="number"
                              />
                            </td>
                            <td className="w-[15%] text-[10px] text-right text-gray-700 ">
                              {d1?.TotalSaleValue?.toLocaleString('en-IN')}
                            </td>
                            <td className="w-[15%] text-[10px] text-right text-gray-700 ">
                              {d1?.gst?.value?.toLocaleString('en-IN')}
                            </td>
                            <td className="w-[15%] text-[10px] text-right text-gray-800 ">
                              {d1?.TotalNetSaleValueGsT?.toLocaleString(
                                'en-IN'
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-b-[0.05px] border-gray-300">
                          <th className="w-[40%] text-[10px] text-left text-gray-800 ">
                            Total (A)
                          </th>
                          <td className="w-[15%] font-bold text-[10px] text-right text-gray-800 ">
                            {costSheetA
                              .reduce(
                                (partialSum, obj) =>
                                  partialSum + Number(obj?.charges),
                                0
                              )
                              ?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] font-bold  text-[10px] text-right text-gray-800 ">
                            {costSheetA
                              .reduce(
                                (partialSum, obj) =>
                                  partialSum + Number(obj?.TotalSaleValue),
                                0
                              )
                              ?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] font-bold  text-[10px] text-right text-gray-800 ">
                            {costSheetA
                              .reduce(
                                (partialSum, obj) =>
                                  partialSum + Number(obj?.gst?.value),
                                0
                              )
                              ?.toLocaleString('en-IN')}
                          </td>
                          <td className="w-[15%] font-bold  text-[10px] text-right text-gray-800 ">
                            {partATotal?.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h1 className=" mt-10 mb-1 text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-1">
                      Other Charges (B)
                    </h1>
                    <table className="w-full">
                      <thead>
                        {' '}
                        <tr className=" h-6  border-b-[0.2px] border-gray-300">
                          <th className="w-[40%] text-[10px] text-left text-gray-700 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                            Particulars
                          </th>
                          <th className="w-[45%] text-[10px] text-right text-gray-700 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                            Timeline
                          </th>
                          <th className="w-[15%] text-[10px] text-right text-gray-700  text-[#8993a4] font-bodyLato tracking-wide uppercase">
                            Total Inc GST
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {partBPayload?.map((d1, inx) => (
                          <tr
                            key={inx}
                            className="border-b-[0.05px] border-gray-300"
                          >
                            <th className=" text-[10px] text-left text-gray-700 ">
                              {d1?.component?.label} (0.05% Plor Sale value)
                            </th>
                            <td className="text-[10px] text-right text-gray-700 ">
                              {d1?.description}
                            </td>
                            <td className="text-[10px] text-right text-gray-700 ">
                              {Number(d1?.charges)?.toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-b-[0.05px] border-gray-300">
                          <th className="text-[10px] text-left text-gray-700 ">
                            Total (B)
                          </th>
                          <td className="text-[10px] text-right text-gray-400 "></td>
                          <td className="text-[10px] text-right text-gray-800 font-bold ">
                            {partBTotal?.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <section className="flex flex-row justify-between  mt-4 rounded">
                      <h1 className=" mt-4 text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
                        Total Plot Sale Value(A+B)
                      </h1>
                      <section className=" mt-4 text-green-600  ">
                        {netTotal?.toLocaleString('en-IN')}
                      </section>
                    </section>
                    <h1 className=" mt-10 text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
                      Plot - Payment Schedule
                    </h1>
                    <table className="w-full">
                      <thead>
                        {' '}
                        <tr className=" h-6 border-b-[0.2px] border-gray-300">
                          <th className="w-[40%] text-[10px] text-left text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                            Particulars
                          </th>
                          <th className="w-[45%] text-[10px] text-right text-gray-400  text-[#8993a4] font-bodyLato tracking-wide uppercase">
                            Payment Timeline
                          </th>
                          <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                            Total inc GST
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {psPayload?.map((d1, inx) => (
                          <tr
                            key={inx}
                            className="border-b-[0.05px] border-gray-300"
                          >
                            <th className=" text-[10px] text-left text-gray-700 ">
                              {d1?.stage?.label}
                            </th>
                            <td className="text-[10px] text-right text-gray-700 ">
                              {d1?.description}
                            </td>
                            {csMode === 'plot_cs' && (
                              <td className="text-[10px] text-right text-gray-800 ">
                                {['on_booking'].includes(d1?.stage?.value)
                                  ? Number(d1?.percentage)?.toLocaleString(
                                      'en-IN'
                                    )
                                  : Math.round(
                                      (netTotal - plotBookingAdv) *
                                        (d1?.percentage / 100)
                                    ).toLocaleString('en-IN')}
                              </td>
                            )}
                            {csMode != 'plot_cs' && (
                              <td className="text-[10px] text-right text-gray-800 ">
                                {['Total_Other_Charges_Amenities:\t'].includes(
                                  d1?.stage?.value
                                )
                                  ? Number(partBTotal)?.toLocaleString('en-IN')
                                  : Math.round(
                                      (netTotal - partBTotal) *
                                        (d1?.percentage / 100)
                                    ).toLocaleString('en-IN')}
                              </td>
                            )}
                          </tr>
                        ))}

                        <tr className="border-b-[0.05px] border-gray-300">
                          <th className="text-[10px] text-left text-gray-800 ">
                            Plot Value Total Rs.:
                          </th>
                          <td className="text-[10px] text-right text-gray-400 "></td>
                          <th className="text-[10px] text-right text-gray-800 ">
                            {netTotal?.toLocaleString('en-IN')}
                          </th>
                        </tr>
                      </tbody>
                    </table>

                    <h1 className=" mt-10 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                      * Registration & Stamp Duty charges and any taxes apart
                      from GST are to be paid based on the prevailing
                      guidelines.
                    </h1>
                    <h1 className=" my-2 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                      * GST are calculated as per current norms & the same may
                      change as per government guidlines. Presently @ 5% on
                      Construction Cost and 18% on Other Charges (Amenities)
                    </h1>
                    <h1 className=" my-2 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                      * As per Income Tax rules, please deduct TDS as applicable
                      from all the payments made towards your unit(including the
                      PDCs). If your bank disburses the full smount, then you
                      will have to pay the TDS seperately
                    </h1>
                    <h1 className=" my-2 text-bodyLato text-left text-gray-400 font-semibold text-[8px]">
                      * Provide us the duly signed Form 16B to pass the credit
                      for TDS amount.
                    </h1>
                  </div>
                  {/* end of paper */}
                </div>
              </div>
            </PDFExport>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CostBreakUpPdf
