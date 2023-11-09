import axios from "axios";

const sendRequest = async (method, url, config, data) => {
    config = { ...config, api_key: process.env.API_KEY };
    switch (method) {
        case "POST":
            return axios.post(
                `${process.env.ORGANIZATION_API_URL}${url}`,
                data,
                config,
            );
        case "GET":
            return axios.get(`${process.env.ORGANIZATION_API_URL}${url}`);
    }
};

export default sendRequest;
