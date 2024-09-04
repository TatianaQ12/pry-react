import { Modal } from 'antd';
import React from 'react';

const ModalComponent = (props) => {
    const { open, size, children, className, disableBackdropClick, disableEscapeKeyDown, handleClose } = props;

    const handleCancel = (e) => {
        if (disableBackdropClick && e.target === e.currentTarget) {
            return false;
        }

        if (disableEscapeKeyDown && e.keyCode === 27) {
            return false;
        }

        if (typeof handleClose === "function") {
            handleClose();
        }
    };

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            width={size}
            footer={null}
            maskClosable={!disableBackdropClick}
            destroyOnClose={true}
            className={className || ''}
            centered={true}
        >
            {children}
        </Modal>
    );
};

export default ModalComponent;