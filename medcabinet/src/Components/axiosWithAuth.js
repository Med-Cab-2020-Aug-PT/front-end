import axios from 'axios';

const axiosAuth = () => {
    const token = localStorage.getItem("token");
    return axios.create({
        baseURL: "https://med-cab-2020-api.herokuapp.com/login",
        headers: {
            Authorization: token
        }
    });
}

export default axiosAuth; 