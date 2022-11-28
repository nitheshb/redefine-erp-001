import React from 'react'

const Account = () => {
  return (
    <section className="md:w-[30vw] flex flex-col  md:px-8  rounded-md bg-gray-100">
      <div className="w-full  border-b-2 flex flex-row py-4 items-center justify-between">
        {' '}
        <p className="text-2xl">Accounts</p>{' '}
      </div>
      <div className="w-full  border-b-2 flex flex-row py-4 items-center justify-between">
        <button className="text-md hover:text-blue-600">
          Manage your email preference
        </button>
      </div>
      <div className="w-full  border-b-2 flex flex-row py-4 items-center justify-between">
        <button className="text-md hover:text-blue-600">
          Get a copy of your data
        </button>
      </div>
      <div className="w-full mb-4 border-b-2 flex flex-row py-4 items-center justify-between">
        <button className="text-md hover:text-red-600">
          Delete your account
        </button>
      </div>
    </section>
  )
}

export default Account
