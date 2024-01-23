import axios from 'axios';
export default axios.create({
    baseURL: "https://movies-api-luizedu.koyeb.app",
    headers: {"skip-browser-warning": "true"}
})