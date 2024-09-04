/* eslint-disable indent */
import { useEffect, useState } from 'react'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import { useCompanyStore } from '@/hooks/useCompanyStore'
import { Company } from '@/types/slices/companyType'
import { CustomFormHeader } from '@/components/common/CustomFormHeader/CustomFormHeader'
import { RoutesMap } from '@/types'
import { CustomFormBody } from '@/components/common/CustomFormBody/CustomFormBody'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { CustomFormFooter } from '@/components/common/CustomFormFooter/CustomFormFooter'
import { Col, Form, Input, Row, Typography } from 'antd'

const { Title } = Typography;

export const CompanyForm: React.FC = () => {
  const { getCompanies, setSelectedCompany, companies, status, selectedCompany, createCompany, editCompany } = useCompanyStore()
  const { modeStyle } = useStyleModeStore();
  const navigate = useNavigate()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [data, setData] = useState<Company>({
    id: 0,
    registry_number: '',
    business_name: '',
    phone: '',
    email: '',
    contact_name: '',
    contact_email: '',
    website: '',
    fax: '',
    main_address: '',
    iddistrict: 0
});


useEffect(() => {
    getCompanies()
    if (Object.entries(selectedCompany).length > 0) {
        setIsEdit(true)
        setData(selectedCompany)
    }
}, [])

const validateForm = (values) => {
    let errors: any = {};
    if (!values.registry_number) errors.registry_number = "RUT es requerido";
    if (!values.business_name) errors.business_name = "Nombre es requerido";
    if (!values.website) errors.website = "Sittio web es requerido";
    if (!values.main_address) errors.main_address = "Dirección es requerido";
    // if (!values.iddistrict) errors.iddistrict = "Distrito es requerido";
    return errors;
}

const onSubmit = async (values) => {
    const payload = {...values, iddistrict: 1}
    const method = !isEdit ? createCompany(payload) : editCompany(data.id, payload)
    const response = await method
    if (response === true) {
        navigate({ pathname: RoutesMap.EMPRESAS })
    }
}

const onCancel = async () => {
    navigate({ pathname: RoutesMap.EMPRESAS_FORM })
}

return (
    <>
     <CustomFormHeader
        title={!isEdit ? 'Nueva empresa' : 'Editar empresa'}
        text={!isEdit ? 'Ingrese los datos de la nueva empresa': 'Modifique los datos de la empresa'}
        goBack={RoutesMap.EMPRESAS}
    />
    <CustomFormBody>
      <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                    {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                            <Form>
                                <Row>
                                    <Form.Item style={{ flex: 1, marginRight: 16 }}>
                                        <Input
                                            size="large"
                                            placeholder="RUT"
                                            name="registry_number"
                                            value={values.registry_number}
                                            onChange={handleChange}
                                            status={errors.registry_number ? 'error' : ''}
                                        />
                                    </Form.Item>
                                    <Form.Item style={{ flex: 1, marginRight: 16 }}>
                                        <Input
                                            size="large"
                                            placeholder="Razón Social"
                                            name="business_name"
                                            value={values.business_name}
                                            onChange={handleChange}
                                            status={errors.business_name ? 'error' : ''}
                                        />
                                    </Form.Item>
                                    <Form.Item style={{ flex: 1 }}>
                                        <Input
                                            size="large"
                                            placeholder="Teléfono"
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            status={errors.phone ? 'error' : ''}
                                        />
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item style={{ flex: 1, marginRight: 16 }}>
                                        <Input
                                            size="large"
                                            placeholder="Email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            status={errors.email ? 'error' : ''}
                                        />
                                    </Form.Item>
                                    <Form.Item style={{ flex: 1, marginRight: 16 }}>
                                        <Input
                                            size="large"
                                            placeholder="Representante"
                                            name="contact_name"
                                            value={values.contact_name}
                                            onChange={handleChange}
                                            status={errors.contact_name ? 'error' : ''}
                                        />
                                    </Form.Item>
                                    <Form.Item style={{ flex: 1 }}>
                                        <Input
                                            size="large"
                                            placeholder="Email representate"
                                            name="contact_email"
                                            value={values.contact_email}
                                            onChange={handleChange}
                                            status={errors.contact_email ? 'error' : ''}
                                        />
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item style={{ flex: 1, marginRight: 16 }}>
                                        <Input
                                            size="large"
                                            placeholder="Sitio web"
                                            name="website"
                                            value={values.website}
                                            onChange={handleChange}
                                            status={errors.website ? 'error' : ''}
                                        />
                                    </Form.Item>
                                    <Form.Item style={{ flex: 1, marginRight: 16 }}>
                                        <Input
                                            size="large"
                                            placeholder="Fax"
                                            name="fax"
                                            value={values.fax}
                                            onChange={handleChange}
                                            status={errors.fax ? 'error' : ''}
                                        />
                                    </Form.Item>
                                    <Form.Item style={{ flex: 1 }}>
                                        <Input
                                            size="large"
                                            placeholder="Dirección"
                                            name="main_address"
                                            value={values.main_address}
                                            onChange={handleChange}
                                            status={errors.main_address ? 'error' : ''}
                                        />
                                    </Form.Item>
                                </Row>
                            </Form>
                            
                            <CustomFormFooter
                                buttonType="submit"
                                confirmText={!isEdit ? 'Guardar' : 'Actualizar'}
                                cancelText={"Cancelar"}
                                onConfirm={handleSubmit}
                                onCancel={onCancel}
                            />
                            </form>
                        )
                    }}
                </Formik>
    </CustomFormBody>
    </>
   

)
}
