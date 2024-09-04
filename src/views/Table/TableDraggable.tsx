import React, { FC, useState } from 'react';
import { Table } from 'antd';

interface TableDraggableProps {
    columns: any
    dataSource: any
}

export const TableDraggable: FC<TableDraggableProps> = (props) => {
    const { columns, dataSource } = props

    const [data, setData] = useState(dataSource);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const onDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.setData('text/plain', '')
    };

    const onDragOver = (index) => {
        if (draggedIndex === null || draggedIndex === index) return;
        const draggedRow = data[draggedIndex];
        const remainingRows = data.filter((row, i) => i !== draggedIndex);
        const updatedRows = [
            ...remainingRows.slice(0, index),
            draggedRow,
            ...remainingRows.slice(index),
        ];
        setDraggedIndex(index);
        setData(updatedRows);
    };

    const onDragEnd = () => {
        setDraggedIndex(null);
    };

    const draggableColumns = columns.map((column) => ({
        ...column,
        onCell: (record, index) => ({
            draggable: true,
            onDragStart: (e) => onDragStart(e, index),
            onDragOver: () => onDragOver(index),
            onDragEnd: onDragEnd,
        }),
    }));

    return (
        <Table
            columns={draggableColumns}
            dataSource={data}
            pagination={false}
            rowKey={(record, index) => index}
        />
    );
};