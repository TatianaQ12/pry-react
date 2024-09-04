/* eslint-disable indent */
import { Grid, CardContent, Card } from '@mui/material'
import { useRuleStore } from '@/hooks/useRuleStore'
import { useEffect, useState } from 'react'
import { Rule } from '@/types/slices/ruleType'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import CustomTableAnt from '@/components/common/CustomTableAnt/CustomTableAnt'
import { useNavigate } from 'react-router-dom'
import { RoutesMap } from '@/types'
import { Typography } from 'antd'
import { TableList } from '../Table/TableList'


export const CommiteeEdit: React.FC = () => {

    const navigate = useNavigate();

   
    const { modeStyle } = useStyleModeStore()


    return (
        <Grid container >
            <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
                <CardContent>
                    <TableList/>
                </CardContent>
            </Card>

        </Grid>
    )
}

