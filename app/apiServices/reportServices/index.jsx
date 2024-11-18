import * as request from '../../utils/request';

export const GetTopProduct = async (obj) => {
    try {
        const res = await request.postMethod('api/report/get-top-product/', obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const GetTopBrand = async (obj) => {
    try {
        const res = await request.postMethod('api/report/get-top-brand/', obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const GetTopCate = async (obj) => {
    try {
        const res = await request.postMethod('api/report/get-top-cate/', obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const GetMoney = async (params) => {
    try {
        const response = await request.getMethod('api/report/get-revenue', {
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