import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Theme
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { memo } from 'react'
import { ButtonComponent } from '../Button/Button'
import { Props } from './DialogConfirm.type'

import { styleButton } from '@/types/typeComponents'
import './DialogConfirm.sass'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import { CodeColor } from '@/types/colors/colors'

const useStyles = makeStyles((theme: Theme) => ({
  dialogTitle: {
    textAlign: 'left',
    weight: 500,
    fontSize: '18px',
  },
  dialogActions: {
    justifyContent: 'end',
  },
}))

const ConfirmDialogComponent: React.FC<Props> = ({
  open,
  title,
  message,
  onConfirm,
  statusConfirmAndEmail=false,
  onConfirmAndEmail,
  onClose,
  textConfirm,
  type = 'button',
  ...props
}) => {
  const styles = useStyles()
  const { modeStyle } = useStyleModeStore()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{ zIndex: 9999 }}
    >
    <div style={{background: modeStyle === 'light' ? CodeColor.CONTAINER_LIGHT : CodeColor.CONTAINER_DARK }}>
    <DialogTitle
        sx={{color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK ,fontWeight:'bold'}}
      >
        {title ? title : ''}
      </DialogTitle>
      <DialogContent className="">
        {message ? (
          <div style={{color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }} >
            <p>{message}</p>
          </div>
        ) : (
          props.content
        )}
      </DialogContent>
      <DialogActions
        className={`c-dialog-confirm-action ${styles.dialogActions}`}
      >
        <ButtonComponent
          text="Cancelar"
          styleButton={styleButton.OUTLINED_SMALL}
          action={onClose}
          style={{marginLeft:'auto'}}
        ></ButtonComponent>
        <ButtonComponent
          text={ textConfirm ? textConfirm : type == 'button' ? 'Confirmar' : 'Enviar'}
          styleButton={styleButton.CONTAINED}
          action={()=>{onConfirm();onClose()}}
        ></ButtonComponent>
      </DialogActions>
    </div>
    </Dialog>
  )
}

export const ConfirmDialog = memo(ConfirmDialogComponent)
