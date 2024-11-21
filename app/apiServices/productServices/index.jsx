import * as request from '../../utils/request';

export const getAllProducts = async (params) => {
    try {
        const response = await request.getMethod('api/product/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    if (key === 'limit' || key === 'page' || key === 'search') {
                        return key + '=' + params[key];
                    }
                    if (key === 'sortBy' || key === 'orderBy') {
                        return 'sort' + '=' + params[key];
                    }
                    if (key === 'classify' || key === 'brand' || key === 'category') {
                        let string = ''
                        for (let item of params[key]) string += key + '=' + item + '&';
                        return string
                    }
                    if (key === 'price') {
                        let string = ''
                        string += 'min' + '=' + params[key][0] + '&' + 'max' + '=' + params[key][1] + '&';
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

export const getProductsForSale = async (price) => {
    try {
        const res = await request.getMethod(`api/product/get-all?pageSize=${-1}&pageNumber=${1}&salesOrderPrice=${price}&statuses=running&isOutdated=false`);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getProduct = async (id) => {
    try {
        const res = await request.getMethod('api/product/get-details/' + id);
        // console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getRelatedProducts = async (id) => {
    try {
        const res = await request.getMethod('api/product/get-related-products/' + id);
        // console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getSearch = async (search) => {
    try {
        const res = await request.getMethod('api/product/get-search/' + search);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateProduct = async (id, obj) => {
    try {
        const res = await request.putMethod('api/product/update/' + id, obj);
        // console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateProduct = async (obj) => {
    try {
        const res = await request.postMethod('api/product/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await request.deleteMethod('api/product/delete-Product/' + id);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}