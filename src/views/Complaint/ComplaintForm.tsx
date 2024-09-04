import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Radio, Input, DatePicker, Upload, Button, Form, Modal, message, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useComplaintStore } from '@/hooks/useComplaintStore'
import { Formik, FormikHelpers } from 'formik'
import { useTypeComplaintStore } from '@/hooks/useTypeComplaintStore'
import { useChargeStore } from '@/hooks/useChargeStore'
import { useAreaStore } from '@/hooks/useAreaStore'
import { Complaint } from '@/types/slices/complaint'

const { TextArea } = Input

interface ComplaintDataForm {
    idcomplaint_channel: number
    anonymous: number
    idtype_complaint: number
    reported: string
    idcharge: number
    idarea: number
    date_happened: string
    description: string
}

interface FormErrors {
    idtype_complaint?: string
    reported?: string
    idcharge?: string
    idarea?: string
    date_happened?: string
    description?: string
}

export const ComplaintForm: React.FC = () => {

    const { createComplaint } = useComplaintStore()
    const { typesComplaint, getTypesComplaint } = useTypeComplaintStore()
    const { charges, getCharges } = useChargeStore()
    const { areas, getAreas } = useAreaStore()

    const [loadingCbx, setLoadingCbx] = useState<boolean>(false)
    const [fileList, setFileList] = useState([])
    const [successComplaint, setSuccessComplaint] = useState<Complaint>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const [data, setData] = useState<ComplaintDataForm>({
        idcomplaint_channel: 1,
        anonymous: 0,
        idtype_complaint: 0,
        reported: '',
        idcharge: 0,
        idarea: 0,
        date_happened: '',
        description: ''
    })

    useEffect(() => {
        getComboBoxesApi()
    }, [])

    const getComboBoxesApi = async () => {
        setLoadingCbx(true)
        await getTypesComplaint()
        await getCharges()
        await getAreas()
        setLoadingCbx(false)
    }

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (values.idtype_complaint === 0) errors.idtype_complaint = "El campo es requerido";
        if (!values.reported) errors.reported = "El campo es requerido";
        if (values.idcharge === 0) errors.idcharge = "El campo es requerido";
        if (values.idarea === 0) errors.idarea = "El campo es requerido";
        if (!values.date_happened) errors.date_happened = "El campo es requerido";
        if (!values.description) errors.description = "El campo es requerido";
        return errors;
    }

    const onSubmit = async (values: ComplaintDataForm, { resetForm }: FormikHelpers<ComplaintDataForm>) => {
        const formData = new FormData()
        formData.append('idcomplaint_channel', '1')
        formData.append('anonymous', values.anonymous.toString())
        formData.append('idtype_complaint', values.idtype_complaint.toString())
        formData.append('reported', values.reported)
        formData.append('idcharge', values.idcharge.toString())
        formData.append('idarea', values.idarea.toString())
        formData.append('date_happened', values.date_happened)
        formData.append('description', values.description)
        fileList.forEach((row, index) => {
            formData.append(`evidences[${index}][document]`, row.originFileObj)
        })

        const response = await createComplaint(formData)
        if (response?.id) {
            resetForm()
            setSuccessComplaint(response)
            setFileList([])
            setModalVisible(true)
        }
    }

    const onChangeUpload = (info) => {
        const fileList = [...info.fileList]
        setFileList(fileList)
    }

    const handleCopy = () => {
        const followUpUrl = `https://example.com/complaint-followup/${successComplaint?.identifier}`
        const dataToCopy = `ID de Denuncia: ${successComplaint?.identifier}\nPIN: ${successComplaint?.pin}\nURL: ${followUpUrl}`
        navigator.clipboard.writeText(dataToCopy)
        message.success('Datos copiados al portapapeles')
    }

    const handleModalOk = () => {
        setModalVisible(false)
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card title="Registro de Denuncia">
                    <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                        {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => {
                            return (
                                <Form onFinish={handleSubmit} layout="vertical">
                                    <Form.Item
                                        label="¿Desea que la denuncia sea anónima?"
                                        validateStatus={errors.anonymous && touched.anonymous ? "error" : ""}
                                        help={errors.anonymous && touched.anonymous ? errors.anonymous : ""}
                                    >
                                        <Radio.Group
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue={0}
                                            name="radio-buttons-group"
                                            onChange={e => setFieldValue('anonymous', e.target.value)}
                                            buttonStyle="solid"
                                            value={values.anonymous}
                                        >
                                            <Radio value={1}>Sí</Radio>
                                            <Radio value={0}>No</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="Tipo de Denuncia"
                                        validateStatus={errors.idtype_complaint && touched.idtype_complaint ? "error" : ""}
                                        help={errors.idtype_complaint && touched.idtype_complaint ? errors.idtype_complaint : ""}
                                    >
                                        <Select
                                            showSearch
                                            optionFilterProp="children"
                                            onChange={(value) => setFieldValue('idtype_complaint', value)}
                                            filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                            value={values.idtype_complaint !== 0 ? values.idtype_complaint : undefined}
                                            options={typesComplaint.map(row => ({ label: row.name, value: row.id }))}
                                            loading={loadingCbx}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Denunciado"
                                        validateStatus={errors.reported && touched.reported ? "error" : ""}
                                        help={errors.reported && touched.reported ? errors.reported : ""}
                                    >
                                        <Input
                                            id="reported"
                                            type="text"
                                            name="reported"
                                            value={values.reported}
                                            onChange={handleChange}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Relación con la Empresa"
                                        validateStatus={errors.idcharge && touched.idcharge ? "error" : ""}
                                        help={errors.idcharge && touched.idcharge ? errors.idcharge : ""}
                                    >
                                        <Select
                                            showSearch
                                            optionFilterProp="children"
                                            onChange={(value) => setFieldValue('idcharge', value)}
                                            filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                            value={values.idcharge !== 0 ? values.idcharge : undefined}
                                            options={charges.map(row => ({ label: row.name, value: row.id }))}
                                            loading={loadingCbx}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Dónde Sucedió"
                                        validateStatus={errors.idarea && touched.idarea ? "error" : ""}
                                        help={errors.idarea && touched.idarea ? errors.idarea : ""}
                                    >
                                        <Select
                                            showSearch
                                            optionFilterProp="children"
                                            onChange={(value) => setFieldValue('idarea', value)}
                                            filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                            value={values.idarea !== 0 ? values.idarea : undefined}
                                            options={areas.map(row => ({ label: row.name, value: row.id }))}
                                            loading={loadingCbx}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Cuándo Sucedió"
                                        validateStatus={errors.date_happened && touched.date_happened ? "error" : ""}
                                        help={errors.date_happened && touched.date_happened ? errors.date_happened : ""}
                                    >
                                        <Input
                                            id="date_happened"
                                            type="date"
                                            name="date_happened"
                                            value={values.date_happened}
                                            onChange={handleChange}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Descripción de los Hechos"
                                        validateStatus={errors.description && touched.description ? "error" : ""}
                                        help={errors.description && touched.description ? errors.description : ""}
                                    >
                                        <TextArea
                                            id="description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Descripción de los Hechos"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Adjuntar evidencias">
                                        <Upload fileList={fileList} onChange={onChangeUpload} beforeUpload={() => false}>
                                            <Button icon={<UploadOutlined />}>Subir Archivos</Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item style={{ textAlign: 'right' }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Enviar Denuncia
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )
                        }}
                    </Formik>
                </Card>
            </Col>
            <Modal
                title="Denuncia Registrada"
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalOk}
                footer={[
                    <Button key="copy" onClick={handleCopy}>
                        Copiar Datos
                    </Button>,
                    <Button key="ok" type="primary" onClick={handleModalOk}>
                        OK
                    </Button>
                ]}
            >
                <p>Guarda estos datos para que puedas dar seguimiento a tu denuncia:</p>
                <p><strong>ID de Denuncia:</strong> {successComplaint?.identifier}</p>
                <p><strong>PIN:</strong> {successComplaint?.pin}</p>
                <p><strong>URL de Seguimiento:</strong> <a href={`https://example.com/complaint-followup/${successComplaint?.identifier}`} target="_blank" rel="noopener noreferrer">{`https://example.com/complaint-followup/${successComplaint?.identifier}`}</a></p>
            </Modal>
        </Row>
    )
}
