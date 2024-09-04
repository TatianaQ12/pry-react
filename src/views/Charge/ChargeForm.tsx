import { CustomFormBody } from "@/components/common/CustomFormBody/CustomFormBody";
import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import { CustomFormHeader } from "@/components/common/CustomFormHeader/CustomFormHeader";
import { useChargeStore } from "@/hooks/useChargeStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Col, Divider, Form, Input, Row } from "antd";
import { Formik } from "formik";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ChargeDataForm {
    id?: number,
    name: string
    description: string
}

interface FormErrors {
    name?: string;
    description?: string;
}

export const ChargeForm: FC = () => {
    const navigate = useNavigate()
    const { status, selectedCharge, createCharge, updateCharge } = useChargeStore()

    const isEdit = Object.entries(selectedCharge).length > 0 ? true : false
    const data: ChargeDataForm = {
        id: selectedCharge?.id || 0,
        name: selectedCharge?.name || '',
        description: selectedCharge?.description || ''
    }

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (!values.name) errors.name = "El campo es requerido";
        return errors;
    };

    const onSubmit = async (values: ChargeDataForm) => {
        const payload = {
            name: values.name,
            description: values.description
        }

        const response = await (!isEdit ? createCharge(payload) : updateCharge(selectedCharge.id, payload))
        if (response === true) navigate({ pathname: RoutesMap.CHARGE_LIST })
    }

    const onCancel = () => {
        navigate({ pathname: RoutesMap.CHARGE_LIST })
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <CustomFormHeader
                    title={!isEdit ? 'Nuevo cargo' : 'Editar cargo'}
                    text={!isEdit ? 'Ingrese los datos del nuevo cargo' : 'Modifique los datos del cargo'}
                    goBack={RoutesMap.CHARGE_LIST}
                />
                <CustomFormBody>
                    <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                        {({ values, errors, touched, handleSubmit, handleChange }) => {
                            return (
                                <Form onFinish={handleSubmit} layout="vertical">
                                    <Row gutter={[16, 0]}>
                                        <Col xs={24} md={12}>
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
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Descripción:"
                                                validateStatus={errors.description && touched.description ? "error" : ""}
                                                help={errors.description && touched.description ? errors.description : ""}
                                            >
                                                <Input
                                                    id="description"
                                                    type="text"
                                                    name="description"
                                                    value={values.description}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Divider />
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