import React, { Component } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import Button from "../Button/Button";
import styles from "./ToDo.css";

class ToDo extends Component {
  state = {
    isEdit: false,
    taskText: this.props.text
  };

  deleteLI = () => {
    this.props.func(this.props.id);
  };

  edit = () => {
    this.setState(state => ({
      isEdit: !state.isEdit
    }));
  };

  inputChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  };

  taskUpdate = () => {
    this.props.update(this.props.id, this.state.taskText);
    this.edit();
  };

  render() {
    const { text, id, index } = this.props;
    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <li
            className={styles.theList__item}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {this.state.isEdit ? (
              <div>
                <input
                  type="text"
                  value={this.state.taskText}
                  name="taskText"
                  onChange={this.inputChange}
                  autoFocus
                />
                <Button text="Save" onClick={this.taskUpdate} />
                <Button text="Cancel" onClick={this.edit} />
              </div>
            ) : (
              <div>
                {text}
                <Button text="Edit" onClick={this.edit} />
                <Button text="Delete" onClick={this.deleteLI} />
              </div>
            )}
          </li>
        )}
      </Draggable>
    );
  }
}

ToDo.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired
};

export default ToDo;
