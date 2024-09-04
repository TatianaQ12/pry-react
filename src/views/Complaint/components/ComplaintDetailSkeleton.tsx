import { FC } from 'react';
import { Row, Col, Space, Card, Timeline, Skeleton } from 'antd';


export const ComplaintDetailSkeleton: FC = () => (
    <Row gutter={[16, 16]} style={{ padding: '20px' }}>
        <Col xs={24}>
            <Space size="small">
                <Skeleton.Button active />
            </Space>
        </Col>
        <Col xs={24} sm={12}>
            <Skeleton.Input active style={{ width: 200 }} />
        </Col>
        <Col xs={24} sm={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Skeleton.Input active style={{ minWidth: '120px' }} />
        </Col>
        <Col xs={24} sm={8}>
            <Card title={<Skeleton.Input active style={{ width: 150 }} />} style={{ marginBottom: 20 }}>
                <Skeleton active paragraph={{ rows: 8 }} />
            </Card>
            <Card title={<Skeleton.Input active style={{ width: 200 }} />} style={{ marginBottom: 20 }}>
                <Skeleton.Input active style={{ width: '100%', marginBottom: 20 }} />
                <Skeleton.Button active style={{ width: '100%' }} />
                <Skeleton.Button active style={{ width: '100%', marginTop: 20 }} />
            </Card>
        </Col>
        <Col xs={24} sm={16}>
            <Card title={<Skeleton.Input active style={{ width: 200 }} />} style={{ marginBottom: 20 }}>
                <Timeline>
                    <Timeline>
                        {Array(3).fill(null).map((_, index) => (
                            <Timeline.Item key={index}>
                                <Skeleton active paragraph={{ rows: 2 }} />
                                <Skeleton.Button active style={{ width: 100 }} />
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </Timeline>
            </Card>
        </Col>
    </Row>
);