import React from 'react';
import { Divider } from 'antd';

const ModalBody = (props) => {
    const { children } = props;

    return (
        <div className="modal-body">
            {children}
            <Divider />
        </div>
    );
};

export default ModalBody;