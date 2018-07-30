/*eslint-disable*/
import React from "react";
import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ToDo from "../ToDo/ToDo";
import styles from "./ToDoList.css";

const ToDoList = ({ tasks, deleteItem, update, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {provided => (
        <ul className={styles.theList} ref={provided.innerRef}>
          <FlipMove>
            {tasks.map((el, index) => (
              <ToDo
                text={el.text}
                id={el.id}
                key={el.id}
                func={deleteItem}
                update={update}
                index={index}
              />
            ))}
          </FlipMove>
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  </DragDropContext>
);
ToDoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  )
};

export default ToDoList;
