import * as request from '../../utils/request';

export const getAllComment = async (params) => {
    try {
        // console.log(params)
        const response = await request.getMethod('api/comment/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    if (key === 'limit' || key === 'page' || key === 'search') {
                        return key + '=' + params[key];
                    }
                    if (key === 'sortBy' || key === 'orderBy') {
                        return 'sort' + '=' + params[key];
                    }
                    if (key === 'rating') {
                        return key + '=' + params[key].value + '&';
                    }
                    if (key === 'user' || key === 'productId' || key === 'approve') {
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

export const getComment = async (id) => {
    try {
        const res = await request.getMethod('api/comment/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateComment = async (id, obj) => {
    try {
        const res = await request.putMethod('api/comment/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateComment = async (obj) => {
    try {
        const res = await request.postMethod('api/comment/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteComment = async (id) => {
    try {
        const res = await request.deleteMethod('api/comment/delete-Comment/' + id);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getUser = async () => {
    try {
        const res = await request.getMethod('api/comment/get-user');
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getProduct = async () => {
    try {
        const res = await request.getMethod('api/comment/get-product');
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}
