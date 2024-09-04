import { CustomFormBody } from "@/components/common/CustomFormBody/CustomFormBody";
import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import { CustomFormHeader } from "@/components/common/CustomFormHeader/CustomFormHeader";
import { useCommiteStore } from "@/hooks/useCommiteStore";
import { useTypeComplaintStore } from "@/hooks/useTypeComplaintStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Col, Divider, Form, Input, Row, Select } from "antd";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DataForm {
    name: string
    description: string
    idcommittee: number
}

interface FormErrors {
    name?: string
    description?: string
    idcommittee?: string
}

export const TypeComplaintForm: FC = () => {
    const navigate = useNavigate()
    const { status, selectedTypeComplaint, createTypeComplaint, updateTypeComplaint } = useTypeComplaintStore()
    const { committees, getCommittees } = useCommiteStore()

    const isEdit = Object.entries(selectedTypeComplaint).length > 0 ? true : false
    const data: DataForm = {
        name: selectedTypeComplaint?.name || '',
        description: selectedTypeComplaint?.description || '',
        idcommittee: selectedTypeComplaint?.idcommittee || 0
    }
    const [loadingCbx, setLoadingCbx] = useState<boolean>(false)

    useEffect(() => {
        getComboBoxesApi()
    }, [])

    const getComboBoxesApi = async () => {
        setLoadingCbx(true)
        await getCommittees({ idtype_committee: 1 })
        setLoadingCbx(false)
    }

    const validateForm = (values: DataForm) => {
        const errors: FormErrors = {};
        if (!values.name) errors.name = "El campo es requerido";
        if (!values.description) errors.description = "El campo es requerido";
        if (values.idcommittee < 1) errors.idcommittee = "El campo es requerido";
        return errors;
    }

    const onSubmit = async (values: DataForm) => {
        const response = await (!isEdit ? createTypeComplaint(values) : updateTypeComplaint(selectedTypeComplaint?.id, values))
        if (response === true) navigate({ pathname: RoutesMap.TYPE_COMPLAINT_LIST })
    }

    const onCancel = () => {
        navigate({ pathname: RoutesMap.TYPE_COMPLAINT_LIST })
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <CustomFormHeader
                    title={!isEdit ? 'Nuevo tipo de denuncia' : 'Editar tipo de denuncia'}
                    text={!isEdit ? 'Ingrese los datos del tipo de denuncia' : 'Modifique los datos del tipo de denuncia'}
                    goBack={RoutesMap.TYPE_COMPLAINT_LIST}
                />
                <CustomFormBody>
                    <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                        {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => {
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
                                            <Form.Item
                                                label="Comité de denuncias:"
                                                validateStatus={errors.idcommittee && touched.idcommittee ? "error" : ""}
                                                help={errors.idcommittee && touched.idcommittee ? errors.idcommittee : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => setFieldValue('idcommittee', value)}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.idcommittee !== 0 ? values.idcommittee : undefined}
                                                    options={committees.map(row => ({ label: row.name, value: row.id }))}
                                                    loading={loadingCbx}
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