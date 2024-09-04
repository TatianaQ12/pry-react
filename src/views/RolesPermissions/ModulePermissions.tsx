/* eslint-disable indent */
import { Grid, CardContent, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { Rule } from '@/types/slices/ruleType'
import { useModuleStore } from '@/hooks/useModuleStore'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import CustomTableAnt from '@/components/common/CustomTableAnt/CustomTableAnt'
import { RoutesMap } from '@/types'
import { useNavigate } from 'react-router-dom'
import { Module } from '@/types/slices/moduleType'

const columns = [
    { type: 'options', dataIndex: 'options', title: 'OPCIONES', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'NOMBRE', align: 'center' },
    { type: 'text', dataIndex: 'type_name', title: 'TIPO', align: 'center' },
]

export const ModulePermissions: React.FC = () => {

    const navigate = useNavigate();

  const { getModule, setSelectModule, modules } = useModuleStore()
  const { modeStyle } = useStyleModeStore()
  const [rows, setRows] = useState<Rule[]>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  useEffect(() => {
    getModule()
  }, [])

  useEffect(() => {
    setRows(modules)
  }, [modules])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
}

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
}

const onAdd = async () => {
    setSelectModule({} as Module)
    navigate({ pathname: RoutesMap.MODULE_FORM })
}

const onEdit = (rowSelected) => {
    setSelectModule(rowSelected)
    navigate({ pathname: RoutesMap.MODULE_FORM })
}


return (
    <Grid container >
        <Card  className={modeStyle === 'light' ? 'card-light' : 'card-dark'} >
            <CardContent>
                <CustomTableAnt
                    title={'Módulos'}
                    columns={columns || []}
                    rows={rows}
                    hasOptions
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    onAddFn={onAdd}
                    onEdit={onEdit}
                />
            </CardContent>
        </Card>

    </Grid>
)
}
