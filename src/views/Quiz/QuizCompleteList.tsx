import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { ModalConfirm } from "@/components/common/ModalConfirm/ModalConfirm";
import { useQuizCompleteStore } from "@/hooks/useQuizCompleteStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { QuizeComplete } from "@/types/slices/quizType";
import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'quiz', title: 'Formulario', align: 'center' },
    { type: 'text', dataIndex: 'description', title: 'Descripción', align: 'center' },
    { type: 'text', dataIndex: 'user', title: 'Usuario', align: 'center' },
    { type: 'text', dataIndex: 'user_n_document', title: 'N° Doc.', align: 'center' },
    { type: 'text', dataIndex: 'date', title: 'Fecha', align: 'center' },
    { type: 'text', dataIndex: 'correct_answers', title: 'N° respuestas correctas', align: 'center' },
]

export const QuizCompleteList: FC = () => {
    const navigate = useNavigate()
    const { status, quizzesCompletes, totalRows, getQuizzesCompletes, setSelectedQuizComplete, deleteQuizComplete } = useQuizCompleteStore()
    const { modeStyle } = useStyleModeStore()

    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
    const [rowSelected, setRowSelected] = useState<QuizeComplete | null>(null)
    const [loadingTable, setLoadingTable] = useState<boolean>(false)

    useEffect(() => {
        getQuizzesCompleteApi()
    }, [page, perPage])

    const getQuizzesCompleteApi = async () => {
        setLoadingTable(true)
        const payload = {
            page: page,
            perPage: perPage
        }
        await getQuizzesCompletes(payload)
        setLoadingTable(false)
    }

    const handleChangePage = (newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (current: number, size: number) => {
        setPerPage(size)
        setPage(1)
    }

    const onAdd = async () => {
        setSelectedQuizComplete({} as QuizeComplete)
        navigate({ pathname: RoutesMap.QUIZ_COMPLETE_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectedQuizComplete(rowSelected)
        navigate({ pathname: RoutesMap.QUIZ_COMPLETE_FORM })
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteQuizComplete(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            getQuizzesCompleteApi()
        }
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Formularios completados'}
                        columns={columns || []}
                        rows={quizzesCompletes || []}
                        totalRows={totalRows}
                        hasOptions
                        rowsPerPage={perPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        onAddFn={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onRowClick={() => null}
                        loading={loadingTable}
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