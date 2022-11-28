import React, { useState } from 'react'

import { Switch } from '@headlessui/react'

const CheckBox = () => {
  const [enabled, setEnabled] = useState(false)
  return (
    <section className="md:w-[30vw] flex flex-col  md:px-8  rounded-md bg-gray-100">
      <div className="w-full  border-b-2 flex flex-row py-4 items-center justify-between">
        {' '}
        <p className="text-2xl">Reclaims</p>{' '}
      </div>
      <div className="my-4">
        <small>Auto-Reply</small>
        <div className="flex flex-row">
          {' '}
          <small>
            Complete requests faster by sending automatic replies to company
            requests.{' '}
          </small>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-teal-500' : 'bg-teal-900'}
          relative inline-flex h-[28px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>
    </section>
  )
}

export default CheckBox
