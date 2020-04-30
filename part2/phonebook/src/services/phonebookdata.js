import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getNumbers = () => {
    const response = axios.get(baseUrl);
    return response.then(response => response.data);
};

const addNumber = person => {
    const response = axios.post(baseUrl, person);
    return response.then(response => response.data); 
};

const deleteNumber = person => {
    const response = axios.delete(baseUrl + '/' + person.id);
    return response;
};

const updateNumber = person => {
    const response = axios.put(baseUrl + '/' + person.id, person);
    return response.then(response => response.data);
};

export default{ getNumbers, addNumber, deleteNumber, updateNumber };