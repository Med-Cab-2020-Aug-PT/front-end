import axios from 'axios';

const axiosAuth = () => {
    const token = localStorage.getItem("token");
    return axios.create({
        baseURL: "",
        headers: {
            Authorization: token
        }
    });
}

export default axiosAuth; 