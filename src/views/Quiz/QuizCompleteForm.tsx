import { CustomFormBody } from "@/components/common/CustomFormBody/CustomFormBody";
import { CustomFormFooter } from "@/components/common/CustomFormFooter/CustomFormFooter";
import { CustomFormHeader } from "@/components/common/CustomFormHeader/CustomFormHeader";
import { useQuizCompleteStore } from "@/hooks/useQuizCompleteStore";
import { useQuizStore } from "@/hooks/useQuizStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Card, Col, Divider, Form, Input, Radio, Row, Select, Space } from "antd";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface QuizCompleteDataForm {
    idquiz: number
}

interface FormErrors {
    idquiz?: string
}

type AskDataForm = {
    id: number
    description: string
    idtype_response: number
    answers: AnswerDataForm[]
}

type AnswerDataForm = {
    id: number
    description: string
    correct: string
}

type userAnswer = {
    id?: number
    idask: number
    idanswer: number
}

export const QuizCompleteForm: FC = () => {
    const navigate = useNavigate()
    const { status, selectedQuizComplete, createQuizComplete, updateQuizComplete } = useQuizCompleteStore()
    const { quizzes, getQuizzes } = useQuizStore()

    const isEdit = Object.entries(selectedQuizComplete).length > 0 ? true : false
    const data: QuizCompleteDataForm = {
        idquiz: selectedQuizComplete?.idquiz || 0
    }
    const [loadingCbx, setLoadingCbx] = useState<boolean>(false)
    const [asks, setAsks] = useState<AskDataForm[]>([])
    const [userAnswers, setUserAnswers] = useState<userAnswer[]>([]);

    useEffect(() => {
        getComboBoxesApi()
    }, [])

    useEffect(() => {
        if (isEdit && !!quizzes.length) {
            const quiz = quizzes.find(row => row.id === selectedQuizComplete.idquiz)
            const userAnswer = selectedQuizComplete.details.map(row => ({ id: row.id, idask: row.idask, idanswer: row.idanswer }))
            setAsks(quiz?.asks || [])
            setUserAnswers(userAnswer || [])
        }
    }, [isEdit, selectedQuizComplete, quizzes])

    const getComboBoxesApi = async () => {
        setLoadingCbx(true)
        await getQuizzes()
        setLoadingCbx(false)
    }

    const validateForm = (values) => {
        const errors: FormErrors = {};
        if (values.idquiz < 1) errors.idquiz = "El campo es requerido";
        return errors;
    }

    const onSubmit = async (values) => {
        const payload = {
            idquiz: values.idquiz,
            answers: userAnswers
        }
        const response = await (!isEdit ? createQuizComplete(payload) : updateQuizComplete(selectedQuizComplete.id, payload))
        if (response === true) navigate({ pathname: RoutesMap.QUIZ_COMPLETE_LIST })
    }

    const onCancel = () => {
        navigate({ pathname: RoutesMap.QUIZ_COMPLETE_LIST })
    }

    const handleUserAnswer = (idanswer: number, idask: number) => {
        setUserAnswers((prevUserAnswers) => {
            // Verificar si ya existe una respuesta para la pregunta actual
            const existingAnswerIndex = prevUserAnswers.findIndex(row => row.idask === idask)

            // Si no existe, agregar una nueva entrada
            if (existingAnswerIndex === -1) {
                const newAnswer = isEdit
                    ? { id: prevUserAnswers.length + 1, idanswer, idask }
                    : { idanswer, idask }
                return [...prevUserAnswers, newAnswer]
            }

            // Si existe, actualizar la respuesta para la pregunta actual
            const updatedUserAnswers = [...prevUserAnswers]
            updatedUserAnswers[existingAnswerIndex] = isEdit
                ? { ...updatedUserAnswers[existingAnswerIndex], idanswer }
                : { idanswer, idask }

            return updatedUserAnswers
        });
    };



    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <CustomFormHeader
                    title={!isEdit ? 'Completar formulario' : 'Edicion del formulario'}
                    text={!isEdit ? 'Complete el formulario segun corresponda' : 'Modifique el formulario segun corresponda'}
                    goBack={RoutesMap.QUIZ_COMPLETE_LIST}
                />
                <CustomFormBody>
                    <Formik initialValues={data} enableReinitialize validate={(values) => validateForm(values)} onSubmit={onSubmit}>
                        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
                            return (
                                <Form onFinish={handleSubmit} layout="vertical">
                                    <Row gutter={[16, 0]}>
                                        <Col xs={24}>
                                            <Form.Item
                                                label="Seleccione el formulario:"
                                                validateStatus={errors.idquiz && touched.idquiz ? "error" : ""}
                                                help={errors.idquiz && touched.idquiz ? errors.idquiz : ""}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    onChange={(value) => {
                                                        setFieldValue('idquiz', value)
                                                        if (value != 0) {
                                                            const quiz = quizzes.find(row => row.id === value)
                                                            setAsks(quiz?.asks || [])
                                                        }
                                                    }}
                                                    filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                                                    value={values.idquiz !== 0 ? values.idquiz : undefined}
                                                    options={quizzes.map(row => ({ label: row.name, value: row.id }))}
                                                    loading={loadingCbx}
                                                    disabled={isEdit}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                            <Form>
                                                {asks.map((questionData, questionIndex) => (
                                                    <Card key={questionIndex} title={`Pregunta ${questionIndex + 1}`} style={{ marginBottom: 20 }}>
                                                        <p>{questionData.description}</p>
                                                        {questionData.answers.map((option, optionIndex) => (
                                                            <Space key={optionIndex} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                                {questionData.idtype_response === 1 && (
                                                                    <Radio
                                                                        checked={userAnswers.find(answer => answer.idask === questionData.id)?.idanswer === option.id}
                                                                        onChange={() => handleUserAnswer(option.id, questionData.id)}
                                                                    />
                                                                )}
                                                                {questionData.idtype_response !== 3 && <span>{option.description}</span>}
                                                                {questionData.idtype_response === 3 && <Input />}
                                                            </Space>
                                                        ))}
                                                    </Card>
                                                ))}
                                            </Form>
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