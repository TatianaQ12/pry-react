import { useEffect, useState } from 'react'
// @mui
import { useAuthStore } from '@/hooks'
// import { useUserStore } from '@/hooks/useUserStore'
import { MENU_OPTIONS, MenuOptionsType } from '@/toolbox/constants/menu-options'
import { RoutesMap } from '@/types'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Avatar, Button, Divider, Grid, IconButton, InputAdornment, MenuItem, Modal, Popover, Stack, TextField, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Logout from '@mui/icons-material/Logout'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import { CodeColor } from '@/types/colors/colors'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '300px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
}

export default function AccountPopover({sizeAvatar_h=46,sizeAvatar_w=46}) {

  //Hooks
  const { user, logout, getImageSource } = useAuthStore()
  // const { editPassword } = useUserStore()
  const navigate = useNavigate()
  const { modeStyle } = useStyleModeStore()
  const [open, setOpen] = useState(null)
  const [openModal, setOpenModal] = useState<any>(false)
  const [data, setData] = useState({
    confirm_password: '',
    new_password: '',
    old_password: '',
    showPassword: false,
    showPasswordConfirm: false
  })
  const [error, setError] = useState('')
  const [snackBarConfig, setSnackBarConfig] = useState<any>({
    open: false,
    severity: 'error',
    message: 'Error',
    autoHideDuration: 3000,
  })


  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }
  const handleClickShowPassword = () => {
    setData({ ...data, showPassword: !data.showPassword })
  }
  const handleClickShowPasswordConfirm = () => {
    setData({ ...data, showPasswordConfirm: !data.showPasswordConfirm })
  }

  const handleNavigate = (option: MenuOptionsType) => {
    handleClose(option)
    if (option.route) {
      navigate({ pathname: option.route })
    }
  }

  const handleClose = (option: MenuOptionsType) => {
    if (option.label == 'Cambiar contraseña') {
      setOpenModal(true)
      return
    }
    setOpen(null)
  }
  const handlelogout = async () => {
    await logout()
    navigate('/principal')

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data?.old_password == '') { return setError('old_password') }
    if (data?.new_password == '') { return setError('new_password') }
    if (data?.confirm_password == '') { return setError('confirm_password') }
    console.log(data)
    // const resp = await editPassword(data?.old_password, data?.new_password, data?.confirm_password)
    // if(resp.data){
    //   setSnackBarConfig({...snackBarConfig, open: true, severity: 'success', message:'Su contraseña ha sido cambiada con éxito'})
    // }else{
    //   setSnackBarConfig({...snackBarConfig, open: true, severity: 'warning', message:'Ocurrio un problema, vuelva a intentar'})
    // }
    if (data?.new_password !== data?.confirm_password) {
      toast.error('Las contraseñas no coinciden')
    } else {
      try {
        // editPassword(data?.old_password, data?.new_password, data?.confirm_password)
        // limpiarDatos()
      //   logout()
      //   navigate('/principal')
      } catch (error) {
        console.error(error)
      }

      setOpenModal(false)
    }

  }
  const limpiarDatos = () => {
    setData({
      ...data,
      confirm_password: '',
      new_password: '',
      old_password: ''
    })
  }

  const handleInputChange = (e) => {
    setError('')
    const changedFormValues = {
      ...data,
      [e.target.name]: e.target.value
    }
    setData(changedFormValues)
  }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // const [perfilValidation, setPerfilValidation] = useState({
  //   label: '',
  //   icon: '',
  //   route: '' as RoutesMap
  // })

  const newMenuOptions = [
    ...MENU_OPTIONS,
  ]

  const menuOptions = newMenuOptions.map(option => option.label === 'Inicio' ? { ...option, route: '/' as RoutesMap } : option)

  const imageSource = getImageSource()

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: '\'\'',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'relative',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),

        }}
      >
        <Avatar sx={{ width: { xs: sizeAvatar_w }, height: { xs: sizeAvatar_h} , border:'3px solid #ffffff50' }} src={imageSource} alt="photoURL" />
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
            color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK ,
            background: modeStyle === 'light' ? CodeColor.CONTAINER_LIGHT : CodeColor.CONTAINER_DARK 
          },
        }}
      >
        <Stack sx={{ p: 1 }}>
          {menuOptions.map((option) => (
            <MenuItem key={option.label} onClick={() => handleNavigate(option)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        <Divider />
        <MenuItem onClick={() => handlelogout()} sx={{ m: 1 }}>
          <ListItemIcon sx={{color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}>
            <Logout fontSize="small" />
          </ListItemIcon>
            Salir
        </MenuItem>
        <Modal
          sx={{margin:'20px'}}
          open={openModal}
          onClose={() => { setOpenModal(false) }}>
          <Grid sx={style} container item xs={12} sm={8} md={6} lg={4} p={2} alignItems='center'>
            <Grid item xs={12} mb={2}>
              <Typography textAlign={'center'} gutterBottom variant='h5' fontWeight={500}>
                {'Actualizar contraseña'}
              </Typography>
            </Grid>
            <div className='Body'>
              <form onSubmit={handleSubmit} >
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} md={12} >
                    <TextField
                      fullWidth
                      size="small"
                      id="old_password"
                      placeholder="Contraseña Actual*"
                      label="Contraseña Actual*"
                      sx={{ bgcolor: '#fff', mb: 2 }}
                      name="old_password"
                      error={error == 'old_password' ? true : false}
                      type="text"
                      value={data?.old_password}
                      onChange={handleInputChange}
                      helperText={error == 'old_password' ? 'Campo es obligatorio' : ''}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      id="new_password"
                      placeholder="Nueva Contraseña*"
                      label="Nueva Contraseña*"
                      sx={{ bgcolor: '#fff', mb: 2 }}
                      name="new_password"
                      error={error == 'new_password' ? true : false}
                      type={data.showPassword ? 'text' : 'password'}
                      value={data?.new_password}
                      onChange={handleInputChange}
                      helperText={error == 'new_password' ? 'Campo obligatorio' : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{ color: '#29333B' }}
                            >
                              {data.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      id="confirm_password"
                      placeholder="Retipa Nueva Contraseña*"
                      label="Retipa Nueva Contraseña*"
                      sx={{ bgcolor: '#fff', mb: 2 }}
                      name="confirm_password"
                      error={error == 'confirm_password' ? true : false}
                      type={data.showPasswordConfirm ? 'text' : 'password'}
                      value={data?.confirm_password}
                      onChange={handleInputChange}
                      helperText={error == 'confirm_password' ? 'Campo es obligatorio' : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordConfirm}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{ color: '#29333B' }}
                            >
                              {data.showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <Button
                      onClick={() => { setOpenModal(false) }}
                      variant="contained"
                      fullWidth
                      startIcon={<CancelIcon />}
                      className='btn_naranja'
                      sx={{ textTransform: 'none' }}>
                        Cancelar
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <Button
                      type="submit"
                      variant="contained"
                      className='btn_verde'
                      fullWidth
                      startIcon={<SaveIcon />}
                      sx={{  textTransform: 'none'}}>
                      {'Actualizar'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        </Modal>
      </Popover>
    </>
  )
}
