import React, { Component } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const generateDNDArray = fields => {
  return fields.map((v, i) => {
    return {
      id: `id-${i}`,
      content: `${v.name}`
    };
  });
};

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

// pass in snapshot's isDragging property and provided.draggableProps's style
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "1rem",
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "",
  border: "1px solid white",
  ...draggableStyle
});

const getListStyle = () => ({
  background: "lightblue",
  padding: grid,
  border: "1px solid white",
  marginBottom: `${grid}px`,
  backgroundColor: "lightblue",
  padding: `${grid}px`
});

class SimpleDragAndDrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: generateDNDArray(props.fields),
      selected: []
    };
  }

  id2List = {
    droppable1: "items",
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
        items: result.droppable1,
        selected: result.droppable2
      });
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    let StyledContainer = styled.div`
      display: grid;
      grid-template-columns: 20rem 20rem;
      align-self: center;
      justify-self: center;
    `;

    if (!this.state || !this.state.items) {
      return <div>Loading ...</div>;
    }

    //TODO!
    const draggableElement = this.state.items.map((item, index) => (
      <Draggable
        // adding a key is important!
        key={item.id}
        draggableId={item.id}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          >
            {item.content}
          </div>
        )}
      </Draggable>
    ));;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <StyledContainer>
          <Droppable droppableId="droppable1">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {draggableElement}
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

export default SimpleDragAndDrop;
