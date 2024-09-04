import React, { useEffect, useState } from 'react';
import { Drawer, Button, Form, Input, Upload, Typography, Row, Col, Tooltip, Select, List, Avatar, Space, Radio, Divider } from 'antd';
import { UploadOutlined, LinkOutlined, PlusOutlined } from '@ant-design/icons';
import { Task } from '@/types/slices/task';
import { CloseOutlined } from '@ant-design/icons';
import { useStateCommitteeStore } from '@/hooks/useStateCommitteeStore';
import { useCommentStore } from '@/hooks/useCommentStore';
import { UserOutlined, DeleteOutlined, FileTextOutlined, CommentOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useAuthStore } from '@/hooks';
import { useTaskStore } from '@/hooks/useTaskStore';
import { CustomSnackbar } from '@/components/common/CustomSnackbar/CustomSnackbar';
import { useTaskDocumentStore } from '@/hooks/useTaskDocumentStore';

interface Props {
  visible: boolean
  onClose: () => void
  task: Task
  onList: () => void
}

export const DrawerDetailTask: React.FC<Props> = (props) => {
  const { visible, onClose, task, onList } = props

  const { user } = useAuthStore()
  const { statesCommittee, getStatesCommittees } = useStateCommitteeStore()
  const { comments, getComments, createComment, deleteComment } = useCommentStore()
  const { updateTask } = useTaskStore()
  const { taskDocuments, getTaskDocuments, deleteTaskDocument, createTaskDocument } = useTaskDocumentStore()

  const [comment, setComment] = useState<string>('')
  const [idState, setIdState] = useState<number | undefined>(task?.idcommittee_state || undefined)
  const [option, setOption] = useState<number>(1)
  const [fileList, setFileList] = useState([]);


  useEffect(() => {
    if (visible) {
      getStatesCommitteesApi()
      getCommentsApi()
      getTaskDocumentsApi()
    }
  }, [visible])

  useEffect(() => {
    if (statesCommittee.length > 0) {
      setIdState(task?.idcommittee_state)
    }
  }, [statesCommittee])

  const getStatesCommitteesApi = async () => {
    await getStatesCommittees({ idcommittee: task.idcommittee })
  }

  const getCommentsApi = async () => {
    await getComments({ idtask: task.id })
  }

  const getTaskDocumentsApi = async () => {
    await getTaskDocuments({ idtask: task.id })
  }

  const handleSubmitComment = async () => {
    if (comment === '') return CustomSnackbar('warning', 'Ingrese un comentario.')
    const response = await createComment({ idtask: task.id, comment: comment })
    if (response === true) {
      setComment('')
      getCommentsApi()
    }
  };

  const handleUpload = async (file, onRemove) => {
    const formData = new FormData()
    formData.append('idtask', task.id.toString())
    formData.append('document', file)

    const response = await createTaskDocument(formData)
    if (response === true) {
      getTaskDocumentsApi()
      onRemove()
    }
  }

  const beforeUpload = (file) => {
    setFileList([...fileList, file])
    handleUpload(file, () => setFileList(fileList.filter(item => item.uid !== file.uid)))
    return false
  }

  const onRemove = (file) => {
    setFileList(fileList.filter(item => item.uid !== file.uid))
  }

  const onChangeState = async (idstate: number) => {
    const response = await updateTask(task.id, { idcommittee_state: idstate, idspecific_objective: task.idspecific_objective })
    if (response === true) {
      setIdState(idstate)
      onList()
    }
  }

  const onDeleteComment = async (id: number) => {
    const response = await deleteComment(id)
    if (response === true) getCommentsApi()
  }

  const onDeleteDocument = async (id: number) => {
    const resposne = await deleteTaskDocument(id)
    if (resposne === true) {
      getTaskDocumentsApi()
    }
  }

  return (
    <Drawer
      title={<span>{task.code}</span>}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={450}
      style={{ marginTop: 80, position: 'relative' }}
    >
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={onClose}
        style={{
          position: 'absolute',
          right: 16,
          top: 16,
          zIndex: 1000,
        }}
      />
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Typography.Title level={2} style={{ fontWeight: 600 }}>
            {task.name}
          </Typography.Title>
        </Col>
        <Col xs={12}>
          <Button.Group>
            <Tooltip title="Cargar archivo">
              <Upload
                fileList={fileList}
                beforeUpload={beforeUpload}
                onRemove={onRemove}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} style={{ borderRadius: '6px 0 0 6px' }} />
              </Upload>
            </Tooltip>
            <Tooltip title="Relaciona con otra tarea">
              <Button icon={<LinkOutlined />} />
            </Tooltip>
            <Tooltip title="Crea una tarea">
              <Button icon={<PlusOutlined />} />
            </Tooltip>
          </Button.Group>
        </Col>
        <Col xs={12}>
          <Select
            onChange={(value) => onChangeState(value)}
            value={idState}
            options={statesCommittee.map(charge => ({ label: charge.name, value: charge.id }))}
            style={{ minWidth: '100px' }}
          />
        </Col>
        <Col xs={24}>
          <Typography.Text strong>Descripcion:</Typography.Text>
          <p>{task.description}</p>
        </Col>
        <Col xs={24}>
          <Radio.Group
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={e => setOption(e.target.value)}
            buttonStyle="solid"
            value={option}
          >
            <Tooltip title="Ver comentarios">
              <Radio.Button value={1} checked={option === 1}>
                <CommentOutlined />
              </Radio.Button>
            </Tooltip>
            <Tooltip title="Ver documentos adjuntos">
              <Radio.Button value={2} checked={option === 2}>
                <FileTextOutlined />
              </Radio.Button>
            </Tooltip>
          </Radio.Group>
        </Col>
        {
          option == 1
            ?
            <>
              <Col xs={24}>
                <Form.Item>
                  <Input.TextArea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary" onClick={handleSubmitComment}>
                    Agregar comentario
                  </Button>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <List
                  itemLayout="horizontal"
                  dataSource={comments}
                  renderItem={comment => (
                    <List.Item
                      actions={
                        comment.iduser === user.id ? [
                          <Tooltip title="Eliminar comentario">
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              onClick={() => onDeleteComment(comment.id)}
                            />
                          </Tooltip>
                        ] : []
                      }
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        }
                        title={
                          <Space style={{ fontSize: '14px', color: '#333333', marginBottom: '6px' }}>
                            <span>{comment.user_name}</span>
                            <span>-</span>
                            <span>{moment(comment.created_at).format('DD-MM-YYYY HH:mm')}</span>
                          </Space>
                        }
                        description={<p style={{ fontSize: '16px', color: '#000000' }}>{comment.comment}</p>}
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </>
            :
            <Col xs={24}>
              <List
                itemLayout="horizontal"
                dataSource={taskDocuments}
                renderItem={document => (
                  <List.Item
                    actions={[
                      <Tooltip title="Ver documento">
                        <Button
                          type="text"
                          icon={<EyeOutlined />}
                          onClick={() => window.open(`${import.meta.env.VITE_APP_ROOT_URL}${document.url}`, '_blank')}
                        />
                      </Tooltip>,
                      document.iduser === user.id ? (
                        <Tooltip title="Eliminar documento">
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => onDeleteDocument(document.id)}
                          />
                        </Tooltip>
                      ) : null
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Space direction="vertical" size={0}>
                          <Typography.Text strong style={{ fontSize: '16px' }}>{document.name}</Typography.Text>
                          <Typography.Text type="secondary">Código: {document.code_task}</Typography.Text>
                          <Typography.Text type="secondary">Tarea: {document.task}</Typography.Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Col>
        }
      </Row>
    </Drawer>
  );
};

