import * as request from '../../utils/request';

export const getAllVersions = async (params) => {
    try {
        console.log(params)
        const response = await request.getMethod('api/version/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    if (key === 'limit' || key === 'page' || key === 'search' || key === 'productId') {
                        return key + '=' + params[key];
                    }
                    if (key === 'sortBy' || key === 'orderBy') {
                        return 'sort' + '=' + params[key];
                    }
                    if (key === 'size' || key === 'color') {
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

export const getVersion = async (id) => {
    try {
        const res = await request.getMethod('api/version/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateVersion = async (id, obj) => {
    try {
        const res = await request.putMethod('api/version/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateVersion = async (obj) => {
    try {
        const res = await request.postMethod('api/version/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteVersion = async (id) => {
    try {
        const res = await request.deleteMethod('api/version/delete-Version/' + id);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getVersionSize = async (id) => {
    try {
        const res = await request.getMethod('api/version/get-size/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getVersionColor = async (id) => {
    try {
        const res = await request.getMethod('api/version/get-color/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}