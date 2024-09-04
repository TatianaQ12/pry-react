import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { useViewFrontStore } from "@/hooks/useViewFrontStore";
import { RoutesMap } from "@/types";
import { ViewFront } from "@/types/slices/ruleType";
import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'Nombre', align: 'center' },
    { type: 'text', dataIndex: 'viewType', title: 'Tipo de vista', align: 'center' },
    { type: 'text', dataIndex: 'module', title: 'Módulo', align: 'center' },
    { type: 'text', dataIndex: 'type_name', title: 'Tipo', align: 'center' },
]


export const ViewList: FC = () => {
    const navigate = useNavigate()
    const { views, totalRows, getViewsFront, setSelectedViewFront } = useViewFrontStore()
    const { modeStyle } = useStyleModeStore()

    const [page, setPage] = useState<number>(1)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
    const [rowSelected, setRowSelected] = useState<ViewFront | null>(null)

    useEffect(() => {
        getViewsFrontApi()
    }, [page, rowsPerPage])

    const getViewsFrontApi = async () => {
        const payload = {
            page: page,
            perPage: rowsPerPage
        }
        getViewsFront(payload)
    }

    const handleChangePage = (newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (current: number, size: number) => {
        setRowsPerPage(size)
        setPage(1)
    }

    const onAdd = async () => {
        setSelectedViewFront({} as ViewFront)
        navigate({ pathname: RoutesMap.VIEW_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectedViewFront(rowSelected)
        navigate({ pathname: RoutesMap.VIEW_FORM })
    }

    const onDelete = (rowSelected) => {
        // setRowSelected(rowSelected)
        // setShowModalConfirm(true)
    }

    // const onDeleteConfirm = async () => {
    //     if (!rowSelected) return
    //     const response = await deleteRRHH(rowSelected.id)
    //     if (response === true) {
    //         setShowModalConfirm(false)
    //         getRRHHs()
    //     }
    // }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Vistas'}
                        columns={columns || []}
                        rows={views || []}
                        hasOptions
                        rowsPerPage={rowsPerPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        totalRows={totalRows}
                        onAddFn={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onRowClick={() => null}
                    />
                </Card>
            </Col>
            {/* {
                showModalConfirm && (
                    <ModalConfirm
                        open={showModalConfirm}
                        closeModal={() => setShowModalConfirm(false)}
                        onConfirm={onDeleteConfirm}
                        status2={status !== ApiStatus.FETCHED}
                    />
                )
            } */}
        </Row>
    )
}