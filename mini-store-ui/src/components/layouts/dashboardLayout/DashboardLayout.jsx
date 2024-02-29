import { faChartColumn, faClipboardList, faMessage, faPowerOff, faShop } from "@fortawesome/free-solid-svg-icons";
import styles from "./DashboardLayout.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const menu = [
    { icon: faShop, title: 'Quản lý sản phẩm' },
    { icon: faClipboardList, title: 'Quản lý đơn hàng' },
    { icon: faChartColumn, title: 'Thống kê' },
    { icon: faMessage, title: 'Tin nhắn'},
    { icon: faPowerOff, title: 'Đăng xuất'},
]

function DashbroadLayout({ children }) {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    }
    const handleClick = (index) => {
        if(index === 0) {
            navigate("/dashboard");
        } else if(index === 1) {
            navigate("/dashboard/orders");
        } else if(index === 2) {
            navigate("/dashboard/statistical");
        } else if(index === 3) {
            navigate("/dashboard/messages");
        } else {
            handleLogout();
        }
    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx("menubar")}>
                {menu.map((value, index) => {
                    return (
                        <div key={index}>
                            <Tippy content={value.title} placement="bottom">
                                <button onClick={() => { setActive(index); handleClick(index); }} style={{ backgroundColor: active === index ? "aqua" : "" }}>
                                    <FontAwesomeIcon icon={value.icon} />
                                </button>
                            </Tippy>
                        </div>
                    )
                })}
            </div>
            {children}
        </div>
    );
}

export default DashbroadLayout;