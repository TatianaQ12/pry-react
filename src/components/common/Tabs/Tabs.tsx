import React, { useState, useEffect } from 'react'
import { Props } from './Tabs.type'
import { Tabs, Tab} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import './Tabs.sass'

const defaultProps = {
  variant: 'fullWidth'
}

interface TabPanelProps {
   children?: React.ReactNode;
   index: any;
   value: any;
   color?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value,color, index, ...other } = props

  return (
    <div
      style={{background:color, paddingTop:15}}
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      {...other}
    >
      {value === index &&  children }
    </div>
  )
}

function a11yProps(value: number, index:number) {
  return {
    className: (value == index) ? 'tab-active': 'tab'
  }
}

export const TabsComponent: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState(0)
  const [windowSizeWidth, setWindowSizeWidth] = useState(useMediaQuery('(max-width:730px)'))
  const matchesWidth = useMediaQuery('(max-width:730px)')

  useEffect (()=>{
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      const handleResize = () => {
        setWindowSizeWidth(matchesWidth )
      }
      window.addEventListener('resize', handleResize)
      handleResize()
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }
  },[])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (props.setTabValidate){
      if (!props.errorForm){
        props.setTabValidate(newValue)
      }
      props.setTabValidate(0)
    } else {
      setValue(newValue)
      if (props.setTabValue)
        props.setTabValue(newValue)
      if (props.setValueForm)
      {
        props.setValueForm(newValue)
      }

    }
  }

  return (
    <div className={'c-tabs-container '+ (props.classMore||'')}>
      <div style={{position: 'relative'}} >
        <div className="c-tabs-linear"></div>
        <Tabs
          //textColor="primary"
          // sx={{bgcolor:'#007EA7',}}
          indicatorColor="primary"
          value={props.tabValidate? props.tabValidate : value}
          onChange={handleChange}
          variant={ (windowSizeWidth==true) ?  'fullWidth'
            : (props.variant == 'standard')?'standard':'fullWidth'
          }
          TabIndicatorProps={{style: { height:'3px'} }}
        >
          {
            props.labels.map((index, position)=>{
              let label = ''
              let icon  = undefined
              if (index === null || index === undefined) {
                label = ''
              } else if (index.constructor === Object) {
                label = index.label
                icon  = index.icon
              } else {
                label = index
              }
              return <Tab key={label} label={label} {...a11yProps(props.tabValidate? props.tabValidate : value, position)} icon={icon}/>
            })
          }
        </Tabs>
      </div>
      <TabPanel color={props.color} value={props.tabValidate? props.tabValidate : value} index={0} >
        <div>
          {
            props.childrenOne
          }
        </div>
      </TabPanel>
      <TabPanel value={props.tabValidate? props.tabValidate : value} index={1}>
        {
          props.childrenTwo
        }
      </TabPanel>
      <TabPanel value={props.tabValidate? props.tabValidate : value} index={2}>
        {
          props.childrenThree
        }
      </TabPanel>
    </div>
  )
}

TabsComponent.defaultProps = defaultProps
