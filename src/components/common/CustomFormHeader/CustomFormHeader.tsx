import { Button, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const CustomFormHeader = (props: any) => {
  const { title, text, className = "", clearState, goBack } = props;
 
  const navigate = useNavigate();

  return (
    <div className={`modal-header ${className}`}>
      <div className={className}>
        {goBack && (
          <Space size="small" style={{ marginLeft: '-25px' }}>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(goBack)}
            >
              Volver
            </Button>
          </Space>
        )}
        <Typography.Title level={5} style={{ fontWeight: 600 }}>
          {title && title.toUpperCase()}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 14, fontWeight: 100 }}>
          {text}
        </Typography.Text>
      </div>
    </div>
  );
};
