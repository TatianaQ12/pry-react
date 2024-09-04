import { useEffect, useState } from 'react'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import CustomTableAnt from '@/components/common/CustomTableAnt/CustomTableAnt'
import { Card, Col, Row } from 'antd'
import { useComplaitChannelStore } from '@/hooks/useComplaintChannel'
import { ApiStatus } from '@/types/api/status'
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { ComplaintChannel } from '@/types/slices/complaintChannel'
import { RoutesMap } from '@/types'
import { ModalConfirm } from '@/components/common/ModalConfirm/ModalConfirm'

interface payloadGet {
    page: number
    perPage: number
    search?: string
}

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'identifier', title: 'ID identificador', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'Nombre', align: 'center' },
    { type: 'text', dataIndex: 'created_at', title: 'Fecha de creación', align: 'center' },
    { type: 'text', dataIndex: 'status', title: 'Estado', align: 'center', format: (row) => row.status == 1 ? 'Activo' : row.status },
    { type: 'detail', dataIndex: 'detail', title: '', align: 'center' }
]

export const ComplaintChannelList: React.FC = () => {
    const navigate = useNavigate()
    const { modeStyle } = useStyleModeStore()
    const { status, complaintChannels, getComplaintChannels, setSelectedComplaintChannel, deleteComplaintChannel } = useComplaitChannelStore()

    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
    const [rowSelected, setRowSelected] = useState<ComplaintChannel | null>(null)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        if (search === '') {
            onListApi()
        } else {
            const timer = setTimeout(() => onListApi(), 300)
            return () => clearTimeout(timer)
        }
    }, [page, perPage, search])

    const onListApi = async () => {
        let payload: payloadGet = {
            page: page,
            perPage: perPage
        }
        if (search !== '') payload = { ...payload, search: search }
        await getComplaintChannels(payload)
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

    const onAdd = async () => {
        setSelectedComplaintChannel({} as ComplaintChannel)
        navigate({ pathname: RoutesMap.COMPLAINT_CHANNEL_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectedComplaintChannel(rowSelected)
        navigate({ pathname: RoutesMap.COMPLAINT_CHANNEL_FORM })
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteComplaintChannel(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            onListApi()
        }
    }

    const onSeeComplaints = (rowSelected) => {
        navigate('/complaint/list/' + rowSelected.id)
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Canal de denuncias'}
                        columns={columns || []}
                        rows={complaintChannels}
                        hasOptions
                        rowsPerPage={perPage}
                        page={page}
                        onSearch={onSearch}
                        onAddFn={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        onBtnHelper1Fn={onSeeComplaints}
                        onBtnHelper1ToolTip={"Ver denuncias"}
                        onBtnHelper1Icon={<EyeOutlined />}
                        loading={status === ApiStatus.FETCHING}
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

