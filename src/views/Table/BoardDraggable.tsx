import React, { FC } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, Row, Col } from 'antd';
import '../../styles/board.css';

interface BoardDraggableProps {
    data: any
    setData: React.Dispatch<React.SetStateAction<object>>
}

export const BoardDraggable: FC<BoardDraggableProps> = (props) => {
    const { data,setData } = props;

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const startColumn = data.columns.find(column => column.id === source.droppableId);
        const finishColumn = data.columns.find(column => column.id === destination.droppableId);

        if (!startColumn || !finishColumn) return;
        
        const updatedCards = data.cards.map(card => {
            if (card.id === draggableId) {
                return { ...card, idcolumn: finishColumn.id };
            }
            return card;
        });

        setData(prevData => ({
            ...prevData,
            cards: updatedCards
        }));
    };


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Row gutter={[16, 16]}>
                {data.columns.map(column => (
                    <Col key={column.id} flex="auto">
                        <Card title={column.title} style={{ minHeight: '200px', textAlign: 'center' }}>
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`droppable ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                    >
                                        {data.cards.filter(card => card.idcolumn == column.id).map((card, index) => {
                                            return (
                                                <Draggable key={card.id} draggableId={card.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`draggable ${snapshot.isDragging ? 'dragging' : ''}`}
                                                        >
                                                            <Card>{card?.content}</Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Card>
                    </Col>
                ))}
            </Row>
        </DragDropContext>
    );
};