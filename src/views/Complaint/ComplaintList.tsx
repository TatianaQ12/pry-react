import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { ModalConfirm } from "@/components/common/ModalConfirm/ModalConfirm";
import { useComplaintStore } from "@/hooks/useComplaintStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { ApiStatus } from "@/types/api/status";
import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EyeOutlined } from '@ant-design/icons';
import { Complaint } from "@/types/slices/complaint";

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'identifier', title: 'Identificador', align: 'center' },
    { type: 'text', dataIndex: 'type_complaint', title: 'Tipo de denuncia', align: 'center' },
    { type: 'text', dataIndex: 'reported', title: 'Denunciado', align: 'center' },
    { type: 'text', dataIndex: 'charge', title: 'Cargo del denunciado', align: 'center' },
    { type: 'text', dataIndex: 'created_at', title: 'Fecha', align: 'center' },
    { type: 'detail', dataIndex: 'detail', title: '', align: 'center' }
]

interface payloadList {
    page: number
    perPage: number
    idcomplaint_channel: number
    search?: string
}

export const ComplaintList: FC = () => {
    const navigate = useNavigate()
    const { modeStyle } = useStyleModeStore()
    const { id } = useParams()
    const { status, complaints, totalRows, getComplaints, deleteComplaint } = useComplaintStore()

    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [search, setSearch] = useState<string>('')
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
    const [rowSelected, setRowSelected] = useState<Complaint | null>(null)
    const [loadingTable, setLoadingTable] = useState<boolean>(false)

    useEffect(() => {
        if (search === '') {
            onListApi()
        } else {
            const timer = setTimeout(() => onListApi(), 300)
            return () => clearTimeout(timer)
        }
    }, [page, perPage, search])

    const onListApi = async () => {
        setLoadingTable(true)
        let payload: payloadList = {
            page: page,
            perPage: perPage,
            idcomplaint_channel: parseInt(id)
        }
        if (search !== '') payload = { ...payload, search: search }
        await getComplaints(payload)
        setLoadingTable(false)
    }

    const handleChangePage = (newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (current: number, size: number) => {
        setPerPage(size)
        setPage(1)
    }

    const onSearch = (search) => {
        setSearch(search)
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteComplaint(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            onListApi()
        }
    }

    const onSeeDetail = (rowSelected) => {
        navigate('/complaint/detail/' + rowSelected.id)
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Denuncias'}
                        columns={columns || []}
                        rows={complaints || []}
                        totalRows={totalRows}
                        hasOptions
                        rowsPerPage={perPage}
                        page={page}
                        onSearch={onSearch}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        onDelete={onDelete}
                        onBtnHelper1Fn={onSeeDetail}
                        onBtnHelper1ToolTip={"Ver más detalles de la denuncia"}
                        onBtnHelper1Icon={<EyeOutlined />}
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