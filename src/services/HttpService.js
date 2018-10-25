import config from '../config';
import { getHeaders, getAuthHeader } from '../helpers/httpHelper';

const httpConfig = {
    handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('user');
                    window.location = '/login';
                }

                const error = data.message || 'generic api error';
                return Promise.reject(error);
            }

            return data;
        });
    }
}

class HttpService {
    post(action, body){
        const requestOptions = {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body)
        };

        return fetch(config.ApiUrl + action, requestOptions)
            .then(httpConfig.handleResponse)
    }

    get(action, queryString){
        const requestOptions = {
            method: 'GET',
            headers: getHeaders(),
        };

        return fetch(config.ApiUrl + action + (queryString || ''), requestOptions)
            .then(httpConfig.handleResponse)
    }

    put(action, body){
        const requestOptions = {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(body)
        };

        return fetch(config.ApiUrl + action, requestOptions)
            .then(httpConfig.handleResponse)
    }

    postFormData(action, formData){
        const requestOptions = {
            method: 'POST',
            headers: getAuthHeader(),
            body: formData
        };

        return fetch(config.ApiUrl + action, requestOptions)
            .then(httpConfig.handleResponse)
    }
}

export default HttpService;