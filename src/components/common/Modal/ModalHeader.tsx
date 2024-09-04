import React from 'react';
import { Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ModalHeader = (props) => {
  const { icon, text, className = "", onCancel, clearState, disabledButton = false } = props;

  return (
    <div className={className}>
      <div className={className}>
        {icon && icon}
        <Title level={5} style={{ textTransform: 'uppercase', fontSize: 14, fontWeight: 600 }}>
          {text || ""}
        </Title>
      </div>
      {!disabledButton && (
        <Button
          type="text"
          onClick={() => { onCancel && onCancel(); clearState && clearState() }}
        >
          <CloseOutlined />
        </Button>
      )}
    </div>
  );
};

export default ModalHeader;