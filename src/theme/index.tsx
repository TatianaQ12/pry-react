import { CssBaseline } from '@mui/material'
import {
  Theme,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles'
import React from 'react'
import componentStyleOverrides from './compStyleOverride'
interface IThemeCustomization{
  children: React.ReactNode
}

export const ThemeCustomization = ({children}: IThemeCustomization) => {

  const themes: Theme = createTheme({
    palette: {
      primary: {
        main: '#2bb24a',
      },
      secondary: {
        main: '#faab28',
      }
    },
    typography: {
      fontFamily: 'Poppins, sans-serif !important',
      fontSize: 14
    },
    components: {
      MuiInputBase:{
        styleOverrides: {
          root: {
            fontFamily: 'Poppins, sans-serif !important',
            fontSize: 14
          },
        },
      },
      MuiListItemText:{
        styleOverrides: {
          root: {
            fontFamily: 'Poppins, sans-serif !important',
            fontSize: 14
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: 'Poppins, sans-serif !important',
            fontSize: 14
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            fontFamily: 'Poppins, sans-serif !important',
            fontSize: 14
          },
        },
      },
    },
  })
  themes.components = componentStyleOverrides()
  return (

    <ThemeProvider theme={themes}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
