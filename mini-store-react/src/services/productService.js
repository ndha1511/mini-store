import requestApi from "../utils/request";

export const getProducts = async (page, limit, sort = 'createdAt', desc = true) => {
    try {
        const response = await requestApi(`/products?page=${page}&limit=${limit}&sort_by=${sort}&desc=${desc}`, "GET", [], false);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getProductsByCategoryId = async (categoryId, page, limit, sort = 'createdAt', desc = true) => {
    try {
        const response = await requestApi(`/products/category/${categoryId}?page=${page}&limit=${limit}&sort_by=${sort}&desc=${desc}`, "GET", [], false);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await requestApi(`/products/${productId}`, "GET", [], false);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export function formatVND(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}
