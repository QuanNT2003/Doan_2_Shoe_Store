import * as request from '../../utils/request';

export const getAllOrder = async (params) => {
    try {
        const response = await request.getMethod('api/order/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    if (key === 'limit' || key === 'page' || key === 'search') {
                        return key + '=' + params[key];
                    }
                    if (key === 'sortBy' || key === 'orderBy') {
                        return 'sort' + '=' + params[key];
                    }
                    if (key === 'user' || key === 'status') {
                        let string = ''
                        for (let item of params[key]) string += key + '=' + item.value + '&';
                        return string
                    }
                }).join('&');

                console.log(serializedParams);
                return serializedParams;
            },
        });

        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateOrder = async (obj) => {
    try {
        const res = await request.postMethod('api/order/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getOrder = async (id) => {
    try {
        const res = await request.getMethod('api/order/get-details/' + id);
        // console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateOrder = async (id, obj) => {
    try {
        const res = await request.putMethod('api/order/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getUser = async () => {
    try {
        const res = await request.getMethod('api/order/get-user');

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}