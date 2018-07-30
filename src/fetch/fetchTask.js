import axios from 'axios';

export const fetchAll = () => {
    return axios.get('/tasks').then(({data , status}) => {
      if (status === 200) {
          console.log('ok');
        return data;
      }
    })
}

export const dellTask = (id) => {
    return axios.delete(`/tasks/${id}`).then(({status})=> status===200)
}

export const addTask = (task) => {
    return axios.post('/tasks', task)
    .then(({data, status})=> {
        if(status === 201) {
            return data
        }
    })
}

export const updateTask = (id, task, text) =>{
    return axios.put(`/tasks/${id}`, {...task, text})
    .then(({status, data})=> {
        if (status === 200) {
            return data
        }
    })
} 