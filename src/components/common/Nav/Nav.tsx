import { Avatar, Box, Grid, Chip, Drawer, Link, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useResponsive from '../../../hooks/useResponsive'
// components
import { useAuthStore, useDrawerStore } from '@/hooks'
import { styled } from '@mui/material/styles'
import { HeaderView } from '../Header/Header'
import { NavSection } from '../Header/NavSection'
import { Scrollbars } from 'rc-scrollbars'
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import { CodeColor } from '@/types/colors/colors'
import { useNavSectionStore } from '@/hooks/useNavSectionStore'
// ----------------------------------------------------------------------


const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: 'rgb(230, 247, 255)'
}))

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  OnPress: PropTypes.func,
}

export default function Nav({ openNav, onCloseNav, OnPress }) {

  //Hooks
  const { user, getImageSource } = useAuthStore()
  const { pathname } = useLocation()
  const [nameUser, setNameUser] = useState<string>('')
  const [lastNameUser, setLastNameUser] = useState<string>('')
  const { drawerOpen, openDrawer } = useDrawerStore()
  const { navOpen } = useNavSectionStore()
  const { modeStyle } = useStyleModeStore()
  const renderIconAccount = () => {
    setNameUser(user?.data?.name)
    setLastNameUser(user?.data?.surname)
  }

  const isDesktop = useResponsive('up', 'lg', '')
  const NAV_WIDTH = 300
  const COLOR_NAV_SIDEBAR = modeStyle === 'light' ? CodeColor.HEADER_LIGHT : CodeColor.HEADER_DARK
  const COLOR_SCROLL_Y = '#2bb24a90'
  const withNavOpen = navOpen ? NAV_WIDTH : 0

  // useEffect(() => {
  //   if (openNav) {
  //     onCloseNav()
  //   }
  // }, [pathname])

  useEffect(() => {
    renderIconAccount()
  }, [])
  // useEffect(() => {
  //   renderIconAccount()
  // }, [user?.userType])

  const imageSource = getImageSource()

  const thumbVertical = ({ style, ...props }) => {
    const finalStyle = {
      ...style,
      cursor: 'pointer',
      backgroundColor: COLOR_SCROLL_Y,
      width: '3px'
    }
    return <div style={finalStyle} {...props} />
  }

  const renderContent = (
    <Scrollbars renderThumbVertical={thumbVertical}>

      <Grid container className='container-main__items scrollbar-track scrollbar-track-y'>
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none">
            <StyledAccount sx={{ background: 'transparent' }}>
              <Avatar sx={{ height: '70px', width: '70px', borderRadius: '1px solid #ffffff' }} src={imageSource} alt="photoURL" />
              <Grid item xs={12} sx={{ ml: 2 }} display='flex' alignItems={'center'} textAlign={'center'} flexDirection={'column'}>
                <Typography variant="subtitle2" className={modeStyle === 'light' ? 'text-light' : 'text-dark'} >
                  {nameUser ? `${nameUser} ${lastNameUser}` : 'NOMBRE EMPRESA'}
                </Typography>
                {/* <h4>
                  {nameUser?`${nameUser}`:'NOMBRE EMPRESA'}
                </h4> */}
                <Chip size="small" label={user?.role} sx={{ marginTop: '10px', background: '#2bb24a', color: '#fff' }} />
              </Grid>
            </StyledAccount>
          </Link>
        </Box>

        {/* Lista menu sidebar */}
        <NavSection />
        <Box sx={{ flexGrow: 1 }} />
      </Grid>

    </Scrollbars>
  )

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { lg: 0 }, width: { lg: withNavOpen } }}
    >
      <HeaderView OnPress={OnPress} />
      {isDesktop ?
        (
          navOpen
          ?
          <Drawer
            open
            variant="permanent"
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: COLOR_NAV_SIDEBAR,
                borderRightStyle: 'dashed',
              },
            }}
          >
            <Grid container height={'100px'} padding={'10px 20px'}>
              <Grid xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <Grid sx={{ maxWidth: '150px', width: '200px' }} >
                  <img src={'#'} alt='logo complaince' />
                </Grid>
              </Grid>
            </Grid>
            {renderContent}
          </Drawer>
          :
          null
        ) : (
          <Drawer
            open={drawerOpen}
            onClose={() => openDrawer(false)}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: COLOR_NAV_SIDEBAR
              },
            }}
          >
            <Grid container height={'100px'} padding={'10px 20px'}>
              <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <Grid sx={{ maxWidth: '150px', width: '200px' }} >
                  <img src={'#'} alt='logo empresa' />
                </Grid>
              </Grid>
              <Grid item xs={3} sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'end' }} ><CancelPresentationOutlinedIcon sx={{ color: 'white' }} onClick={() => openDrawer(false)} /></Grid>
            </Grid>
            {renderContent}
          </Drawer>
        )}
    </Box>
  )
}
