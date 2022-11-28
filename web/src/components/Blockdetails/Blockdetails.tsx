/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { PlusIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import BlockStatsCards from 'src/components/BlockStatsCards/BlockStatsCards'
import Floordetails from 'src/components/Floordetails/Floordetails'
import AddBlockForm from '../AddBlockForm/AddBlockForm'
import DropCompUnitStatus from '../dropDownUnitStatus'
const Blockdetails = ({
  blocks = [],
  phaseFeed,
  pId,
  projectDetails,
  phaseDetails,
  source,
  setSelUnitDetails,
  setShowCostSheetWindow,
  setSelMode,
  leadDetailsObj,
}) => {
  console.log('piddd is ', pId, blocks, phaseFeed)
  const [selBlock, setSelBlock] = useState({})
  const [openAddBlock, setOpenAddBlock] = useState(false)

  const [viewUnitStatusA, setViewUnitStatusA] = useState([
    'Available',
    // 'Blocked',
    // 'Booked',
    // 'Total',
  ])
  const [editOpitionsObj, setEditOptions] = useState(false)

  useEffect(() => {
    if (source === 'projectManagement') {
      setViewUnitStatusA(['Available', 'Blocked', 'Booked', 'Total'])
    }
  }, [source])

  useEffect(() => {
    if (blocks.length > 0) {
      setSelBlock(blocks[0])
    }
  }, [blocks])

  const pickCustomViewer = (item) => {
    const newViewer = viewUnitStatusA
    if (viewUnitStatusA.includes(item)) {
      const filtered = newViewer.filter(function (value) {
        return value != item
      })
      setViewUnitStatusA(filtered)
      console.log('reviwed is ', viewUnitStatusA)
    } else {
      setViewUnitStatusA([...newViewer, item])
      console.log('reviwed is add ', viewUnitStatusA)
    }
  }
  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-2 gap-8 w-full  mt-10 ">
      <div className="lg:col-span-2 px-2 ">
        <section className="flex flex-row justify-between bg-[#203129] text-white py-3 px-4">
          <h2 className="text-sm font-semibold">Blocks</h2>
          <DropCompUnitStatus
            type={'View'}
            id={'id'}
            setStatusFun={setSelBlock}
            viewUnitStatusA={viewUnitStatusA}
            pickCustomViewer={pickCustomViewer}
          />
        </section>
        <ul>
          {openAddBlock && (
            <li>
              {' '}
              <AddBlockForm
                title={'Add Block'}
                dialogOpen={() => setSelBlock('')}
                data={{ title: 'Add Block', phase: phaseDetails }}
              />
            </li>
          )}
          {source === 'projectManagement' && (
            <li>
              <div
                className="flex justify-center items-center font-semibold mt-3 border rounded-md p-1  border-[#FE4066] text-[#FE4066] hover:bg-[#FE4066]  hover:text-white  cursor-pointer"
                onClick={() => {
                  setOpenAddBlock(!openAddBlock)
                }}
              >
                {/* <img className="w-12 h-12 mr-2" alt="" src="/l1.png"></img> */}
                <button
                  onClick={() => {
                    // setSliderInfo({
                    //   open: true,
                    //   title: 'Add Block',
                    //   sliderData: {
                    //     phase,
                    //     block: {},
                    //   },
                    //   widthClass: 'max-w-2xl',
                    // })
                  }}
                  className={
                    'flex   cursor-pointer items-center h-6 px-3 text-[14px] font-semibold  rounded-full '
                  }
                >
                  {openAddBlock ? (
                    <>
                      <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      Add block
                    </>
                  )}
                </button>
              </div>
            </li>
          )}
          {blocks.map((block) => {
            return (
              <li
                key={block?.uid}
                className="mt-4"
                onClick={() => setSelBlock(block)}
              >
                <BlockStatsCards
                  kind={block?.blockName}
                  feedData={block}
                  bg={selBlock?.uid === block?.uid ? '#203129' : '#fef7f7'}
                  txtColor={
                    selBlock?.uid === block?.uid
                      ? 'text-white'
                      : 'text-gray-700'
                  }
                  setSelBlock={setSelBlock}
                  viewUnitStatusA={viewUnitStatusA}
                  source={source}
                />
              </li>
            )
          })}
        </ul>
      </div>
      {/* phaseFeed,
BlockFeed */}

      <Floordetails
        pId={pId}
        phaseFeed={phaseFeed}
        BlockFeed={blocks}
        selBlock={selBlock}
        projectDetails={projectDetails}
        phaseDetails={phaseDetails}
        source={source}
        setShowCostSheetWindow={setShowCostSheetWindow}
        setSelUnitDetails={setSelUnitDetails}
        setSelMode={setSelMode}
        leadDetailsObj={leadDetailsObj}
      />
    </div>
  )
}

export default Blockdetails
