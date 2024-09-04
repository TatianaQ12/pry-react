import { Modal, Typography, Button } from 'antd';

export const ModalConfirm: React.FC<any> = (props): JSX.Element | any => {
    const { open, title, text, closeModal, onConfirm, status2 = false } = props;

    return (
        <>
            <Modal
                visible={open}
                onCancel={closeModal}
                footer={null}
                closable={false}
                maskClosable={false}
                centered
                destroyOnClose
                style={{ padding: '30px' }}
            >
                <div>
                    <Typography.Title level={4}>{title || "¿Está seguro de eliminar el elemento seleccionado?"}</Typography.Title>
                    {/* <Button size="small" onClick={closeModal} style={{ position: 'absolute', top: '8px', right: '8px' }}>Cerrar</Button> */}
                </div>

                <Typography.Paragraph>{text || 'Si está seguro, haga clic en el botón "Aceptar" y el registro será eliminado.'}</Typography.Paragraph>

                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                    <Button onClick={onConfirm} type="primary" loading={status2}>
                        Aceptar
                    </Button>
                    <Button onClick={() => { closeModal(); }} type="default" style={{ marginLeft: '10px' }}>
                        Cancelar
                    </Button>
                </div>
            </Modal>
        </>
    );
};
