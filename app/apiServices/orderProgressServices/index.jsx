import * as request from '../../utils/request';

export const CreateOrderProgress = async (obj) => {
    try {
        const res = await request.postMethod('api/orderprogress/add', obj);

        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const GetOrderProgressForOrder = async (id) => {
    try {
        const res = await request.getMethod('api/orderprogress/get-for-order/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getOrderProgressForReturn = async (id) => {
    try {
        const res = await request.getMethod('api/orderprogress/get-for-return/' + id);
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
}