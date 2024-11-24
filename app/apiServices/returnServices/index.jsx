import * as request from '../../utils/request';

export const getAllReturn = async (params) => {
    try {
        const response = await request.getMethod('api/return/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    if (key === 'limit' || key === 'page' || key === 'search') {
                        return key + '=' + params[key];
                    }
                    if (key === 'sortBy' || key === 'orderBy') {
                        return 'sort' + '=' + params[key];
                    }
                    if (key === 'user' || key === 'status') {
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

export const CreateReturn = async (obj) => {
    try {
        const res = await request.postMethod('api/return/add', obj);

        return res;
    } catch (error) {
        if (error.response) {
            // Máy chủ phản hồi nhưng với mã trạng thái lỗi (4xx, 5xx)
            console.error("Response error:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
        } else if (error.request) {
            // Yêu cầu đã được gửi nhưng không nhận được phản hồi
            console.error("Request error:", error.request);
        } else {
            // Lỗi khác (cấu hình sai, không thể gửi yêu cầu, ...)
            console.error("Unexpected error:", error.message);
        }

        return Promise.reject(error);

    }
}

export const GetDetailReturn = async (id) => {
    try {
        const res = await request.getMethod('api/return/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateReturn = async (id, obj) => {
    try {
        const res = await request.putMethod('api/return/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getUser = async () => {
    try {
        const res = await request.getMethod('api/return/get-user');

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}