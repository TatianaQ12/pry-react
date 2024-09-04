import React, { FC, useEffect } from 'react';
import ModalComponent from '@/components/common/Modal/Modal';
import ModalBody from '@/components/common/Modal/ModalBody';
import { useParams } from 'react-router-dom';
import { Col, Form, Input, Row, Select, Typography } from 'antd';
import { CodeColor } from '@/types/colors/colors';
import { useStyleModeStore } from '@/hooks/useStyleModeStore';
import { Formik } from 'formik';
import { useRRHHStore } from '@/hooks/useRRHHStore';
import { ApiStatus } from '@/types/api/status';
import { CustomFormFooter } from '@/components/common/CustomFormFooter/CustomFormFooter';
import { useSpecificObjectiveStore } from '@/hooks/useSpecificObjectiveStore';

interface ObjectiveDataForm {
    idcommittee: number
    idrrhh?: number
    name: string
    description?: string
    start_date?: string
    end_date?: string
}

interface FormErrors {
    idcommittee?: string
    idrrhh?: string
    name?: string
    description?: string
    start_date?: string
    end_date?: string
}

interface ModalProps {
    open: boolean
    closeModal: () => void
    onList: () => void
}

export const ModalCreateObjective: FC<ModalProps> = (props) => {
    const { open, closeModal, onList } = props

    const params = useParams()
    const { id } = params

    const { modeStyle } = useStyleModeStore()
    const { status: statusRRHH, rrhhs, getRRHHs } = useRRHHStore()
    const { status: statusSpecificObjective, createSpecificObjective } = useSpecificObjectiveStore()

    const data: ObjectiveDataForm = {
        idcommittee: parseInt(id),
        idrrhh: 0,
        name: '',
        description: '',
        start_date: '',
        end_date: ''
    }

    useEffect(() => {
        getRRHHs({ idcommittee: parseInt(id) })
    }, [])

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (!values.name) errors.name = "El campo es requerido";
        return errors;
    };

    const onSubmit = async (values: ObjectiveDataForm) => {
        let payload: ObjectiveDataForm = {
            idcommittee: parseInt(id),
            name: values.name
        }

        if (values.idrrhh !== undefined && values.idrrhh !== 0) {
            payload = { ...payload, idrrhh: values.idrrhh }
        }
        if (values.description !== undefined && values.description.trim() !== '') {
            payload = { ...payload, description: values.description }
        }
        if (values.start_date !== undefined && values.start_date.trim() !== '') {
            payload = { ...payload, start_date: values.start_date }
        }
        if (values.end_date !== undefined && values.end_date.trim() !== '') {
            payload = { ...payload, end_date: values.end_date }
        }

        const response = await createSpecificObjective(payload)
        if (response === true) {
            onList()
            closeModal()
        }
    }

    const onCancel = () => {
        closeModal()
    }

    return (
        <ModalComponent open={open} handleClose={closeModal} disableEscapeKeyDown disableBackdropClick size={600}>
            <ModalBody>
                <Row justify="center" style={{ marginBottom: 16 }}>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography.Title level={4} style={{ fontWeight: 600, color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}>
                            Crear objetivo
                        </Typography.Title>
                    </Col>
                </Row>
                <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                    {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => {
                        return (
                            <Form onFinish={handleSubmit} layout="vertical">
                                <Row gutter={[16, 0]}>
                                    <Col xs={24}>
                                        <Form.Item
                                            label="Nombre del objetivo:"
                                            validateStatus={errors.name && touched.name ? "error" : ""}
                                            help={errors.name && touched.name ? errors.name : ""}
                                        >
                                            <Input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                autoFocus
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24}>
                                        <Form.Item
                                            label="Descripción:"
                                        >
                                            <Input.TextArea
                                                id="description"
                                                name="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                autoSize={{ minRows: 4, maxRows: 6 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24}>
                                        <Form.Item
                                            label="Responsable:"
                                        >
                                            <Select
                                                showSearch
                                                optionFilterProp="children"
                                                onChange={(value) => setFieldValue('idrrhh', value)}
                                                filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                value={values.idrrhh !== 0 ? values.idrrhh : undefined}
                                                options={rrhhs.map(row => ({ label: row.name, value: row.id }))}
                                                loading={statusRRHH === ApiStatus.FETCHING}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            label="Fecha de inicio:"
                                        >
                                            <Input
                                                id="start_date"
                                                type="date"
                                                name="start_date"
                                                value={values.start_date}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            label="Fecha de vencimiento:"
                                        >
                                            <Input
                                                id="end_date"
                                                type="date"
                                                name="end_date"
                                                value={values.end_date}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24}>
                                        <CustomFormFooter
                                            buttonType="submit"
                                            confirmText={'Guardar'}
                                            cancelText={"Cancelar"}
                                            onConfirm={handleSubmit}
                                            onCancel={onCancel}
                                            loading={statusSpecificObjective === ApiStatus.FETCHING}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }}
                </Formik>
            </ModalBody>
        </ModalComponent>
    );
};