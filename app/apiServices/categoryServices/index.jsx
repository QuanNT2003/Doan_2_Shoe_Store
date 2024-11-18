import * as request from '../../utils/request';

export const getAllCategorys = async (params) => {
    try {
        const response = await request.getMethod('api/category/get-all?', {
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

export const getCategorysForSale = async (price) => {
    try {
        const res = await request.getMethod(`api/category/get-all?pageSize=${-1}&pageNumber=${1}&salesOrderPrice=${price}&statuses=running&isOutdated=false`);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getCategory = async (id) => {
    try {
        const res = await request.getMethod('api/category/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateCategory = async (id, obj) => {
    try {
        const res = await request.putMethod('api/category/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateCategory = async (obj) => {
    try {
        const res = await request.postMethod('api/category/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteCategory = async (id) => {
    try {
        const res = await request.deleteMethod('api/category/delete-Category/' + id);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}