import styles from './Header.module.scss';
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const cx = classNames.bind(styles);
export default function Header() {
    const navigate = useNavigate();
    const [account, setAccount] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    }
    useEffect(() => {

        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        let userJson;
        if (token !== null && user !== null) {
            userJson = JSON.parse(user);
            setAccount(userJson);
            setIsLogin(true);

        } else 
            setIsLogin(false)
    }, [])
    return (
        <div className={cx("wrapper")}>
            <div className={cx("logo")}>
                <img src={"fd"} alt={"logo"} />
            </div>
            <button onClick={() => navigate('/')}>Trang chủ</button>
            <div className={cx("search")}>
                <input placeholder={"search"} />
                <button>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>

            </div>
            <button onClick={() => navigate('/cart')}><FontAwesomeIcon icon={faCartShopping}/> Giỏ hàng</button>
            {isLogin ?
                <div>
                    <button>{account.fullName}</button>
                    <button onClick={() => handleLogout()}>Đăng xuất</button>
                </div> :
                <div>
                    <button onClick={() => navigate("/login")}>Đăng nhập</button>
                    <button onClick={() => navigate("/register")}>Đăng ký</button>
                </div>
            }
        </div>
    );
}