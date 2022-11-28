import { Avatar, styled } from '@mui/material'
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  borderColor:
    theme.palette.mode === 'light'
      ? theme.palette.secondary[300]
      : theme.palette.divider,
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.secondary[300]
      : theme.palette.primary[200],
}))

const UkoAvatar = (props) => {
  return <StyledAvatar {...props} />
}

export default UkoAvatar
