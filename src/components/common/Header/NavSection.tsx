import { useAuthStore, useDrawerStore } from '@/hooks'
import {
  ListItemButtonStyle,
  ListItemIconStyle,
  ListMainItemButtonStyle
} from '@/styles'
import { icons } from '@/toolbox/constants/NavSection'
import {
  readLocalStorage,
  saveLocalStorage
} from '@/toolbox/helpers/local-storage-helper'
import { LocalStorageKey, Module, ViewModule } from '@/types'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Fragment, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import { CodeColor } from '@/types/colors/colors'

export const NavSection = () => {
  //Hooks
  const { user } = useAuthStore()
  const { openDrawer } = useDrawerStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { modeStyle } = useStyleModeStore()
  const initialRuta = readLocalStorage(LocalStorageKey.RUTA)
  const [ruta, setRuta] = useState(initialRuta || '')
  const routes = user?.modules || []
  const isModule = (value: Module | ViewModule): value is Module => {
    return (value as Module).module !== undefined
  }
  const handleOnClick = (value: Module | ViewModule) => {
    if (isModule(value)) {
      if (ruta === value.module) {
        setRuta('')
      } else {
        saveLocalStorage(LocalStorageKey.RUTA, value.module)
        setRuta(value.module)
      }
    } else {
      openDrawer(false)
      navigate({ pathname: value.url })
    }
  }

  const handleItemSelected = (pathname) => {
    openDrawer(false)
    navigate({ pathname })
  }

  return (
    <Box sx={{ background: 'transparent' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <List disablePadding sx={{ p: 1, minWidth: '300px' }}>
          {
            !!(routes.length > 0) && routes.map((route, index) => {
              if (route?.type_module == '1') { return }
              const isItemSelected = ruta === route?.module
              const IconModule = icons[route?.icon]
              return (
                <Fragment key={index}>
                  <ListItemButton
                    sx={{
                      fontSize: 14,
                      ...(isItemSelected
                        ? {
                          fontSize: 14,
                          color:  modeStyle === 'light' ?  CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK  ,
                          bgColor: 'rgb(230, 247, 255)',
                          fontWeight: '100',
                        }
                        : null),
                      ...(ListMainItemButtonStyle
                        ? {
                          fontSize: 14,
                          color:  modeStyle === 'light' ?  CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK ,
                          bgColor: 'rgb(230, 247, 255)',
                          fontWeight: '100',
                        }
                        : null)
                    }}
                    onClick={() => handleOnClick(route)}
                  >

                    {/* <ListItemIcon sx={ListItemIconStyle}>{route.icon}</ListItemIcon> */}
                    <ListItemIcon sx={ListItemIconStyle}>
                      <IconModule />
                    </ListItemIcon>
                    <ListItemText disableTypography primary={route.module} />
                    {
                      isItemSelected ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )
                    }
                  </ListItemButton>

                  {(
                    <Collapse in={isItemSelected} timeout="auto" unmountOnExit>
                      {route.view.map((view, index) => {
                        if (view?.type == 1 || view?.type == 2) {
                          return
                        }
                        const isSubRouteSelected = pathname === view?.url
                        // console.log('Icon', view)
                        // const Icon = icons[view?.icon]
                       
                        return (
                          <ListItemButton
                            onClick={() => handleItemSelected(view?.url)}
                            key={index}
                            className={'ItemMenu ' + `${isSubRouteSelected ? 'activo' : ''}`}
                            sx={{
                              ...ListItemButtonStyle,
                              fontSize: 14,
                              color:  modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK,
                              fontWeight: '100',
                              ...(isSubRouteSelected
                                ? {
                                  fontSize: 14,
                                  color: '#2bb34a',
                                  bgcolor: 'ffffff50',
                                  fontWeight: '100',
                                }
                                : null),
                            }}
                          >
                            <ListItemIcon sx={ListItemIconStyle}>
                              {/* <Icon /> */}
                              ○
                            </ListItemIcon>
                            <ListItemText
                              disableTypography
                              primary={view.name}
                            />
                          </ListItemButton>
                        )
                      })}
                    </Collapse>
                  )}
                </Fragment>
              )
            })
          }
        </List>
      </ThemeProvider>
    </Box>
  )
}
