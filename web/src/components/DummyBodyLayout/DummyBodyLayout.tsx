const DummyBodyLayout = () => {
  return (
    <div>
      <div className="py-8 px-8 flex flex-col items-center bg-red-100 mt-5 rounded">
        <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
          <img
            className="w-[180px] h-[180px] inline"
            alt=""
            src="/note-widget.svg"
          />
        </div>
        <h3 className="mb-1 text-sm font-semibold text-gray-900 ">No Data</h3>
        <button onClick={() => selFun()}>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
            Better always attach a string
            <span className="text-blue-600"> Add Data</span>
          </time>
        </button>
      </div>
    </div>
  )
}

export default DummyBodyLayout
