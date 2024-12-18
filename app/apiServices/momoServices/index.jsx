import * as request from '../../utils/request';

export const MomoPay = async (obj) => {
    try {
        const res = await request.postMethod('api/momopay/create_payment_url', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}