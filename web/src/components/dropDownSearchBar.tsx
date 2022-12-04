import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid'

export default function DropDownSearchBar({
  type,
  viewUnitStatusA,
  pickCustomViewer,
  dropDownItemsA,
  selProjectIs,
}) {
  return (
    <div className="flex-shrink-0 z-10 inline-flex items-center  pl-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-0 py-0 text-sm font-semibold text-black-500 bg- rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <>
              <span className=" text-[12px] tracking-wide text-[#0091ae] ">
                {selProjectIs?.projectName || type?.toLocaleUpperCase()}
              </span>
              <ChevronDownIcon className="w-5 h-5 mr-3 mt-[1px] inline text-[#058527]" />
            </>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`${
              ['Facing'].includes(type) ? 'right-0' : 'left-[-14px]'
            }  absolute  w-52 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9000]`}
            style={{ zIndex: '9', marginTop: '14px' }}
          >
            <div className="px-1 py-1 ">
              <>
                {dropDownItemsA.map((viewData, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? 'bg-violet-500 text-white rounded-sm'
                            : 'text-gray-900'
                        } group flex  items-center w-full px-2 py-2 text-sm`}
                        onClick={() => pickCustomViewer(viewData)}
                      >
                        {viewUnitStatusA.includes(viewData) ? (
                          <CheckIcon
                            className="h-5 w-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <CheckIcon
                            className="w-5 h-5 mr-2 text-transparent"
                            aria-hidden="true"
                          />
                        )}
                        {viewData?.projectName}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
