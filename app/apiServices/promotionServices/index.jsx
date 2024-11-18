import * as request from '../../utils/request';

export const getAllPromotions = async (params) => {
    try {
        const response = await request.getMethod('api/discount/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    if (key === 'limit' || key === 'page' || key === 'search') {
                        return key + '=' + params[key];
                    }
                    if (key === 'sortBy' || key === 'orderBy') {
                        return 'sort' + '=' + params[key];
                    }
                    if (key === 'classify' || key === 'status') {
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

export const getPromotion = async (id) => {
    try {
        const res = await request.getMethod('api/discount/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdatePromotion = async (id, obj) => {
    try {
        const res = await request.putMethod('api/discount/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreatePromotion = async (obj) => {
    try {
        const res = await request.postMethod('api/discount/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deletePromotion = async (id) => {
    try {
        const res = await request.deleteMethod('api/discount/delete-Discount/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getPromotionUser = async (id) => {
    try {
        const res = await request.getMethod('api/discount/get-discount-user/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}