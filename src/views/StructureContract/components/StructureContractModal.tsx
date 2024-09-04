import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar";
import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import ModalComponent from "@/components/common/Modal/Modal";
import ModalBody from "@/components/common/Modal/ModalBody";
import { useStructureContractStore } from "@/hooks/useStructureContractStore";
import { FC, useEffect, useState } from "react";
import { CopyOutlined } from '@ant-design/icons';
import { ApiStatus } from "@/types/api/status";
import { Col, Form, Row, Select } from "antd";
import { useContractStore } from "@/hooks/useContractStore";

interface ModalProps {
    open: boolean
    closeModal: () => void
}

const columns = [
    { type: 'text', dataIndex: 'description', title: 'Párrafo', align: 'center' },
    { type: 'text', dataIndex: 'reference', title: 'Referencia', align: 'center' },
    { type: 'detail', dataIndex: 'detail', title: '', align: 'center' }
]

export const StructureContractModal: FC<ModalProps> = (props) => {
    const { open, closeModal } = props

    const { status: statusCotract, contracts, getContracts } = useContractStore()
    const { status, structuresContract, getStructuresContracts } = useStructureContractStore()
    const [selectedContract, setSelectedContract] = useState<number>(1)

    useEffect(() => {
        getContracts()
    }, [])

    useEffect(() => {
        getStructuresContracts({
            idcontract: selectedContract
        })
    }, [selectedContract])

    const onCopy = (rowSelected) => {
        if (!navigator.clipboard) {
            return CustomSnackbar('error', 'El navegador no admite el API del portapapeles.')
        }

        navigator.clipboard.writeText(rowSelected.reference)
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
                <Row gutter={[16, 16]}>
                    <Col xs={24}>
                        <Form.Item label="Contrato:">
                            <Select
                                showSearch
                                optionFilterProp="children"
                                onChange={(value) => setSelectedContract(value)}
                                filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                value={selectedContract}
                                options={contracts.map(row => ({ label: row.title, value: row.id }))}
                                loading={statusCotract === ApiStatus.FETCHING}
                                style={{ width: '95%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <CustomTableAnt
                            title={'Referencia de párrafos'}
                            columns={columns || []}
                            rows={structuresContract || []}
                            hasOptions
                            onBtnHelper1Fn={onCopy}
                            onBtnHelper1ToolTip={'Copiar valor'}
                            onBtnHelper1Icon={<CopyOutlined />}
                            onRowClick={() => null}
                            loading={status === ApiStatus.FETCHING}
                            withoutPagination
                        />
                    </Col>
                </Row>
            </ModalBody>
        </ModalComponent>
    )
}