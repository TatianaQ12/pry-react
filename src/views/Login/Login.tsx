import { useAuthStore } from '@/hooks'
import { RoutesMap } from '@/types'
import { Row, Col, Input, Button, Typography, Form, Card } from "antd";
import {
   UserOutlined,
   LockOutlined,
   EyeTwoTone,
   EyeInvisibleOutlined,
   ArrowLeftOutlined,
 } from '@ant-design/icons';
import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import './Login.css'
import { formatRut } from '@/toolbox/helpers/rut.helper'
import { Formik } from 'formik'

const { Title } = Typography;

export const LoginView: React.FC = (props) => {
   //Hooks
   const { login, user, RecoveryPassword } = useAuthStore()
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState({
      rut: '',
      password: '',
      user_name: '',
      textError: '',
      showPassword: false
   })
   const navigate = useNavigate()

   const handleInputBlur = (event: any) => {
      if (data.rut.length > 0) {
         setData(prevData => ({
           ...prevData,
           rut: formatRut(prevData.rut)
         }));
       }
   }

   const onSubmit = async (values) => {
      const { rut, password, user_name } = values;
      const rutValidate = rut.replace(/\./g, '');
      onSendLogin(user_name, password, rutValidate)
   }

   const onSendLogin = async (user_name, password, rut) => {
      setLoading(true)
      try {
         const success = await login({ user_name, password, rut })
         if (!success?.status) {
            setLoading(false)
            return
         }
         navigate({ pathname: RoutesMap.RULES }, { replace: true })
         setLoading(false)
      } catch (error) {
         setData(prev => ({ ...prev, textError: 'Lo sentimos, ocurrió un error inesperado.' }))
         setLoading(false)
      }
   }

   const validateForm = (values) => {
      let errors: any = {};
      if (!values.user_name) errors.user_name = "usuario requerido";
      if (!values.rut) errors.rut = "rut requerido";
      if (!values.password) errors.password = "contraseña requerida";
      return errors;
   }
   return (
      <Row gutter={20} style={{ height: '100vh', width: '100vw', display: 'flex' }}>
      <Col span={15} style={{ background: '#1D8DC9' }} />
      <Col span={9} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Card style={{ width: '400px', padding: '20px', borderRadius: '10px' }}>
          <Formik initialValues={data} enableReinitialize validate={validateForm} onSubmit={onSubmit}>
            {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
              <Form>
                <Title level={2}>¡Hola! Ingresa tus credenciales</Title>
                <Form.Item>
                  <Input
                    size="large"
                    placeholder="Usuario"
                    name="user_name"
                    value={values.user_name}
                    onChange={handleChange}
                    onBlur={handleInputBlur}
                    status={errors.user_name ? 'error' : ''}
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    size="large"
                    placeholder="RUT"
                    name="rut"
                    value={values.rut}
                    onChange={handleChange}
                    onBlur={handleInputBlur}
                    status={errors.rut ? 'error' : ''}
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
                <Form.Item>
                  <Input.Password
                    size="large"
                    placeholder="Contraseña"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleInputBlur}
                    status={errors.password ? 'error' : ''}
                    prefix={<LockOutlined />}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <a className="forgot-password1" style={{ cursor: 'pointer', fontSize: '14px' }}>
                  ¿Olvidaste tu contraseña?
                </a>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="primary" htmlType="submit" size="large" shape="round" disabled={loading} onClick={(e) =>handleSubmit()}>
                    Iniciar sesión
                  </Button>
                </div>
                {/* <Link style={{ color: '#000', textDecoration: 'none', fontSize: '14px' }} to="/">
                  <ArrowLeftOutlined style={{ marginBottom: '-4px', fontSize: '14px' }} /> Volver
                </Link> */}
              </Form>
            )}
          </Formik>
        </Card>
      </Col>
    </Row>
   )
}
