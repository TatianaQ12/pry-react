import { useRuleStore } from '@/hooks/useRuleStore'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import { ApiStatus } from '@/types/api/status'
import { CodeColor } from '@/types/colors/colors'
import { ViewFront } from '@/types/slices/ruleType'
import { Button, Card, CardContent, Grid, Switch } from '@mui/material'
import { useEffect, useState } from 'react'


export const ViewsDisabled = () => {
    const { modeStyle } = useStyleModeStore()
    const {status, selectedRule, viewsDisabled, updateRoleView, getViewFrontIdrole} = useRuleStore()
    const [rowsViewsDisabled, setRowsViewsDisabled] = useState<ViewFront[]>([])
    const [selectedIdsDisabled, setSelectedIdsDisabled] = useState<number[]>([])

    useEffect(() => {
        setRowsViewsDisabled(viewsDisabled)
    }, [viewsDisabled])

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>, item: ViewFront) => {
    //     const checked = event.target.checked;
    //     const dataSend = {
    //         idview: item,
    //         //   idrole: selectedRule?.id,
    //         status: checked
    //     }
    //     if (checked) {
    //         // rowsViews.push(item);
    //     }
    //     console.log('event.target.checked', dataSend);
    // };

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>, item: ViewFront) => {
        console.log('item', item);
        console.log('selectedIdsDisabled', selectedIdsDisabled);
        const checked = event.target.checked;
        console.log('checked', checked);
        let itemsSelected: number[] = [...selectedIdsDisabled]; // Copia el estado actual de selectedIdsDisabled
    
        const idselected = item?.id;
        const index = itemsSelected.indexOf(idselected);
     
        console.log('index', index);
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
        setSelectedIdsDisabled(itemsSelected);
    };

    const handleEnabled = async (idviewfront: number) => {
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
            rowsViewsDisabled.map((item, index) => {
                return (
                    <Grid key={index} item xs={12} md={4} >
                        <Card className={modeStyle === 'light' ? 'card-value-light' : 'card-value-dark'} variant='outlined'>
                            <CardContent  >
                                <Switch
                                    disabled={status === ApiStatus.FETCHING ? true : false}
                                      checked={selectedIdsDisabled.includes(item?.id) ? true : false}
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

