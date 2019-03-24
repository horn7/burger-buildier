import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-25f89.firebaseio.com/'
})

export default instance;