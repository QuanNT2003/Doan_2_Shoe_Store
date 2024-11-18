import * as request from '../../utils/request';

export const getAllSizes = async (params) => {
    try {
        const response = await request.getMethod('api/size/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    return key + '=' + params[key];
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

export const getSizesForSale = async (price) => {
    try {
        const res = await request.getMethod(`api/size/get-all?pageSize=${-1}&pageNumber=${1}&salesOrderPrice=${price}&statuses=running&isOutdated=false`);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getSize = async (id) => {
    try {
        const res = await request.getMethod('api/size/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateSize = async (id, obj) => {
    try {
        const res = await request.putMethod('api/size/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateSize = async (obj) => {
    try {
        const res = await request.postMethod('api/size/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteSize = async (id) => {
    try {
        const res = await request.deleteMethod('api/size/delete-Size/' + id);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}