type DialogConfirmProps = {
   open?: boolean,
   title?: string,
   message?: string,
   type?: 'button'|'submit',
   textConfirm?: string,
   onConfirm?: () => void,
   onConfirmAndEmail?: () => void,
   statusConfirmAndEmail?: boolean,
   onClose?: () => void,
   content?: any,
   children?: any,
}

export type Props = DialogConfirmProps;
