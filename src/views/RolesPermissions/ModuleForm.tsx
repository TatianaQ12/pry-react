/* eslint-disable indent */
import { useEffect, useState } from 'react'
import { CustomFormHeader } from '@/components/common/CustomFormHeader/CustomFormHeader'
import { RoutesMap } from '@/types'
import { CustomFormBody } from '@/components/common/CustomFormBody/CustomFormBody'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { CustomFormFooter } from '@/components/common/CustomFormFooter/CustomFormFooter'
import { Form, Input, Row, Select } from 'antd'
import { useModuleStore } from '@/hooks/useModuleStore'
import { Module } from '@/types/slices/moduleType'

const dataTypeModule = [
    {id:'0', name: 'Barra lateral'},
    {id:'1', name: 'Header'}
]

export const ModuleForm: React.FC = () => {
    
    const { selectedModule, modules, getModule, createModule, editModule} = useModuleStore();
    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [data, setData] = useState<Module>({
        id: 0,
        name: '',
        type: '',
        type_name: '',
        icon: '',
        status: ''
    });
    const [typeSelected, setTypeSelected] = useState<string>('')


    useEffect(() => {
        getDataInitial()
    }, [])

    useEffect(()=>{
        setIsEdit(false)
        if (Object.entries(selectedModule).length > 0) {
            setData(selectedModule)
            console.log(selectedModule)
            setTypeSelected(selectedModule.type)
            setIsEdit(true)
        }
    }, [modules])

    const getDataInitial = async() => {
        getModule();
    }

    const validateForm = (values) => {
        let errors: any = {};
        if (!values.name) errors.name = "Nombre es requerido";
        if (!values.icon) errors.icon = "Icono es requerido";
        return errors;
    }

    const onSubmit = async (values) => {
        const payload = { ...values, type: typeSelected }
        console.log(payload)
        const method = !isEdit ? createModule(payload) : editModule(payload.id, payload)
        const response = await method
        if (response === true) {
            navigate({ pathname: RoutesMap.MODULE_LIST })
        }
    }

    const onCancel = async () => {
        navigate({ pathname: RoutesMap.MODULE_LIST })
    }

    const onTypeChange = (value: string) => {
            setTypeSelected(value);
    };

    const filterOption = (input: string, option?: { value: string; label: string }) => {
        const nameMatch = (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
        return nameMatch;
    };


    return (
        <>
            <CustomFormHeader
                title={!isEdit ? 'Nuevo módulo' : 'Editar módulo'}
                text={!isEdit ? 'Ingrese los datos del nuevo módulo' : 'Modifique los datos del nuevo módulo'}
                goBack={RoutesMap.MODULE_FORM}
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
                                        <Form.Item style={{ flex: 1, marginRight: 16 }}>
                                            <Input
                                                size="large"
                                                placeholder="Icono"
                                                name="icon"
                                                value={values.icon}
                                                onChange={handleChange}
                                                status={errors.icon ? 'error' : ''}
                                            />
                                        </Form.Item>
                                        <Form.Item style={{ flex: 1, maxWidth: '500px' }}>
                                            <Select
                                                showSearch
                                                placeholder="Selecciona una rol"
                                                value={ (typeSelected) || ''}
                                                optionFilterProp="children"
                                                onChange={onTypeChange}
                                                filterOption={filterOption}
                                                size='large'
                                                options={dataTypeModule.map(type => ({
                                                    value: type.id.toString(),
                                                    label: type.name
                                                }))}
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
