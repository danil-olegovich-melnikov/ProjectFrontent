import axios from 'axios';


// https://www.digitalocean.com/community/tutorials/react-axios-react
const BASE_URL = '/api/'
export default axios.create({
  baseURL: BASE_URL,
});