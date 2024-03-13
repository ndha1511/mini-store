import requestApi from "../utils/request"

export const login = async (userLogin) => {
    try {
        const response = await requestApi('/users/login', 'POST', userLogin, false);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const findByPhoneNumber = async (phoneNumber) => { 
    try {
        const response = await requestApi('/users/' + phoneNumber, 'GET',  [], true);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const registerUser = async (user) => {
    try {
        const response = await requestApi('/users/register', 'POST', user, false);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
        
    }
}