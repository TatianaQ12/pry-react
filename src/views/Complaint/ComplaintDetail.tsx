import { Card, Col, Row, Timeline, Upload, Button, Input, Tag, Select, Space, Typography, List, Tooltip } from 'antd'
import { UploadOutlined, ArrowLeftOutlined, EyeOutlined, HistoryOutlined, FileTextOutlined, DeleteOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useComplaintStore } from '@/hooks/useComplaintStore';
import { Complaint, ComplaintEvidence } from '@/types/slices/complaint';
import { useComplaintHistoryStore } from '@/hooks/useComplaintHistoryStore';
import moment from 'moment';
import './styles/styleComplaint.css';
import { ComplaintDetailSkeleton } from './components/ComplaintDetailSkeleton';
import { useComplaintEvidenceStore } from '@/hooks/useComplaintEvidenceStore';
import { useAuthStore } from '@/hooks';
import { CustomSnackbar } from '@/components/common/CustomSnackbar/CustomSnackbar';
import { ModalConfirm } from '@/components/common/ModalConfirm/ModalConfirm';
import { ApiStatus } from '@/types/api/status';

const { Text, Paragraph } = Typography;

const states = [
    { name: "Nueva", id: 0 },
    { name: "En Curso", id: 1 },
    { name: "Rechazada", id: 2 },
    { name: "Finalizada", id: 3 },
]

