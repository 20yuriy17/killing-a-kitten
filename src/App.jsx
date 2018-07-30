import React, {Component} from 'react';
import axios from 'axios';
import ToDoList from './Components/ToDoList/ToDoList';
import Button from './Components/Button/Button';
import {fetchAll, dellTask, addTask, updateTask} from './fetch/fetchTask.js';
import styles from './App.css'

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};


class App extends Component {

  state = {
    items: [],
    item: '',
  };

  componentDidMount() {
    // axios.get(' /tasks')
    // .then(({data , status}) => {
    //   if (status === 200) {
    //     this.setState({
    //       items: data
    //     })
    //   }
    // });
    fetchAll().then(items => this.setState({items}))  
  }
  deleteItem = (id) => {
    dellTask(id).then(isDeleted => {
      if (isDeleted) {
        this.setState({
          items: this.state.items.filter(el => el.id !== id)
        })
      }
    })
//     axios.delete(`/tasks/${id}`)
//     .then(({status})=> {
//       if(status === 200) {
//         this.setState({
//           items: this.state.items.filter(el => el.id !== id)
//     }
//   )
// }})
}


  addItem = (e) => {
    e.preventDefault();
    const task = { text: this.state.item};
    if (this.state.item !== '') {
      addTask(task)
      .then(data => this.setState(prev => ({
        items: [data, ...prev.items],
        item: ''
      })))

  //   axios.post('/tasks', task).then(({data, status})=> {
  //     if(status === 201) {
  //       this.setState(prevState => ({
  //       items: [data, ...prevState.items],
  //       item: '',
  //     }))
  //   }
  // })
}
};

  itemChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    })


  };

  
  updateItem = (id, text) => {
    const task = this.state.items.find(el=> el.id === id);
    updateTask(id, task, text)
    .then(data => this.setState({items: this.state.items.map(el => el.id === id ? data: el)}))
    // axios
    // .put(`/tasks/${id}`, {...task, text})
    // .then(({status, data}) => {
    //   if (status === 200) {
    //     this.setState({
    //       items: this.state.items.map(el => (el.id === id ? data : el)),
    //     })
    //   }
    // })
    // const updateResult = this.state.items.map(el => (el.id === id ? {...el, text} : el));
    // this.setState({
    //   items: updateResult,
    // })
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  render() {
    return (
      <div className={styles.todoListMain}>
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              placeholder="enter task"
              className={styles.input}
              onChange={this.itemChange}
              name='item'
              value={this.state.item}
              type='text'
            />
            <Button text='Add' type='submit'/>
          </form>
          <ToDoList tasks={this.state.items}
                    deleteItem={this.deleteItem}
                    update={this.updateItem}
                    onDragEnd={this.onDragEnd}/>
        </div>
      </div>
    );
  }
}

export default App;
