import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { ModalConfirm } from "@/components/common/ModalConfirm/ModalConfirm";
import { useRRHHStore } from "@/hooks/useRRHHStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { RRHH } from "@/types/slices/rrhhType";
import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'Nombre', align: 'center' },
    { type: 'text', dataIndex: 'surname', title: 'Apellidos', align: 'center', format: (row) => row.surname + ' ' + row.second_surname },
    { type: 'text', dataIndex: 'birth_date', title: 'Fecha de nacimiento', align: 'center' },
    { type: 'text', dataIndex: 'sexo', title: 'Sexo', align: 'center', format: (row) => row.sexo == 1 ? 'M' : 'F' },
    { type: 'text', dataIndex: 'charge', title: 'Cargo', align: 'center' },
    { type: 'text', dataIndex: 'name_auditoria', title: 'Empresa auditora', align: 'center' },
    { type: 'text', dataIndex: 'direccion', title: 'Dirección', align: 'center' },
    { type: 'text', dataIndex: 'district', title: 'Distrito', align: 'center' },
]

export const RRHHList: FC = () => {
    const navigate = useNavigate()
    const { status, rrhhs, getRRHHs, setSelectRRHH, deleteRRHH } = useRRHHStore()
    const { modeStyle } = useStyleModeStore()

    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
    const [rowSelected, setRowSelected] = useState<RRHH | null>(null)

    useEffect(() => {
        getRRHHs()
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const onAdd = async () => {
        setSelectRRHH({} as RRHH)
        navigate({ pathname: RoutesMap.RRHH_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectRRHH(rowSelected)
        navigate({ pathname: RoutesMap.RRHH_FORM })
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteRRHH(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            getRRHHs()
        }
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Recursos humanos'}
                        columns={columns || []}
                        rows={rrhhs || []}
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