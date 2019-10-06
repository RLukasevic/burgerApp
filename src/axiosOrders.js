import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-4d2ab.firebaseio.com/'
})

export default instance;