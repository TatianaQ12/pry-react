import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import ModalComponent from "@/components/common/Modal/Modal";
import ModalBody from "@/components/common/Modal/ModalBody";
import { useContractVariableStore } from "@/hooks/useContractVariable";
import { ApiStatus } from "@/types/api/status";
import { FC, useEffect } from "react";
import { CopyOutlined } from '@ant-design/icons';
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar";

interface ModalProps {
    open: boolean
    closeModal: () => void
}

const columns = [
    { type: 'text', dataIndex: 'name', title: 'Variable', align: 'center' },
    { type: 'text', dataIndex: 'value', title: 'Valor', align: 'center' },
    { type: 'detail', dataIndex: 'detail', title: '', align: 'center' }
]

export const ContractVariableModal: FC<ModalProps> = (props) => {
    const { open, closeModal } = props

    const { status, contractVariables, getContractVariables } = useContractVariableStore()

    useEffect(() => {
        getContractVariables()
    }, [])

    const onCopy = (rowSelected) => {
        if (!navigator.clipboard) {
            return CustomSnackbar('error', 'El navegador no admite el API del portapapeles.')
        }

        navigator.clipboard.writeText(rowSelected.value)
            .then(() => {
                CustomSnackbar('success', '¡Valor copiado al portapapeles con éxito!')
                closeModal()
                return
            })
            .catch(() => {
                return CustomSnackbar('error', 'Error al copiar el valor al portapapeles.')
            });
    }

    return (
        <ModalComponent open={open} handleClose={closeModal} disableEscapeKeyDown disableBackdropClick size={600}>
            <ModalBody>
                <CustomTableAnt
                    title={'Leyenda de variables'}
                    columns={columns || []}
                    rows={contractVariables || []}
                    hasOptions
                    onBtnHelper1Fn={onCopy}
                    onBtnHelper1ToolTip={'Copiar valor'}
                    onBtnHelper1Icon={<CopyOutlined />}
                    onRowClick={() => null}
                    loading={status === ApiStatus.FETCHING}
                    withoutPagination
                />
            </ModalBody>
        </ModalComponent>
    )
}