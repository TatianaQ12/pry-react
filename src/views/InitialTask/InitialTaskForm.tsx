import { CustomFormBody } from "@/components/common/CustomFormBody/CustomFormBody";
import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import { CustomFormHeader } from "@/components/common/CustomFormHeader/CustomFormHeader";
import { useInitialTaskStore } from "@/hooks/useInitialTaskStore";
import { ApiStatus } from "@/types/api/status";
import { Col, Divider, Form, Input, Row } from "antd";
import { Formik } from "formik";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface DataForm {
    name: string
    description: string
    idinitial_objective: number
}

interface FormErrors {
    name?: string
    description?: string
}

export const InitialTaskForm: FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { status, selectedInitialTasks, createInitialTask, updateInitialTask } = useInitialTaskStore()

    const isEdit = Object.entries(selectedInitialTasks).length > 0 ? true : false
    const data: DataForm = {
        name: selectedInitialTasks?.name || '',
        description: selectedInitialTasks?.description || '',
        idinitial_objective: parseInt(id)
    }

    const validateForm = (values: DataForm) => {
        const errors: FormErrors = {};
        if (!values.name) errors.name = "El campo es requerido";
        if (!values.description) errors.description = "El campo es requerido";
        return errors;
    }

    const onSubmit = async (values: DataForm) => {
        const response = await (!isEdit ? createInitialTask(values) : updateInitialTask(selectedInitialTasks?.id, values))
        if (response === true) navigate('/initial-task/list/' + id)
    }

    const onCancel = () => {
        navigate('/initial-task/list/' + id)
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <CustomFormHeader
                    title={!isEdit ? 'Nueva tarea' : 'Editar tarea'}
                    text={!isEdit ? 'Ingrese los datos de la tarea' : 'Modifique los datos de la tarea'}
                    goBack={'/initial-task/list/' + id}
                />
                <CustomFormBody>
                    <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                        {({ values, errors, touched, handleSubmit, handleChange }) => {
                            return (
                                <Form onFinish={handleSubmit} layout="vertical">
                                    <Row gutter={[16, 0]}>
                                        <Col xs={24}>
                                            <Form.Item
                                                label="Nombre:"
                                                validateStatus={errors.name && touched.name ? "error" : ""}
                                                help={errors.name && touched.name ? errors.name : ""}
                                            >
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                            <Form.Item
                                                label="Descripción:"
                                                validateStatus={errors.description && touched.description ? "error" : ""}
                                                help={errors.description && touched.description ? errors.description : ""}
                                            >
                                                <Input.TextArea
                                                    id="description"
                                                    name="description"
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    rows={4}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                            <Divider />
                                        </Col>
                                        <Col xs={24}>
                                            <CustomFormFooter
                                                buttonType="submit"
                                                confirmText={!isEdit ? 'Guardar' : 'Actualizar'}
                                                cancelText={"Cancelar"}
                                                onConfirm={handleSubmit}
                                                onCancel={onCancel}
                                                loading={status === ApiStatus.FETCHING}
                                            />
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        }}
                    </Formik>
                </CustomFormBody>
            </Col>
        </Row>
    )
}