import { ToWords } from 'to-words'

const toWords = new ToWords({
  localeCode: 'en-IN',
})
const PhaseDetailsCard = ({ kind, feedData, bg, currency }) => {
  return (
    <div
      className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
      style={{ backgroundColor: bg }}
    >
      <h3 className="m-0 ml-2 text-1xl font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl">
        {kind}
      </h3>
      {/* <div className="flex items-end mt-6 leading-7 text-gray-900 border-0 border-gray-200">
        <p className="box-border m-0 text-2xl font-semibold leading-none border-solid">
          $5
        </p>
        <p
          className="box-border m-0 border-solid"
          style={{ borderImage: 'initial' }}
        >
          / montxl
        </p>
      </div> */}

      <ul className="flex-1 p-0 mt-4 ml-2 mr-2 leading-7 text-gray-900 border-0 border-gray-200">
        {feedData.map((data, i) => {
          return (
            <li
              key={i}
              className="flex justify-between  w-full mb-5  font-semibold text-left border-dotted border-b "
            >
              <span className="inline-flex w-32">
                {/* <svg
                  className="w-5 h-5 mr-0.5 font-semibold leading-7 text-indigo-500 sm:h-5 sm:w-5 md:h-6 md:w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg> */}
                <span className="text-sm font-medium text-gray-900">
                  {' '}
                  {data.k}
                </span>
              </span>

              <div
                className="relative flex flex-col items-center group"
                style={{ alignItems: 'end' }}
              >
                <div
                  className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex"
                  style={{ alignItems: 'end', width: '300px' }}
                >
                  <span
                    className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                    style={{
                      color: 'black',
                      background: '#e2c062',
                      maxWidth: '300px',
                    }}
                  >
                    <span className="italic">
                      {toWords.convert(data.v, { currency: currency })}
                    </span>
                    {console.log(
                      toWords.convert(data.v, { currency: currency })
                    )}
                  </span>
                  <div
                    className="w-3 h-3  -mt-2 rotate-45 bg-black"
                    style={{ background: '#e2c062', marginRight: '12px' }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700">
                  {data.v.toLocaleString('en-IN')}
                </span>
              </div>
              <div
                className="relative flex flex-col items-center group"
                style={{ alignItems: 'end' }}
              >
                <div
                  className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex"
                  style={{ alignItems: 'end', width: '300px' }}
                >
                  <span
                    className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                    style={{
                      color: 'black',
                      background: '#e2c062',
                      maxWidth: '300px',
                    }}
                  >
                    <span className="italic">
                      {toWords.convert(data.v, { currency: currency })}
                    </span>
                    {console.log(
                      toWords.convert(data.v, { currency: currency })
                    )}
                  </span>
                  <div
                    className="w-3 h-3  -mt-2 rotate-45 bg-black"
                    style={{ background: '#e2c062', marginRight: '12px' }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700">
                  {data.v.toLocaleString('en-IN')}
                </span>
              </div>
              <div
                className="relative flex flex-col items-center group"
                style={{ alignItems: 'end' }}
              >
                <div
                  className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex"
                  style={{ alignItems: 'end', width: '300px' }}
                >
                  <span
                    className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                    style={{
                      color: 'black',
                      background: '#e2c062',
                      maxWidth: '300px',
                    }}
                  >
                    <span className="italic">
                      {toWords.convert(data.v, { currency: currency })}
                    </span>
                    {console.log(
                      toWords.convert(data.v, { currency: currency })
                    )}
                  </span>
                  <div
                    className="w-3 h-3  -mt-2 rotate-45 bg-black"
                    style={{ background: '#e2c062', marginRight: '12px' }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700">
                  {data.v.toLocaleString('en-IN')}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PhaseDetailsCard
