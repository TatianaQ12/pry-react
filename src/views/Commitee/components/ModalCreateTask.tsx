import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import ModalComponent from "@/components/common/Modal/Modal";
import ModalBody from "@/components/common/Modal/ModalBody";
import { useRRHHStore } from "@/hooks/useRRHHStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { useTaskStore } from "@/hooks/useTaskStore";
import { ApiStatus } from "@/types/api/status";
import { CodeColor } from "@/types/colors/colors";
import { Col, Form, Input, Row, Select, Typography } from "antd";
import { Formik } from "formik";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

interface ModalProps {
    open: boolean
    closeModal: () => void
    onList: () => void
    idspecific_objective: number
}

interface TaskDataForm {
    idspecific_objective: number
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

export const ModalCreateTask: FC<ModalProps> = (props) => {
    const { open, closeModal, onList, idspecific_objective } = props

    const params = useParams()
    const { id } = params
    const { modeStyle } = useStyleModeStore()
    const { status: statusRRHH, rrhhs, getRRHHs } = useRRHHStore()
    const { status: statusTask, selectedTask, createTask, updateTask } = useTaskStore()

    const isEdit = Object.entries(selectedTask).length > 0 ? true : false
    const data: TaskDataForm = {
        idspecific_objective: idspecific_objective,
        idrrhh: selectedTask?.idrrhh || 0,
        name: selectedTask?.name || '',
        description: selectedTask?.description || '',
        start_date: selectedTask?.start_date || '',
        end_date: selectedTask?.end_date || ''
    }

    useEffect(() => {
        getRRHHs({ idcommittee: id })
    }, [])

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (!values.name) errors.name = "El campo es requerido";
        return errors;
    };

    const onSubmit = async (values: TaskDataForm) => {
        let payload: TaskDataForm = {
            idspecific_objective: parseInt(id),
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

        const response = await (!isEdit ? createTask(payload) : updateTask(selectedTask.id, payload))
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
                            {!isEdit ? 'Crear tarea' : 'Actualizar tarea'}
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
                                            label="Nombre de la tarea:"
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
                                            loading={statusTask === ApiStatus.FETCHING}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }}
                </Formik>
            </ModalBody>
        </ModalComponent>
    )
}