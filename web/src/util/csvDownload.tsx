import { useCSVDownloader } from 'react-papaparse'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

export default function CSVDownloader({ downloadRows }) {
  const { CSVDownloader, Type } = useCSVDownloader()
  console.log('i was clicked')
  return (
    <CSVDownloader
      type={Type.Button}
      filename={'filename'}
      bom={true}
      data={downloadRows}
    >
      <Tooltip title={`Download ${downloadRows.length} Rows`}>
        <IconButton>
          {/* style={{ background: '#f9f9f9' }} */}
          <DownloadTwoToneIcon style={{ height: '20px', width: '20px' }} />
        </IconButton>
      </Tooltip>
    </CSVDownloader>
  )
}
