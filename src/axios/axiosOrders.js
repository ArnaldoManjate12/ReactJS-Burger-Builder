import axios from 'axios';

const ordersInstance = axios.create({
    baseURL : "https://react-burger-bead9.firebaseio.com"
});

export default ordersInstance;

