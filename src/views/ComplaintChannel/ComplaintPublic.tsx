import { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

export const ComplaintPublic: React.FC = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false);
    const [trackingData, setTrackingData] = useState<any>(null);

    const onFinish = async (values: any) => {
        setLoading(true);
        navigate(`/complaint/follow`)

        setLoading(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400, padding: 20, textAlign: 'center' }}>
                <h2>Seguimiento de Denuncia</h2>
                <Form
                    name="complaintTracking"
                    onFinish={onFinish}
                    style={{ marginTop: 20 }}
                >
                    <Form.Item
                        name="id"
                        rules={[{ required: true, message: 'Por favor ingresa el ID de la denuncia' }]}
                    >
                        <Input placeholder="ID de la Denuncia" />
                    </Form.Item>

                    <Form.Item
                        name="pin"
                        rules={[{ required: true, message: 'Por favor ingresa el PIN' }]}
                    >
                        <Input.Password placeholder="PIN" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                            Consultar Seguimiento
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    );
};

