import {
  styled,
  Typography,
} from '@mui/material'
export const TypographyError = styled(Typography)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.error.dark,
  fontStyle: 'italic',
  marginLeft: '14px',
  fontSize: '12px'
}))