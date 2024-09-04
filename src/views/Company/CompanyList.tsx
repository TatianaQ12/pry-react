/* eslint-disable indent */
import { useEffect, useState } from 'react'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import CustomTableAnt from '@/components/common/CustomTableAnt/CustomTableAnt'
import { useCompanyStore } from '@/hooks/useCompanyStore'
import { Company } from '@/types/slices/companyType'
import { Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom'
import { RoutesMap } from '@/types'
import { ModalConfirm } from '@/components/common/ModalConfirm/ModalConfirm'
import { ApiStatus } from '@/types/api/status'

const columns = [
    { type: 'options', dataIndex: 'options', title: 'OPCIONES', align: 'center' },
    { type: 'text', dataIndex: 'registry_number', title: 'RUT', align: 'center' },
    { type: 'text', dataIndex: 'business_name', title: 'NOMBRE', align: 'center' },
    { type: 'text', dataIndex: 'email', title: 'EMAIL', align: 'center' },
    { type: 'text', dataIndex: 'contact_name', title: 'REPRESENTANTE', align: 'center' },
    { type: 'text', dataIndex: 'contact_email', title: 'EMAIL REPRESENTANTE', align: 'center' },
    { type: 'text', dataIndex: 'contact_phone', title: 'TELÉFONO REPRESENTANTE', align: 'center' },

]

export const CompanyList: React.FC = () => {

    const navigate = useNavigate();

    const { getCompanies, setSelectedCompany, selectedCompany, companies, deleteCompany, status } = useCompanyStore()
    const { modeStyle } = useStyleModeStore()
    const [rows, setRows] = useState<Company[]>([])
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

    useEffect(() => {
        getCompanies()
    }, [])

    useEffect(() => {
        setRows(companies)
    }, [companies])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const onAdd = async () => {
        setSelectedCompany({} as Company)
        navigate({ pathname: RoutesMap.EMPRESAS_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectedCompany(rowSelected)
        navigate({ pathname: RoutesMap.EMPRESAS_FORM })
    }

    const onDelete = (rowSelected) => {
        setSelectedCompany(rowSelected)
        setShowModalConfirm(true);
    }

    const onDeleteConfirm = async () => {
        const response = await deleteCompany(selectedCompany.id)
        if (response === true) {
            setSelectedCompany({} as Company)
            setShowModalConfirm(false)
            getCompanies()
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
                            title={'Empresas'}
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
