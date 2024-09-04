import { styleButton } from '@/types/typeComponents'
import React, { CSSProperties } from 'react'
import './Button.sass'
import { CircularProgress, Grid } from '@mui/material'

type ButtonProps = {
   text: string | React.ReactNode,
   type?: 'button' | 'submit',
   typeStatus?: string,
   styleButton: styleButton,
   style?: CSSProperties,
   action?: () => void,
   disabled?: boolean,
   loading?: boolean
}

export const ButtonComponent: React.FC<ButtonProps> = (
   props: ButtonProps
): JSX.Element => {

   return (
      <button
         className={props.styleButton}
         type={props.type}
         disabled={props.disabled}
         style={props.style}
         // datatype={props.typeStatus}
         onClick={props.action}> {props?.loading ?
            <Grid container flexDirection={'row'} alignItems={'center'}><>{props.text} </> <CircularProgress size={22} /></Grid>
            :
            props.text} </button>
   )
}

ButtonComponent.defaultProps = {
   type: 'button',
   disabled: false
}
