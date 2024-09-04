import { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Steps, Form, DatePicker, Input, Button, Space, Select, Avatar, Pagination, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CodeColor } from '@/types/colors/colors';
import { useStyleModeStore } from '@/hooks/useStyleModeStore';
import { useCommiteStore } from '@/hooks/useCommiteStore';
import { RequestType, TypeCommitee } from '@/types/slices/commiteType';
import type { PaginationProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { RoutesMap } from '@/types';
import { useChargeStore } from '@/hooks/useChargeStore';
import { useRRHHStore } from '@/hooks/useRRHHStore';
import { CustomSnackbar } from '@/components/common/CustomSnackbar/CustomSnackbar';
import { RRHH } from '@/types/slices/rrhhType';

const { Meta } = Card;
const { Title, Text } = Typography;
const { Step } = Steps;
const { TextArea } = Input;

export const CommiteCreate: React.FC = () => {
  const navigate = useNavigate()
  const { modeStyle } = useStyleModeStore();
  const { getTypesCommite, setSelectType, createCommittee, types, totalPaginationTypes, selectedType } = useCommiteStore()
  const { getRRHHs, rrhhs } = useRRHHStore()
  const { getCharges, charges } = useChargeStore()

  const [data, setData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    objective: '',
  })
  const [currentStep, setCurrentStep] = useState<RequestType>({
    current: 0,
    status: 'finish'
  });
  const [form] = Form.useForm();
  const [specificObjectives, setSpecificObjectives] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<RRHH[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<number>(1);
  const [page, setPage] = useState<number>(1)

  const handleStepChange = (current: number) => {
    let error = true;
    let currentFake = 0;
    if (current === 1) {
      if (!selectedType?.id) {
        error = false;
        currentFake = 0;
      }
    }
    if (current === 2) {
      if (!selectedType?.id) {
        error = false;
        currentFake = 0;
      }
    }
    setCurrentStep(prev => ({ ...prev, current: error ? current : currentFake, status: error ? 'finish' : 'error' }));
  };

  const handleAddSpecificObjective = () => {
    form.validateFields()
      .then(values => {
        if (!values.specificObjective || values.specificObjective === '') return CustomSnackbar('warning', 'Ingrese una descripción para el objetivo específico.')

        if (specificObjectives.includes(values.specificObjective)) return CustomSnackbar('warning', 'Este objetivo específico ya existe.');

        setSpecificObjectives([...specificObjectives, values.specificObjective]);
        form.resetFields(['specificObjective']);
      })
      .catch(errors => {
        console.error(errors);
      });
  };


  const handleAddParticipant = (idrrhh: number) => {
    const find = selectedEmployees?.find(row => row?.id === idrrhh)
    if (find) {
      return CustomSnackbar('warning', 'El participante ya ha sido seleccionado.')
    } else {
      const rrhh = rrhhs.find(row => row.id === idrrhh)
      setSelectedEmployees([...selectedEmployees, rrhh])
    }
  };

  const handleSelectPosition = (value: number) => {
    setSelectedPosition(value);
  };

  const onShowSizeChange: PaginationProps['onChange'] = (page) => {
    setPage(page)
  };

  const handleChangeSelect = async (type: TypeCommitee) => {
    setSelectType(type)
  };

  const onSubmit = async () => {
    if (data.name === '') {
      CustomSnackbar('warning', 'Ingrese un nombre para el comite')
      handleStepChange(1)
      return
    }
    if (data.description === '') {
      CustomSnackbar('warning', 'Ingrese una descripción para el comite')
      handleStepChange(1)
      return
    }
    if (data.objective === '') {
      CustomSnackbar('warning', 'Ingrese un objetivo para el comite')
      handleStepChange(1)
      return
    }
    // if (data.start_date === '') {
    //   CustomSnackbar('warning', 'Ingrese una fecha de inicio para el comite')
    //   handleStepChange(1)
    //   return
    // }
    // if (data.end_date === '') {
    //   CustomSnackbar('warning', 'Ingrese una fecha de cúlmino del comite')
    //   handleStepChange(1)
    //   return
    // }
    if (selectedEmployees.length === 0) {
      CustomSnackbar('warning', 'Seleccione un participante para el comité.')
      handleStepChange(1)
      return
    }
    if (specificObjectives.length === 0) {
      CustomSnackbar('warning', 'Ingrese un objetivo específico para el comité.')
      handleStepChange(1)
      return
    }

    const payload = {
      name: data.name,
      description: data.description,
      objective: data.objective,
      start_date: data.start_date,
      end_date: data.end_date,
      idtype_committee: selectedType.id,
      a_idrrhh: selectedEmployees.map(row => row.id),
      objectives: specificObjectives.map((row, index) => ({ order: index + 1, name: row }))
    }

    const response = await createCommittee(payload)
    if (response === true) navigate({ pathname: RoutesMap.COMMITE_LIST })
  }

  useEffect(() => {
    getCharges()
  }, [])

  useEffect(() => {
    getTypesCommite({ page, perPage: 4 });
  }, [page])

  useEffect(() => {
    getRRHHs({ idcharge: selectedPosition })
  }, [selectedPosition])

  return (
    <div style={{ padding: '16px' }}>
      <Space size="small" style={{ marginLeft: '-25px' }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(RoutesMap.COMMITE_LIST)}
        >
          Volver
        </Button>
      </Space>
      <Title
        level={3}
        style={{
          color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK,
          fontWeight: 'bolder'
        }}
      >
        Pasos para Crear un Comité
      </Title>
      <Steps current={currentStep?.current} status={currentStep?.status} style={{ marginBottom: '24px' }} onChange={handleStepChange}>
        <Step title="Paso 1" description="Elegir el Tipo de Comité" />
        <Step title="Paso 2" description={selectedType?.id === 1 ? "Definir tipos de denuncia y fechas" : "Definir objetivos y fechas"} />
        <Step title="Paso 3" description="Elegir Participantes" />
      </Steps>
      {currentStep?.current === 0 && (
        <>
          <Row gutter={[16, 16]}>
            {types.map((item, index) => (
              <Col key={index} xs={24} sm={12}>
                <Card
                  onClick={() => handleChangeSelect(item)}
                  className={modeStyle === 'light' ? selectedType?.id === item?.id ? "card-light-select" : "card-light" : selectedType?.id === item?.id ? "card-dark-select" : "card-dark"}
                  style={{ marginBottom: '16px' }}
                  hoverable
                >
                  <Meta
                    title={<Title level={4} style={{ color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}>{`${item.name}`}</Title>}
                    description={<Text style={{ color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}>{item.description}</Text>}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Row justify="center">
            <Col xs={24} sm={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <div className={modeStyle === 'light' ? "light-theme" : "dark-theme"}>
                <Pagination
                  onChange={onShowSizeChange}
                  defaultCurrent={page}
                  total={totalPaginationTypes}
                  pageSize={4}
                />
              </div>
            </Col>
          </Row>
        </>
      )}
      {currentStep?.current === 1 && (
        <Form
          form={form}
          name="nest-messages"
          layout="vertical"
        >
          <Form.Item
            label="Nombre del comité:"
          >
            <Input
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              autoFocus
            />
          </Form.Item>
          <Form.Item
            label="Descripción:"
          >
            <Input.TextArea
              id="description"
              name="description"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              rows={4}
            />
          </Form.Item>
          <Form.Item label="Fecha de Inicio" className={modeStyle === 'light' ? 'text-light' : 'text-dark'} name="startDate">
            <DatePicker
              style={{ width: '100%' }}
              value={data.start_date}
              onChange={(date, dateString) => setData({ ...data, start_date: Array.isArray(dateString) ? dateString[0] : dateString })}
            />
          </Form.Item>
          <Form.Item label="Fecha de Fin" className={modeStyle === 'light' ? 'text-light' : 'text-dark'} name="endDate">
            <DatePicker
              style={{ width: '100%' }}
              value={data.end_date}
              onChange={(date, dateString) => setData({ ...data, end_date: Array.isArray(dateString) ? dateString[0] : dateString })}
            />
          </Form.Item>
          <Form.Item label="Objetivo General" className={modeStyle === 'light' ? 'text-light' : 'text-dark'} name="generalObjective">
            <TextArea rows={4}
              value={data.objective}
              onChange={(e) => setData({ ...data, objective: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            label={selectedType?.id === 1 ? "Tipos de denuncia" : "Objetivos específicos"}
            className={modeStyle === 'light' ? 'text-light' : 'text-dark'}
            name="specificObjective">
            <Input placeholder={`Ingrese un ${ selectedType?.id === 1? "tipo de denuncia" : "objetivo específico"}`}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSpecificObjective}>
              Agregar
            </Button>
          </Form.Item>
        </Form>
      )}
      {currentStep?.current === 1 && specificObjectives.length > 0 && (
        <Card
          title={selectedType?.id === 1 ? "Tipos de denuncia" : "Objetivos Específicos"}
          className={modeStyle === 'light' ? 'card-light' : 'card-dark'}
          style={{ marginBottom: '16px' }}
        >
          <ul>
            {specificObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </Card>
      )}
      {currentStep?.current === 2 && (
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item label="Cargos:">
                <Select
                  showSearch
                  optionFilterProp="children"
                  onChange={handleSelectPosition}
                  filterOption={(input, option) => (option?.label || '').toLowerCase().includes(input.toLowerCase())}
                  value={selectedPosition}
                  options={charges?.map(charge => ({ label: charge.name, value: charge.id }))}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              {rrhhs.length > 0 ? (
                rrhhs.map((employee, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={6}>
                    <Card
                      key={index}
                      className={modeStyle === 'light' ? 'card-light' : 'card-dark'}
                      style={{ marginBottom: '16px', cursor: 'pointer' }}
                      onClick={() => handleAddParticipant(employee.id)}
                    >
                      <Meta
                        avatar={
                          <Avatar>
                            {employee.name
                              .split(' ')
                              .map((namePart) => namePart.charAt(0))
                              .join('')}
                          </Avatar>
                        }
                        title={employee.name}
                        description={employee.charge}
                      />
                    </Card>
                  </Col>
                ))
              ) : (
                <Col xs={24} style={{ textAlign: 'center', padding: '20px' }}>
                  <Empty description="No hay resultados" />
                </Col>
              )}
            </Col>
            <Col xs={24}>
              <Title level={4}>Participantes Seleccionados</Title>
            </Col>
            <Col xs={24}>
              <Space>
                {selectedEmployees.map((rrhh, index) => (
                  <Avatar key={index}>{rrhh?.name.split(' ').map((namePart) => namePart.charAt(0)).join('')}</Avatar>
                ))}
              </Space>
            </Col>
            <Col xs={24}>
              <Button
                type="primary"
                onClick={onSubmit}
              // loading={loading}
              >
                Crear comité
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};
