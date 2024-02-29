import { useEffect } from 'react';
import styles from './OrderManagement.module.scss';
import classNames from 'classnames/bind';
import request from '../../utils/Request';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function OrderManagement() {
    const navigate = useNavigate();
    const checkInvalidToken = async (data) => {
        try {
            const response = await request.post('api/v1/users/invalidToken', data);
            localStorage.setItem('token', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            const errResponse = error.response;
            if (errResponse.status === 400 || errResponse.status === 403) {
                navigate('/login');
            }
        }

    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        let tokenJson;
        if (token !== null && user !== null) {

            const userLogin = JSON.parse(user);
            if (userLogin.role.name === 'ROLE_ADMIN') {
                tokenJson = JSON.parse(token);
                checkInvalidToken(tokenJson);
                // setToken(tokenJson.token);
            } else {
                navigate('/login');
            }

        }
        else {
            navigate('/login');
        }
    }, [])
    return (
        <div className={cx("wrapper")}>
            <h2>Order</h2>
        </div>
    );
}

export default OrderManagement;