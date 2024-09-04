import { CustomFormBody } from "@/components/common/CustomFormBody/CustomFormBody";
import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import { CustomFormHeader } from "@/components/common/CustomFormHeader/CustomFormHeader";
import { useAuditStore } from "@/hooks/useAuditStore";
import { useDepartmentStore } from "@/hooks/useDepartmentStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Department, Province } from "@/types/slices/departmentType";
import { Col, Divider, Form, Input, Row, Select } from "antd";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuditDataForm {
    registry_number: string
    business_name: string
    phone: string
    email: string
    iddistrict: number
}

interface FormErrors {
    registry_number?: string
    business_name?: string
    phone?: string
    email?: string
    iddistrict?: string
}


export const AuditForm: FC = () => {
    const navigate = useNavigate()
    const { status, selectedAudit, createAudit, updateAudit } = useAuditStore()
    const { departments, getDepartments } = useDepartmentStore()

    const isEdit = Object.entries(selectedAudit).length > 0 ? true : false
    const data: AuditDataForm = {
        registry_number: selectedAudit?.registry_number || '',
        business_name: selectedAudit?.business_name || '',
        phone: selectedAudit?.phone || '',
        email: selectedAudit?.email || '',
        iddistrict: selectedAudit?.iddistrict || 0
    }
    const [loadingCbx, setLoadingCbx] = useState<boolean>(false)
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)

    useEffect(() => {
        getComboBoxesApi()
    }, [])

    useEffect(() => {
        if (isEdit && !!departments.length && selectedAudit.iddistrict) {
            const department = departments.find(department =>
                department.provinces.find(province =>
                    province.districts.find(district => district.id === selectedAudit.iddistrict)
                )
            );
            setSelectedDepartment(department || null)
        }
    }, [isEdit, departments, selectedAudit])

    useEffect(() => {
        if (isEdit && !!selectedDepartment?.provinces.length && selectedAudit.iddistrict) {
            const province = selectedDepartment.provinces.find(province =>
                province.districts.some(district => district.id === selectedAudit.iddistrict)
            )
            setSelectedProvince(province || null)
        }
    }, [isEdit, selectedDepartment])

    const getComboBoxesApi = async () => {
        setLoadingCbx(true)
        await getDepartments()
        setLoadingCbx(false)
    }

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (!values.registry_number) errors.registry_number = "El campo es requerido";
        if (!values.business_name) errors.business_name = "El campo es requerido";
        if (!values.phone) errors.phone = "El campo es requerido";
        if (!values.email) errors.email = "El campo es requerido";
        if (values.iddistrict < 1) errors.iddistrict = "El campo es requerido";
        return errors;
    }

    const onSubmit = async (values: AuditDataForm) => {
        const payload: AuditDataForm = {
            registry_number: values.registry_number,
            business_name: values.business_name,
            email: values.email,
            phone: values.phone,
            iddistrict: values.iddistrict
        }

        const response = await (!isEdit ? createAudit(payload) : updateAudit(selectedAudit.id, payload))
        if (response === true) navigate({ pathname: RoutesMap.AUDIT_LIST })
    }

    const onCancel = () => {
        navigate({ pathname: RoutesMap.AUDIT_LIST })
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <CustomFormHeader
                    title={!isEdit ? 'Nueva empresa auditora' : 'Editar empresa auditora'}
                    text={!isEdit ? 'Ingrese los datos de la nueva empresa auditorsa' : 'Modifique los datos de la empresa auditorsa'}
                    goBack={RoutesMap.AUDIT_LIST}
                />
                <CustomFormBody>
                    <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                        {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => {
                            return (
                                <Form onFinish={handleSubmit} layout="vertical">
                                    <Row gutter={[16, 0]}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="N° documento de identidad:"
                                                validateStatus={errors.registry_number && touched.registry_number ? "error" : ""}
                                                help={errors.registry_number && touched.registry_number ? errors.registry_number : ""}
                                            >
                                                <Input
                                                    id="registry_number"
                                                    type="text"
                                                    name="registry_number"
                                                    value={values.registry_number}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Razón social:"
                                                validateStatus={errors.business_name && touched.business_name ? "error" : ""}
                                                help={errors.business_name && touched.business_name ? errors.business_name : ""}
                                            >
                                                <Input
                                                    id="business_name"
                                                    type="text"
                                                    name="business_name"
                                                    value={values.business_name}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Email:"
                                                validateStatus={errors.email && touched.email ? "error" : ""}
                                                help={errors.email && touched.email ? errors.email : ""}
                                            >
                                                <Input
                                                    id="email"
                                                    type="text"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Teléfono:"
                                                validateStatus={errors.phone && touched.phone ? "error" : ""}
                                                help={errors.phone && touched.phone ? errors.phone : ""}
                                            >
                                                <Input
                                                    id="phone"
                                                    type="text"
                                                    name="phone"
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Departamento:"
                                                validateStatus={errors.iddistrict && touched.iddistrict ? "error" : ""}
                                                help={errors.iddistrict && touched.iddistrict ? errors.iddistrict : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="label"
                                                    onChange={(value) => {
                                                        const department = departments.find(item => item.id === parseInt(value))
                                                        setSelectedDepartment(department)
                                                        setSelectedProvince(null)
                                                        setFieldValue('iddistrict', 0)
                                                    }}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={selectedDepartment?.id.toString() || undefined}
                                                    options={departments.map(department => ({ label: department.name, value: department.id.toString() }))}
                                                    loading={loadingCbx}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Provincia:"
                                                validateStatus={errors.iddistrict && touched.iddistrict ? "error" : ""}
                                                help={errors.iddistrict && touched.iddistrict ? errors.iddistrict : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="label"
                                                    onChange={(value) => {
                                                        const province = selectedDepartment?.provinces?.find(item => item.id === parseInt(value));
                                                        setSelectedProvince(province || null);
                                                        setFieldValue('iddistrict', 0)
                                                    }}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={selectedProvince ? selectedProvince.id.toString() : undefined}
                                                    options={(selectedDepartment?.provinces || []).map(province => ({ label: province.name, value: province.id.toString() }))}
                                                    loading={loadingCbx}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Distrito:"
                                                validateStatus={errors.iddistrict && touched.iddistrict ? "error" : ""}
                                                help={errors.iddistrict && touched.iddistrict ? errors.iddistrict : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => setFieldValue('iddistrict', value)}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.iddistrict !== 0 ? values.iddistrict : undefined}
                                                    options={selectedProvince?.districts?.map(district => ({ label: district.name, value: district.id }))}
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
};
