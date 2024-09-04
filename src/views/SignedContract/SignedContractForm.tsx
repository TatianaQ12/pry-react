import { CustomFormBody } from "@/components/common/CustomFormBody/CustomFormBody";
import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import { CustomFormHeader } from "@/components/common/CustomFormHeader/CustomFormHeader";
import { useContractStore } from "@/hooks/useContractStore";
import { useRRHHStore } from "@/hooks/useRRHHStore";
import { useSignedContractStore } from "@/hooks/useSignedContractStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Col, Divider, Form, Input, Row, Select } from "antd";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignedContractDataForm {
    idcontract: number
    idrrhh: number
    start_date: string
    end_date: string
}

interface FormErrors {
    idcontract?: string
    idrrhh?: string
    start_date?: string
    end_date?: string
}

export const SignedContractForm: FC = () => {
    const navigate = useNavigate()
    const { status, selectedSignedContract, createSignedContract, updateSignedContract } = useSignedContractStore()
    const { contracts, getContracts } = useContractStore()
    const { rrhhs, getRRHHs } = useRRHHStore()

    const isEdit = Object.entries(selectedSignedContract).length > 0 ? true : false
    const data: SignedContractDataForm = {
        idcontract: selectedSignedContract?.idcontract || 0,
        idrrhh: selectedSignedContract?.idrrhh || 0,
        start_date: selectedSignedContract?.start_date || '',
        end_date: selectedSignedContract?.end_date || ''
    }
    const [loadingCbx, setLoadingCbx] = useState<boolean>(false)

    useEffect(() => {
        getComboBoxesApi()
    }, [])

    const getComboBoxesApi = async () => {
        setLoadingCbx(true)
        await getContracts()
        await getRRHHs()
        setLoadingCbx(false)
    }

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (values.idcontract < 1) errors.idcontract = "El campo es requerido";
        if (values.idrrhh < 1) errors.idrrhh = "El campo es requerido";
        if (!values.start_date) errors.start_date = "El campo es requerido";
        if (!values.end_date) errors.end_date = "El campo es requerido";
        return errors;
    }

    const onSubmit = async (values: SignedContractDataForm) => {
        const response = await (!isEdit ? createSignedContract(values) : updateSignedContract(selectedSignedContract.id, values))
        if (response === true) navigate({ pathname: RoutesMap.SIGNED_CONTRACT_LIST })
    }

    const onCancel = () => {
        navigate({ pathname: RoutesMap.SIGNED_CONTRACT_LIST })
    }


    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <CustomFormHeader
                    title={!isEdit ? 'Nueva asignación de contrato' : 'Editar contrato asignado'}
                    text={!isEdit ? 'Ingrese los datos de la nueva asignación de contrato' : 'Modifique los datos del contrato asignado'}
                    goBack={RoutesMap.SIGNED_CONTRACT_LIST}
                />
                <CustomFormBody>
                    <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                        {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => {
                            return (
                                <Form onFinish={handleSubmit} layout="vertical">
                                    <Row gutter={[16, 0]}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Contrato:"
                                                validateStatus={errors.idcontract && touched.idcontract ? "error" : ""}
                                                help={errors.idcontract && touched.idcontract ? errors.idcontract : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => setFieldValue('idcontract', value)}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.idcontract !== 0 ? values.idcontract : undefined}
                                                    options={contracts.map(row => ({ label: row.title, value: row.id }))}
                                                    loading={loadingCbx}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="R.R.H.H.:"
                                                validateStatus={errors.idrrhh && touched.idrrhh ? "error" : ""}
                                                help={errors.idrrhh && touched.idrrhh ? errors.idrrhh : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => setFieldValue('idrrhh', value)}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.idrrhh !== 0 ? values.idrrhh : undefined}
                                                    options={rrhhs.map(row => ({ label: row.name + ' ' + row.surname + ' ' + row.second_surname, value: row.id }))}
                                                    loading={loadingCbx}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Fecha de inicio:"
                                                validateStatus={errors.start_date && touched.start_date ? "error" : ""}
                                                help={errors.start_date && touched.start_date ? errors.start_date : ""}
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
                                                validateStatus={errors.end_date && touched.end_date ? "error" : ""}
                                                help={errors.end_date && touched.end_date ? errors.end_date : ""}
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