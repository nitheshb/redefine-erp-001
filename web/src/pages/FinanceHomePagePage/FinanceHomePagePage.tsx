import { useState, useEffect } from 'react'

// import { ResponsiveBar } from '@nivo/bar'
import { EyeIcon, PencilIcon } from '@heroicons/react/outline'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import CrmHome from 'src/components/A_CRMcomp/CrmHome'
import AllBankDetailsView from 'src/components/All_BankDetailsView'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import HeadSideBarDetailView2 from 'src/components/HeadDetailSideBar2'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import FinanceTransactionsHome from 'src/components/TableComp/FinanceTransactionsHome'
import LeadsDummyHome from 'src/components/TableComp/LeadsDummyHome'
import { getAllProjects } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import DummyBodyLayout from '../../components/DummyBodyLayout/DummyBodyLayout'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'
import HeadSideBar from '../../components/HeadSideBar/HeadSideBar'
import ProjectsMHomeBody from '../../components/ProjectsMHomeBody/ProjectsMHomeBody'
import SiderForm from '../../components/SiderForm/SiderForm'

const FinanceHomePagePage = () => {
  const { user } = useAuth()

  const { orgId } = user
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false)
  const [project, setProject] = useState({})
  const handleNewProjectClose = () => setIsNewProjectOpen(false)
  const handleEditProjectClose = () => setIsEditProjectOpen(false)
  const [projects, setProjects] = useState([])
  const [viewable, setViewable] = useState('Home')

  const getProjects = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setProjects(projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }

  const data = [
    {
      Lead_Status: 'NEW',
      'vertex aprtments': 151,
      'hot dogColor': 'hsl(17, 70%, 50%)',
      'subha EcoStone': 81,
      burgerColor: 'hsl(279, 70%, 50%)',
      'vertex villas': 126,
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 146,
      kebabColor: 'hsl(339, 70%, 50%)',
      'Vintage Villas': 165,
      friesColor: 'hsl(160, 70%, 50%)',
      'Dream Space': 37,
      donutColor: 'hsl(277, 70%, 50%)',
    },

    {
      Lead_Status: 'VISIT DONE',
      'vertex aprtments': 28,
      'hot dogColor': 'hsl(271, 70%, 50%)',
      'subha EcoStone': 54,
      burgerColor: 'hsl(262, 70%, 50%)',
      'vertex villas': 91,
      sandwichColor: 'hsl(199, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 95,
      kebabColor: 'hsl(193, 70%, 50%)',
      'Vintage Villas': 76,
      friesColor: 'hsl(28, 70%, 50%)',
      'Dream Space': 49,
      donutColor: 'hsl(163, 70%, 50%)',
    },
    {
      Lead_Status: 'NEGOTIATION',
      'vertex aprtments': 59,
      'hot dogColor': 'hsl(92, 70%, 50%)',
      'subha EcoStone': 132,
      burgerColor: 'hsl(133, 70%, 50%)',
      'vertex villas': 86,
      sandwichColor: 'hsl(31, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 60,
      kebabColor: 'hsl(161, 70%, 50%)',
      'Vintage Villas': 22,
      friesColor: 'hsl(352, 70%, 50%)',
      'Dream Space': 186,
      donutColor: 'hsl(199, 70%, 50%)',
    },
    {
      Lead_Status: 'RNR',
      'vertex aprtments': 97,
      'hot dogColor': 'hsl(343, 70%, 50%)',
      'subha EcoStone': 115,
      burgerColor: 'hsl(197, 70%, 50%)',
      'vertex villas': 38,
      sandwichColor: 'hsl(26, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 147,
      kebabColor: 'hsl(184, 70%, 50%)',
      'Vintage Villas': 119,
      friesColor: 'hsl(68, 70%, 50%)',
      'Dream Space': 136,
      donutColor: 'hsl(38, 70%, 50%)',
    },
    {
      Lead_Status: 'NOT INTERESTED',
      'vertex aprtments': 130,
      'hot dogColor': 'hsl(70, 70%, 50%)',
      'subha EcoStone': 46,
      burgerColor: 'hsl(355, 70%, 50%)',
      'vertex villas': 145,
      sandwichColor: 'hsl(120, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 168,
      kebabColor: 'hsl(338, 70%, 50%)',
      'Vintage Villas': 130,
      friesColor: 'hsl(204, 70%, 50%)',
      'Dream Space': 71,
      donutColor: 'hsl(28, 70%, 50%)',
    },
    {
      Lead_Status: 'DEAD',
      'vertex aprtments': 67,
      'hot dogColor': 'hsl(22, 70%, 50%)',
      'subha EcoStone': 38,
      burgerColor: 'hsl(26, 70%, 50%)',
      'vertex villas': 111,
      sandwichColor: 'hsl(345, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 104,
      kebabColor: 'hsl(294, 70%, 50%)',
      'Vintage Villas': 180,
      friesColor: 'hsl(66, 70%, 50%)',
      'Dream Space': 72,
      donutColor: 'hsl(202, 70%, 50%)',
    },
    {
      Lead_Status: 'BOOKED',
      'vertex aprtments': 159,
      'hot dogColor': 'hsl(332, 70%, 50%)',
      'subha EcoStone': 113,
      burgerColor: 'hsl(268, 70%, 50%)',
      'vertex villas': 4,
      sandwichColor: 'hsl(209, 70%, 50%)',
      'Subha Gruha Kalpa Plots': 6,
      kebabColor: 'hsl(229, 70%, 50%)',
      'Vintage Villas': 55,
      friesColor: 'hsl(216, 70%, 50%)',
      'Dream Space': 88,
      donutColor: 'hsl(149, 70%, 50%)',
    },
  ]

  const data1 = [
    {
      Lead_Status: 'JAN',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'FEB',
      facebook: 15100,
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: 8100,
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': 126000,
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': 1460,
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': 1650,
      friesColor: 'hsl(160, 70%, 50%)',
      Others: 370,
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'MAR',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'APR',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'MAY',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'JUN',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'JUL',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'AUG',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'SEP',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'OCT',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'NOV',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
    {
      Lead_Status: 'DEC',
      facebook: Math.floor(Math.random() * 15100),
      'facebook dogColor': 'hsl(17, 70%, 50%)',
      Instagram: Math.floor(Math.random() * 8100),
      burgerColor: 'hsl(279, 70%, 50%)',
      'Google Adwords': Math.floor(Math.random() * 126000),
      sandwichColor: 'hsl(358, 70%, 50%)',
      'Housing.com': Math.floor(Math.random() * 1460),
      kebabColor: 'hsl(339, 70%, 50%)',
      'News Paper': Math.floor(Math.random() * 1650),
      friesColor: 'hsl(160, 70%, 50%)',
      Others: Math.floor(Math.random() * 370),
      donutColor: 'hsl(277, 70%, 50%)',
    },
  ]
  useEffect(() => {
    getProjects()
  }, [])

  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        <div className="flex flex-col flex-grow">
          {/* <HeadNavBar /> */}
          <div className="flex flex-row  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <HeadSideBar pgName={'financeModule'} />
            <HeadSideBarDetailView2
              pgName={'financeModule'}
              sourceLink={'financeModule'}
              showSideView1={undefined}
              setViewable={setViewable}
              viewable={viewable}
            />

            <div className="w-full flex-grow  my- border-t  items-center overflow-y-auto bg-blue h-[98%]  py-300">
              <HeadNavBar2 />
              {(viewable === 'Today1' || viewable === 'Home') && (
                <CrmHome leadsTyper={undefined} />
              )}
              {viewable === 'Dashboard' && (
                <div className="flex flex-row h-full">
                  <div className="flex flex-col w-full mx-16 ">
                    <div className="flex flex-col bg-[#F5F4F4] px-10 rounded-bl-3xl rounded-br-3xl">
                      <div className="flex flex-row items-center py-6">
                        <span className="app-color-blue font-bold text-xs mr-2">
                          Finance Dashboard
                        </span>
                        <span className="mr-2"></span>
                        <span className="mr-auto font-bold text-xs app-color-black"></span>
                        <span className="font-bold text-xs app-color-gray"></span>
                      </div>
                      <div className="flex flex-row pb-10">
                        <div className="flex flex-col w-8/12">
                          <div className="flex flex-row items-center py-4">
                            <span className="text-lg font-semibold mr-auto">
                              All Project Accounts
                            </span>
                            <div className="rounded w-2 h-2 mx-1 app-bg-black"></div>
                            <div className="rounded w-2 h-2 mx-1 app-bg-gray-2"></div>
                            <div className="rounded w-2 h-2 mx-1 app-bg-gray-2"></div>
                          </div>
                          <div className="flex flex-row">
                            <div
                              className="flex flex-col app-bg-gradient-blue  w-1/3 h-44 p-4 rounded-xl app-box-shadow-blue ml-4"
                              style={{
                                background:
                                  'linear-gradient(to bottom left, #d7b391, #966D47)',
                              }}
                            >
                              <span className="text-[#e9e2e2] font-bold mb-auto">
                                Total
                              </span>
                              <span className="flex flex-row">
                                <span className="text-[#e9e2e2] text-xs  mt-[12px] min-w[68px] w-full">
                                  In Review
                                </span>
                                <span className="text-[#e9e2e2] text-2xl ml-2 font-semibold text-right">
                                  28
                                </span>
                              </span>
                              <span className="flex flex-row mt-1">
                                <span className="text-[#e9e2e2] text-xs  mt-[12px] min-w[68px] w-full">
                                  Cleared
                                </span>
                                <span className="text-[#e9e2e2] text-2xl font-semibold">
                                  28
                                </span>
                              </span>
                              <span className="flex flex-row mt-1">
                                <span className="text-[#e9e2e2] text-xs mt-[12px] min-w[68px] w-full">
                                  Uncleared
                                </span>
                                <span className="text-[#e9e2e2] text-2xl  ml-2 font-semibold">
                                  28
                                </span>
                              </span>
                            </div>
                            <div
                              className="flex flex-col app-bg-gradient-blue w-1/3 h-44 p-4 rounded-xl app-box-shadow-blue ml-4"
                              style={{
                                background:
                                  'linear-gradient(to bottom left, #D0B8A1, #966D47)',
                              }}
                            >
                              <span className="text-black font-bold mb-auto">
                                Cheques
                              </span>
                              <span className="flex flex-row">
                                <span className="text-black text-xs  mt-[12px] min-w[68px] w-full">
                                  In Review
                                </span>
                                <span className="text-black text-2xl ml-2 font-semibold text-right">
                                  14
                                </span>
                              </span>
                              <span className="flex flex-row mt-1">
                                <span className="text-black text-xs  mt-[12px] min-w[68px] w-full">
                                  Cleared
                                </span>
                                <span className="text-black text-2xl font-semibold">
                                  14
                                </span>
                              </span>
                              <span className="flex flex-row mt-1">
                                <span className="text-black text-xs mt-[12px] min-w[68px] w-full">
                                  Uncleared
                                </span>
                                <span className="text-black text-2xl  ml-2 font-semibold">
                                  14
                                </span>
                              </span>
                            </div>
                            <div
                              className="flex flex-col app-bg-gradient-blue w-1/3 h-44 p-4 rounded-xl app-box-shadow-blue ml-4"
                              style={{
                                background:
                                  'linear-gradient(to bottom left, #D0B8A1, #966D47)',
                              }}
                            >
                              <span className="text-black font-bold mb-auto">
                                Bank
                              </span>
                              <span className="flex flex-row">
                                <span className="text-black text-xs  mt-[12px] min-w[68px] w-full">
                                  In Review
                                </span>
                                <span className="text-black text-2xl ml-2 font-semibold text-right">
                                  28
                                </span>
                              </span>
                              <span className="flex flex-row mt-1">
                                <span className="text-black text-xs  mt-[12px] min-w[68px] w-full">
                                  Cleared
                                </span>
                                <span className="text-black text-2xl font-semibold">
                                  28
                                </span>
                              </span>
                              <span className="flex flex-row mt-1">
                                <span className="text-black text-xs mt-[12px] min-w[68px] w-full">
                                  Uncleared
                                </span>
                                <span className="text-black text-2xl  ml-2 font-semibold">
                                  28
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-px app-bg-gray-2 mx-12"></div>
                        <div className="flex flex-col w-4/12 justify-between">
                          <div className="flex flex-row items-center py-6">
                            <span className="mr-auto text-lg font-semibold">
                              Balance
                            </span>
                            <span className="text-sm font-semibold">
                              Last month
                            </span>
                            <svg
                              className="w-6 h-6 font-bold ml-2 app-color-blue"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          </div>
                          <span className="app-color-blue text-4xl font-semibold">
                            ₹5 400.55
                          </span>
                          <span className="app-color-blue text-sm font-semibold"></span>
                          <div className="flex flex-row">
                            <div className="flex flex-col w-1/2">
                              <span className="text-xs app-color-gray font-semibold mb-2">
                                Cleared
                              </span>
                              <div className="flex flex-row items-center">
                                <div className="flex flex-row w-7 h-7 app-bg-gray-2 justify-center items-center rounded-full mr-2">
                                  <svg
                                    className="w-4 h-4 transform rotate-45 app-color-green"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                                    ></path>
                                  </svg>
                                </div>
                                <span className="font-semibold">₹6 320.15</span>
                              </div>
                            </div>
                            <div className="flex flex-col w-1/2">
                              <span className="text-xs app-color-gray font-semibold mb-2">
                                Pending
                              </span>
                              <div className="flex flex-row items-center">
                                <div className="transform rotate-90 flex flex-row w-7 h-7 app-bg-gray-2 justify-center items-center rounded-full mr-2">
                                  <svg
                                    className="w-4 h-4 transform rotate-45 app-color-red"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                                    ></path>
                                  </svg>
                                </div>
                                <span className="font-semibold">₹919.60</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {viewable === 'Payments' && (
                <div className=" h-full rounded-3xl">
                  <div className="flex flex-row h-full">
                    <div className="flex flex-col w-full ">
                      <FinanceTransactionsHome leadsTyper={'financeModule'} />
                    </div>
                  </div>
                </div>
              )}
              {viewable === 'LeadsDummy' && (
                <div className=" h-full rounded-3xl">
                  <div className="flex flex-row h-full">
                    <div className="flex flex-col w-full ">
                      <LeadsDummyHome leadsTyper={'financeModule'} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {viewable === 'Projects Lead Report' && (
              <>
                <div className="">
                  <div className="flex items-center justify-between py-2  ">
                    <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0">
                      Projects
                    </span>
                    <button
                      onClick={() => setIsNewProjectOpen(true)}
                      className="flex items-center justify-center h-10 px-4  bg-gray-200 ml-auto text-sm font-medium rounded hover:bg-gray-300"
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span className="ml-2 leading-none">Add Project</span>
                    </button>
                  </div>
                </div>

                <div>
                  <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
                    <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
                      <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
                        <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
                          <span className="flex items-center">
                            <img
                              className="w-16 h-16"
                              alt=""
                              src="/apart.svg"
                            ></img>
                            <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                              {'Projects vs Leads'}
                            </span>
                          </span>
                          <section className="flex ml-auto mt-[18px]">
                            <button>
                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                <PencilIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                Edit
                              </span>
                            </button>
                          </section>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-1">
                        <div className="min-h-[380px]">
                          {/* <h1>hello</h1> */}

                          <ResponsiveBar
                            data={data}
                            keys={[
                              'vertex aprtments',
                              'subha EcoStone',
                              'vertex villas',
                              'Subha Gruha Kalpa Plots',
                              'Vintage Villas',
                              'Dream Space',
                            ]}
                            indexBy="Lead_Status"
                            margin={{
                              top: 50,
                              right: 130,
                              bottom: 50,
                              left: 60,
                            }}
                            padding={0.3}
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'nivo' }}
                            defs={[
                              {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true,
                              },
                              {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                              },
                            ]}
                            fill={[
                              {
                                match: {
                                  id: 'Vintage Villas',
                                },
                                id: 'dots',
                              },
                              {
                                match: {
                                  id: 'vertex villas',
                                },
                                id: 'lines',
                              },
                            ]}
                            borderColor={{
                              from: 'color',
                              modifiers: [['darker', 1.6]],
                            }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                              tickSize: 5,
                              tickPadding: 5,
                              tickRotation: 0,
                              legend: 'Lead Status',
                              legendPosition: 'middle',
                              legendOffset: 32,
                            }}
                            axisLeft={{
                              tickSize: 5,
                              tickPadding: 5,
                              tickRotation: 0,
                              legend: 'Count',
                              legendPosition: 'middle',
                              legendOffset: -40,
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{
                              from: 'color',
                              modifiers: [['darker', 1.6]],
                            }}
                            legends={[
                              {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                  {
                                    on: 'hover',
                                    style: {
                                      itemOpacity: 1,
                                    },
                                  },
                                ],
                              },
                            ]}
                            role="application"
                            ariaLabel="Nivo bar chart demo"
                            barAriaLabel={function (e) {
                              return (
                                e.id +
                                ': ' +
                                e.formattedValue +
                                ' in Lead_Status: ' +
                                e.indexValue
                              )
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </>
            )}

            {(viewable === 'Bank Accounts' ||
              viewable === 'Virtual Accounts') && (
              <>
                <div className="flex-grow mx-4  my-2 items-center overflow-y-auto  h-[98%]   py-300">
                  <div className="">
                    <div className="flex items-center justify-between py-2  ">
                      <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0">
                        {viewable}
                      </span>
                      <button className="flex items-center justify-center h-10 px-4  bg-transparent ml-auto text-sm font-medium rounded hover:bg-transparent"></button>
                    </div>
                  </div>

                  <div>
                    <section className="w-full py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
                      <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
                        <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
                          <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
                            <span className="flex items-center">
                              <img
                                className="w-16 h-16"
                                alt=""
                                src="/apart.svg"
                              ></img>
                              <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                                {viewable}
                              </span>
                            </span>
                            <section className="flex ml-auto mt-[18px]">
                              <button>
                                <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                  <PencilIcon
                                    className="h-3 w-3 mr-1"
                                    aria-hidden="true"
                                  />
                                  Edit
                                </span>
                              </button>
                            </section>
                          </div>
                          <AllBankDetailsView title={viewable} />
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </>
            )}

            {viewable === 'Campaign Budget Report' && (
              <>
                <div className="">
                  <div className="flex items-center justify-between py-2  ">
                    <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0">
                      Projects
                    </span>
                    <button
                      onClick={() => setIsNewProjectOpen(true)}
                      className="flex items-center justify-center h-10 px-4  bg-gray-200 ml-auto text-sm font-medium rounded hover:bg-gray-300"
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span className="ml-2 leading-none">Add Project</span>
                    </button>
                  </div>
                </div>

                <div>
                  <section className="py-8 mb-8 leading-7 text-gray-900 bg-white sm:py-12 md:py-16 lg:py-18 rounded-lg">
                    <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
                      <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
                        <div className="flex items-center flex-shrink-0  px-0  pl-0 border-b border-grey  mb-2">
                          <span className="flex items-center">
                            <img
                              className="w-16 h-16"
                              alt=""
                              src="/apart.svg"
                            ></img>
                            <span className="relative z-10 flex items-center w-auto text-4xl font-bold leading-none pl-0 mt-[18px]">
                              {'Campaign Budget Report'}
                            </span>
                          </span>
                          <section className="flex ml-auto mt-[18px]">
                            <button>
                              <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                                <PencilIcon
                                  className="h-3 w-3 mr-1"
                                  aria-hidden="true"
                                />
                                Edit
                              </span>
                            </button>
                          </section>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-1">
                        <div className="min-h-[380px]">
                          {/* <h1>hello</h1> */}

                          <ResponsiveBar
                            data={data1}
                            keys={[
                              'facebook',
                              'Instagram',
                              'Google Adwords',
                              'Housing.com',
                              'News Paper',
                              'Others',
                            ]}
                            indexBy="Lead_Status"
                            margin={{
                              top: 50,
                              right: 130,
                              bottom: 50,
                              left: 60,
                            }}
                            padding={0.3}
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'nivo' }}
                            defs={[
                              {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true,
                              },
                              {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                              },
                            ]}
                            fill={[
                              {
                                match: {
                                  id: 'Vintage Villas',
                                },
                                id: 'dots',
                              },
                              {
                                match: {
                                  id: 'vertex villas',
                                },
                                id: 'lines',
                              },
                            ]}
                            borderColor={{
                              from: 'color',
                              modifiers: [['darker', 1.6]],
                            }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                              tickSize: 5,
                              tickPadding: 5,
                              tickRotation: 0,
                              legend: 'Type',
                              legendPosition: 'middle',
                              legendOffset: 32,
                            }}
                            axisLeft={{
                              tickSize: 5,
                              tickPadding: 5,
                              tickRotation: 0,
                              legend: 'Spent',
                              legendPosition: 'middle',
                              legendOffset: -40,
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{
                              from: 'color',
                              modifiers: [['darker', 1.6]],
                            }}
                            legends={[
                              {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                  {
                                    on: 'hover',
                                    style: {
                                      itemOpacity: 1,
                                    },
                                  },
                                ],
                              },
                            ]}
                            role="application"
                            ariaLabel="Nivo bar chart demo"
                            barAriaLabel={function (e) {
                              return (
                                e.id +
                                ': ' +
                                e.formattedValue +
                                ' in Lead_Status: ' +
                                e.indexValue
                              )
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </>
            )}
            <SiderForm
              open={isNewProjectOpen}
              setOpen={handleNewProjectClose}
              title="Create Project"
              data={{}}
            />
            <SiderForm
              open={isEditProjectOpen}
              setOpen={handleEditProjectClose}
              title="Edit Project"
              data={project}
            />
          </div>
          <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />
        </div>
      </div>
    </>
  )
}
export default FinanceHomePagePage
