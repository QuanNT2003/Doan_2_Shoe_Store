import * as request from '../../utils/request';
export const login = async (obj) => {
    try {
        const res = await request.postMethod('api/admin/login', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}