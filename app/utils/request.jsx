import axios from 'axios';

const request = axios.create({
    baseURL: 'http://192.168.167.208:3001/',
});

const getToken = async () => {
    let token = await window.localStorage.getItem('access_token');
    if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1); // Loại bỏ dấu ngoặc kép bao quanh nếu có
    }
    return token;
};

const refreshAccessToken = async () => {
    try {
        let refreshToken = await window.localStorage.getItem('refresh_token');
        if (refreshToken.startsWith('"') && refreshToken.endsWith('"')) {
            refreshToken = refreshToken.slice(1, -1); // Loại bỏ dấu ngoặc kép bao quanh nếu có
        }
        const response = await request.post('api/admin/refresh-token', { refreshToken });
        const newAccessToken = response.data.access_token;
        await window.localStorage.setItem('access_token', newAccessToken);
        console.log('Đổi token');
        console.log(response);
        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing access token', error);
        // Xử lý lỗi (ví dụ: chuyển hướng người dùng đến trang đăng nhập)
    }
};
const requestWithTokenRefresh = async (method, path, data, options = {}) => {
    // let token = await getToken();
    // const headers = {
    //     Authorization: `Bearer ${token}`,
    // };

    try {
        return await request({
            method,
            url: path,
            data,
            // headers,
            ...options,
        });
    } catch (error) {
        if (error.response && error.response.status === 403) {
            return await request({
                method,
                url: path,
                data,
                // headers,
                ...options,
            });
            // token = await refreshAccessToken();
            // if (token) {
            //     headers.Authorization = `Bearer ${token}`;
            //     return await request({
            //         method,
            //         url: path,
            //         data,
            //         // headers,
            //         ...options,
            //     });
            // }
        }
        throw error; // Ném lỗi nếu không thể làm mới token
    }
};

export const getMethod = async (path, options = {}) => {
    return requestWithTokenRefresh('get', path, null, options).then(response => response.data);
};

export const postMethod = async (path, data, options = {}) => {
    return requestWithTokenRefresh('post', path, data, options).then(response => response.data);
};
// export const getMethod = async (path, options = {}) => {
//     let token = await window.localStorage.getItem('access_token');
//     if (token.startsWith('"') && token.endsWith('"')) {
//         token = token.slice(1, -1); // loại bỏ dấu ngoặc kép bao quanh nếu có
//     }
//     const headers = {
//         Authorization: `Bearer ${token}`,
//     }
//     const response = await request.get(path, {
//         ...options, // truyền thêm tất cả các tùy chọn khác
//         headers, // ghi đè headers
//     });
//     return response.data;
// };

// export const postMethod = async (path, options = {}) => {
//     const headers = {
//         Authorization: "Bearer " + (await window.localStorage.getItem('access_token')),
//     }
//     const response = await request.post(path, options, {
//         headers: headers,
//     });
//     return response.data;
// };

export const putMethod = async (path, data, options = {}) => {
    return requestWithTokenRefresh('put', path, data, options).then(response => response.data);
};

export const deleteMethod = async (path, data, options = {}) => {
    return requestWithTokenRefresh('delete', path, data, options).then(response => response.data);
};


export default request;