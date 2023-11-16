import fetch from "node-fetch";

const sendRequest = async (method, url, headers = {}, body = {}) => {
    headers = {
        ...headers,
        "x-api-key": process.env.API_KEY,
        "x-organization-type": process.env.APP_HEADER,
        "Content-Type": "application/json",
    };

    const options = {
        method,
        headers,
    };

    if (method !== "GET") {
        options.body = JSON.stringify(body);
    }

    return fetch(`${process.env.ORGANIZATION_API_URL}${url}`, options);
};

export default sendRequest;
