import React, { useState } from 'react';
import { Button, Card, Form, Input, Radio, Select, Space } from 'antd';

const { Option } = Select;

export const CommiteQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<{ question: string; options: { text: string; isCorrect: boolean }[]; type: string }[]>([{ question: '', options: [{ text: '', isCorrect: false }], type: 'multiple' }]);
  const [userView, setUserView] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Array<number | null>>([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: [{ text: '', isCorrect: false }], type: 'multiple' }]);
  };

  const handleChangeQuestion = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push({ text: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const handleChangeOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].text = value;
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleToggleCorrectOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.map((option, idx) => ({
      ...option,
      isCorrect: idx === optionIndex,
    }));
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleToggleUserView = () => {
    setUserView(!userView);
  };

  const handleUserAnswer = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleSelectType = (value: string, index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = value;

    if (value === 'boolean') {
      updatedQuestions[index].options = [{ text: 'Verdadero', isCorrect: true }, { text: 'Falso', isCorrect: false }];
    } else if (value === 'multiple') {
      updatedQuestions[index].options = [{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }];
    } else if (value === 'scale') {
      updatedQuestions[index].options = [{ text: '1', isCorrect: false }, { text: '2', isCorrect: false }, { text: '3', isCorrect: false }, { text: '4', isCorrect: false }, { text: '5', isCorrect: false }];
    } else if (value === 'agree/Disagree') {
      updatedQuestions[index].options = [{ text: 'Total desacuerdo', isCorrect: false }, { text: 'En desacuerdo', isCorrect: false }, { text: 'Neutral', isCorrect: false }, { text: 'Algo de acuerdo', isCorrect: false }, { text: 'Muy de acuerdo', isCorrect: false }];
    } else {
      updatedQuestions[index].options = [{ text: '', isCorrect: true }];
    }

    setQuestions(updatedQuestions);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h1>Constructor de Quizzes</h1>
        <Button onClick={handleToggleUserView}>{userView ? 'Ver Modo de Edición' : 'Ver Modo de Usuario'}</Button>
      </div>
      {!userView && (
        <Form>
          {questions.map((questionData, questionIndex) => (
            <Card key={questionIndex} title={`Pregunta ${questionIndex + 1}`} style={{ marginBottom: 20 }}>
              <Form.Item label="Pregunta">
                <Input
                  value={questionData.question}
                  onChange={(e) => handleChangeQuestion(questionIndex, e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Tipo de respuesta">
                <Select value={questionData.type} onChange={(value) => handleSelectType(value, questionIndex)}>
                  <Option value="multiple">Múltiple</Option>
                  <Option value="boolean">Verdadero o Falso</Option>
                  <Option value="short">Respuesta Corta</Option>
                  <Option value="scale">Escala 1 al 5</Option>
                  <Option value="agree/Disagree">Acuerdo/Desacuerdo</Option>

                </Select>
              </Form.Item>
              {questionData.type !== 'short' && questionData.options.map((option, optionIndex) => (
                <Space key={optionIndex} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Radio
                    checked={option.isCorrect}
                    onChange={() => handleToggleCorrectOption(questionIndex, optionIndex)}
                  />
                  <Form.Item>
                    <Input
                      value={option.text}
                      onChange={(e) => handleChangeOption(questionIndex, optionIndex, e.target.value)}
                      disabled={questionData.type === 'boolean' || questionData.type === 'scale' || questionData.type === 'agree/Disagree'} // Disable Input for True/False type
                    />
                  </Form.Item>
                  <Button type="default" onClick={() => handleRemoveOption(questionIndex, optionIndex)} disabled={questionData.type === 'boolean' || questionData.type === 'scale' || questionData.type === 'agree/Disagree'}>
                    Quitar
                  </Button>
                </Space>
              ))}
              {questionData.type === 'multiple' && (
                <Form.Item>
                  <Button type="dashed" onClick={() => handleAddOption(questionIndex)}>
                    Agregar Opción
                  </Button>
                </Form.Item>
              )}
              {questions.length > 1 && (
                <Button type="dashed" onClick={() => handleRemoveQuestion(questionIndex)}>
                  Quitar Pregunta
                </Button>
              )}
            </Card>
          ))}
          <Form.Item>
            <Button type="primary" onClick={handleAddQuestion}>
              Agregar Pregunta
            </Button>
          </Form.Item>
        </Form>
      )}
      {userView && (
        <div>
          <Form>
            {questions.map((questionData, questionIndex) => (
              <Card key={questionIndex} title={`Pregunta ${questionIndex + 1}`} style={{ marginBottom: 20 }}>
                <p>{questionData.question}</p>
                {questionData.options.map((option, optionIndex) => (
                  <Space key={optionIndex} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    {questionData.type === 'multiple' && (
                      <Radio
                        checked={userAnswers[questionIndex] === optionIndex}
                        onChange={() => handleUserAnswer(questionIndex, optionIndex)}
                      />
                    )}
                    {questionData.type !== 'short' && <span>{option.text}</span>}
                    {questionData.type === 'short' && <Input />}
                  </Space>
                ))}
              </Card>
            ))}
          </Form>
        </div>
      )}
    </div>
  );
};

