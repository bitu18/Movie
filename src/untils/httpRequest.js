import axios from 'axios';

const request = axios.create({
    baseURL: 'https://phim.nguonc.com/api/',

    timeout: 5000, // Adjust timeout as needed
    headers: {
        'Content-Type': 'application/json',
    },
});
export default request;
