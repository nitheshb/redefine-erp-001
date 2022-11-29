/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/context/firebase-auth-context'
import { logout as logoutAction } from 'src/state/actions/user'
const HeadNavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const { user, logout } = useAuth()
  const dispatch = useDispatch()
  const handleClose = async (menuItem) => {
    setAnchorEl(null)
    if (menuItem === 'Logout') {
      await dispatch(logoutAction())
      await logout()
    }
  }

  return (
    <div>
      <div className="flex items-center flex-shrink-0 h-[8vh] px-2  pl-0 bg-white bg-opacity-75 ">
        {/* <h1 className="text-lg font-medium">redefine.</h1> */}
        <span
          style={{ marginLeft: '-25px' }}
          className="relative z-10 flex items-center text-2xl font-extrabold leading-none text-[#141446] select-none pl-0"
        >
          {/* <svg
            className="w-8 h-8 to-indigo-600 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            // color="#a770ef"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="88"
            height="32"
            viewBox="0 0 1 28"
            fill="none"
            className="injected-svg"
            data-src="/images/logo/cubejs-logo.svg"
          >
            <path
              d="M22.1337 7.03243L11.8594 1V5.17391L22.1336 11.1804L22.1337 7.03243Z"
              fill="#FF6492"
            ></path>
            <path
              d="M22.1336 11.1823L19.0513 13.0019L11.8574 8.78565L7.74692 11.1857L4.66406 9.49917L11.8593 5.17578L22.1336 11.1823Z"
              fill="#141446"
            ></path>
            <path
              d="M7.74692 11.1826L4.66406 9.49609V12.9988L7.74692 11.1826Z"
              fill="#A14474"
            ></path>
            <path
              d="M1.58105 18.9676L11.8572 13L22.1334 18.9676L11.8572 25L1.58105 18.9676Z"
              fill="#141446"
            ></path>
            <path
              d="M22.1336 14.8259L11.8574 8.71875V12.9998L22.1336 18.9674L22.1336 14.8259Z"
              fill="#FF6492"
            ></path>
            <path
              d="M4.66391 13V9.4973L11.8592 5.17391V1L1.58105 7.03243V18.9676L11.8573 13V8.71892L4.66391 13Z"
              fill="#7A77FF"
            ></path>
          </svg>
          <span className="ml-" style={{ marginLeft: '-11px' }}>
            {' '}
            Redefine Erp .
          </span>
        </span>

        {/* <a
        className="flex items-center fixe flex-shrink-0 w-full h-16  border-b bg-white"
        href="#"
      >

        <span
          style={{ marginLeft: '10px' }}
          className="relative z-10 flex items-center text-2xl font-extrabold leading-none text-black select-none pl-0"
        >
          <svg
            className="w-8 h-8 to-indigo-600 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            // color="#a770ef"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <span className="ml-1"> Redefine Erp.</span>
        </span>
      </a> */}
        <span
          style={{ marginLeft: '10px' }}
          className="relative z-10 flex items-center text-2xl font-extrabold leading-none text-black select-none pl-0 ml-4"
        ></span>
        <button className="flex items-center justify-center h-10 px-4 ml-auto "></button>
        <button className="flex items-center justify-center h-10 text-sm font-medium "></button>
        <Box
          sx={{
            cursor: 'pointer',
          }}
          display="flex"
          component="span"
          onClick={handleClick}
        >
          <button className="relative ml-2 text-sm focus:outline-none group  items-center justify-center h-10 text-sm font-medium">
            <div className="flex items-center justify-between w-10 h-10 rounded ">
              <svg
                width="30"
                fill="currentColor"
                height="30"
                className="text-gray-800"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
              </svg>
            </div>
          </button>
          <Box display="flex" flexDirection="column" mr={2}>
            <Typography variant="body2">{user?.displayName}</Typography>
            <Typography variant="caption" className="text-gray-500">
              {user?.orgName || user?.orgId} - {user?.role?.[0]}
            </Typography>
          </Box>
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to={routes.profile()}>Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={() => handleClose('Logout')}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default HeadNavBar
