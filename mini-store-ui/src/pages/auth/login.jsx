import classNames from 'classnames/bind';
import styles from './login.module.scss'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import request from '../../utils/Request';



const cx = classNames.bind(styles);
function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errPassword, setErrorPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const fetch = async () => {
        const data = {
            phoneNumber,
            password
        }
        try {
            const response = await request.post('api/v1/users/login', data);



            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + response.data.token,
            };

            const result = await request.get('api/v1/users/' + phoneNumber, { headers });

            if (isAdmin) {
                if (result.data.role.name === "ROLE_ADMIN") {
                    localStorage.setItem('token', JSON.stringify(response.data));
                    localStorage.setItem('user', JSON.stringify(result.data));
                    navigate('/dashboard');
                }
                else {
                    setErrorPassword('sai số điện thoại hoặc mật khẩu');
                    return;
                }

            } else {
                if (result.data.role.name === "ROLE_USER") {
                    localStorage.setItem('token', JSON.stringify(response.data));
                    localStorage.setItem('user', JSON.stringify(result.data));
                    navigate('/');
                }
                else {
                    setErrorPassword('sai số điện thoại hoặc mật khẩu');
                    return;
                }
            }
            return;

        } catch (error) {
            const errResponse = error.response;
            if (errResponse.status === 403) {
                setErrorPassword('sai số điện thoại hoặc mật khẩu');
            }
        }

    }

    const handleLogin = () => {
        fetch();
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
                <h3>ĐĂNG NHẬP</h3>
                <div className={cx("form")}>
                    <span style={{ color: 'red' }}>{errPhoneNumber}</span>
                    <input placeholder='Số điện thoại' type='tel' onChange={(event) => { setPhoneNumber(event.target.value); setErrorPhoneNumber('') }} />
                    <input placeholder='Password' type='password' onChange={(event) => { setPassword(event.target.value); setErrorPassword('') }} />
                    <span style={{ color: 'red' }}>{errPassword}</span>


                    <Button variant='dark' className={cx("login-btn")} onClick={handleLogin} >Đăng nhập</Button>
                    <div className={cx("link")}>
                        <Link to={"/register"} className={cx("link-tag")}>Đăng ký tài khoản</Link>
                        <Link to={"/"} className={cx("link-tag")}>Quên mật khẩu</Link>
                    </div>
                    <div className={cx("footer")}>
                        <button className={cx("btn")}>
                            <FontAwesomeIcon icon={faFacebook} />
                        </button>
                        <button className={cx("btn")}>
                            <FontAwesomeIcon icon={faGoogle} />
                        </button>
                    </div>
                    <div className={cx("checkbox")}>
                        <input type='checkbox' id='isAdmin' onChange={(event) => setIsAdmin(!isAdmin)} />
                        <label for="isAdmin">Đăng nhập với tài khoản admin</label>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Login;