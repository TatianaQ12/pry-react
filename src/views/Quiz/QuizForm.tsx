import { CustomFormBody } from "@/components/common/CustomFormBody/CustomFormBody";
import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import { CustomFormHeader } from "@/components/common/CustomFormHeader/CustomFormHeader";
import { useQuizStore } from "@/hooks/useQuizStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Button, Card, Col, Divider, Form, Input, Radio, Row, Select, Space } from "antd";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuizDataForm {
    name: string
    description: string
}

type AskDataForm = {
    id?: number
    description: string
    idtype_response: number
    answers: AnswerDataForm[]
}

type AnswerDataForm = {
    id?: number
    description: string
    correct: string
}

interface FormErrors {
    name?: string
    description?: string
}

const typesResponse = [
    { id: 1, name: 'Múltiple', status: '1' },
    { id: 2, name: 'Verdadero o falso', status: '1' },
    { id: 3, name: 'Respuesta corta', status: '1' },
    { id: 4, name: 'Escala del 1 al 5', status: '1' },
    { id: 5, name: 'Acuerdo/Desacuerdo', status: '1' },
]

export const QuizForm: FC = () => {
    const navigate = useNavigate()
    const { status, selectedQuiz, createQuiz, updateQuiz } = useQuizStore()

    const isEdit = Object.entries(selectedQuiz).length > 0 ? true : false
    const data: QuizDataForm = {
        name: selectedQuiz?.name || '',
        description: selectedQuiz?.description || ''
    }
    const [asks, setAsks] = useState<AskDataForm[]>([{
        description: '',
        idtype_response: 1,
        answers: [
            {
                description: '',
                correct: ''
            }
        ]
    }])

    useEffect(() => {
        if (isEdit) {
            const asks = selectedQuiz.asks.map(ask => ({
                id: ask.id,
                description: ask.description,
                idtype_response: ask.idtype_response,
                answers: ask.answers.map(answer => ({
                    id: answer.id,
                    description: answer.description,
                    correct: answer.correct
                }))
            }))
            setAsks(asks || [])
        }
    }, [isEdit])

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (!values.name) errors.name = "El campo es requerido";
        if (!values.description) errors.description = "El campo es requerido";
        return errors;
    }

    const onSubmit = async (values: QuizDataForm) => {
        const payload = {
            name: values.name,
            description: values.description,
            asks: asks
        }
        const response = await (!isEdit ? createQuiz(payload) : updateQuiz(selectedQuiz.id, payload))
        if (response === true) navigate({ pathname: RoutesMap.QUIZ_LIST })
    }

    const onCancel = () => {
        navigate({ pathname: RoutesMap.QUIZ_LIST })
    }

    const handleChangeDescription = (index: number, value: string) => {
        const updatedAsks = [...asks];
        updatedAsks[index].description = value;
        setAsks(updatedAsks);
    };

    const handleSelectType = (value: number, index: number) => {
        const updatedQuestions = [...asks];
        updatedQuestions[index].idtype_response = value;

        if (value === 2) {
            updatedQuestions[index].answers = [
                { description: 'Verdadero', correct: '0' },
                { description: 'Falso', correct: '0' }
            ];
        } else if (value === 1) {
            updatedQuestions[index].answers = [
                { description: '', correct: '0' }
            ];
        } else if (value === 4) {
            updatedQuestions[index].answers = [
                { description: '1', correct: '0' },
                { description: '2', correct: '0' },
                { description: '3', correct: '0' },
                { description: '4', correct: '0' },
                { description: '5', correct: '0' }
            ];
        } else if (value === 5) {
            updatedQuestions[index].answers = [
                { description: 'Total desacuerdo', correct: '0' },
                { description: 'En desacuerdo', correct: '0' },
                { description: 'Neutral', correct: '0' },
                { description: 'Algo de acuerdo', correct: '0' },
                { description: 'Muy de acuerdo', correct: '0' }];
        } else {
            updatedQuestions[index].answers = [{ description: '', correct: '1' }];
        }

        setAsks(updatedQuestions);
    };

    const handleToggleCorrectOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...asks];
        updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers.map((option, idx) => ({
            ...option,
            correct: idx === optionIndex ? '1' : '0',
        }));
        setAsks(updatedQuestions);
    };

    const handleChangeOption = (questionIndex: number, optionIndex: number, value: string) => {
        const updatedQuestions = [...asks];
        updatedQuestions[questionIndex].answers[optionIndex].description = value;
        setAsks(updatedQuestions);
    };

    const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...asks];
        updatedQuestions[questionIndex].answers.splice(optionIndex, 1);
        setAsks(updatedQuestions);
    };

    const handleAddOption = (index: number) => {
        const updatedQuestions = [...asks];
        updatedQuestions[index].answers.push({ description: '', correct: '0' });
        setAsks(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setAsks([...asks, { description: '', idtype_response: 1, answers: [{ description: '', correct: '' }] }]);
    };

    const handleRemoveQuestion = (index) => {
        const newAsks = asks.filter((_, askIndex) => askIndex !== index);
        setAsks(newAsks);
    };

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <CustomFormHeader
                    title={!isEdit ? 'Nuevo formulario' : 'Editar formulario'}
                    text={!isEdit ? 'Ingrese los datos del nuevo formulario' : 'Modifique los datos del formulario'}
                    goBack={RoutesMap.QUIZ_LIST}
                />
                <CustomFormBody>
                    <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                        {({ values, errors, touched, handleSubmit, handleChange }) => {
                            return (
                                <Form onFinish={handleSubmit} layout="vertical">
                                    <Row gutter={[16, 0]}>
                                        <Col xs={24}>
                                            <Form.Item
                                                label="Nombre del formulario:"
                                                validateStatus={errors.name && touched.name ? "error" : ""}
                                                help={errors.name && touched.name ? errors.name : ""}
                                            >
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={values.name}
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
                                            <Divider>Preguntas y respuestas</Divider>
                                        </Col>
                                        <Col xs={24}>
                                            {
                                                asks?.map((ask, index) => (
                                                    <Card
                                                        key={index}
                                                        title={`Pregunta N°: ${index + 1}`}
                                                        style={{ marginBottom: 20 }}
                                                        extra={
                                                            <Button
                                                                type="primary"
                                                                danger
                                                                onClick={() => handleRemoveQuestion(index)}
                                                            >
                                                                Eliminar
                                                            </Button>
                                                        }
                                                    >
                                                        <Form.Item label="Pregunta:">
                                                            <Input
                                                                value={ask.description}
                                                                onChange={(e) => handleChangeDescription(index, e.target.value)}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item label="Tipo de respuesta:">
                                                            <Select
                                                                showSearch
                                                                optionFilterProp="children"
                                                                onChange={(value) => handleSelectType(value, index)}
                                                                filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                                value={ask.idtype_response !== 0 ? ask.idtype_response : undefined}
                                                                options={typesResponse.map(row => ({ label: row.name, value: row.id }))}
                                                            />
                                                        </Form.Item>
                                                        {ask.answers.map((option, optionIndex) => (
                                                            <Space
                                                                key={optionIndex}
                                                                style={{ display: 'flex', marginBottom: 8, width: '100%' }}
                                                                align="baseline"
                                                            >
                                                                <Radio
                                                                    checked={option.correct === '1'}
                                                                    onChange={() => handleToggleCorrectOption(index, optionIndex)}
                                                                    disabled={ask.idtype_response === 3}
                                                                />
                                                                <Col span={24}>
                                                                    <Form.Item>
                                                                        <Input
                                                                            value={option.description}
                                                                            onChange={(e) => handleChangeOption(index, optionIndex, e.target.value)}
                                                                            disabled={ask.idtype_response === 2 || ask.idtype_response === 4 || ask.idtype_response === 5}
                                                                        />
                                                                    </Form.Item>
                                                                </Col>
                                                                {
                                                                    ask.idtype_response !== 3 && (
                                                                        <Button
                                                                            type="default"
                                                                            onClick={() => handleRemoveOption(index, optionIndex)}
                                                                            disabled={ask.idtype_response === 2 || ask.idtype_response === 4 || ask.idtype_response === 5}
                                                                        >
                                                                            Quitar
                                                                        </Button>
                                                                    )
                                                                }
                                                            </Space>
                                                        ))}
                                                        {ask.idtype_response === 1 && (
                                                            <Form.Item>
                                                                <Button type="dashed" onClick={() => handleAddOption(index)}>
                                                                    Agregar Opción
                                                                </Button>
                                                            </Form.Item>
                                                        )}
                                                    </Card>
                                                ))
                                            }
                                        </Col>
                                        <Col xs={24}>
                                            <Form.Item style={{ textAlign: 'right' }}>
                                                <Button type="primary" onClick={handleAddQuestion}>
                                                    Agregar Pregunta
                                                </Button>
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
        </Row >
    )
}