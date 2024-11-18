import * as request from '../../utils/request';

export const getAllColors = async (params) => {
    try {
        const response = await request.getMethod('api/color/get-all?', {
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

export const getColorsForSale = async (price) => {
    try {
        const res = await request.getMethod(`api/color/get-all?pageSize=${-1}&pageNumber=${1}&salesOrderPrice=${price}&statuses=running&isOutdated=false`);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getColor = async (id) => {
    try {
        const res = await request.getMethod('api/color/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateColor = async (id, obj) => {
    try {
        const res = await request.putMethod('api/color/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateColor = async (obj) => {
    try {
        const res = await request.postMethod('api/color/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteColor = async (id) => {
    try {
        const res = await request.deleteMethod('api/color/delete-Color/' + id);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}