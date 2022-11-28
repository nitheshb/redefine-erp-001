import { InputBase, Pagination, styled } from '@mui/material'
import SearchIcon from '../../icons/SearchIcon'
export const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    fontWeight: 600,
  },
  '& .MuiPaginationItem-page:hover': {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiPaginationItem-page.Mui-selected': {
    color: '#fff',
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiPaginationItem-previousNext': {
    color: theme.palette.text.disabled,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))
export const StyledSearchInput = styled(InputBase)(({ theme }) => ({
  height: 42,
  fontSize: 12,
  width: '100%',
  maxWidth: 450,
  fontWeight: 600,
  padding: '0.5rem',
  borderRadius: '4px',
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.secondary[300]}`,
  backgroundColor:
    theme.palette.mode === 'light' ? 'white' : theme.palette.divider,
}))
export const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  fontSize: 16,
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
  color: theme.palette.primary.main,
}))
