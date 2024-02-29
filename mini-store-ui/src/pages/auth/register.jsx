import { useState } from 'react';
import styles from './login.module.scss';
import classNames from "classnames/bind";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import request from '../../utils/Request';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);
function Register() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');

    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const [disableButton, setDisableButton] = useState(false);
    const fetch = async () => {
        try {
            const dataSignup = {
                phoneNumber,
                password,
                fullName,
                retypePassword: rePassword,
                dateOfBirth: dob,
                roleId: 1
            }
            console.log(dataSignup)
            const response = await request.post('api/v1/users/register', dataSignup);
            return response.data;
        } catch (error) {
            const errResponse = error.response;
            if (errResponse.status === 400) {
                setErr('số điện thoại đã được đăng ký');
                throw new Error('phone number is exists')
            }
        }
    }
    
    const handleRegister = () => {
        if (phoneNumber === '' || password === '' || rePassword === '' || fullName === '' || dob === '') {
            setErr('vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (password !== rePassword) {
            setErr('mật khẩu nhập lại không chính xác');
            return;
        }
        setErr('');
        setDisableButton(true);
        fetch().then(rs => {
            toast.success("đăng ký thành công", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                onClose: () => {
                    navigate("/login")
                }
            });
        })
            .catch(err => { console.log(err); setDisableButton(false) });

    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")} style={{ height: '90%' }}>
                <h3>ĐĂNG KÝ TÀI KHOẢN</h3>
                <div className={cx("form")} >
                    <input placeholder='Số điện thoại' type='tel' onChange={(e) => setPhoneNumber(e.target.value)} disabled={disableButton} />
                    <input placeholder='Mật khẩu' type='password' onChange={(e) => setPassword(e.target.value)} disabled={disableButton} />
                    <input placeholder='Nhập lại mật khẩu' type='password' onChange={(e) => setRePassword(e.target.value)} disabled={disableButton} />
                    <input placeholder='Họ và tên' onChange={(e) => setFullName(e.target.value)} disabled={disableButton} />
                    <input placeholder='Ngày sinh' onChange={(e) => setDob(e.target.value)} disabled={disableButton} type='date' />
                    <span style={{ color: 'red' }}>{err}</span>
                    <Button className={cx("login-btn")} disabled={disableButton} onClick={handleRegister}>Đăng ký</Button>

                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}

                    />

                </div>

            </div>
        </div>
    );
}

export default Register;