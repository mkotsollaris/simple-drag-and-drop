import React, { Component, useState } from "react";
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

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));

// a little function to help us with reordering the result
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

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "1rem",
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "",
  border: "1px solid",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: "lightblue",
  padding: grid,
  border: "1px solid white",
  "marginBottom": `${grid}px`,
  "backgroundColor": "lightblue",
  padding: `${grid}px`
});

class SimpleDragAndDrop extends Component {
  constructor(props) {
    super(props);
    
    console.log('props',props);
    this.state = {
      items: generateDNDArray(props.fields),
      selected: []
    };

  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: "items",
    droppable2: "selected"
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2
      });
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    let StyledContainer = styled.div`
      display: grid;
      grid-template-columns: 50% 50%;
    `;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <StyledContainer>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.selected.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </StyledContainer>
      </DragDropContext>
    );
  }
}

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

export default SimpleDragAndDrop;
