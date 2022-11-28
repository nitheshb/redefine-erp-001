import { useState } from 'react'

function UnitTransactionForm() {
  const [serviceList, setServiceList] = useState([{ service: '' }])

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target
    const list = [...serviceList]
    list[index][name] = value
    setServiceList(list)
  }

  const handleServiceRemove = (index) => {
    const list = [...serviceList]
    list.splice(index, 1)
    setServiceList(list)
  }

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: '' }])
  }

  return (
    <>
      <div className="mx-10 o mt-10 ">
        <div className="flex justify-between my-8">
          <p className="text-black text-lg font-semibold">Payments Schedule</p>
          <p className="text-black text-lg font-semibold">Paid Total: 8.7</p>
        </div>
        <div className="">
          <div className="flex flex-col mx-0 mt-8">
            <table className="min-w-full divide-y divide-slate-500">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-left text-sm font-normal text-slate-700 sm:pr-6 md:pr-0 max-w-[100px] w-[49px]"
                  >
                    SNo
                  </th>
                  <th
                    scope="col"
                    colSpan={3}
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                  >
                    Event
                  </th>

                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                  >
                    Scheduled Amount
                  </th>

                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                  >
                    Demand Date
                  </th>

                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                  >
                    Received
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                  >
                    Balance
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                  >
                    Aging In Days
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                  >
                    Delay Interest
                  </th>

                  <th
                    scope="col"
                    className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { category: 'Unit Cost', val: '₹12000' },
                  { category: 'Car Parking', val: '₹12000' },
                  { category: 'Electricity/Water Sewage', val: '₹12000' },
                  { category: 'Maintenance Charges', val: '₹12000' },
                  { category: 'Power Back-up Charges', val: '₹12000' },
                  { category: 'Maintenance Deposit', val: '₹12000' },
                  { category: 'Club House Membership', val: '₹12000' },
                  { category: 'Premium', val: '₹12000' },
                  {
                    category: 'Legal Documentation Charges',
                    val: '₹12000',
                  },
                  { category: 'Other Charges', val: '₹12000' },
                ].map((dat, i) => (
                  <tr className="border-b border-slate-200" key={i}>
                    <td
                      className="py-4 pl-3 pr-4 text-sm text-center text-slate-500 sm:pr-6 md:pr-0 max-w-[14px]"
                      colSpan={1}
                    >
                      {i + 1}
                      {')'}
                    </td>
                    <td
                      className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0"
                      colSpan={3}
                    >
                      <div className="font-medium text-slate-700">
                        {dat?.category}
                      </div>
                      <div className="mt-0.5 text-slate-500 sm:hidden">
                        1 unit at $0.00
                      </div>
                    </td>

                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {dat?.val}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {dat?.val}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {dat?.val}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {dat?.val}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {dat?.val}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {dat?.val}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {dat?.val}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {dat?.val}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                  >
                    {'     '} {'Total'}
                  </th>
                  <th
                    scope="row"
                    className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500"
                  ></th>
                  <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                    ₹ 12,000
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="space-y-6 pb-10">
          <div>
            <div className="relative bg-white p-10 rounded-xl">
              <form className="App" autoComplete="off">
                <div className="form-field">
                  <label htmlFor="service">Service(s)</label>
                  {serviceList.map((singleService, index) => (
                    <div key={index} className="services">
                      <div className="first-division">
                        <input
                          name="service"
                          type="text"
                          id="service"
                          value={singleService.service}
                          onChange={(e) => handleServiceChange(e, index)}
                          required
                        />
                        {serviceList.length - 1 === index &&
                          serviceList.length < 4 && (
                            <button
                              type="button"
                              onClick={handleServiceAdd}
                              className="add-btn"
                            >
                              <span>Add a Service</span>
                            </button>
                          )}
                      </div>
                      <div className="second-division">
                        {serviceList.length !== 1 && (
                          <button
                            type="button"
                            onClick={() => handleServiceRemove(index)}
                            className="remove-btn"
                          >
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="output">
                  <h2>Output</h2>
                  {serviceList &&
                    serviceList.map((singleService, index) => (
                      <ul key={index}>
                        {singleService.service && (
                          <li>{singleService.service}</li>
                        )}
                      </ul>
                    ))}
                </div>
              </form>
              <div className="absolute top-0 right-0 flex space-x-2 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UnitTransactionForm
