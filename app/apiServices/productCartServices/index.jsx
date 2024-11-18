import * as request from '../../utils/request';

export const getAllCarts = async (params) => {
    try {
        const response = await request.getMethod('api/shoppingCart/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    if (key === 'limit' || key === 'page' || key === 'search' || key === 'user') {
                        return key + '=' + params[key];
                    }
                    if (key === 'sortBy' || key === 'orderBy') {
                        return 'sort' + '=' + params[key];
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

export const CreateShoppingCart = async (obj) => {
    try {
        const res = await request.postMethod('api/shoppingCart/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteCart = async (id) => {
    try {
        const res = await request.deleteMethod('api/shoppingCart/delete-ShoppingCart/' + id);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

