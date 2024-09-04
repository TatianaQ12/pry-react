import React, { FC, useState } from 'react';
import { Card, Row, Col, Radio } from 'antd';
import '../../styles/board.css';
import { useStyleModeStore } from '@/hooks/useStyleModeStore';
import { TableDraggable } from './TableDraggable';
import { BoardDraggable } from './BoardDraggable';


const columns = [
    {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Columna',
        dataIndex: 'column',
        key: 'column',
    }
];

export const TableList: FC = () => {
    const { modeStyle } = useStyleModeStore()

    const [data, setData] = useState<any>({
        columns: [
            { id: '1', title: 'Por hacer' },
            { id: '2', title: 'En curso' },
            { id: '3', title: 'Test' },
            { id: '4', title: 'Listo' },
        ],
        cards: [
            { id: '1', content: 'Tarea 1', idcolumn: '1' },
            { id: '2', content: 'Tarea 2', idcolumn: '1' },
            { id: '3', content: 'Tarea 3', idcolumn: '1' },
            { id: '4', content: 'Tarea 4', idcolumn: '2' },
            { id: '5', content: 'Tarea 5', idcolumn: '2' },
            { id: '6', content: 'Tarea 6', idcolumn: '2' },
            { id: '7', content: 'Tarea 7', idcolumn: '2' }
        ],
    })
    const [option, setOption] = useState<number>(1)

    return (
        <Row gutter={[16, 16]}>
            {/* <Col xs={24} md={12}>
                <Radio.Group
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={e => setOption(e.target.value)}
                    buttonStyle="solid"
                    value={option}
                >
                    <Radio.Button value={1} checked={option === 1}>Pizarra</Radio.Button>
                    <Radio.Button value={2} checked={option === 2}>Tabla</Radio.Button>
                </Radio.Group>
            </Col> */}
            <Col xs={24}>
                <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'} style={{ height: '100%' }}>
                    {option === 1
                        ?
                        <BoardDraggable data={data} setData={setData}/>
                        :
                        <TableDraggable columns={columns} dataSource={data.cards} />
                    }
                </Card>
            </Col>
        </Row>
    )
}