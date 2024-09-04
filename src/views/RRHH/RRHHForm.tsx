import { CustomFormBody } from "@/components/common/CustomFormBody/CustomFormBody";
import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import { CustomFormHeader } from "@/components/common/CustomFormHeader/CustomFormHeader";
import { useAuditStore } from "@/hooks/useAuditStore";
import { useChargeStore } from "@/hooks/useChargeStore";
import { useDepartmentStore } from "@/hooks/useDepartmentStore";
import { useRRHHStore } from "@/hooks/useRRHHStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Department, Province } from "@/types/slices/departmentType";
import { Col, Divider, Form, Input, Radio, Row, Select } from "antd";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface RRHHDataForm {
    n_document: string
    name: string
    surname: string
    second_surname: string
    birth_date: string
    sexo: number
    direccion: string
    iddistrict: number
    idcharge: number
    idauditoria: number
}

interface FormErrors {
    n_document?: string
    name?: string
    surname?: string
    second_surname?: string
    birth_date?: string
    sexo?: string
    direccion?: string
    iddistrict?: string
    idcharge?: string
    idauditoria?: string
}

export const RRHHForm: FC = () => {
    const navigate = useNavigate()
    const { status, selectedRRHH, createRRHH, updateRRHH } = useRRHHStore()
    const { charges, getCharges } = useChargeStore()
    const { departments, getDepartments } = useDepartmentStore()
    const { audits, getAudits } = useAuditStore()

    const isEdit = Object.entries(selectedRRHH).length > 0 ? true : false
    const data: RRHHDataForm = {
        n_document: selectedRRHH?.n_document || '',
        name: selectedRRHH?.name || '',
        surname: selectedRRHH?.surname || '',
        second_surname: selectedRRHH?.second_surname || '',
        birth_date: selectedRRHH?.birth_date || '',
        sexo: selectedRRHH?.sexo || 1,
        direccion: selectedRRHH?.direccion || '',
        iddistrict: selectedRRHH?.iddistrict || 0,
        idcharge: selectedRRHH?.idcharge || 0,
        idauditoria: selectedRRHH?.idauditoria || 0
    }
    const [loadingCbx, setLoadingCbx] = useState<boolean>(false)
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)

    useEffect(() => {
        getComboBoxesApi()
    }, [])

    useEffect(() => {
        if (isEdit && !!departments.length && selectedRRHH.iddistrict) {
            const department = departments.find(department =>
                department.provinces.find(province =>
                    province.districts.find(district => district.id === selectedRRHH.iddistrict)
                )
            );
            setSelectedDepartment(department || null)
        }
    }, [isEdit, departments, selectedRRHH])

    useEffect(() => {
        if (isEdit && !!selectedDepartment?.provinces.length && selectedRRHH.iddistrict) {
            const province = selectedDepartment.provinces.find(province =>
                province.districts.some(district => district.id === selectedRRHH.iddistrict)
            )
            setSelectedProvince(province || null)
        }
    }, [isEdit, selectedDepartment, selectedRRHH])

    const getComboBoxesApi = async () => {
        setLoadingCbx(true)
        await getCharges()
        await getDepartments()
        await getAudits()
        setLoadingCbx(false)
    }

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (!values.n_document) errors.n_document = "El campo es requerido";
        if (!values.name) errors.name = "El campo es requerido";
        if (!values.surname) errors.surname = "El campo es requerido";
        if (!values.second_surname) errors.second_surname = "El campo es requerido";
        if (!values.birth_date) errors.birth_date = "El campo es requerido";
        if (!values.sexo) errors.sexo = "El campo es requerido";
        if (!values.direccion) errors.direccion = "El campo es requerido";
        if (values.iddistrict < 1) errors.iddistrict = "El campo es requerido";
        if (values.idcharge < 1) errors.idcharge = "El campo es requerido";
        if (values.idauditoria < 1) errors.idauditoria = "El campo es requerido";
        return errors;
    };

    const onSubmit = async (values: RRHHDataForm) => {
        const payload: RRHHDataForm = {
            n_document: values.n_document,
            name: values.name,
            surname: values.surname,
            second_surname: values.second_surname,
            birth_date: values.birth_date,
            sexo: values.sexo,
            direccion: values.direccion,
            iddistrict: values.iddistrict,
            idcharge: values.idcharge,
            idauditoria: values.idauditoria
        }

        const response = await (!isEdit ? createRRHH(payload) : updateRRHH(selectedRRHH.id, payload))
        if (response === true) navigate({ pathname: RoutesMap.RRHH_LIST })
    }

    const onCancel = () => {
        navigate({ pathname: RoutesMap.RRHH_LIST })
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <CustomFormHeader
                    title={!isEdit ? 'Nuevo personal de RRHH' : 'Editar personal de RRHH'}
                    text={!isEdit ? 'Ingrese los datos del nuevo personal de RRHH' : 'Modifique los datos del personal de RRHH'}
                    goBack={RoutesMap.RRHH_LIST}
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
                                                label="Apellido paterno:"
                                                validateStatus={errors.surname && touched.surname ? "error" : ""}
                                                help={errors.surname && touched.surname ? errors.surname : ""}
                                            >
                                                <Input
                                                    id="surname"
                                                    type="text"
                                                    name="surname"
                                                    value={values.surname}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Apellido materno:"
                                                validateStatus={errors.second_surname && touched.second_surname ? "error" : ""}
                                                help={errors.second_surname && touched.second_surname ? errors.second_surname : ""}
                                            >
                                                <Input
                                                    id="second_surname"
                                                    type="text"
                                                    name="second_surname"
                                                    value={values.second_surname}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="N° Documento:"
                                                validateStatus={errors.n_document && touched.n_document ? "error" : ""}
                                                help={errors.n_document && touched.n_document ? errors.n_document : ""}
                                            >
                                                <Input
                                                    id="n_document"
                                                    type="text"
                                                    name="n_document"
                                                    value={values.n_document}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Fecha de nacimiento:"
                                                validateStatus={errors.birth_date && touched.birth_date ? "error" : ""}
                                                help={errors.birth_date && touched.birth_date ? errors.birth_date : ""}
                                            >
                                                <Input
                                                    id="birth_date"
                                                    type="date"
                                                    name="birth_date"
                                                    value={values.birth_date}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Sexo:"
                                                validateStatus={errors.sexo && touched.sexo ? "error" : ""}
                                                help={errors.sexo && touched.sexo ? errors.sexo : ""}
                                            >
                                                <Radio.Group
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={0}
                                                    name="radio-buttons-group"
                                                    onChange={e => setFieldValue('sexo', e.target.value)}
                                                    buttonStyle="solid"
                                                    value={values.sexo}
                                                >
                                                    <Radio value={1} checked={values.sexo === 1}>Masculino</Radio>
                                                    <Radio value={2} checked={values.sexo === 2}>Femenino</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Cargo:"
                                                validateStatus={errors.idcharge && touched.idcharge ? "error" : ""}
                                                help={errors.idcharge && touched.idcharge ? errors.idcharge : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => setFieldValue('idcharge', value)}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.idcharge !== 0 ? values.idcharge : undefined}
                                                    options={charges.map(charge => ({ label: charge.name, value: charge.id }))}
                                                    loading={loadingCbx}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Empresa auditora:"
                                                validateStatus={errors.idauditoria && touched.idauditoria ? "error" : ""}
                                                help={errors.idauditoria && touched.idauditoria ? errors.idauditoria : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => setFieldValue('idauditoria', value)}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.idauditoria !== 0 ? values.idauditoria : undefined}
                                                    options={audits.map(audit => ({ label: audit.business_name, value: audit.id }))}
                                                    loading={loadingCbx}
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
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Dirección:"
                                                validateStatus={errors.direccion && touched.direccion ? "error" : ""}
                                                help={errors.direccion && touched.direccion ? errors.direccion : ""}
                                            >
                                                <Input
                                                    id="direccion"
                                                    type="text"
                                                    name="direccion"
                                                    value={values.direccion}
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