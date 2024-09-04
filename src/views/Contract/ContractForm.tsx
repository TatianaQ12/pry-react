import { CustomFormBody } from "@/components/common/CustomFormBody/CustomFormBody";
import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import { CustomFormHeader } from "@/components/common/CustomFormHeader/CustomFormHeader";
import { CustomSnackbar } from "@/components/common/CustomSnackbar/CustomSnackbar";
import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { useContractStore } from "@/hooks/useContractStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Button, Col, Divider, Form, Input, Row, Tooltip } from "antd";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined, BookOutlined } from '@ant-design/icons';
import { ContractVariableModal } from "../ContractVariable/ContractVariableModal";
import { StructureContractModal } from "../StructureContract/components/StructureContractModal";

interface ContractDataForm {
    title: string
    description: string
}

interface FormErrors {
    title?: string
    description?: string
}

type DataCell = {
    id?: number
    subtitle: string
    description: string
    order: number
}

type PatternDataForm = {
    id?: number
    subtitle: string
    description: string
}

const columnTable = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'order', title: 'N°', align: 'center' },
    { type: 'text', dataIndex: 'subtitle', title: 'Subtítulo', align: 'center' },
    { type: 'text', dataIndex: 'description', title: 'Descripción', align: 'center' },
]

export const ContractForm: FC = () => {
    const navigate = useNavigate()
    const { status, selectedContract, createContract, updateContract } = useContractStore()

    const isEdit = Object.entries(selectedContract).length > 0 ? true : false
    const data: ContractDataForm = {
        title: selectedContract?.title || '',
        description: selectedContract?.description || ''
    }
    const [dataTable, setDataTable] = useState<DataCell[]>([])
    const [pattern, setPattern] = useState<PatternDataForm>({
        subtitle: '',
        description: ''
    })
    const [showLegend, setShowLegend] = useState<boolean>(false)
    const [showReferences, setShowReferences] = useState<boolean>(false)
    const [isEditPattern, setIsEditPattern] = useState<boolean>(false)

    useEffect(() => {
        if (isEdit) {
            const sortedData = selectedContract?.structure.slice().sort((a, b) => a.order - b.order);
            const data: DataCell[] = sortedData.map(row => ({
                id: row.id,
                subtitle: row.subtitle,
                description: row.description,
                order: row.order
            }))
            setDataTable(data || [])
        }
    }, [isEdit, selectedContract])

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (!values.title) errors.title = "El campo es requerido";
        if (!values.description) errors.description = "El campo es requerido";
        return errors;
    };

    const onSubmit = async (values: ContractDataForm) => {
        const payload = {
            title: values.title,
            description: values.description,
            structure: dataTable
        }
        const response = await (!isEdit ? createContract(payload) : updateContract(selectedContract.id, payload))
        if (response === true) navigate({ pathname: RoutesMap.CONTRACT_LIST })
    }

    const onCancel = () => {
        navigate({ pathname: RoutesMap.CONTRACT_LIST })
    }

    const onAdd = () => {
        if (pattern.subtitle === '') return CustomSnackbar('warning', 'Ingrese un subtitulo a la pauta')
        if (pattern.description === '') return CustomSnackbar('warning', 'Ingrese una descripción a la pauta')

        if (!isEditPattern) {
            setDataTable([...dataTable, {
                subtitle: pattern.subtitle,
                description: pattern.description,
                order: dataTable.length + 1
            }])
        } else {
            const newData = [...dataTable]
            const index = newData.findIndex(row => row.id === pattern.id)
            if (index !== -1) {
                newData[index] = {
                    id: newData[index].id,
                    subtitle: pattern.subtitle,
                    description: pattern.description,
                    order: newData[index].order
                };
            }
            newData.sort((a, b) => a.order - b.order)
            setDataTable(newData)
        }
        setPattern({
            subtitle: '',
            description: ''
        })
    }

    const onEdit = (rowSelected: DataCell) => {
        setIsEditPattern(true)
        setPattern({
            id: rowSelected.id,
            subtitle: rowSelected.subtitle,
            description: rowSelected.description
        })
    }

    const onDelete = (rowSelected) => {
        const data: DataCell[] = dataTable
            .filter(row => row.order !== rowSelected.order)
            .map(row => ({
                ...row,
                order: row.order > rowSelected.order ? row.order - 1 : row.order
            }))
        setDataTable(data)
    }

    const handleRowDrop = (updatedRows: DataCell[]) => {
        const updatedData = updatedRows.map((row, index) => ({
            ...row,
            order: index + 1
        }))
        setDataTable(updatedData)
    }

    const onCancelEdit = () => {
        setIsEditPattern(false)
        setPattern({
            subtitle: '',
            description: ''
        })
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <CustomFormHeader
                    title={!isEdit ? 'Nuevo contrato' : 'Editar contrato'}
                    text={!isEdit ? 'Ingrese los datos del nuevo contrato' : 'Modifique los datos del nuevo contrato'}
                    goBack={RoutesMap.CONTRACT_LIST}
                />
                <CustomFormBody>
                    <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                        {({ values, errors, touched, handleSubmit, handleChange }) => {
                            return (
                                <Form onFinish={handleSubmit} layout="vertical">
                                    <Row gutter={[16, 0]}>
                                        <Col xs={24}>
                                            <Form.Item
                                                label="Título:"
                                                validateStatus={errors.title && touched.title ? "error" : ""}
                                                help={errors.title && touched.title ? errors.title : ""}
                                            >
                                                <Input
                                                    id="title"
                                                    type="text"
                                                    name="title"
                                                    value={values.title}
                                                    onChange={handleChange}
                                                    autoFocus
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
                                                    autoSize={{ minRows: 4, maxRows: 6 }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                            <Divider>Pautas del contrato</Divider>
                                        </Col>
                                        <Col xs={24} style={{ textAlign: "right" }}>
                                            <Tooltip title="Leyenda de refencias">
                                                <Button
                                                    type="text"
                                                    size="large"
                                                    icon={<BookOutlined />}
                                                    onClick={() => setShowReferences(true)}
                                                />
                                            </Tooltip>
                                            <Tooltip title="Leyenda de variables">
                                                <Button
                                                    type="text"
                                                    size="large"
                                                    icon={<ExclamationCircleOutlined />}
                                                    onClick={() => setShowLegend(true)}
                                                />
                                            </Tooltip>
                                        </Col>
                                        <Col xs={24}>
                                            <Form.Item label="Subtítulo:">
                                                <Input
                                                    id="subtitle"
                                                    type="text"
                                                    name="subtitle"
                                                    value={pattern.subtitle}
                                                    onChange={(e) => setPattern({ ...pattern, subtitle: e.target.value })}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                            <Form.Item label="Descripción:">
                                                <Input.TextArea
                                                    id="subtitle_description"
                                                    name="subtitle_description"
                                                    value={pattern.description}
                                                    onChange={(e) => setPattern({ ...pattern, description: e.target.value })}
                                                    autoSize={{ minRows: 4, maxRows: 6 }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                            <CustomTableAnt
                                                columns={columnTable || []}
                                                rows={dataTable || []}
                                                hasOptions
                                                onAddFn={onAdd}
                                                onAddFnName={!isEditPattern ? 'Agregar' : 'Actualizar'}
                                                onSecondFn={() => onCancelEdit()}
                                                onSecondFnCondition={isEditPattern}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                                onRowClick={() => null}
                                                onRowDrop={handleRowDrop}
                                                withoutPagination
                                            />
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
            {
                showLegend &&
                <ContractVariableModal
                    open={showLegend}
                    closeModal={() => setShowLegend(false)}
                />
            }
            {
                showReferences &&
                <StructureContractModal
                    open={showReferences}
                    closeModal={() => setShowReferences(false)}
                />
            }
        </Row>
    )
}