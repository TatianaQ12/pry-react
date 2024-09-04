import { useEffect, useState } from 'react'
// @mui
import { useAuthStore} from '@/hooks'
import { Notification, RoutesMap } from '@/types'
import EmailIcon from '@mui/icons-material/Email'
import NotificationsIcon from '@mui/icons-material/Notifications'
import RedoIcon from '@mui/icons-material/Redo'
import { Badge, Divider, Grid, IconButton, ListItemIcon, MenuItem, Popover, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es'
import { Link, useNavigate } from 'react-router-dom'
import { Props } from './Header.type'
import { useNotificationStore } from '@/hooks/useNotificationStore'
moment.locale('es')

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: '#2bb34a',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
}

export default function NotificationPopover() {

  //Hooks
  const { user } = useAuthStore()
  // const { notifications, counter, changeToSeenStatusMassive, changeToSeenStatus, removeReceivedNotification, getNotifications } = useNotificationStore()
  const navigate = useNavigate()
  moment.locale('es')
  //NOTIFICATION POPOVER
  const [open, setOpen] = useState(null)
  const { statusNotification, setStatusNotification} = useNotificationStore();
  //  console.log(counter)
  const handleOpen = (event) => {
    setStatusNotification(event.currentTarget)
    getNotificationsAPi()
  }

  const getNotificationsAPi = async() => {
    // const response =  await getNotifications({perPage: 5, page:1})
  }

  const handleClose = (option: Notification) => {
    setStatusNotification(false)
  }

  return (
    <>
    <Tooltip title='Notificaciones'>
      <IconButton
        sx={{ marginLeft: '5px' ,padding:'0px'}}
        aria-label="delete"
        size="large"
        onClick={handleOpen} color="primary" >
        <Badge  badgeContent={2} color="warning" >
          <NotificationsIcon sx={{ color: { xs:'#2bb34a' } }} fontSize='medium' />
        </Badge>
      </IconButton>
      </Tooltip>

      <Popover
        open={Boolean(statusNotification)}
        // anchorEl={statusNotification}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 380,
            borderRadius: '10px',
            overflow: 'visible',
            padding:'10px',
            filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.32))',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0px 5px 10px', alignItems: 'center' }}>
          <Typography variant='subtitle1' sx={{ color: '#121c4c' }}>Notificaciones</Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px' }}>
          <Grid item display={'flex'} alignItems='center'>
            <Typography  variant='caption' sx={{ cursor: 'pointer', fontWeight: '600 !important', marginRight: '3px', color: '#121c4c' }}> Ver todas </Typography>
            <RedoIcon fontSize='small' sx={{ color: '#121c4c' }} />
          </Grid>
        </div>
      </Popover>

    </>
  )
}
