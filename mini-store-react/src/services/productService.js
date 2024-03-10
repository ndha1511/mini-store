import requestApi from "../utils/request";

export const getProducts = async (page, limit) => {
    try {
        const response = await requestApi(`/products?page=${page}&limit=${limit}`, "GET", [], false);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}