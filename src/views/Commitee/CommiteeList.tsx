import { useEffect, useState } from 'react'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import CustomTableAnt from '@/components/common/CustomTableAnt/CustomTableAnt'
import { useNavigate } from 'react-router-dom'
import { RoutesMap } from '@/types'
import { useCommiteStore } from '@/hooks/useCommiteStore'
import { Commitee } from '@/types/slices/commiteType'
import { Card, Col, Row } from 'antd'
import { ModalConfirm } from '@/components/common/ModalConfirm/ModalConfirm'
import { ApiStatus } from '@/types/api/status'

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'Nombre', align: 'center' },
    { type: 'text', dataIndex: 'type', title: 'Tipo', align: 'center' },
    { type: 'text', dataIndex: 'objective', title: 'Objetivo', align: 'center' },
    { type: 'text', dataIndex: 'start_date', title: 'Fecha de inicio', align: 'center', format: (row) => row?.start_date || '-' },
    { type: 'text', dataIndex: 'end_date', title: 'Fecha fin', align: 'center', format: (row) => row?.end_date || '-' },
    { type: 'detail', dataIndex: 'detail', title: '', align: 'center' }
]

export const CommiteList: React.FC = () => {
    const navigate = useNavigate()
    const { modeStyle } = useStyleModeStore()
    const { status, committees, getCommittees, setSelectedCommittee, deleteCommittee } = useCommiteStore()

    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
    const [rowSelected, setRowSelected] = useState<Commitee | null>(null)
    const [loadingTable, setLoadingTable] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        if (search === '') {
            getCommitteesApi()
        } else {
            const timer = setTimeout(() => getCommitteesApi(), 300)
            return () => clearTimeout(timer)
        }
    }, [page, perPage, search])

    const getCommitteesApi = async () => {
        setLoadingTable(true)
        const payload = {
            page: page,
            perPage: perPage
        }
        await getCommittees(payload)
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

    const onAdd = async () => {
        setSelectedCommittee({} as Commitee)
        navigate({ pathname: RoutesMap.COMMITE_CREATE })
    }

    const onEdit = (rowSelected) => {
        setSelectedCommittee(rowSelected)
        navigate({ pathname: RoutesMap.COMMITE_EDIT })
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteCommittee(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            getCommitteesApi()
        }
    }

    const onDetail = (rowSelected) => {
        navigate(`/commitee/backlog/${rowSelected.id}`)
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Comites'}
                        columns={columns || []}
                        rows={committees}
                        hasOptions
                        rowsPerPage={perPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        onSearch={onSearch}
                        onAddFn={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onDetail={onDetail}
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

