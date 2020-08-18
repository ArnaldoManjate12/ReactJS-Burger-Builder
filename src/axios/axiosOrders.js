import axios from 'axios';

const ordersInstance = axios.create({
    baseURL : process.env.REACT_APP_ORDERS_URL,
    mode: 'no-cors',
    headers: { 
        'Access-Control-Allow-Origin' : '*'
      }
});

export default ordersInstance;

