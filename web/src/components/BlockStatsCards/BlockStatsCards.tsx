import { useState, useEffect } from 'react'

import { MoreVert, Edit, AddBusiness } from '@mui/icons-material'
import { IconButton, Menu, MenuItem, styled } from '@mui/material'

import SiderForm from '../SiderForm/SiderForm'

const CustomMenuItem = styled(MenuItem)(() => ({
  fontSize: '0.85rem',
}))

const BlockStatsCards = ({
  kind,
  feedData,
  bg,
  txtColor,
  setSelBlock,
  viewUnitStatusA,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: '',
    sliderData: {},
  })
  useEffect(() => {
    console.log('i was changed')
  }, [viewUnitStatusA])

  const handleSliderClose = () => {
    setSliderInfo({
      open: false,
      title: '',
      sliderData: {},
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = async (menuItem) => {
    setAnchorEl(null)
    if (menuItem === 'edit') {
      setSliderInfo({
        open: true,
        title: 'Edit Block',
        sliderData: {
          block: feedData,
        },
      })
    }
  }
  return (
    <div
      className="drop-shadow-xs min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0  "
      style={{ backgroundColor: bg }}
    >
      <div className="flex flex-row items-center justify-between">
        <h3
          className={`${txtColor} m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight  border-0 border-gray-200 sm:text-1xl md:text-1xl `}
        >
          {kind}
        </h3>
        {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
      </div>
      <div className="flex flex-col justify-between px-2">
        {viewUnitStatusA.includes('Available') && (
          <span className="flex flex-row items-center justify-between mt-2">
            <span className={`${txtColor} text-sm }`}>Available</span>
            <span className={`${txtColor} text-sm `}>
              {feedData?.availableCount || 0}
            </span>
          </span>
        )}
        {viewUnitStatusA.includes('Blocked') && (
          <span className="flex flex-row items-center justify-between mt-2">
            <span className={`${txtColor} text-sm }`}>Blocked</span>
            <span>
              <span className={`${txtColor} text-sm `}>
                {feedData?.blockedCount || 0}
              </span>
            </span>
          </span>
        )}
        {viewUnitStatusA.includes('Booked') && (
          <span className="flex flex-row items-center justify-between mt-2 border-b">
            <span className={`${txtColor} text-sm }`}>Booked</span>
            <span className={`${txtColor} text-sm `}>
              {feedData?.totalBookedCount || 0}
            </span>
          </span>
        )}
        {/* <span className="flex flex-row items-center justify-between mt-2">
          <span className="text-sm text-gray-700">Parking</span>
          <span className="text-sm font-semibold">
            {feedData?.parking || 0}
          </span>
        </span> */}
        {viewUnitStatusA.includes('Total') && (
          <span className="flex flex-row items-center justify-between mt-2">
            <span className={`${txtColor} text-sm font-semibold`}>Total</span>
            <span className={`${txtColor} text-sm `}>
              {feedData?.totalUnitCount || 0}
            </span>
          </span>
        )}

        {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <CustomMenuItem onClick={() => handleClose('edit')}>
            <Edit className="mr-1" sx={{ fontSize: '1rem' }} />
            Edit
          </CustomMenuItem>
          <CustomMenuItem onClick={() => handleClose('units')}>
            <AddBusiness className="mr-1" sx={{ fontSize: '1rem' }} />
            Add floor
          </CustomMenuItem>
        </Menu> */}
      </div>
      <SiderForm
        open={sliderInfo.open}
        setOpen={handleSliderClose}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
        widthClass="max-w-4xl"
      />
    </div>
  )
}

export default BlockStatsCards
