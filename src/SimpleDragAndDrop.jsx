import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const generateDNDArray = fields => {
  return fields.map((v, i) => {
    return {
      id: `id-${i}`,
      content: `${v.name}`
    };
  });
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

function Fields({ field, index }) {
  const DraggableItem = styled.div`
    padding: 0 0 0 2rem;
  `;
  const grid = 8;
  const FieldItem = styled.div`
    width: 200px;
    border: 1px solid grey;
    margin-bottom: ${grid}px;
    background-color: lightblue;
    padding: ${grid}px;
  `;

  return (
    <DraggableItem>
      <Draggable draggableId={field.id} index={index}>
        {provided => (
          <FieldItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h4>{field.content}</h4>
          </FieldItem>
        )}
      </Draggable>
    </DraggableItem>
  );
}

const FieldList = React.memo(function QuoteList({ fields: fields }) {
  return fields.map((field, index) => {
    return <Fields field={field} index={index} key={field.id} />;
  });
});

function SimpleDragAndDrop({ fields }) {
  const res = generateDNDArray(fields);
  const [state, setState] = useState({ fields: generateDNDArray(fields) });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const fields = reorder(
      state.fields,
      result.source.index,
      result.destination.index
    );

    setState({ fields: fields });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <FieldList fields={state.fields} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

SimpleDragAndDrop.propTypes = {
  fields: PropTypes.array
};

SimpleDragAndDrop.defaultProps = {
  fields: []
};

export default SimpleDragAndDrop;
