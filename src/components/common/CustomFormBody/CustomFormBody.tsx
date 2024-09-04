import { Col, Space } from "antd";

export const CustomFormBody = (props:any) => {

    const { children } = props;

    return (
        <Col span={24} style={{ alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
            {children}
        </Col>
    )
}
