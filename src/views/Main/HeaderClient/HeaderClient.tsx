import AccountPopover from '@/components/common/Header/AccountPopover'
import NotificationPopover from '@/components/common/Header/NotificationPopover'
import { useAuthStore } from '@/hooks'
import { Role, RoutesMap } from '@/types'
import { AppBar, Box, Badge, Button, Grid, IconButton, Toolbar, Typography, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined'
import { Logout } from '@mui/icons-material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import './HeaderClient.scss'
interface Props {
  window?: () => Window;
}

export const HeaderClient: React.FC = (props: Props) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { window } = props
  const { user, logout } = useAuthStore()
  const [navBotton, setNavBotton] = useState<number>(0)
  const [session, setSession] = useState<boolean>(false)
  const [nameUser, setNameUser] = useState<string>('')
  const [lastNameUser, setLastNameUser] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  const handlelogout = async () => {
    await logout()
    navigate('/principal')
  }
  const perfil = async () => {
    navigate('/presentacion-cliente')
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const renderIconAccount = () => {
    // user.userType == Role.CLIENT ? setSession(true) : setSession(false)
    // setNameUser(user?.data?.name)
    // setLastNameUser(user?.data?.last_name)
  }

  // useEffect(() => {
  //   renderIconAccount()
  // }, [])

  // useEffect(() => {
  //   renderIconAccount()
  // }, [user?.userType])



  const openNotificaciones = () => {
    navigate('/notification-reservation')
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left', }}>
      <Grid item xs={12} sx={{ overflowX: 'hidden' }}>
        {
          !session &&
          <>
            <Grid item xs={12} display='flex' justifyContent={'right'} sx={{ margin: '5px 5px 40px 0', padding: '5px' }}><CancelPresentationOutlinedIcon /></Grid>
            <Grid item xs={12}>
              <Link style={{ textDecoration: 'none', width: '100%' }} to={'#'}>
                <Button sx={{ textAlign: 'left', textTransform: 'none', width: '100%', color: '#000' }}   >
                  Crear cuenta
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} >
              <Link style={{ textDecoration: 'none', width: '100%', marginLeft: '10px' }} to="#" state={{ data: pathname }}>
                <Button sx={{ textAlign: 'left', textTransform: 'none', width: '100%', color: '#000' }}>
                  Ingresar
                </Button>
              </Link>
            </Grid>
            {/* <Grid item xs={12}>
              <Box
                sx={{ textAlign: 'center', with: '100%', marginLeft: '10px' }}
                p={1}
              >
                <Link style={{ textDecoration: 'none' }} to="/login/professional">
                  <Button className='btn btn-bg_verde'
                    sx={{ textTransform: 'none', color: '#fff' }}
                  >
                    Soy profesional
                  </Button>
                </Link>
              </Box>
            </Grid> */}
          </>
        }

        {
          session &&
          <Box display={'flex'} alignItems='center'>
            <Grid container xs={12}>
              <Grid item xs={12} display='flex' justifyContent={'right'} sx={{ margin: '5px 5px 40px 0', padding: '5px' }}><CancelPresentationOutlinedIcon /></Grid>
              <Grid container item xs={12} justifyContent={'center'}>
                <IconButton>
                  <AccountPopover sizeAvatar_w={120} sizeAvatar_h={120} />
                </IconButton>
              </Grid>
              <Grid container item xs={12} justifyContent={'center'}>
                <Typography sx={{ color: 'rgb(75, 75, 75)', fontSize: '22px', fontWeight: '700' }}>{`${nameUser} ${lastNameUser}`}</Typography>
              </Grid>

              <Grid container item sx={{ width: '100%', position: 'absolute', bottom: '0px', borderTop: '1px solid #d7d7d7d6' }} padding={'10px'} justifyContent={'center'} >
                <BottomNavigation
                  showLabels
                  value={navBotton}
                  onChange={(event, newValue) => {
                    setNavBotton(newValue)
                  }}
                >
                  <BottomNavigationAction sx={{ fontSize: '13px' }} onClick={() => perfil()} label="Perfil" icon={<MiscellaneousServicesIcon />} />
                  {/* <BottomNavigationAction label="Contraseña"  onClick={modalCambiarClave} icon={<LockResetIcon />} /> */}
                  <BottomNavigationAction label="Notificaciones" onClick={openNotificaciones}
                    icon={
                      <Badge badgeContent={10} color="warning" >
                        <NotificationsIcon sx={{ color: { xs: '#2bb34a' } }} fontSize='medium' />
                      </Badge>
                    }
                  />
                  <BottomNavigationAction onClick={() => handlelogout()} label="Salir" icon={<Logout />} />
                </BottomNavigation>
              </Grid>
            </Grid>
          </Box>
        }
      </Grid>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box >
      <AppBar component="nav" sx={{ backgroundColor: '#fff', boxShadow: '0px 0px 30px -10px #00000050' }}>
        <Toolbar className='contenedor-menu_desktop'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            size='large'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, ml: 4, display: { md: 'none' }, color: '#fbac28' }}
          >
            <MenuIcon />
          </IconButton>
          <Grid className="contenedor-menu_desktop-logo" item xs={12} md={12}>
            <Link style={{ textDecoration: 'none' }} to={RoutesMap.MAIN}>
              <img src={'#'} alt='Logo empresa' />
            </Link>
          </Grid>
          <Grid className="contenedor-menu_desktop-items" item xs={12} md={12} alignItems={'center'} justifySelf={'flex-end'} sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }}>
            {
              !session &&
              <>
                <Grid item >
                  <Link style={{ textDecoration: 'none', margin: '0 5px' }} to={'#'}>
                    <Button sx={{ textTransform: 'none', color: '#000' }}>
                      Crear cuenta
                    </Button>
                  </Link>
                  <Link style={{ textDecoration: 'none', margin: '0 5px' }} to={RoutesMap.LOGIN} state={{ data: pathname }}>
                    <Button sx={{ textTransform: 'none', color: '#000' }}>
                      Ingresar
                    </Button>
                  </Link>
                  {/* <Link style={{ textDecoration: 'none', margin: '0 5px' }} to="/login/professional">
                    <Button className='btn btn-bg_verde'
                      sx={{ textTransform: 'none', color: '#fff' }}
                    >
                      Soy profesional
                    </Button>
                  </Link> */}
                </Grid>
              </>
            }

            {
              session &&
              <Box display={'flex'} alignItems='center'>
                <NotificationPopover />
                <Typography sx={{ color: 'white', margin: '0 0 0 20px' }}>{`${nameUser}, ${lastNameUser}`}</Typography>
                <IconButton>
                  <AccountPopover />
                </IconButton>
              </Box>
            }
          </Grid>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', xs: { width: '100%', overflowX: 'hidden' }, sm: { width: '350px' } },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {/* <Box component="main" >
        <Toolbar />
      </Box> */}
    </Box>
  )
}
