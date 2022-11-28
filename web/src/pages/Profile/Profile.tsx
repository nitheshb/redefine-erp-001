import React from 'react'

import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import HeadNavBar from 'src/components/HeadNavBar/HeadNavBar'
import HeadSideBar from 'src/components/HeadSideBar/HeadSideBar'
import Account from 'src/components/profile/account'
import CheckBox from 'src/components/profile/checkBox'
import PersonalDetails from 'src/components/profile/personalDetails'

import bg from '../../../public/Group7.png'
const Profile = () => {
  return (
    <div>
      <HeadNavBar />
      <div className="flex flex-row overflow-auto  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <HeadSideBar />

        <div className="flex flex-col mx-[10%] my-[2%]">
          {' '}
          <h1 className="text-5xl text-[#2B2A35] ">My Profile</h1>
          <p className=" text-lg my-4 ">It’s awesome to have you with us.</p>
          {/* div for making the profile card */}
          <div className="md:flex md:flex-row md:gap-x-60 w-full ">
            {' '}
            <div className="md:w-[20vw] flex flex-col justify-between items-center md:h-[50vh] rounded-md bg-gray-100">
              <img
                className="w-full relative mt-4 "
                src={bg}
                alt="bg profile"
              />
              <div className=" w-32 h-32 absolute mt-4 bg-gray-400 rounded-full "></div>
              <div>
                {' '}
                <p className=" font-semibold text-2xl text-center ">Nithesh</p>
                <small className="font-medium  text-gray-500 ">
                  nitheshb@gmail.com
                </small>
              </div>

              <p className=" mb-4 font-medium text-gary-600 ">
                Redefine user since sept 2021
              </p>
            </div>
            {/* div for making change the details  */}
            <div className="flex flex-col gap-10">
              <PersonalDetails />
              <CheckBox />
              <Account />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
