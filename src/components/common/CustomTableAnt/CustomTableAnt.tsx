import React, { useState } from 'react';
import { Table, Input, Button, Space, Checkbox, Typography, Pagination, Row, Col, Tooltip, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useStyleModeStore } from '@/hooks/useStyleModeStore';
import { CodeColor } from '@/types/colors/colors';
import { EditOutlined, SaveOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

type PropsCustomTable = {
    columns: any[];
    rows: any[];
    loading?: boolean;
    hasOptions?: any;
    rowsPerPage?: number;
    page?: number;
    handleChangePage?: any;
    handleChangeRowsPerPage?: any;
    disabled_title?: any;
    title?: string;
    onSearch?: any;
    onAdd?: any;
    onAddFn?: any;
    disabledAdd?: any;
    onAddFnName?: any;
    onRowClick?: any;
    onCheckbox?: any;
    onEdit?: (data: any) => void;
    onDelete?: (data: any) => void;
    onCancel?: (data: any) => void;
    onBtnHelper1Fn?: (data: any) => void
    onBtnHelper1Icon?: any
    onBtnHelper1ToolTip?: string
    totalRows?: number
    withoutPagination?: boolean
    onRowDrop?: (updatedRows: any[]) => void
    onSecondFn?: any
    onSecondFnName?: any
    onSecondFnCondition?: any
    onDetail?: (rowSelected) => void
    onDetailToolTip?: string
};

const CustomTableAnt = (props: PropsCustomTable) => {
    const { columns = [], rows = [], loading = false, hasOptions, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, totalRows, withoutPagination, onSecondFn } = props;
    const navigate = useNavigate();
    const { modeStyle } = useStyleModeStore();

    const [draggedRow, setDraggedRow] = useState<any>(null);

    const handleDragStart = (event: React.DragEvent<HTMLTableRowElement>, rowIndex: number) => {
        setDraggedRow(rows[rowIndex]);
    };

    const handleDragEnd = () => {
        setDraggedRow(null);
    };

    const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLTableRowElement>, targetIndex: number) => {
        event.preventDefault();
        const sourceIndex = rows.findIndex(row => row === draggedRow);

        if (sourceIndex !== -1) {
            const updatedRows = [...rows];
            updatedRows.splice(sourceIndex, 1);
            updatedRows.splice(targetIndex, 0, draggedRow);
            props.onRowDrop && props.onRowDrop(updatedRows);
        }
    };

    return (
        <>
            <Row justify="center" style={{ marginBottom: 16 }}>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                    {!props.disabled_title && (
                        <Typography.Title level={4} style={{ fontWeight: 600, color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}>
                            {props.title && props.title.toUpperCase()}
                        </Typography.Title>
                    )}
                </Col>
                <Col span={24}>
                    <Row justify="space-between">
                        <Col>
                            {props.onSearch && (
                                <Input
                                    prefix={<SearchOutlined />}
                                    placeholder="Buscar..."
                                    size="middle"
                                    allowClear
                                    onChange={(e) => props.onSearch(e.target.value)}
                                />
                            )}
                        </Col>
                        <Col>
                            <Space>
                                {props.onSecondFn && props.onSecondFnCondition && (
                                    <Button
                                        type="default"
                                        onClick={() => props.onSecondFn()}
                                    >
                                        {props.onSecondFnName ? props.onSecondFnName : "Canelar"}
                                    </Button>
                                )}
                                {props.onAdd && (
                                    <Button type="primary" onClick={() => navigate({ pathname: props.onAdd })}>
                                        Agregar
                                    </Button>
                                )}
                                {props.onAddFn && (
                                    <Button
                                        type="primary"
                                        onClick={() => props.onAddFn()}
                                        disabled={props.disabledAdd}
                                    >
                                        {props.onAddFnName ? props.onAddFnName : "Agregar"}
                                    </Button>
                                )}
                            </Space>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Table
                loading={loading}
                columns={columns}
                dataSource={rows.map((row, rowIndex) => {
                    const originalRowData = { ...row, key: rowIndex };
                    return {
                        ...columns.reduce((acc, column) => {
                            switch (column.type) {
                                case 'options':
                                    acc[column.dataIndex] = (
                                        <Space
                                            style={{
                                                color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK,
                                                fontWeight: '500'
                                            }}
                                        >
                                            {props.onCheckbox && <Checkbox />}
                                            {props.onEdit && (
                                                <Button
                                                    icon={<EditOutlined />}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        props.onEdit(originalRowData);
                                                    }}
                                                />
                                            )}
                                            {props.onCancel && (
                                                <Button
                                                    icon={<SaveOutlined />}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        props.onCancel(originalRowData);
                                                    }}
                                                />
                                            )}
                                            {props.onDelete && (
                                                <Button
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        props.onDelete(originalRowData);
                                                    }}
                                                />
                                            )}
                                        </Space>
                                    );
                                    break;
                                case 'detail':
                                    acc[column.dataIndex] = (
                                        <Space
                                            style={{
                                                color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK,
                                                fontWeight: '500'
                                            }}
                                        >
                                            {props.onDetail && (
                                                <Tooltip title={props.onDetailToolTip || 'Ver'}>
                                                    <Button
                                                        icon={<EyeOutlined />}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            props.onDetail(originalRowData);
                                                        }}
                                                    />
                                                </Tooltip>
                                            )}
                                            {props.onBtnHelper1Fn && (
                                                <Tooltip title={props.onBtnHelper1ToolTip || ''}>
                                                    <Button
                                                        icon={props.onBtnHelper1Icon}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            props.onBtnHelper1Fn(originalRowData);
                                                        }}
                                                    />
                                                </Tooltip>
                                            )}
                                        </Space>
                                    );
                                    break;
                                case 'select':
                                    acc[column.dataIndex] = (
                                        <Select
                                            defaultValue={row[column.dataIndex]}
                                            style={{ width: 120 }}
                                            onChange={(value) => {
                                                column.onChange(value, originalRowData)
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            options={column.values.map(row => ({ label: row.name, value: row.id }))}
                                            value={row[column.dataIndex]}
                                        />
                                    );
                                    break;
                                default:
                                    acc[column.dataIndex] = (
                                        <span
                                            style={{
                                                color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK
                                            }}
                                        >
                                            {column.format ? column.format(row) : row[column.dataIndex]}
                                        </span>
                                    );
                                    break;
                            }
                            return acc;
                        }, {}),
                        _originalData: originalRowData
                    };
                })}
                rowKey={(record) => record.key}
                pagination={false}
                onRow={(record, rowIndex) => ({
                    onClick: () => props.onRowClick && props.onRowClick(record._originalData),
                    style: { cursor: 'pointer' },
                    draggable: true,
                    onDragStart: (event) => handleDragStart(event, rowIndex),
                    onDragOver: handleDragOver,
                    onDrop: (event) => handleDrop(event, rowIndex),
                    onDragEnd: handleDragEnd,
                })}
            />
            {!withoutPagination && (
                <Pagination
                    current={page}
                    pageSize={rowsPerPage}
                    total={totalRows || rows.length}
                    onChange={handleChangePage}
                    showSizeChanger
                    onShowSizeChange={handleChangeRowsPerPage}
                    style={{ marginTop: 16, textAlign: 'right', color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}
                />
            )}
        </>
    );
};

export default CustomTableAnt;