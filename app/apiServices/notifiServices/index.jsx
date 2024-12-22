import * as request from '../../utils/request';

export const getAllNotifi = async (params) => {
    try {
        const response = await request.getMethod('api/notifi/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    return key + '=' + params[key];
                }).join('&');

                // console.log(serializedParams);
                return serializedParams;
            },
        });

        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateNotifi = async (id, obj) => {
    try {
        const res = await request.putMethod('api/notifi/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}