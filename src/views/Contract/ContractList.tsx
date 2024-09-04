import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { ModalConfirm } from "@/components/common/ModalConfirm/ModalConfirm";
import { useContractStore } from "@/hooks/useContractStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Contract } from "@/types/slices/contractType";
import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilePdfOutlined } from '@ant-design/icons';

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'title', title: 'Contrato', align: 'center' },
    { type: 'text', dataIndex: 'description', title: 'Descripción', align: 'center' },
    { type: 'detail', dataIndex: 'detail', title: '', align: 'center' }
]

export const ContractList: FC = () => {
    const navigate = useNavigate()
    const { status, contracts, totalRows, getContracts, setSelectedContract, deleteContract } = useContractStore()
    const { modeStyle } = useStyleModeStore()

    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
    const [rowSelected, setRowSelected] = useState<Contract | null>(null)
    const [loadingTable, setLoadingTable] = useState<boolean>(false)

    useEffect(() => {
        getContractsApi()
    }, [page, perPage])

    const getContractsApi = async () => {
        setLoadingTable(true)
        const payload = {
            page: page,
            perPage: perPage
        }
        await getContracts(payload)
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
        setSelectedContract({} as Contract)
        navigate({ pathname: RoutesMap.CONTRACT_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectedContract(rowSelected)
        navigate({ pathname: RoutesMap.CONTRACT_FORM })
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteContract(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            getContractsApi()
        }
    }

    const onShowPDF = (rowSelected: Contract) => {
        if (!rowSelected?.pdf_url) return
        const win = window.open(`${import.meta.env.VITE_APP_ROOT_URL}${rowSelected.pdf_url}`)
        win.focus()
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Contratos'}
                        columns={columns || []}
                        rows={contracts || []}
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