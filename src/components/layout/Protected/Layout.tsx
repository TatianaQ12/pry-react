import React, { useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../../common/Nav/Nav'
import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from '@mui/material'
import './Layout.sass'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import { CodeColor } from '@/types/colors/colors'

interface ProtectedProps {
  className?: string,
  children?: React.ReactNode | React.ReactNode[] | null,
}

const APP_BAR_MOBILE = 100
const APP_BAR_DESKTOP = 100

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
})

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(0),
  paddingBottom: theme.spacing(0),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    paddingTop: APP_BAR_MOBILE + 24,
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    width: '100%',
  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
  },
  [theme.breakpoints.up('xl')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    width: '100%',
  }
}))

export const Layout: React.FC<ProtectedProps> = (props): JSX.Element | any => {
  //nuevo style header
  const [openNew, setOpenNew] = useState(false)
  const { modeStyle } = useStyleModeStore()
  const fullscreenRef = useRef(null);
  const styleOulet = {
    minHeight: 560, maxWidth: '100vw', overflowX: 'hidden', background: modeStyle === 'light' ? CodeColor.CONTAINER_LIGHT : CodeColor.CONTAINER_DARK, borderRadius: 2, padding: 4
  }

  const onPress = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }{      
       const elem = fullscreenRef.current;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }
  }

  const url = 'terminos_condiciones/terminos_condiciones.pdf'
  return (
    <div ref={fullscreenRef}>
      {
        <StyledRoot sx={{background: modeStyle === 'light' ? CodeColor.FONDO_LIGHT : CodeColor.FONDO_DARK, padding: { xs: '20px 10px 0 10px', md: '20px 20px 0 20px', lg: '20px 30px 0 30px' } }}>
          <Nav openNav={openNew} onCloseNav={() => setOpenNew(false)} OnPress={onPress} />
          <Main sx={{background: modeStyle === 'light' ? CodeColor.FONDO_LIGHT : CodeColor.FONDO_DARK}}>
            <Box sx={styleOulet}>
                <Outlet />
            </Box>
            <Grid item xs={12} display={'flex'} justifyContent={'center'} sx={{ margin: '20px 0', borderRadius: 2, padding: '10px', backgroundColor: modeStyle === 'light' ? CodeColor.FOOTER_LIGHT : CodeColor.FOOTER_DARK, fontSize: '13px' }} >
              <p style={{color:  modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}>© Copyright. all rights reserved.</p>
              <Link href={import.meta.env.VITE_APP_ROOT_URL + '/' + url} target="_blank" sx={{ color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}>
                Términos y Condiciones
              </Link>
            </Grid>
          </Main>
        </StyledRoot>
      }
      </div>
  )
}
