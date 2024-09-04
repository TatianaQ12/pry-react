import { RoutesMap } from '@/types'
import { Button, Divider, Drawer, Grid, List, ListItem, ListItemButton } from '@mui/material'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react'
import { Link } from 'react-router-dom'

type Props = {
}
export const DrawerComponent: React.FC<Props> = (
  props: Props
): JSX.Element => {

  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorElAccount, setAnchorElAccount] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isAccountOpen = Boolean(anchorElAccount)

  const [loading, setLoading] = React.useState<any>()

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileAccountOpen = (event) => {
    setAnchorElAccount(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleAccountClose = () => {
    setAnchorElAccount(null)
  }

  const handleLogout = () => {
    setLoading(true)
    console.log('LOG OUT')
    /*  authenticationService.logout().then(res => {
      setLoading(false)
      if (!res.error){
        window.location.replace('/')
      }
    }) */
  }

  const renderMenu = (
    <Menu
      id="fade-menu"
      MenuListProps={{
        'aria-labelledby': 'fade-button',
      }}
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      TransitionComponent={Fade}
    >
      {/* <ListItemButton onClick={handleMenuClose} component={Link} to={ROUTE_CAMPAIGN}>Campañas</ListItemButton>
          <ListItemButton onClick={handleMenuClose} component={Link} to={ROUTE_RULE}>Reglas de Negocio</ListItemButton> */}
    </Menu>
  )

  const renderAccount = (
    <Menu
      id="fade-menu"
      MenuListProps={{
        'aria-labelledby': 'fade-button',
      }}
      anchorEl={anchorElAccount}
      open={isAccountOpen}
      onClose={handleAccountClose}
      TransitionComponent={Fade}
    >
      <ListItemButton onClick={handleAccountClose} component={Link} to={RoutesMap.PERFIL}>Perfil</ListItemButton>
      {/* <ListItemButton onClick={handleAccountClose} component={Link} to={ROUTE_USER}>Usuarios</ListItemButton> */}
      {/* <ListItemButton onClick={handleAccountClose} component={Link} to={ROUTE_VENDEDORES}>Vendedores</ListItemButton> */}
      {/* <ListItemButton onClick={handleAccountClose} component={Link} to={ROUTE_PROYECCION}>Proyección</ListItemButton> */}
      {/* <ListItemButton onClick={handleAccountClose} component={Link} to={ROUTE_SINCRONIZACION}>Sincronización</ListItemButton> */}
      <ListItemButton onClick={handleAccountClose} component={Link} to={RoutesMap.CONFIGURACION}>Configuración</ListItemButton>
    </Menu>
  )

  return (
    <Box >
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem >
            <IconButton onClick={() => setOpenDrawer(!openDrawer)} >
              <MenuIcon fill="black"/>
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <Button color="inherit" component={Link} to={RoutesMap.HOME}>
                            Inicio
            </Button>
          </ListItem>

          <ListItem onClick={() => setOpenDrawer(true)}>
            <Button color="inherit"
              onClick={handleProfileMenuOpen}>
                            Negocios
            </Button>
          </ListItem>

          <ListItem onClick={() => setOpenDrawer(true)}>
            <Button color="inherit" onClick={handleProfileAccountOpen}>
                                Mi cuenta
            </Button>
          </ListItem>
          <ListItem onClick={handleLogout}>
            <Button color="error">
                           salir
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <Grid>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)} >
          <MenuIcon fill="white"/>
        </IconButton>
      </Grid>
      {renderMenu}
      {renderAccount}
    </Box>
  )
}

