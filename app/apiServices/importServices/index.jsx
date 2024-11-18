import * as request from '../../utils/request';
export const getAllImports = async (params) => {
    try {
        console.log(params)
        const response = await request.getMethod('api/import/get-all?', {
            params,
            paramsSerializer: (params) => {
                const serializedParams = Object.keys(params).map((key) => {
                    if (key === 'limit' || key === 'page' || key === 'search' || key === 'productId') {
                        return key + '=' + params[key];
                    }
                    if (key === 'sortBy' || key === 'orderBy') {
                        return 'sort' + '=' + params[key];
                    }
                    if (key === 'size' || key === 'color') {
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

export const getImport = async (id) => {
    try {
        const res = await request.getMethod('api/import/get-details/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateImport = async (id, obj) => {
    try {
        const res = await request.putMethod('api/import/update/' + id, obj);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const CreateImport = async (obj) => {
    try {
        const res = await request.postMethod('api/import/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}