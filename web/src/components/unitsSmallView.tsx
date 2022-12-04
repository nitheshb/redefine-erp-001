/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'

import { MenuItem, styled } from '@mui/material'

const CustomMenuItem = styled(MenuItem)(() => ({
  fontSize: '0.85rem',
}))

const UnitsSmallViewCard = ({ kind, feedData, bg,  setSelUnitDetails,
  setShowCostSheetWindow,
  setSelMode, }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selOptionIs, setSelOptionIs] = useState("")
  const [bgColor, setBgColor] = useState("")

  const open = Boolean(anchorEl)
  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: '',
    sliderData: {},
  })

  useEffect(()=>{
    if(kind.status==="available"){
      setBgColor("#E1F0EF")
    }else if(kind.status==="booked"){
      setBgColor("#CCFBF1")
    }else if(kind.status==="blocked"){
      setBgColor("#e9e9e9")
    }
  }, [kind])
  const handleSliderClose = () => {
    setSliderInfo({
      open: false,
      title: '',
      sliderData: {},
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('was this from here' )
    setAnchorEl(event.currentTarget)
  }

  return (
    <div
      className={` min-w-[125px] z-10 flex flex-col  max-w-md p-2 mx-auto my-0 rounded-sm cursor-pointer`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-row items-center justify-between">
        <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
          {kind?.unit_no}
        </h3>
        {/* <DropCompUnitStatus
            type={'unitMode'}
            id={'id'}
            pickCustomViewer={handleClose}
          /> */}
      </div>
      <div className="flex flex-row justify-between px-2">
        <span className="flex flex-row items-center justify-between mr-2">
          <span className="text-sm font-">
            {kind?.super_built_up_area || 0} sqft

          </span>
        </span>


      </div>

      {/* <SiderForm
        open={sliderInfo.open}
        setOpen={handleSliderClose}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
      /> */}
    </div>
  )
}

export default UnitsSmallViewCard
