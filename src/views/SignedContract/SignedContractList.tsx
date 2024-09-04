import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { ModalConfirm } from "@/components/common/ModalConfirm/ModalConfirm";
import { useSignedContractStore } from "@/hooks/useSignedContractStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { RoutesMap } from "@/types";
import { SignedContract } from "@/types/slices/contractType";
import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilePdfOutlined } from '@ant-design/icons';
import { ApiStatus } from "@/types/api/status";

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'contract', title: 'Contrato', align: 'center' },
    { type: 'text', dataIndex: 'rrhh', title: 'Contratado', align: 'center' },
    { type: 'text', dataIndex: 'rrhh_n_document', title: 'N° Documento', align: 'center' },
    { type: 'text', dataIndex: 'start_date', title: 'Fecha de inicio', align: 'center' },
    { type: 'text', dataIndex: 'end_date', title: 'Fecha de vencimiento', align: 'center' },
    { type: 'detail', dataIndex: 'detail', title: 'Detail', align: 'center' }
]

export const SignedContractList: FC = () => {
    const navigate = useNavigate()
    const { status, signedsContracts, totalRows, getSignedsContracts, setSelectedSignedContract, deleteSignedContract } = useSignedContractStore()
    const { modeStyle } = useStyleModeStore()

    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
    const [rowSelected, setRowSelected] = useState<SignedContract | null>(null)
    const [loadingTable, setLoadingTable] = useState<boolean>(false)

    useEffect(() => {
        getSignedsContractsApi()
    }, [page, perPage])

    const getSignedsContractsApi = async () => {
        setLoadingTable(true)
        const payload = {
            page: page,
            perPage: perPage
        }
        await getSignedsContracts(payload)
        setLoadingTable(false)
    }

    const handleChangePage = (newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (current: number, size: number) => {
        setPerPage(size)
        setPage(1)
    }

    const onAdd = async () => {
        setSelectedSignedContract({} as SignedContract)
        navigate({ pathname: RoutesMap.SIGNED_CONTRACT_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectedSignedContract(rowSelected)
        navigate({ pathname: RoutesMap.SIGNED_CONTRACT_FORM })
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteSignedContract(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            getSignedsContractsApi()
        }
    }

    const onShowPDF = (rowSelected: SignedContract) => {
        if (!rowSelected?.url) return
        const win = window.open(`${import.meta.env.VITE_APP_ROOT_URL}${rowSelected.url}`)
        win.focus()
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Contratos asignados'}
                        columns={columns || []}
                        rows={signedsContracts || []}
                        totalRows={totalRows}
                        hasOptions
                        rowsPerPage={perPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        onAddFn={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onBtnHelper1Fn={onShowPDF}
                        onBtnHelper1ToolTip={'Ver contrato'}
                        onBtnHelper1Icon={<FilePdfOutlined />}
                        onRowClick={() => null}
                        loading={loadingTable}
                    />
                </Card>
            </Col>
            {
                showModalConfirm && (
                    <ModalConfirm
                        open={showModalConfirm}
                        closeModal={() => setShowModalConfirm(false)}
                        onConfirm={onDeleteConfirm}
                        status2={status !== ApiStatus.FETCHED}
                    />
                )
            }
        </Row>
    )
}