import { useEffect, useState } from 'react';
import './login.css';
import { faLock, faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findByPhoneNumber, login } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { loginState } from '../../redux/reducers/userReducer';

function Login() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [disabledButton, setDissabledButton] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const handleLogin = () => {
        const userLogin = {
            phoneNumber: phoneNumber.trim(),
            password: password.trim(),
            admin: isAdmin
        }
        login(userLogin)
            .then((resp) => {
                localStorage.setItem('token', JSON.stringify(resp));
                findByPhoneNumber(phoneNumber)
                    .then((resp) => {
                        localStorage.setItem('user', JSON.stringify(resp));
                            dispatch(loginState(resp));

                        if (!isAdmin) {
                            navigate('/trang-chu');
                        } else {
                            navigate('/dashboard');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setErr('Xảy ra lỗi không xác định');
                    })

            })
            .catch((err) => {
                console.log(err);
                setErr('Số điện thoại hoặc mật khẩu không chính xác')
            })

    }
    useEffect(() => {
        document.title = "Đăng nhập"
    }, []);
    useEffect(() => {
        const isDisabledButton = () => {
            if ((phoneNumber.trim().length >= 10 || phoneNumber.trim() === 'admin') && password.trim().length >= 6) {
                setDissabledButton(false);
            } else
                setDissabledButton(true);

        }
        isDisabledButton();
    }, [phoneNumber, password]);
    return (
        <div className="login">
            <div style={{ marginBottom: 10 }}>
                <h1>Đăng nhập</h1>
            </div>
            <div className="box-login">
                <div className="login-content">
                    <label htmlFor='phoneNumber' className='txt-input'>
                        <div><FontAwesomeIcon icon={faMobileScreenButton} /></div>
                        <input id='phoneNumber' placeholder='Số điện thoại' onChange={(event) => {
                            setPhoneNumber(event.target.value);

                        }} />
                    </label>
                    <label htmlFor='password' className='txt-input'>
                        <div><FontAwesomeIcon icon={faLock} /></div>
                        <input id='password' placeholder='Mật khẩu' type='password' onChange={(event) => {
                            setPassword(event.target.value);

                        }} />
                    </label>
                    <span style={{ color: 'red' }}>{err}</span>
                    <div style={{ display: 'flex', height: 30, width: "80%", marginTop: 30 }}>
                        <label htmlFor='admin' style={{ height: "80%", width: '100%' }}>
                            Đăng nhập với tư cách admin

                        </label>
                        <input id='admin' type='checkbox' style={{ height: "80%" }} onChange={(event) => {
                            setIsAdmin(event.target.checked);
                        }} />
                    </div>
                    <button onClick={handleLogin} disabled={disabledButton}>Đăng nhập</button>
                    <Link to='/login/#' style={{ marginTop: 20 }}>Quên mật khẩu?</Link>
                </div>
            </div>
            <div style={{ marginTop: 10 }}>
                <p>Bạn chưa có tài khoản? <Link to={"/dang-ky"}>Đăng ký ngay</Link></p>
            </div>
        </div>
    );
}

export default Login;