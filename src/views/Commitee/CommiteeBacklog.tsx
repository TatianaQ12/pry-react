import React, { useEffect, useState } from 'react';
import { Collapse, Button, Space, Row, Col, Form, Input, Select } from 'antd';
import { DrawerDetailTask } from './components/DrawerDetailTask';
import { SpecificObjective } from '@/types/slices/specificObjective';
import { useSpecificObjectiveStore } from '@/hooks/useSpecificObjectiveStore';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesMap } from '@/types';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ModalCreateObjective } from './components/ModalCreateObjective';
import { ModalCreateTask } from './components/ModalCreateTask';
import CustomTableAnt from '@/components/common/CustomTableAnt/CustomTableAnt';
import { useTaskStore } from '@/hooks/useTaskStore';
import { ApiStatus } from '@/types/api/status';
import { Task } from '@/types/slices/task';
import { ModalConfirm } from '@/components/common/ModalConfirm/ModalConfirm';
import { useStateCommitteeStore } from '@/hooks/useStateCommitteeStore';
import { useCommiteStore } from '@/hooks/useCommiteStore';
import { Commitee } from '@/types/slices/commiteType';
import { useRRHHStore } from '@/hooks/useRRHHStore';

const { Panel } = Collapse;

export const CommiteeBacklog: React.FC = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params
    const { specificsObjectives, getSpecificObjectives, updateSpecificObjectives } = useSpecificObjectiveStore()
    const { status: statusTask, tasks, getTasks, updateOrder, deleteTask, setSelectedTask: setSelectedTaskStore, updateTask } = useTaskStore()
    const { statesCommittee, getStatesCommittees } = useStateCommitteeStore()
    const { committees, getCommittees } = useCommiteStore()
    const { rrhhs, getRRHHs } = useRRHHStore()

    const [sprints, setSprints] = useState<SpecificObjective[]>([]);
    const [visibleDrawer, setVisibleDrawer] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
    const [showObjectiveModal, setShowObjectiveModal] = useState<boolean>(false)
    const [showTaskModal, setShowTaskModal] = useState<boolean>(false)
    const [idSpecificObjective, setIdSpecificObjective] = useState<number>(0)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
    const [rowSelected, setRowSelected] = useState<Task | null>(null)
    const [committee, setCommittee] = useState<Commitee | null>(null)

    useEffect(() => {
        getCommitteeAPI()
        getObjectivesAPI()
        getStatesCommitteesApi()
        getRRHHApi()
    }, [])

    useEffect(() => {
        const sortedObjectives = [...specificsObjectives].sort((a, b) => a.order - b.order)
        setSprints(sortedObjectives)
    }, [specificsObjectives])

    useEffect(() => {
        if (committees[0]) setCommittee(committees[0])
    }, [committees])

    const getCommitteeAPI = async () => {
        await getCommittees({ id: id })
    }

    const getObjectivesAPI = async () => {
        await getSpecificObjectives({ idcommittee: id })
    }

    const getStatesCommitteesApi = async () => {
        await getStatesCommittees({ idcommittee: id })
    }

    const getTasksAPI = async (idspecific_objective: number) => {
        await getTasks({ idspecific_objective: idspecific_objective })
    }

    const getRRHHApi = async () => {
        await getRRHHs({ idcommittee: id })
    }

    const onClose = () => {
        setVisibleDrawer(false);
    };

    const handleRowDrop = async (updatedRows) => {
        const updatedData = updatedRows.map((row, index) => ({
            id: row.id,
            order: index + 1
        }))
        const payload = {
            tasks: updatedData
        }
        const response = await updateOrder(payload)
        if (response === true) getTasksAPI(idSpecificObjective)
    }

    const handlePanelChange = (key) => {
        if (key[0]) {
            setIdSpecificObjective(key[0])
            getTasksAPI(key[0])
        }
    };

    const onEditTask = (rowSelected) => {
        setIdSpecificObjective(rowSelected.id)
        setSelectedTaskStore(rowSelected)
        setShowTaskModal(true)
    }

    const onDeleteTask = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirmTask = async () => {
        if (!rowSelected) return
        const response = await deleteTask(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            getTasksAPI(idSpecificObjective)
        }
    }

    const onRowClick = (row) => {
        setSelectedTask(row);
        setVisibleDrawer(true);
    }

    const onChangeStateTable = async (value, rowSelected) => {
        await updateTask(rowSelected.id, { idcommittee_state: value })
        getTasksAPI(idSpecificObjective)
    }

    const onChangeRRHH = async (idspecific_objective: number, idrrhh: number) => {
        await updateSpecificObjectives(idspecific_objective, { idcommittee: id, idrrhh: idrrhh })
        await getObjectivesAPI()
    }

    const columns = [
        { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
        { type: 'text', dataIndex: 'order', title: 'Orden', align: 'center' },
        { type: 'text', dataIndex: 'code', title: 'Código', align: 'center' },
        { type: 'text', dataIndex: 'name', title: 'Título', align: 'center' },
        { type: 'text', dataIndex: 'description', title: 'Descripcíon', align: 'center', format: (row) => row.description || '-' },
        { type: 'select', dataIndex: 'state', title: 'Etapa', align: 'center', values: statesCommittee, onChange: onChangeStateTable },
        { type: 'text', dataIndex: 'start_date', title: 'Fecha de inicio', align: 'center', format: (row) => row.start_date || '-' },
        { type: 'text', dataIndex: 'end_date', title: 'Fecha de vencimiento', align: 'center', format: (row) => row.end_date || '-' },
        { type: 'text', dataIndex: 'rrhh', title: 'Responsable', align: 'center', format: (row) => row.end_date || '-' },
    ]

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Space size="small" style={{ marginLeft: '-25px' }}>
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(RoutesMap.COMMITE_LIST)}
                    >
                        Volver
                    </Button>
                </Space>
            </Col>
            {(committee?.idtype_committee !== 1 && committee?.idtype_committee !== null) &&
                <Col xs={24} style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        onClick={() => setShowObjectiveModal(true)}
                    >
                        Agregar Objetivo
                    </Button>
                </Col>
            }
            <Col xs={24}>
                <Collapse accordion onChange={handlePanelChange}>
                    {sprints.map(sprint => (
                        <Panel header={sprint.name} key={sprint.id}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24}>
                                    <Form layout="vertical">
                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Nombre del objetivo:">
                                                    <Input value={sprint.name} readOnly />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Responsable:">
                                                    <Select
                                                        showSearch
                                                        optionFilterProp="children"
                                                        onChange={(value) => onChangeRRHH(sprint.id, value)}
                                                        filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                        value={sprint.idrrhh !== 0 ? sprint.idrrhh : undefined}
                                                        options={rrhhs.map(row => ({ label: row.name, value: row.id }))}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            {committee?.idtype_committee !== 1 && <>
                                                <Col xs={24} sm={12}>
                                                    <Form.Item label="Fecha de inicio:">
                                                        <Input value={sprint.start_date} readOnly />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={12}>
                                                    <Form.Item label="Fecha de vencimiento:">
                                                        <Input value={sprint.end_date} readOnly />
                                                    </Form.Item>
                                                </Col>
                                            </>
                                            }
                                            <Col xs={24} sm={24}>
                                                <Form.Item label="Descripción:">
                                                    <Input.TextArea value={sprint.description} rows={4} readOnly />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                                <Col xs={24} style={{ textAlign: "right" }}>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setIdSpecificObjective(sprint.id)
                                            setShowTaskModal(true)
                                            setSelectedTaskStore({} as Task)
                                        }}>
                                        Agregar tarea
                                    </Button>
                                </Col>
                                <Col xs={24}>
                                    <CustomTableAnt
                                        columns={columns || []}
                                        rows={tasks || []}
                                        hasOptions
                                        onEdit={onEditTask}
                                        onDelete={onDeleteTask}
                                        onRowClick={onRowClick}
                                        onRowDrop={handleRowDrop}
                                        withoutPagination
                                        loading={statusTask === ApiStatus.FETCHING}
                                    />
                                </Col>
                            </Row>
                        </Panel>
                    ))}
                </Collapse>
            </Col>
            {selectedTask && <DrawerDetailTask visible={visibleDrawer} onClose={onClose} task={selectedTask} onList={() => getTasksAPI(idSpecificObjective)} />}
            {
                showObjectiveModal && (
                    <ModalCreateObjective
                        open={showObjectiveModal}
                        closeModal={() => setShowObjectiveModal(false)}
                        onList={() => getObjectivesAPI()}
                    />
                )
            }
            {
                showTaskModal && (
                    <ModalCreateTask
                        open={showTaskModal}
                        closeModal={() => setShowTaskModal(false)}
                        onList={() => getTasksAPI(idSpecificObjective)}
                        idspecific_objective={idSpecificObjective}
                    />
                )
            }
            {
                showModalConfirm && (
                    <ModalConfirm
                        open={showModalConfirm}
                        closeModal={() => setShowModalConfirm(false)}
                        onConfirm={onDeleteConfirmTask}
                        status2={statusTask !== ApiStatus.FETCHED}
                    />
                )
            }
        </Row>
    );
};

