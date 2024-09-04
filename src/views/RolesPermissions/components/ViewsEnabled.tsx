import { useRuleStore } from '@/hooks/useRuleStore'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import { ApiStatus } from '@/types/api/status'
import { CodeColor } from '@/types/colors/colors'
import { ViewFront } from '@/types/slices/ruleType'
import { Button, Card, CardContent, Grid, Switch } from '@mui/material'
import { useEffect, useState } from 'react'


export const ViewsEnabled = () => {
    const { modeStyle } = useStyleModeStore()
    const { status, selectedRule, viewsEnabled, updateRoleView, getViewFrontIdrole} = useRuleStore()
    const [rowsViewsEnabled, setRowsViewsEnabled] = useState<ViewFront[]>([])
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    useEffect(() => {
        setSelectedIds(viewsEnabled.map(item => item.id))
        setRowsViewsEnabled(viewsEnabled)
    }, [viewsEnabled])

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>, item: ViewFront) => {
    //     const checked = event.target.checked;
    //     const dataSend = {
    //         idview: item,
    //         status: checked
    //     }
    //     if (checked) {
    //         // rowsViews.push(item);
    //     }
    //     console.log('event.target.checked', dataSend);
    // };

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>, item: ViewFront) => {
        console.log('item', item);
        const checked = event.target.checked;
        console.log('checked', checked);

        let itemsSelected: number[] = [...selectedIds]; // Copia el estado actual de selectedIds

        const idselected = item?.id;
        const index = itemsSelected.indexOf(idselected);

        if (checked) {
            if (index === -1) {
                itemsSelected.push(idselected);
            }
        } else {
            if (index !== -1) {
                itemsSelected.splice(index, 1); // Quita el elemento de la matriz
            }
        }

        handleEnabled(idselected)
        setSelectedIds(itemsSelected);
    };

    const handleEnabled = async (idviewfront) => {
        if (selectedRule?.id && idviewfront) {
            const payload = {
                idviewfront,
                idrole: selectedRule?.id
            }
            const response = await updateRoleView(payload)
            if(response){
                getViewFrontIdrole(selectedRule?.id)
            }
            console.log('response', response)
        }
    }


    return (
        <Grid container >
         
            {
                rowsViewsEnabled.map((item, index) => {
                    return (
                        <Grid key={index} item xs={12} md={4} >
                            <Card className={modeStyle === 'light' ? 'card-value-light' : 'card-value-dark'} variant='outlined'>
                                <CardContent  >
                                    <Switch
                                        disabled={status === ApiStatus.FETCHING ? true : false}
                                        checked={selectedIds.includes(item?.id) ? true : false}
                                        onChange={(e) => handleChange(e, item)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <span style={{ color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}> {item?.name}</span>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })
            }
         
        </Grid>
    )
}

