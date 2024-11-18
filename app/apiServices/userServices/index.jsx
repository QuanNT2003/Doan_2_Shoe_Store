import * as request from '../../utils/request';

export const getAllusers = async (params) => {
    try {
        console.log(params)
        const response = await request.getMethod('api/user/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    if (key === 'limit' || key === 'page' || key === 'name') {
                        return key + '=' + params[key];
                    }
                    if (key === 'sortBy' || key === 'orderBy') {
                        return 'sort' + '=' + params[key];
                    }
                    if (key === 'active') {
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

export const getUser = async (id) => {
    try {
        const res = await request.getMethod('api/user/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateUser = async (id, obj) => {
    try {
        const res = await request.putMethod('api/user/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateUser = async (obj) => {
    try {
        const res = await request.postMethod('api/user/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteUser = async (id) => {
    try {
        const res = await request.deleteMethod('api/user/delete-User/' + id);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const sendOtp = async (obj) => {
    try {
        const res = await request.postMethod('api/user/send-otp', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const login = async (obj) => {
    try {
        const res = await request.postMethod('api/user/login', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}