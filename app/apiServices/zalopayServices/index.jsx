import * as request from '../../utils/request';

export const ZaloPay = async (obj) => {
    try {
        const res = await request.postMethod('api/zalopay/create_payment_url', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}