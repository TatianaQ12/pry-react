/* eslint-disable indent */
import { useEffect, useState } from 'react'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import CustomTableAnt from '@/components/common/CustomTableAnt/CustomTableAnt'
import { Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom'
import { RoutesMap } from '@/types'
import { ModalConfirm } from '@/components/common/ModalConfirm/ModalConfirm'
import { ApiStatus } from '@/types/api/status'
import { useUserStore } from '@/hooks/useUserStore'
import { User } from '@/types/slices/userType'

const columns = [
    { type: 'options', dataIndex: 'options', title: 'OPCIONES', align: 'center' },
    { type: 'text', dataIndex: 'n_document', title: 'RUT', align: 'center' },
    { type: 'text', dataIndex: 'user_name', title: 'USUARIO', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'NOMBRE', align: 'center' },
    { type: 'text', dataIndex: 'surname', title: 'APELLIDO', align: 'center' },
    { type: 'text', dataIndex: 'role', title: 'ROL', align: 'center' },
    { type: 'text', dataIndex: 'rut_company', title: 'RUT EMPRESA', align: 'center' },
    { type: 'text', dataIndex: 'name_company', title: 'NOMBRE EMPRESA', align: 'center' },

]

export const UserList: React.FC = () => {

    const navigate = useNavigate();

    const { getUsers, setSelectedUser, selectedUser, users, deleteUser, status } = useUserStore()
    const { modeStyle } = useStyleModeStore()
    const [rows, setRows] = useState<User[]>([])
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        setRows(users)
    }, [users])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const onAdd = async () => {
        setSelectedUser({} as User)
        navigate({ pathname: RoutesMap.USERS_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectedUser(rowSelected)
        navigate({ pathname: RoutesMap.USERS_FORM })
    }

    const onDelete = (rowSelected) => {
        setSelectedUser(rowSelected)
        setShowModalConfirm(true);
    }

    const onDeleteConfirm = async () => {
        const response = await deleteUser(selectedUser.iduser, selectedUser.idcompany)
        if (response === true) {
            setSelectedUser({} as User)
            setShowModalConfirm(false)
            getUsers()
        }
    }

    return (
        <>
            <Row justify="center" style={{ marginTop: 20 }}>
                <Col xs={24}>
                    <Card
                        className={modeStyle === 'light' ? 'card-light' : 'card-dark'}
                    >
                        <CustomTableAnt
                            title={'Usuarios'}
                            columns={columns || []}
                            rows={rows}
                            hasOptions
                            rowsPerPage={rowsPerPage}
                            page={page}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            onAddFn={onAdd}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </Card>
                </Col>
            </Row>
            {
                showModalConfirm && (
                    <ModalConfirm
                        open={showModalConfirm}
                        closeModal={() => { setShowModalConfirm(false) }}
                        onCancel={() => { setShowModalConfirm(false) }}
                        onConfirm={onDeleteConfirm}
                        status2={status == ApiStatus.FETCHING ? true : false}
                    />
                )
            }
        </>
    )
}
