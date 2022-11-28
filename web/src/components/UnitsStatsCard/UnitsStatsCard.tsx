import { useState } from 'react'
import { IconButton, Menu, MenuItem, styled } from '@mui/material'
import { MoreVert, Edit } from '@mui/icons-material'
import SiderForm from '../SiderForm/SiderForm'

const CustomMenuItem = styled(MenuItem)(() => ({
  fontSize: '0.85rem',
}))

const UnitsStatsCard = ({ kind, feedData, bg }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: '',
    sliderData: {},
  })

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
      className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
      style={{ backgroundColor: bg }}
    >
      <div className="flex flex-row items-center justify-between">
        <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
          Unit - {kind?.unit_no}
        </h3>
        <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton>
      </div>
      <div className="flex flex-row justify-between px-2">
        <div>
          <span className="flex flex-row items-center justify-between mr-2">
            <span className="text-sm text-gray-700 mr-2 font-semibold">
              Bed
            </span>
            <span className="text-sm ">{kind?.bed_rooms || 0}</span>
          </span>
          <span className="flex flex-row items-center justify-between mr-2">
            <span className="text-sm text-gray-700 mr-2 font-semibold">
              Bath
            </span>
            <span className="text-sm ">{kind?.bath_rooms || 0}</span>
          </span>
          <span className="flex flex-row items-center justify-between mr-2">
            <span className="text-sm text-gray-700 mr-2 font-semibold">
              Carpet
            </span>
            <span className="text-sm">{kind?.bath_rooms || 0}</span>
          </span>
        </div>
        <div>
          <span className="flex flex-row items-center justify-between mr-2">
            <span className="text-sm text-gray-700 mr-2 font-semibold">
              Rate
              <span className="text-[10px] text-black-500">/sqft</span>
            </span>
            <span className="text-sm ">{kind?.rate_per_sqft || 0}</span>
          </span>
          <span className="flex flex-row items-center justify-between mr-2">
            <span className="text-sm text-gray-700 mr-2 font-semibold">
              Facing
              <span className="text-[10px] text-black-500"></span>
            </span>
            <span className="text-sm ">{kind?.facing || 0}</span>
          </span>
          <span className="flex flex-row items-center justify-between mr-2">
            <span className="text-sm text-gray-700 mr-2 font-semibold">
              SBA
              <span className="text-[10px] text-black-500">(sqft)</span>
            </span>
            <span className="text-sm ">{kind?.super_built_up_area || 0}</span>
          </span>
        </div>

        <Menu
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
        </Menu>
      </div>
      <SiderForm
        open={sliderInfo.open}
        setOpen={handleSliderClose}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
      />
    </div>
  )
}

export default UnitsStatsCard
