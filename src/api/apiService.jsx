import axios from 'axios';
import CryptoJS from "crypto-js";
const backendUrl = process.env.REACT_APP_API_URL;

const apiCli = axios.create({
    baseURL: backendUrl,
    headers: {
        "app-id": "63c750aa777124cc4b5d0ca5",
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

const dataResponseInterceptor = (response) => {
    const { data, status: status_code } = response;
    return { data, status_code, success: true };
}

apiCli.interceptors.response.use(dataResponseInterceptor)


const authRequestInteceptor = (request) => {
    let tokenEncrypt = localStorage.getItem("sessionId");

    if (tokenEncrypt) {
        //Proceso de validacion
        var bytes = CryptoJS.AES.decrypt(localStorage.getItem("sessionId"), process.env.REACT_APP_AES_CRYPTO_LOCAL);
        var token = bytes.toString(CryptoJS.enc.Utf8);

        request.headers["Authorization"] = "Bearer " + token;

    }

    return request;
}

apiCli.interceptors.request.use(authRequestInteceptor);

export default apiCli;