export const ComplaintDetail: FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const { complaints, getComplaints, updateComplaint } = useComplaintStore()
    const { complaintHistories, getComplaintHistory } = useComplaintHistoryStore()
    const { status: statusEvidence, complaintEvidences, getComplaintEvidences, createComplaintEvidence, deleteComplaintEvidence } = useComplaintEvidenceStore()

    const [complaint, setComplaint] = useState<Complaint>({} as Complaint)
    const [loading, setLoading] = useState<boolean>(false)
    const [fileList, setFileList] = useState([])
    const [comment, setComment] = useState<string>('')
    const [activeTab, setActiveTab] = useState<string>('historial')
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
    const [rowSelected, setRowSelected] = useState<ComplaintEvidence | null>(null)

    useEffect(() => {
        getComplaintDataAPI()
    }, [])

    useEffect(() => {
        if (complaints.length > 0) {
            setComplaint(complaints[0])
        }
    }, [complaints]);

    const getComplaintDataAPI = async () => {
        setLoading(true)
        getComplaintApi()
        getDetailsApi()
        setLoading(false)
    }

    const getComplaintApi = async () => {
        await getComplaints({ id: id })
    }

    const getDetailsApi = async () => {
        await getComplaintHistory({ idcomplaint: id })
        await getComplaintEvidences({ idcomplaint: id, iduser: user.id })
    }

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'Nueva':
                return 'blue';
            case 'En Curso':
                return 'green';
            case 'Rechazada':
                return 'red';
            case 'Finalizada':
                return 'gold';
            default:
                return 'default';
        }
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'Nueva':
                return 'select-nueva';
            case 'En Curso':
                return 'select-en-curso';
            case 'Rechazada':
                return 'select-rechazada';
            case 'Finalizada':
                return 'select-finalizada';
            default:
                return '';
        }
    };

    const onChangeStatus = async (value: string) => {
        let status_complaint
        switch (value) {
            case 'Nueva':
                status_complaint = 0
                break;

            case 'En Curso':
                status_complaint = 1
                break;

            case 'Rechazada':
                status_complaint = 2
                break;

            case 'Finalizada':
                status_complaint = 3
                break;

            default:
                break;
        }
        await updateComplaint(complaint?.id, { status_complaint: status_complaint })
        await getComplaintApi()
    }

    const showDocument = (url: string) => {
        if (url === '') return
        const win = window.open(`${import.meta.env.VITE_APP_ROOT_URL}${url}`)
        win.focus()
    }

    const createEvidence = async () => {
        if (comment === '') return CustomSnackbar('warning', 'Ingrese una descripción para la publicación.')
        if (fileList.length === 0) return CustomSnackbar('warning', 'Ingrese una evidencia para la publicación.')

        const formData = new FormData()
        formData.append('idcomplaint', id)
        formData.append('document', fileList[0].originFileObj)
        formData.append('description', comment)

        const response = await createComplaintEvidence(formData)
        if (response === true) {
            setFileList([])
            setComment('')
            await getDetailsApi()
        }
    }

    const onChangeUpload = (info) => {
        let fileList = [...info.fileList]
        fileList = fileList.slice(-1)
        setFileList(fileList)
    };

    const onDeleteDocument = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        console.log(rowSelected)
        const response = await deleteComplaintEvidence(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            getDetailsApi()
        }
    }

    return (<>
        {loading
            ?
            <ComplaintDetailSkeleton />
            :
            <Row gutter={[16, 16]} style={{ padding: '20px' }}>
                <Col xs={24}>
                    <Space size="small">
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate('/complaint/list/' + complaint?.idcomplaint_channel)}
                        >
                            Volver
                        </Button>
                    </Space>
                </Col>
                <Col xs={24} sm={12}>
                    <h1>Denuncia ID {complaint?.identifier}</h1>
                </Col>
                <Col xs={24} sm={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <label style={{ marginRight: '8px' }}>Estado:</label>
                    <Select
                        onChange={(value) => onChangeStatus(value)}
                        value={complaint?.status_name}
                        options={states.map(row => ({ label: row.name, value: row.name }))}
                        className={getStatusClass(complaint?.status_name)}
                        style={{
                            minWidth: '120px'
                        }}
                    />
                </Col>
                <Col xs={24} sm={8}>
                    <Card title="Detalles de la denuncia" style={{ marginBottom: 20 }}>
                        <p>
                            <strong>Estado:</strong> <Tag color={getStatusColor(complaint?.status_name)}>{complaint?.status_name}</Tag>
                        </p>
                        <p><strong>Tipo de Denuncia:</strong> {complaint?.type_complaint}</p>
                        <p><strong>Denunciante:</strong> {complaint?.anonymous === '1' ? complaint?.user_name : 'Anónimo'}</p>
                        <p><strong>Relación con la Empresa:</strong> {complaint?.charge}</p>
                        <p><strong>Dónde Sucedió:</strong> {complaint?.area}</p>
                        <p><strong>Cuándo Sucedió:</strong> {moment(complaint?.date_happened).format('LL')}</p>
                        <p><strong>Persona Involucrada:</strong> {complaint?.reported}</p>
                        <p><strong>Descripción de los Hechos:</strong> {complaint?.description}</p>
                    </Card>
                    <Card title="Realizar publicaciones" style={{ marginBottom: 20 }}>
                        <Input.TextArea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Escriba acá una publicación"
                            rows={4}
                            style={{ marginBottom: 20 }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Upload fileList={fileList} onChange={onChangeUpload} beforeUpload={() => false}>
                                <Button icon={<UploadOutlined />}>Subir Archivo</Button>
                            </Upload>
                            <Button type="primary" onClick={createEvidence}>Publicar</Button>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={16}>
                    <Card
                        style={{ marginBottom: 20 }}
                        tabList={[
                            {
                                key: 'historial',
                                tab: (
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <Tooltip title="Historial">
                                            <HistoryOutlined style={{ marginRight: 8 }} />
                                        </Tooltip>
                                        Historial
                                    </span>
                                ),
                            },
                            {
                                key: 'evidencias',
                                tab: (
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <Tooltip title="Mis evidencias">
                                            <FileTextOutlined style={{ marginRight: 8 }} />
                                        </Tooltip>
                                        Mis evidencias
                                    </span>
                                ),
                            },
                        ]}
                        activeTabKey={activeTab}
                        onTabChange={key => setActiveTab(key)}
                    >
                        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            {activeTab === 'historial' && (
                                <Timeline style={{ marginTop: '5px'}}>
                                    {complaintHistories.map(row => (
                                        <Timeline.Item key={row.created_at}>
                                            <Paragraph>
                                                <Text strong>{row.description}</Text>
                                                <Text type="secondary" style={{ marginLeft: 8 }}>
                                                    {moment(row.created_at).format('LLL')}
                                                </Text>
                                            </Paragraph>
                                            <Paragraph>
                                                <Text strong>Publicado por:</Text> {row.user_name}
                                            </Paragraph>
                                            <Paragraph>
                                                <Text strong>Comentario:</Text> {row.comment || 'No hay comentarios'}
                                            </Paragraph>
                                            {row.url && (
                                                <Button type="link" onClick={() => showDocument(row.url)}>
                                                    Ver Documento
                                                </Button>
                                            )}
                                        </Timeline.Item>
                                    ))}
                                </Timeline>
                            )}
                            {activeTab === 'evidencias' && (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={complaintEvidences}
                                    renderItem={document => (
                                        <List.Item
                                            actions={[
                                                <Tooltip title="Ver documento">
                                                    <Button
                                                        type="text"
                                                        icon={<EyeOutlined />}
                                                        onClick={() => window.open(`${import.meta.env.VITE_APP_ROOT_URL}${document.url}`, '_blank')}
                                                    />
                                                </Tooltip>,
                                                document.iduser === user.id ? (
                                                    <Tooltip title="Eliminar documento">
                                                        <Button
                                                            type="text"
                                                            icon={<DeleteOutlined />}
                                                            onClick={() => onDeleteDocument(document)}
                                                        />
                                                    </Tooltip>
                                                ) : null
                                            ]}
                                        >
                                            <List.Item.Meta
                                                title={
                                                    <Space direction="vertical" size={0}>
                                                        <Typography.Text strong style={{ fontSize: '16px' }}>{document.name}</Typography.Text>
                                                        <Typography.Text type="secondary">Descripción: {document.description}</Typography.Text>
                                                        <Typography.Text type="secondary">Fecha: {moment(document.created_at).format('LL')}</Typography.Text>
                                                    </Space>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        }
        {
            showModalConfirm && (
                <ModalConfirm
                    open={showModalConfirm}
                    closeModal={() => setShowModalConfirm(false)}
                    onConfirm={onDeleteConfirm}
                    status2={statusEvidence === ApiStatus.FETCHING}
                />
            )
        }
    </>)
}