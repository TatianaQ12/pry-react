import React from 'react'
import {Outlet } from 'react-router-dom'
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import './LayoutClient.sass'
import { HeaderClient } from '@/views/Main/HeaderClient/HeaderClient'
interface ProtectedProps {
  className?: string,
  children?: React.ReactNode | React.ReactNode[] | null,
}

export const LayoutClient: React.FC<ProtectedProps> = (): JSX.Element | any => {

  const APP_BAR_MOBILE = 64
  const APP_BAR_DESKTOP = 92

  const memberPartial ={
    minHeight: 600, maxWidth: '100vw', overflowX:'hidden' , background: '#fff', borderRadius: 2, padding: 4
  }

  const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden',
    background: '#e6eaed',
    width:'100%',
  })
  const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    background: '#e6eaed',
    paddingBottom: theme.spacing(0),
    width:'100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: APP_BAR_MOBILE + 24,
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
      width:'100%',
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: APP_BAR_DESKTOP + 24,
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
      width:'100%',
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width:'100%',
    }    ,
    [theme.breakpoints.up('xl')]: {
      paddingTop: APP_BAR_DESKTOP + 24,
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      width:'100%',
    }
  }))


  return (
    <StyledRoot sx={{ padding:{xs:'20px 10px 0 10px', md:'20px 20px 0 20px', lg:'20px 30px 0 30px'}}}>
      <HeaderClient />
    <Main className='main-profesional'>
      <Grid sx={ memberPartial}>
        <Outlet />
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'center'} sx={{ margin: '20px 0', borderRadius: 2, padding: '10px', backgroundColor: 'white', fontSize: '13px' }} >
        <p>© Copyright. all rights reserved.</p>
      </Grid>
    </Main>
  </StyledRoot>

  )
}
