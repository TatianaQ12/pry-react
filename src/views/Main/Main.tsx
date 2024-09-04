/* eslint-disable indent */
import {  Grid, CardContent, Card } from '@mui/material'
import './Main.scss'
import { Loader } from '@/components/common/Loader/Loader'
import { ButtonActionsEdit } from '@/components/common/ButtonActions/ButtonActionsEdit'
import { ButtonActionsSave } from '@/components/common/ButtonActions/ButtonActionsSave'
import { ButtonActionsDelete } from '@/components/common/ButtonActions/ButtonActionsDelete'
import CustomTable from '@/components/common/CustomTable/CustomTable'

const columns = [
  { type: 'options', field: 'options', label: 'OPCIONES', align: 'center' },
  { type: 'text', field: 'request_correlative', label: 'NOMBRE', align: 'center' },
  { type: 'text', field: 'patent', label: 'DESCRIPCIÓN', align: 'center' },
]

export const Main: React.FC = () => {

  console.log('holaa')
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <ButtonActionsSave text='GUARDAR' />
        </Grid>
        <Grid item xs={6} md={3}>
          <ButtonActionsEdit text='EDITAR' />
        </Grid>
        <Grid item xs={6} md={3}>
          <ButtonActionsDelete text='ELIMINAR' />
        </Grid>
        <Grid item xs={6} md={3}>
          <ButtonActionsSave text='CREAR' />
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <Card>
            Loader
            <CardContent>
              <Loader />
            </CardContent>
          </Card>
        </Grid> */}

        <Grid item xs={12}>
          <Card>
            Table
            <CardContent>
              <CustomTable
                title={'INFO DE LA TABLA'}
                columns={columns || []}
                rows={[{
                  id: 1,
                  request_correlative: '1111',
                  patent: 'sss'
                }]}
                hasOptions
                // onEdit={true}
                // onCancel
                // onDelete
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
