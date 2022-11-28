import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
// interface iToastInfo {
//   open: boolean
//   message: string
//   severity: AlertColor
// }
export default function ToastMessage({
  duration = 3000,
  toastInfo = {
    open: false,
    message: '',
    severity: 'success',
  },
  setToastInfo,
}) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setToastInfo({
      open: false,
      message: '',
      severity: 'success',
    })
  }

  return (
    <div>
      <Snackbar
        open={toastInfo.open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={toastInfo.severity}>{toastInfo.message}</Alert>
      </Snackbar>
    </div>
  )
}
