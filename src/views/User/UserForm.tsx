/* eslint-disable indent */
import { useEffect, useState } from 'react'
import { CustomFormHeader } from '@/components/common/CustomFormHeader/CustomFormHeader'
import { RoutesMap } from '@/types'
import { CustomFormBody } from '@/components/common/CustomFormBody/CustomFormBody'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { CustomFormFooter } from '@/components/common/CustomFormFooter/CustomFormFooter'
import { Form, Input, Row, Select, Typography } from 'antd'
import { useUserStore } from '@/hooks/useUserStore'
import { User } from '@/types/slices/userType'
import { useCompanyStore } from '@/hooks/useCompanyStore'
import { useChargeStore } from '@/hooks/useChargeStore'
import { useRuleStore } from '@/hooks/useRuleStore'
import { Charge } from '@/types/slices/chargeType'
import { Company } from '@/types/slices/companyType'
import { Rule } from '@/types/slices/ruleType'

const { Title } = Typography;

export const UserForm: React.FC = () => {
    const { getUsers, selectedUser, createUser, editUser } = useUserStore();
    const { getCompanies, companies, setSelectedCompany, selectedCompany, status: statusCompanies } = useCompanyStore();
    const { getCharges, charges, setSelecCharge, selectedCharge, status: statusChargues } = useChargeStore();
    const { getRule, rules, setSelectRule, selectedRule } = useRuleStore();

    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [data, setData] = useState<User>({
        id: 0,
        iduser:0,
        name: '',
        surname: '',
        idcharge: 0,
        idcompany: 0,
        user_name: '',
        n_document: '',
        email: '',
        role: 0,
        idrole: 0 
    });


    useEffect(() => {
        getDataInitial()
    }, [])

    useEffect(()=>{
        setIsEdit(false)
        if (Object.entries(selectedUser).length > 0) {
            setData(selectedUser)
            console.log(selectedUser)
            if(!!selectedUser.idcompany) {
                const companyFind = companies.find((item) => item.id === selectedUser.idcompany)
                console.log(companyFind)
                if (!!companyFind) setSelectedCompany(companyFind)
                const ruleFind = rules.find((item) => item.id === selectedUser.idrole)
                if(!!ruleFind) setSelectRule(ruleFind)
                const chargeFind = charges.find((item) => item.id === selectedUser.idcharge)
                console.log(chargeFind)
                if(!!chargeFind) setSelecCharge(chargeFind)
            }
            setIsEdit(true)
        }
    }, [charges, companies, rules])

    const getDataInitial = async() => {
        getCharges();
        getCompanies();
        getRule();
        setSelecCharge({} as Charge)
        setSelectedCompany({} as Company)
        setSelectRule({} as Rule)
    }

    const validateForm = (values) => {
        let errors: any = {};
        if (!values.name) errors.name = "RUT es requerido";
        if (!values.surname) errors.surname = "Nombre es requerido";
        if (!values.user_name) errors.user_name = "Nombre es requerido";
        // if (!values.idcharge) errors.idcharge = "Sittio web es requerido";
        if (!values.n_document) errors.n_document = "Dirección es requerido";
        if (!values.email) errors.email = "Dirección es requerido";
        // if (!values.role) errors.role = "Dirección es requerido";
        // if (!values.iddistrict) errors.iddistrict = "Distrito es requerido";
        return errors;
    }

    const onSubmit = async (values) => {
        const payload = { ...values, idcompany: selectedCompany.id, idcharge: selectedCharge.id, idrole: selectedRule.id }
        console.log(payload)
        const method = !isEdit ? createUser(payload) : editUser(payload.iduser, payload)
        const response = await method
        if (response === true) {
            navigate({ pathname: RoutesMap.USERS_LIST })
        }
    }

    const onCancel = async () => {
        navigate({ pathname: RoutesMap.USERS_FORM })
    }

    const onCompanyChange = (value: string) => {
        const companyFind = companies.find((item) => item.id === parseInt(value));
        if (!!companyFind) {
            setSelectedCompany(companyFind);
        }
    };
    
    const onChargeChange = (value: string) => {
        console.log(`selected charge ${value}`);
        const chargeFind = charges.find((item) => item.id === parseInt(value));
        if (!!chargeFind) setSelecCharge(chargeFind);
    };
    
    const onRoleChange = (value: string) => {
        console.log(`selected role ${value}`);
        const roleFind = rules.find((item) => item.id === parseInt(value));
        if (!!roleFind) setSelectRule(roleFind);
    };

    const filterOption = (input: string, option?: { value: string; label: string }) => {
        const nameMatch = (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
        return nameMatch;
    };

    console.log(selectedCharge)

    return (
        <>
            <CustomFormHeader
                title={!isEdit ? 'Nuevo usuario' : 'Editar usuario'}
                text={!isEdit ? 'Ingrese los datos del nuevo usuario' : 'Modifique los datos del nuevo usuario'}
                goBack={RoutesMap.USERS_LIST}
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
                                                name="n_document"
                                                value={values.n_document}
                                                onChange={handleChange}
                                                disabled={isEdit}
                                                status={errors.n_document ? 'error' : ''}
                                            />
                                        </Form.Item>
                                        <Form.Item style={{ flex: 1, marginRight: 16 }}>
                                            <Input
                                                size="large"
                                                placeholder="Nombre"
                                                name="name"
                                                value={values.name}
                                                disabled={isEdit}
                                                onChange={handleChange}
                                                status={errors.name ? 'error' : ''}
                                            />
                                        </Form.Item>
                                        <Form.Item style={{ flex: 1, marginRight: 16 }}>
                                            <Input
                                                size="large"
                                                placeholder="Apellido"
                                                name="surname"
                                                value={values.surname}
                                                disabled={isEdit}
                                                onChange={handleChange}
                                                status={errors.surname ? 'error' : ''}
                                            />
                                        </Form.Item>
                                        <Form.Item style={{ flex: 1, marginRight: 16 }}>
                                            <Input
                                                size="large"
                                                placeholder="Usuario"
                                                name="user_name"
                                                value={values.user_name}
                                                onChange={handleChange}
                                                status={errors.user_name ? 'error' : ''}
                                            />
                                        </Form.Item>
                                        <Form.Item style={{ flex: 1, maxWidth: '500px' }}>
                                            <Select
                                                showSearch
                                                placeholder="Selecciona una rol"
                                                value={ (selectedRule && selectedRule?.id && selectedRule?.id.toString()) || ''}
                                                optionFilterProp="children"
                                                onChange={onRoleChange}
                                                filterOption={filterOption}
                                                size='large'
                                                options={rules.map(rule => ({
                                                    value: rule.id.toString(),
                                                    label: rule.name
                                                }))}
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
                                        <Form.Item style={{ flex: 1, marginRight: 16, maxWidth: '400px' }}>
                                            <Select
                                                showSearch
                                                placeholder="Selecciona una empresa"
                                                optionFilterProp="children"
                                                value={ ( selectedCompany && selectedCompany?.id && selectedCompany?.id.toString())}
                                                onChange={onCompanyChange}
                                                filterOption={filterOption}
                                                disabled={isEdit}
                                                size='large'
                                                options={companies.map(company => ({
                                                    value: company.id.toString(),
                                                    label: company.registry_number + ' ' + company.business_name
                                                }))}
                                            />
                                        </Form.Item >

                                        {
                                            !!selectedCompany.id &&
                                            <Form.Item style={{ flex: 1, marginRight: 16, maxWidth: '400px' }}>
                                                <Select
                                                    showSearch
                                                    placeholder="Selecciona una cargo"
                                                    optionFilterProp="children"
                                                    value={ selectedCharge && selectedCharge?.id  && selectedCharge.id.toString()}
                                                    onChange={onChargeChange}
                                                    disabled={isEdit}
                                                    filterOption={filterOption}
                                                    size='large'
                                                    options={charges.filter(charge => charge.rutCompany === selectedCompany.registry_number).map(charge => ({
                                                        value: charge.id.toString(),
                                                        label: charge.name + ' ' + charge.description
                                                    }))}
                                                />
                                            </Form.Item >
                                        }

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
