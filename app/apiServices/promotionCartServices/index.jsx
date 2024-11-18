import * as request from '../../utils/request';

export const CreatePromotionCart = async (obj) => {
    try {
        const res = await request.postMethod('api/discountCart/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getAllCarts = async (params) => {
    try {
        const response = await request.getMethod('api/discountCart/get-all?', {
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