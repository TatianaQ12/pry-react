import { Card, Col, Row, Timeline, Upload, Button, Input, Tag, Select  } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react';

const { Option } = Select;

export const ComplaintChannelFollow: React.FC = () => {
    // Estado de la denuncia
    const [complaintStatus, setComplaintStatus] = useState<string>('Nueva');

    const handleStatusChange = (value: string) => {
        setComplaintStatus(value);
    }

    // Función para obtener el color asociado a cada estado
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

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <h1>Denuncia ID 2239209203-900
                </h1>
            </Col>
            <Col xs={8}>
                <Row>
                    <Card style={{ marginBottom: 20 }}>
                        <h2 style={{ marginBottom: 20 }}>Detalles de la Denuncia</h2>
                        {/* Estado de la denuncia */}
                        <p><strong>Estado:</strong> <Tag color={getStatusColor(complaintStatus)}>{complaintStatus}</Tag></p>
                        <p><strong>Tipo de Denuncia:</strong> Descriminación</p>
                        <p><strong>Denunciante:</strong> Anónimo</p>
                        <p><strong>Relación con la Empresa:</strong> Jefe de RRHH</p>
                        <p><strong>Dónde Sucedió:</strong> En la oficina</p>
                        <p><strong>Cuándo Sucedió:</strong> 25/04/2024</p>
                        <p><strong>Persona Involucrada:</strong> Richard Manuel Velez</p>
                        <p><strong>Descripción de los Hechos:</strong> El jefe bla blabla badjdfijsdifsjfksjdfk</p>
                    </Card>
                </Row>
                <Row>
                    <Card style={{ marginBottom: 20 }}>
                        <h2 style={{ marginBottom: 20 }}>Realizar publicaciones</h2>
                        <Input.TextArea placeholder="Escriba acá una publicación" rows={4} style={{ marginBottom: 20 }} />
                        <Upload>
                            <Button icon={<UploadOutlined />}>Subir Archivo</Button>
                        </Upload>
                        <Button type="primary" style={{ marginTop: 20 }}>Publicar</Button>
                    </Card>
                </Row>
            </Col>
            <Col xs={16}>
                <Card style={{ marginBottom: 20 }}>
                    <h2 style={{ marginBottom: 20 }}>Historial de Actividades</h2>
                    <Timeline>
                        <Timeline.Item>
                            <p><strong>Documento Subido - 12/01/2024</strong></p>
                            <p><strong>Publicado por:</strong> Usuario A</p>
                            <p><strong>Comentario:</strong> Se adjunta el documento necesario para el análisis.</p>
                            <Button type="link">Ver Documento</Button>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p><strong>Comentario Agregado - 14/01/2024</strong></p>
                            <p><strong>Publicado por:</strong> Usuario B</p>
                            <p><strong>Comentario:</strong> Revisar el documento adjunto para más detalles.</p>
                            <Button type="link">Ver Documento</Button>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p><strong>Documento Revisado - 16/01/2024</strong></p>
                            <p><strong>Publicado por:</strong> Usuario C</p>
                            <p><strong>Comentario:</strong> El documento ha sido revisado y aprobado.</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p><strong>Actualización del Estado - 20/01/2024</strong></p>
                            <p><strong>Publicado por:</strong> Usuario D</p>
                            <p><strong>Comentario:</strong> El estado de la denuncia ha sido actualizado a "En proceso".</p>
                        </Timeline.Item>
                    </Timeline>
                </Card>
            </Col>
        </Row>
    )
}
