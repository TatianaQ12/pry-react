import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { ModalConfirm } from "@/components/common/ModalConfirm/ModalConfirm";
import { useInitialTaskStore } from "@/hooks/useInitialTaskStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { InitialTask } from "@/types/slices/initialObjectiveType";
import { Button, Card, Col, Row, Space } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';

interface PayloadList {
    page: number
    perPage: number
    search?: string
    idinitial_objective: number
}

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'Nombre', align: 'center' },
    { type: 'text', dataIndex: 'description', title: 'Descripción', align: 'center', format: (row) => row?.description || '-' },
    { type: 'text', dataIndex: 'initial_objective', title: 'Objetivo', align: 'center' }
]


export const InitialTaskList: FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { modeStyle } = useStyleModeStore()
    const { status, initialTaks, totalRows, getInitialTasks, deleteInitialTask, setSelectedInitialTask } = useInitialTaskStore()

    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [search, setSearch] = useState<string>('')
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
    const [rowSelected, setRowSelected] = useState<InitialTask | null>(null)
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
            perPage: perPage,
            idinitial_objective: parseInt(id)
        }
        if (search !== '') payload = { ...payload, search: search }
        await getInitialTasks(payload)
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
        setSelectedInitialTask({} as InitialTask)
        navigate('/initial-task/form/' + id)
    }

    const onEdit = (rowSelected) => {
        setSelectedInitialTask(rowSelected)
        navigate('/initial-task/form/' + id)
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteInitialTask(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            onListApi()
        }
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <Space size="small" style={{ marginLeft: '-25px' }}>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate({ pathname: RoutesMap.INITIAL_OBJECTIVE_LIST })}
                        >
                            Volver
                        </Button>
                    </Space>
                    <CustomTableAnt
                        title={'Tareas iniciales'}
                        columns={columns || []}
                        rows={initialTaks || []}
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