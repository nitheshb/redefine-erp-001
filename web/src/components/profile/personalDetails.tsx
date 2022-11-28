import React from 'react'

const PersonalDetails = () => {
  return (
    <section className="md:w-[30vw] flex flex-col  md:px-8  rounded-md bg-gray-100">
      <div className="w-full  border-b-2 flex flex-row py-4 items-center justify-between">
        {' '}
        <p className="text-2xl">Personal Details</p>{' '}
        <button className=" h-10 w-40 bg-gray-400 hover:bg-blue-300 rounded-full ">
          Update
        </button>
      </div>
      <form className="flex flex-col my-4 ">
        <label className="text-[12px] text-left mt-6 text-gray-700 ">
          Full Name
        </label>
        <input
          className=" bg-transparent focus:outline-none  border-b-2 "
          placeholder=" John Doe "
          type="text"
        />
        <label className="text-[12px] text-left mt-6 text-gray-700 ">
          Country
        </label>
        <input
          className=" bg-transparent focus:outline-none  border-b-2 "
          placeholder=" India "
          type="text"
        />
      </form>
    </section>
  )
}

export default PersonalDetails
