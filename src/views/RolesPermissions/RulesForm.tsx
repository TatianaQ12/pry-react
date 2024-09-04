/* eslint-disable indent */
import { useEffect, useState } from 'react'
import { CustomFormHeader } from '@/components/common/CustomFormHeader/CustomFormHeader'
import { RoutesMap } from '@/types'
import { CustomFormBody } from '@/components/common/CustomFormBody/CustomFormBody'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { CustomFormFooter } from '@/components/common/CustomFormFooter/CustomFormFooter'
import { Form, Input, Row, Select, Typography } from 'antd'
import { useRuleStore } from '@/hooks/useRuleStore'
import { Rule } from '@/types/slices/ruleType'

const { Title } = Typography;

export const RulesForm: React.FC = () => {

    const { getRule, rules, setSelectRule, selectedRule, createRule, editRule } = useRuleStore();

    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [data, setData] = useState<Rule>({
        id: 0,
        name: '',
        status: ''
    });


    useEffect(() => {
        getDataInitial()
    }, [])

    useEffect(()=>{
        setIsEdit(false)
        if (Object.entries(selectedRule).length > 0) {
            setData(selectedRule)
            setIsEdit(true)
        }
    }, [rules])

    const getDataInitial = async() => {
        getRule();
    }

    const validateForm = (values) => {
        let errors: any = {};
        if (!values.name) errors.name = "RUT es requerido";
       return errors;
    }

    const onSubmit = async (values) => {
        const payload = { ...values }
        console.log(payload)
        const method = !isEdit ? createRule(payload) : editRule(payload.id, payload)
        const response = await method
        if (response === true) {
            navigate({ pathname: RoutesMap.RULES_LIST })
        }
    }

    const onCancel = async () => {
        navigate({ pathname: RoutesMap.RULES_LIST })
        setSelectRule({} as Rule)
    }

    return (
        <>
            <CustomFormHeader
                title={!isEdit ? 'Nuevo rol' : 'Editar rol'}
                text={!isEdit ? 'Ingrese los datos del nuevo rol' : 'Modifique los datos del nuevo rol'}
                goBack={RoutesMap.RULES_LIST}
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
                                                placeholder="Nombre"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                status={errors.name ? 'error' : ''}
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
