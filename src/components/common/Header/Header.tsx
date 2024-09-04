
import { useAuthStore, useDrawerStore } from '@/hooks'
import { canShowSidebar } from '@/toolbox/helpers'
import { Role, RoutesMap } from '@/types'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Badge, Box, Grid, IconButton, ListItemIcon, Toolbar, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import AccountPopover from './AccountPopover'
import NotificationPopover from './NotificationPopover'
import EmailIcon from '@mui/icons-material/Email'
import { useNavigate } from 'react-router-dom'
import FitScreenIcon from '@mui/icons-material/FitScreen';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import { CodeColor } from '@/types/colors/colors'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useNotificationStore } from '@/hooks/useNotificationStore'
import { useNavSectionStore } from '@/hooks/useNavSectionStore'
// ----------------------------------------------------------------------

// HeaderView.propTypes = {
//   onOpenNav: PropTypes.func,
// };
interface HeaderProps {
  OnPress?: () => void
}

// const showSidebar = canShowSidebar(user.idmembership)
const showSidebar = true;

export const HeaderView: React.FC<HeaderProps> = (props): JSX.Element | any => {

  //Hooks
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const { drawerOpen, openDrawer } = useDrawerStore()
  const { navOpen, openNavSection } = useNavSectionStore()
  const { modeStyle, setModeStyle } = useStyleModeStore()
  const { statusNotification, setStatusNotification } = useNotificationStore();

  const ICON_COLOR_HEADER = '#7a7a7a'
  const NAV_WIDTH = navOpen ? 280 : 0

  const HEADER_MOBILE = 50
  const HEADER_DESKTOP = 80

  const StyledRoot = styled(AppBar)(({ theme }) => ({
    // backgroundColor: modeStyle === 'light' ? '#fff' : '#1A1C1E' ,
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${NAV_WIDTH}px)`,
    },
  }))

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: HEADER_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }))

  const handleAmpliar = () => {
    // actionScreen()
    props.OnPress();
  }


  return (
    <StyledRoot sx={{ backgroundColor: modeStyle === 'light' ? CodeColor.HEADER_LIGHT : CodeColor.HEADER_DARK }}>
      <StyledToolbar>
        <IconButton
          onClick={() => openDrawer(!drawerOpen)}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none', xl: 'none' },
          }}
        >
          <MenuIcon sx={{ color: ICON_COLOR_HEADER }} />
        </IconButton>

        <Grid mt={2}>
          <IconButton
            onClick={() => openNavSection(!navOpen)}
            sx={{
              mr: 1,
              color: 'text.primary',
              display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' },
            }}
          >
            <MenuIcon sx={{ color: ICON_COLOR_HEADER }} />
          </IconButton>
        </Grid>

        <Typography
          sx={{ color: '#28c4ac', fontWeight: 700 }}
          variant={'h3'}
        >
        </Typography>
        {<Box sx={{ flexGrow: 1 }} />}

        <Grid item xs={2} md={6} mt={2} >
          <Grid display="flex" justifyContent="flex-end" alignItems="center" container spacing={1} direction="row" >
            {/* <NotificationPopover /> */}
            <ListItemIcon sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'inline', xl: 'inline' } }}>
              <IconButton color="secondary" size="large" onClick={() => { handleAmpliar() }}>
                <Tooltip title='Ampliar'>
                  <FitScreenIcon sx={{ color: '#2bb34a' }} fontSize="medium" />
                </Tooltip>
              </IconButton>
            </ListItemIcon>
            {modeStyle !== 'light' ? <IconButton color="secondary" size="large" onClick={() => { setModeStyle('light') }}>
              <Tooltip title='light'>
                <LightModeIcon sx={{ color: '#2bb34a' }} fontSize="medium" />
              </Tooltip>
            </IconButton> :
              <IconButton color="secondary" size="large" onClick={() => { setModeStyle('dark') }}>
                <Tooltip title='dark'>
                  <DarkModeIcon sx={{ color: '#2bb34a' }} fontSize="medium" />
                </Tooltip>
              </IconButton>
            }
            <IconButton sx={{ margin: '0  0 0 15px' }}>
              <AccountPopover sizeAvatar_h={60} sizeAvatar_w={60} />
            </IconButton>
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledRoot>
  )
}
