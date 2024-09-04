import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { ModalConfirm } from "@/components/common/ModalConfirm/ModalConfirm";
import { useInitialObjectiveStore } from "@/hooks/useInitialObjectiveStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { InitialObjective } from "@/types/slices/initialObjectiveType";
import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PayloadList {
    page: number
    perPage: number
    search?: string
}

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'Nombre', align: 'center' },
    { type: 'text', dataIndex: 'description', title: 'Descripción', align: 'center', format: (row) => row?.description || '-' },
    { type: 'detail', dataIndex: 'detail', title: '', align: 'center' }
]

export const InitialObjectiveList: FC = () => {
    const navigate = useNavigate()
    const { modeStyle } = useStyleModeStore()
    const { status, initialObjectives, totalRows, getInitialObjectives, deleteInitialObjective, setSelectedInitialObjective } = useInitialObjectiveStore()

    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [search, setSearch] = useState<string>('')
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
    const [rowSelected, setRowSelected] = useState<InitialObjective | null>(null)
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
        let payload: PayloadList = {
            page: page,
            perPage: perPage
        }
        if (search !== '') payload = { ...payload, search: search }
        await getInitialObjectives(payload)
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
        setSelectedInitialObjective({} as InitialObjective)
        navigate({ pathname: RoutesMap.INITIAL_OBJECTIVE_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectedInitialObjective(rowSelected)
        navigate({ pathname: RoutesMap.INITIAL_OBJECTIVE_FORM })
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteInitialObjective(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            onListApi()
        }
    }

    const onDetails = (rowSelected) => {
        navigate('/initial-task/list/' + rowSelected.id)
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Comité inicial'}
                        columns={columns || []}
                        rows={initialObjectives || []}
                        totalRows={totalRows}
                        hasOptions
                        rowsPerPage={perPage}
                        page={page}
                        onSearch={onSearch}
                        onAddFn={onAdd}
                        onEdit={onEdit}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        onDelete={onDelete}
                        onDetail={onDetails}
                        onDetailToolTip="Ver tareas"
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