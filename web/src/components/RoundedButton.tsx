import { Button } from '@mui/material'
import { pink } from '@mui/material/colors'

// py-2 px-8
const StyledRoundedButton = ({ isCategoryMatched, children, ...props }) => (
  <Button
    sx={{
      borderRadius: '1rem',
      padding: '0.5rem 2rem',
      border: `1px solid ${pink[400]}`,
      color: `${pink[500]}`,
      fontWeight: 600,
      height: '1.5rem',
      fontSize: '0.75rem',
      backgroundColor: isCategoryMatched ? `${pink[100]}` : '#fff',
      margin: '0 0.25rem',
      '&:hover': {
        backgroundColor: `${pink[100]}`,
        border: `1px solid ${pink[400]}`,
      },
    }}
    {...props}
  >
    {children}
  </Button>
)

export default StyledRoundedButton
