import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { ModalConfirm } from "@/components/common/ModalConfirm/ModalConfirm";
import { useAuditStore } from "@/hooks/useAuditStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Audit } from "@/types/slices/auditType";
import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'registry_number', title: 'N° Documento', align: 'center' },
    { type: 'text', dataIndex: 'business_name', title: 'Razón social', align: 'center' },
    { type: 'text', dataIndex: 'phone', title: 'Teléfono', align: 'center' },
    { type: 'text', dataIndex: 'email', title: 'Correo', align: 'center' },
    { type: 'text', dataIndex: 'nameDistrict', title: 'Distrito', align: 'center' },
]

export const AuditList: FC = () => {
    const navigate = useNavigate()
    const { status, audits, getAudits, setSelectAudit, deleteAudit } = useAuditStore()
    const { modeStyle } = useStyleModeStore()

    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
    const [rowSelected, setRowSelected] = useState<Audit | null>(null)

    useEffect(() => {
        getAudits()
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const onAdd = async () => {
        setSelectAudit({} as Audit)
        navigate({ pathname: RoutesMap.AUDIT_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectAudit(rowSelected)
        navigate({ pathname: RoutesMap.AUDIT_FORM })
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteAudit(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            getAudits()
        }
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Empresas auditoras'}
                        columns={columns || []}
                        rows={audits || []}
                        hasOptions
                        rowsPerPage={rowsPerPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        onAddFn={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onRowClick={() => null}
                    />
                </Card>
            </Col>
            {
                showModalConfirm && (
                    <ModalConfirm
                        open={showModalConfirm}
                        closeModal={() => setShowModalConfirm(false)}
                        onConfirm={onDeleteConfirm}
                        status2={status !== ApiStatus.FETCHED}
                    />
                )
            }
        </Row>
    )
}