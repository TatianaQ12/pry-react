/* eslint-disable indent */
import { Grid, CardContent, Card } from '@mui/material'
import { useRuleStore } from '@/hooks/useRuleStore'
import { useEffect, useState } from 'react'
import { Rule } from '@/types/slices/ruleType'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import CustomTableAnt from '@/components/common/CustomTableAnt/CustomTableAnt'
import { useNavigate } from 'react-router-dom'
import { RoutesMap } from '@/types'

const columns = [
    { type: 'options', dataIndex: 'options', title: 'OPCIONES', align: 'center' },
    { type: 'text', dataIndex: 'name', title: 'NOMBRE', align: 'center' },
]

export const RulesList: React.FC = () => {

    const navigate = useNavigate();

    const { getRule, setSelectRule, rules } = useRuleStore()
    const { modeStyle } = useStyleModeStore()
    const [rows, setRows] = useState<Rule[]>([])
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)

    useEffect(() => {
        getRule()
    }, [])

    useEffect(() => {
        setRows(rules)
    }, [rules])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const onAdd = async () => {
        setSelectRule({} as Rule)
        navigate({ pathname: RoutesMap.RULES_FORM })
    }

    const onEdit = (rowSelected) => {
        setSelectRule(rowSelected)
        navigate({ pathname: RoutesMap.RULES_FORM })
    }


    return (
        <Grid container >
            <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                <CardContent>
                    <CustomTableAnt
                        title={'Roles'}
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

