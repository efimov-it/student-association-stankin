import axios from 'axios';

const baseUrl = process.env.NODE_ENV == 'production' ?
                '/wp-json/' :
                'https://alumni.stankin.ru/wp-json/';

global.sendRequest = async ({
    url,
    method = 'get',
    data = {},
    headers = {'Content-Type': 'multipart/form-data'},
    config = {},
    reject = err => {
        console.warn('Request error!\nURL: '+baseUrl+url+'\nError:\n'+err);
        return false;
    },
    resolve = resp => console.log(resp)
} = {}) => {
    await axios({
        method,
        url: url.indexOf('http') == 0 ? url : baseUrl + url,
        data,
        headers,
        ...config
    }).then(resp => {
        if(resp.data.error) {
            reject(resp.data, resp);
        }
        else {
            if(resp.data.success == false) {
                reject(resp.data, resp);
            }
            else {
                if(resp.data.data) {
                    resolve(resp.data.data, resp)
                }
                else {
                    resolve(resp.data, resp);
                }
            }
        }
    }).catch(err => {
        if(err.response) {
            reject(err.response.data);
        }
        else {
            reject(err);
        }
    });
}