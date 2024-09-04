import React from 'react';
import { Button, Space } from 'antd';

const ModalFooter = (props) => {
  const {
    confirmText, onConfirm, cancelText, onCancel, className,
    buttonType, secondaryText, onSecondaryConfirm, clearState,
    loadingConfirmText, disabledConfirmText
  } = props;

  return (
    <div className={className || "modal-footer"} style={{ position: 'sticky', bottom: 0 }}>
      <Space>
        {cancelText && (
          <Button
            onClick={() => { onCancel && onCancel(); clearState && clearState() }}
            type="text"
            danger
          >
            {cancelText}
          </Button>
        )}
        {confirmText && (
          <Button
            onClick={onConfirm}
            type={buttonType || "primary"}
            loading={loadingConfirmText}
            disabled={disabledConfirmText}
          >
            {confirmText}
          </Button>
        )}
        {secondaryText && (
          <Button
            onClick={onSecondaryConfirm}
            type="text"
            danger
          >
            {secondaryText}
          </Button>
        )}
      </Space>
    </div>
  );
};

export default ModalFooter;