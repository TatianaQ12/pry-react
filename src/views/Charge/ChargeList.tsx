import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { ModalConfirm } from "@/components/common/ModalConfirm/ModalConfirm";
import { useChargeStore } from "@/hooks/useChargeStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Charge } from "@/types/slices/chargeType";
import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'Nombre', align: 'center' },
    { type: 'text', dataIndex: 'description', title: 'Descripción', align: 'center' },
]

export const ChargeList: FC = () => {
    const navigate = useNavigate()
    const { status, charges, getCharges, setSelecCharge, deleteCharge } = useChargeStore()
    const { modeStyle } = useStyleModeStore()
    
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
    const [rowSelected, setRowSelected] = useState<Charge|null>(null)

    useEffect(() => {
        getCharges()
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const onAdd = async () => {
        setSelecCharge({} as Charge)
        navigate({ pathname: RoutesMap.CHARGE_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelecCharge(rowSelected)
        navigate({ pathname: RoutesMap.CHARGE_FORM })
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteCharge(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            getCharges()
        }
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Cargos'}
                        columns={columns || []}
                        rows={charges || []}
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
                        closeModal={() => setShowModalConfirm(false) }
                        onConfirm={onDeleteConfirm}
                        status2={status !== ApiStatus.FETCHED}
                    />
                )
            }
        </Row>
    )
}