import { CustomFormBody } from "@/components/common/CustomFormBody/CustomFormBody";
import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import { CustomFormHeader } from "@/components/common/CustomFormHeader/CustomFormHeader";
import { useModuleStore } from "@/hooks/useModuleStore";
import { useRuleStore } from "@/hooks/useRuleStore";
import { useViewFrontStore } from "@/hooks/useViewFrontStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Col, Divider, Form, Input, Row, Select } from "antd";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ViewDataForm {
    name: string
    idviewType: number
    idmodule: number
    url_event: string
    icon: string
    type: number
    idsrole?: number[]
}

interface FormErrors {
    name?: string
    idviewType?: string
    idmodule?: string
    url_event?: string
    icon?: string
    type?: string
    idsrole?: string
}

const types = [
    { value: 0, label: 'Menu' },
    { value: 1, label: 'Botón' },
    { value: 2, label: 'Otros' }
]

export const ViewForm: FC = () => {
    const navigate = useNavigate()
    const { status, selectedView, typesView, createViewFront, getTypesView } = useViewFrontStore()
    const { modules, getModule } = useModuleStore()
    const { rules, getRule } = useRuleStore()

    const isEdit = Object.entries(selectedView).length > 0 ? true : false
    const data: ViewDataForm = {
        name: selectedView?.name || '',
        idviewType: selectedView?.idviewType || 0,
        idmodule: selectedView?.idmodule || 0,
        url_event: selectedView?.url_event || '',
        icon: selectedView?.icon || '',
        type: parseInt(selectedView?.type) || 0,
        idsrole: selectedView?.detail?.idsrole ? JSON.parse(selectedView?.detail?.idsrole) : []
    }
    const [loadingCbx, setLoadingCbx] = useState<boolean>(false)

    useEffect(() => {
        getComboBoxesApi()
    }, [])

    const getComboBoxesApi = async () => {
        setLoadingCbx(true)
        await getTypesView()
        await getModule()
        await getRule()
        setLoadingCbx(false)
    }

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (!values.name) errors.name = "El campo es requerido";
        if (values.idviewType < 1) errors.idviewType = "El campo es requerido";
        if (values.idmodule < 1) errors.idmodule = "El campo es requerido";
        if (!values.url_event) errors.url_event = "El campo es requerido";
        // if (values.type) errors.type = "El campo es requerido";
        if (values.idsrole.length < 1) errors.idsrole = "El campo es requerido";
        return errors;
    };

    const onSubmit = async (values: ViewDataForm) => {
        const payload: ViewDataForm = {
            name: values.name,
            idviewType: values.idviewType,
            idmodule: values.idmodule,
            url_event: values.url_event,
            icon: values.icon,
            type: values.type,
            idsrole: values.idsrole
        }
        const response = await (!isEdit ? createViewFront(payload) : null)
        if (response === true) navigate({ pathname: RoutesMap.VIEW_LIST })
    }

    const onCancel = () => {
        navigate({ pathname: RoutesMap.VIEW_LIST })
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <CustomFormHeader
                    title={!isEdit ? 'Nueva vista' : 'Editar vista'}
                    text={!isEdit ? 'Ingrese los datos de la nueva vista' : 'Modifique los datos de la nueva vista'}
                    goBack={RoutesMap.VIEW_LIST}
                />
                <CustomFormBody>
                    <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                        {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => {
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
                                                label="Tipo de vista:"
                                                validateStatus={errors.idviewType && touched.idviewType ? "error" : ""}
                                                help={errors.idviewType && touched.idviewType ? errors.idviewType : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => setFieldValue('idviewType', value)}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.idviewType !== 0 ? values.idviewType : undefined}
                                                    options={typesView.map(charge => ({ label: charge.name, value: charge.id }))}
                                                    loading={loadingCbx}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Módulo:"
                                                validateStatus={errors.idmodule && touched.idmodule ? "error" : ""}
                                                help={errors.idmodule && touched.idmodule ? errors.idmodule : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => setFieldValue('idmodule', value)}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.idmodule !== 0 ? values.idmodule : undefined}
                                                    options={modules.map(charge => ({ label: charge.name, value: charge.id }))}
                                                    loading={loadingCbx}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="URL:"
                                                validateStatus={errors.url_event && touched.url_event ? "error" : ""}
                                                help={errors.url_event && touched.url_event ? errors.url_event : ""}
                                            >
                                                <Input
                                                    id="url_event"
                                                    type="text"
                                                    name="url_event"
                                                    value={values.url_event}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Ícono:"
                                                validateStatus={errors.icon && touched.icon ? "error" : ""}
                                                help={errors.icon && touched.icon ? errors.icon : ""}
                                            >
                                                <Input
                                                    id="icon"
                                                    type="text"
                                                    name="icon"
                                                    value={values.icon}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Tipo:"
                                                validateStatus={errors.type && touched.type ? "error" : ""}
                                                help={errors.type && touched.type ? errors.type : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => setFieldValue('type', value)}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.type}
                                                    options={types}
                                                    loading={loadingCbx}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                            <Form.Item
                                                label="Roles:"
                                                validateStatus={errors.idsrole && touched.idsrole ? "error" : ""}
                                                help={errors.idsrole && touched.idsrole ? errors.idsrole : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    mode="multiple"
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.idsrole}
                                                    onChange={(values) => setFieldValue('idsrole', values)}
                                                    options={rules.map(rule => ({ label: rule.name, value: rule.id }))}
                                                    loading={loadingCbx}
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