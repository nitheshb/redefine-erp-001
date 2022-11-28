import { Link, routes } from '@redwoodjs/router'

const ProjectModulePage = () => {
  return (
    <>
      <nav className="bg-white dark:bg-gray-800  shadow fixed w-full ">
        <div className=" mx-auto px-5">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              {/* <a className="flex-shrink-0" href="/">
                <img
                  className="h-8 w-8"
                  src="/icons/rocket.svg"
                  alt="Workflow"
                />
              </a> */}

              <span className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none">
                redefine.
              </span>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                        id="options-menu"
                      >
                        <svg
                          width="20"
                          fill="currentColor"
                          height="20"
                          className="text-gray-800"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1 "
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        {/* <Link
                          className="mx-2 text-sm font-semibold text-indigo-700"
                          to={routes.projectModule()}
                        >
                          Projects1
                        </Link> */}
                        {/* <a
                          href="#"
                          className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          <span className="flex flex-col">
                            <span>Settings</span>
                          </span>
                        </a>
                        <a
                          href="#"
                          className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          <span className="flex flex-col">
                            <span>Account</span>
                          </span>
                        </a>
                        <a
                          href="#"
                          className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          <span className="flex flex-col">
                            <span>Logout</span>
                          </span>
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Home
            </a>
            <a
              className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Gallery
            </a>
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Content
            </a>
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        {/* <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold">Team Project Board</h1>
        </div> */}

        <div className="flex flex-row h-full">
          <div className="bg-white dark:bg-gray-800 w-20 h-screen justify-between flex flex-col">
            <div className="mt-10 mb-10">
              <Link
                className="mx-2 text-sm font-semibold text-indigo-700"
                to={routes.leadsCallerBoard()}
              >
                <img
                  alt=""
                  src="/images/person/2.jpeg"
                  className="rounded-full w-10 h-10 mb-3 mx-auto"
                />
              </Link>
              <div className="mt-10">
                <ul>
                  <li className="my-12 text-center">
                    <Link
                      className="mx-2 text-sm font-semibold text-indigo-700"
                      to={routes.leadsCallerBoard()}
                    >
                      <span className="h-6 w-6 text-gray-500 dark:text-gray-300 mx-auto hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="m-auto"
                          viewBox="0 0 2048 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
                        </svg>
                      </span>
                    </Link>
                  </li>
                  <li className="my-12 text-center">
                    <Link to="#">
                      <span className="h-6 w-6 text-gray-500 dark:text-gray-300 mx-auto hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="m-auto"
                          viewBox="0 0 2048 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z"></path>
                        </svg>
                      </span>
                    </Link>
                  </li>
                  <li className="my-12 text-center">
                    <Link to={routes.leadsCallerBoard()}>
                      <span className="h-6 w-6 text-gray-500 dark:text-gray-300 mx-auto hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="m-auto"
                          viewBox="0 0 2048 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M960 0l960 384v128h-128q0 26-20.5 45t-48.5 19h-1526q-28 0-48.5-19t-20.5-45h-128v-128zm-704 640h256v768h128v-768h256v768h128v-768h256v768h128v-768h256v768h59q28 0 48.5 19t20.5 45v64h-1664v-64q0-26 20.5-45t48.5-19h59v-768zm1595 960q28 0 48.5 19t20.5 45v128h-1920v-128q0-26 20.5-45t48.5-19h1782z"></path>
                        </svg>
                      </span>
                    </Link>
                  </li>
                  <li className="my-12 text-center">
                    <Link to={routes.leadsCallerBoard()}>
                      <span className="h-6 w-6 text-gray-500 dark:text-gray-300 mx-auto hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
                        <svg
                          width="20"
                          height="20"
                          className="m-auto"
                          fill="currentColor"
                          viewBox="0 0 2048 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                        </svg>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-4">
              <Link to={routes.leadsCallerBoard()}>
                <span>
                  <svg
                    className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-red-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 4.00894C13.0002 3.45665 12.5527 3.00876 12.0004 3.00854C11.4481 3.00833 11.0002 3.45587 11 4.00815L10.9968 12.0116C10.9966 12.5639 11.4442 13.0118 11.9965 13.012C12.5487 13.0122 12.9966 12.5647 12.9968 12.0124L13 4.00894Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M4 12.9917C4 10.7826 4.89541 8.7826 6.34308 7.33488L7.7573 8.7491C6.67155 9.83488 6 11.3349 6 12.9917C6 16.3054 8.68629 18.9917 12 18.9917C15.3137 18.9917 18 16.3054 18 12.9917C18 11.3348 17.3284 9.83482 16.2426 8.74903L17.6568 7.33481C19.1046 8.78253 20 10.7825 20 12.9917C20 17.41 16.4183 20.9917 12 20.9917C7.58172 20.9917 4 17.41 4 12.9917Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectModulePage
