import axios from 'axios';

const ordersInstance = axios.create({
    baseURL : "https://react-burger-bead9.firebaseio.com",
    mode: 'no-cors',
    headers: { 
        'Access-Control-Allow-Origin' : '*',
        //'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
});

export default ordersInstance;

