import CustomTableAnt from "@/components/common/CustomTableAnt/CustomTableAnt";
import { ModalConfirm } from "@/components/common/ModalConfirm/ModalConfirm";
import { useQuizStore } from "@/hooks/useQuizStore";
import { useStyleModeStore } from "@/hooks/useStyleModeStore";
import { RoutesMap } from "@/types";
import { ApiStatus } from "@/types/api/status";
import { Quiz } from "@/types/slices/quizType";
import { Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
    { type: 'options', dataIndex: 'options', title: 'Opciones', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'Formulario', align: 'center' },
    { type: 'text', dataIndex: 'description', title: 'Descripción', align: 'center' },
]

export const QuizList: FC = () => {
    const navigate = useNavigate()
    const { status, quizzes, totalRows, getQuizzes, setSelectedQuiz, deleteQuiz } = useQuizStore()
    const { modeStyle } = useStyleModeStore()

    const [page, setPage] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
    const [rowSelected, setRowSelected] = useState<Quiz | null>(null)
    const [loadingTable, setLoadingTable] = useState<boolean>(false)

    useEffect(() => {
        getQuizzesApi()
    }, [page, perPage])

    const getQuizzesApi = async () => {
        setLoadingTable(true)
        const payload = {
            page: page,
            perPage: perPage
        }
        await getQuizzes(payload)
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
        setSelectedQuiz({} as Quiz)
        navigate({ pathname: RoutesMap.QUIZ_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectedQuiz(rowSelected)
        navigate({ pathname: RoutesMap.QUIZ_FORM })
    }

    const onDelete = (rowSelected) => {
        setRowSelected(rowSelected)
        setShowModalConfirm(true)
    }

    const onDeleteConfirm = async () => {
        if (!rowSelected) return
        const response = await deleteQuiz(rowSelected.id)
        if (response === true) {
            setShowModalConfirm(false)
            getQuizzesApi()
        }
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                    <CustomTableAnt
                        title={'Formularios'}
                        columns={columns || []}
                        rows={quizzes || []}
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